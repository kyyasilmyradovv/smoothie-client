import React from "react";
import { Button, Image, Input, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsConnectWalletModalOpen } from "../../store/general/generalSlice";
import logo from "../../assets/logo.png";
import { styled } from "styled-components";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    background: #010118;
  }
`;

const ConnectWalletModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isConnectWalletModalOpen = useAppSelector(
    (state) => state.general.isConnectWalletModalOpen
  );

  const handleCancel = () => {
    dispatch(setIsConnectWalletModalOpen(false));
  };

  return (
    <>
      <StyledModal
        width={400}
        // title={<Typography.Title level={4}>Connect wallet</Typography.Title>}
        open={isConnectWalletModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src={logo}
            preview={false}
            style={{
              width: "70px",
              height: "70px",
              marginTop: "20px",
            }}
          />
          {/* <Typography.Title style={{ marginTop: "10px" }} level={3}>
            Join waitlist
          </Typography.Title> */}

          <div
            style={{
              width: "100%",
              marginTop: "10px",
              display: "flex",
              // flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {/* <Typography.Text type="secondary" style={{ fontSize: "14px" }}>
              Please enter your email to join our waitlist.
            </Typography.Text> */}
            <Input
              style={{
                borderRadius: "16px",
                marginTop: "5px",
                height: "40px",
              }}
              placeholder="Email"
            />
            <Button
              type="primary"
              style={{
                borderRadius: "16px",
                background:
                  "linear-gradient(0deg, #f00 -52.7%, #f5af19 191.82%)",
                height: "40px",
              }}
            >
              Join waitlist
            </Button>
          </div>
        </div>
      </StyledModal>
    </>
  );
};

export default ConnectWalletModal;
