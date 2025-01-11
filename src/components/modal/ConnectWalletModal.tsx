import React from "react";
import { Button, Image, Input, Modal, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsConnectWalletModalOpen } from "../../store/general/generalSlice";
import logo from "../../assets/logo.png";

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
      <Modal
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
              marginTop: "30px",
            }}
          />
          <Typography.Title style={{ marginTop: "20px" }} level={3}>
            Join waitlist & get something special
          </Typography.Title>

          <div
            style={{
              width: "100%",
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography.Text type="secondary" style={{ fontSize: "14px" }}>
              Please enter your email to join our waitlist.
            </Typography.Text>
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
                marginTop: "10px",
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
      </Modal>
    </>
  );
};

export default ConnectWalletModal;
