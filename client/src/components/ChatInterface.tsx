import React, { useState } from "react";
import { Input, Button, Typography, Divider, message, Card } from "antd";
import { useAppKitAccount } from "@reown/appkit/react";
import { useChainId } from "wagmi"; // Import useChainId from wagmi
import axios from "axios";

const { Text, Title } = Typography;
const { TextArea } = Input;

const ChatInterface = () => {
  const [prompt, setPrompt] = useState("");

  interface Response {
    conversationHistory: { sender: string; content: string }[];
    data?: {
      description: string;
      fromAmount: string;
      fromToken: { symbol: string; priceUSD: string; decimals?: number };
      toToken: { symbol: string; decimals: number; priceUSD: string };
      toAmount: number;
      toAmountUSD: string;
      steps: { gasLimit?: string; to?: string }[];
      receiver: string;
    };
    answer?: string;
  }

  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(false);

  const { address, isConnected } = useAppKitAccount();
  const chainId = useChainId(); // Use wagmi's useChainId hook to get the current chain ID

  const token = localStorage.getItem("accessToken");

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
        { prompt, chainId, address }, // Use chainId from wagmi
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newResponse = res.data.result.result[0];

      if (!newResponse) {
        throw new Error("No valid response received.");
      }

      if (newResponse.data) {
        newResponse.data.fromToken = {
          ...newResponse.data.fromToken,
          decimals: newResponse.data.fromToken.decimals ?? 18, // Default decimals
        } as { symbol: string; priceUSD: string; decimals: number };
      }

      setResponses((prev) => [...prev, newResponse]);
      setPrompt("");
    } catch (error) {
      console.error("Error sending prompt:", error);
      message.error("Failed to get response from server.");
    } finally {
      setLoading(false);
    }
  };

  const handleTransaction = async (transactionData: TransactionData) => {
    try {
      message.info("Attempting to execute transaction...");
      console.log("Transaction Data:", transactionData);
    } catch (error) {
      console.error("Transaction failed:", error);
      message.error("Failed to execute transaction.");
    }
  };

  const handleRejectTransaction = (index: number) => {
    setResponses((prev: Response[]) =>
      prev.filter((_, responseIndex: number) => responseIndex !== index)
    );
  };

  interface Token {
    symbol: string;
    priceUSD: string;
    decimals: number;
  }

  interface Step {
    gasLimit?: string;
    to?: string;
  }

  interface TransactionData {
    description: string;
    fromAmount: string;
    fromToken: Token;
    toToken: Token;
    toAmount: number;
    toAmountUSD: string;
    steps: Step[];
    receiver: string;
  }

  const renderTransactionCard = (data: TransactionData, index: number) => {
    if (!data) return null;

    const {
      description,
      fromAmount,
      fromToken,
      toToken,
      toAmount,
      toAmountUSD,
      steps,
      receiver,
    } = data;

    return (
      <Card
        key={`transaction-${index}`}
        style={{
          marginTop: 16,
          marginBottom: 24,
          borderRadius: 12,
          background: "#2b2b2b",
        }}
        bodyStyle={{ padding: 16 }}
      >
        <Title level={5} style={{ color: "#fff" }}>
          Transaction Details
        </Title>
        <Text style={{ color: "#aaa", display: "block", marginBottom: 12 }}>
          {description}
        </Text>
        <Divider style={{ borderColor: "#444" }} />
        <div style={{ color: "#fff", lineHeight: "1.5" }}>
          <Text strong>From:</Text> {parseFloat(fromAmount).toFixed(2)}{" "}
          {fromToken.symbol} (${fromToken.priceUSD})
          <br />
          <Text strong>To:</Text> {toToken.symbol} (
          {parseFloat(
            (toAmount / Math.pow(10, toToken.decimals || 0)).toString()
          ).toFixed(6)}
          ) @ ${toToken.priceUSD}
          <br />
          <Text strong>Value:</Text> ${toAmountUSD}
          <br />
          <Text strong>Gas Price:</Text>{" "}
          {steps[0]?.gasLimit ? `${steps[0]?.gasLimit} units` : "N/A"}
          <br />
          <Text strong>Receiver:</Text> {receiver}
          <br />
          <Text strong>Resolver Address:</Text> {steps[0]?.to || "N/A"}
        </div>
        <Divider style={{ borderColor: "#444" }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            type="primary"
            onClick={() => handleTransaction(data)}
            style={{ borderRadius: 8 }}
          >
            Accept
          </Button>
          <Button
            danger
            onClick={() => handleRejectTransaction(index)}
            style={{ borderRadius: 8 }}
          >
            Reject
          </Button>
        </div>
      </Card>
    );
  };

  interface Message {
    sender: string;
    content: string;
  }

  const renderChatBubble = (message: Message, index: number) => {
    const isUser = message.sender === "user";

    return (
      <div
        key={index}
        style={{
          display: "flex",
          justifyContent: isUser ? "flex-end" : "flex-start",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            maxWidth: "70%",
            borderRadius: 12,
            padding: 12,
            background: isUser ? "#474747" : "#383838",
            color: "#fff",
            whiteSpace: "pre-line",
          }}
        >
          <Text strong style={{ display: "block", marginBottom: 8 }}>
            {isUser ? "You" : "Brian"}
          </Text>
          <Text>{message.content}</Text>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <Title level={3}>Chat with Brian</Title>
      <Text>Ask anything about web3, smart contracts, or transactions.</Text>
      <Divider />

      <div>
        {responses.map((response, index) => (
          <React.Fragment key={index}>
            {/* Regular chat */}
            {response.conversationHistory.map((msg, idx) =>
              renderChatBubble(msg, idx)
            )}

            {response.data &&
              renderTransactionCard(response.data as TransactionData, index)}

            {/* Handle answers without transactions */}
            {!response.data && response.answer && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    maxWidth: "70%",
                    borderRadius: 12,
                    padding: 12,
                    background: "#383838",
                    color: "#fff",
                    whiteSpace: "pre-line",
                  }}
                >
                  <Text strong style={{ display: "block", marginBottom: 8 }}>
                    Brian
                  </Text>
                  <Text>{response.answer}</Text>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

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
    </div>
  );
};

export default ChatInterface;
