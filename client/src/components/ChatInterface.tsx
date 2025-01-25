import React, { useState } from "react";
import { Input, Button, Typography, List, Divider, message, Modal } from "antd";
import axios from "axios";
import { useAppKitAccount, useAppKitState } from "@reown/appkit/react";
import {
  grantPermissions,
  SmartSessionGrantPermissionsRequest,
} from "@reown/appkit-experimental/smart-session";

const { Text, Title } = Typography;
const { TextArea } = Input;

type Transaction = {
  solver: string;
  action: string;
  type: string;
  data: {
    to: string;
    data: string;
    value: string;
    fromChainId: number;
  };
  gasCostUSD: string;
  fromChainId: number;
  fromAmountUSD: string;
  fromAmount: string;
  fromToken: { symbol: string; address: string; decimals: number };
  fromAddress: string;
  toChainId: number;
  toAmountUSD: string;
  toAmount: string;
  toAmountMin: string;
  toToken: { symbol: string; address: string; decimals: number };
  toAddress: string;
  receiver: string;
  protocol: Record<string, unknown>;
};

type ChatResponse = {
  answer: string;
  transaction?: Transaction[];
};

const ChatInterface: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState<ChatResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transactionDetails, setTransactionDetails] =
    useState<Transaction | null>(null);

  const token = localStorage.getItem("accessToken"); // Replace with your auth setup
  const { address, isConnected } = useAppKitAccount(); // Get wallet info
  const { activeChain } = useAppKitState(); // Get active chain info

  const handleSendPrompt = async () => {
    if (!prompt.trim()) {
      message.error("Please enter a prompt.");
      return;
    }

    if (!isConnected || !address) {
      message.error("Please connect your wallet first.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/chat`,
        { prompt, chainId: activeChain?.id, address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newResponse: ChatResponse = res.data.result.result[0]; // Adjust for nested structure
      setResponses([...responses, newResponse]);

      // Automatically show the transaction modal if a transaction exists
      if (newResponse.transaction && newResponse.transaction.length > 0) {
        setTransactionDetails(newResponse.transaction[0]); // Take the first transaction
        setIsModalVisible(true);
      }

      setPrompt("");
    } catch (error) {
      console.error("Error sending prompt:", error);
      message.error("Failed to get response from server.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmTransaction = async () => {
    if (!isConnected || !address || !transactionDetails) {
      message.error("Please connect your wallet first.");
      return;
    }

    try {
      // Step 1: Grant Permissions
      const permissionRequest: SmartSessionGrantPermissionsRequest = {
        expiry: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
        chainId: `0x${transactionDetails.fromChainId.toString(16)}`,
        address: address as `0x${string}`,
        signer: {
          type: "keys",
          data: {
            keys: [
              {
                type: "secp256k1",
                publicKey: "0x...", // Replace with your dApp signer's public key
              },
            ],
          },
        },
        permissions: [
          {
            type: "contract-call",
            data: {
              address: transactionDetails.data.to as `0x${string}`,
              abi: [], // Provide the ABI if needed
              functions: [
                {
                  functionName: transactionDetails.action || "call", // Adjust action dynamically
                },
              ],
            },
          },
        ],
        policies: [],
      };

      const permissionResponse = await grantPermissions(permissionRequest);
      console.log("Permissions Granted:", permissionResponse);

      // Prepare transaction calls and send
      const prepareCallsParams = [
        {
          from: transactionDetails.fromAddress,
          chainId: `0x${transactionDetails.fromChainId.toString(16)}`,
          calls: [
            {
              to: transactionDetails.data.to,
              data: transactionDetails.data.data,
              value: transactionDetails.data.value,
            },
          ],
          capabilities: {},
        },
      ];

      const prepareCallsResponse = await axios.post(
        "https://rpc.walletconnect.org/v1/wallets/prepareCalls",
        prepareCallsParams
      );

      const preparedCalls = prepareCallsResponse.data[0].preparedCalls;
      const context = prepareCallsResponse.data[0].context;

      // Sign the transaction
      const signatureRequestHash =
        prepareCallsResponse.data[0].signatureRequest.hash;
      const signResponse = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/sign`,
        { hash: signatureRequestHash },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const signature = signResponse.data.signature;

      // Send the transaction
      const sendPreparedCallsResponse = await axios.post(
        "https://rpc.walletconnect.org/v1/wallets/sendPreparedCalls",
        {
          preparedCalls,
          signature,
          context,
        }
      );

      const callId = sendPreparedCallsResponse.data.callId;
      console.log("Transaction Call ID:", callId);

      message.success("Transaction submitted successfully!");
      setIsModalVisible(false); // Close modal after submission
    } catch (error) {
      console.error("Error executing transaction:", error);
      message.error("Failed to execute transaction.");
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <Title level={3}>Chat with Brian</Title>
      <Text>
        Ask anything related to web3, smart contracts, or transactions.
      </Text>
      <Divider />
      <List
        itemLayout="vertical"
        dataSource={responses}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              title={<Text strong>Brian:</Text>}
              description={
                <>
                  <div>{item.answer}</div>
                  {item.transaction && item.transaction.length > 0 && (
                    <Button
                      type="primary"
                      onClick={() => {
                        setTransactionDetails(item.transaction[0]);
                        setIsModalVisible(true);
                      }}
                      style={{ marginTop: 8 }}
                    >
                      View Transaction
                    </Button>
                  )}
                </>
              }
            />
          </List.Item>
        )}
      />
      <Divider />
      <TextArea
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
      />
      <Button
        type="primary"
        onClick={handleSendPrompt}
        loading={loading}
        style={{ marginTop: 8 }}
      >
        Send
      </Button>

      {/* Modal for transaction confirmation */}
      <Modal
        title="Transaction Confirmation"
        visible={isModalVisible}
        onOk={handleConfirmTransaction}
        onCancel={() => setIsModalVisible(false)}
        okText="Confirm"
        cancelText="Cancel"
      >
        {transactionDetails && (
          <pre
            style={{
              background: "#f0f2f5",
              padding: 16,
              borderRadius: 8,
              overflowX: "auto",
            }}
          >
            {JSON.stringify(transactionDetails, null, 2)}
          </pre>
        )}
      </Modal>
    </div>
  );
};

export default ChatInterface;
