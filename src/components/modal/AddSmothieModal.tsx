import React from "react";
import { Button, Image, InputNumber, Modal, Select, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsAddSmothieModalOpen } from "../../store/general/generalSlice";
import logo from "../../assets/logo.png";
import { styled } from "styled-components";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
  }
`;

const AddSmothieModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const isAddSmothieModalOpen = useAppSelector(
    (state) => state.general.isAddSmothieModalOpen
  );
  const addSmothieName = useAppSelector(
    (state) => state.general.addSmothieName
  );

  const handleCancel = () => {
    dispatch(setIsAddSmothieModalOpen(false));
  };

  return (
    <>
      <StyledModal
        width={645}
        // title={<Typography.Title level={4}>Connect wallet</Typography.Title>}
        open={isAddSmothieModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography.Title level={3} style={{ display: "flex" }}>
            Add{" "}
            <Typography.Title
              level={3}
              style={{ margin: "0 5px", color: "#00C853" }}
            >
              {addSmothieName}
            </Typography.Title>{" "}
            to Smoothie
          </Typography.Title>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "32px" }}
          >
            <Image
              src={logo}
              preview={false}
              style={{
                width: "35px",
                height: "35px",
                marginRight: "15px",
              }}
            />
            <Select
              size="large"
              defaultValue="USDC"
              style={{ width: "100px" }}
              // onChange={handleChange}
              options={[{ value: "USDC", label: "USDC" }]}
            />
            <InputNumber
              step={0.01}
              controls
              size="large"
              min={0}
              // max={100000}
              defaultValue={3500.45}
              style={{ width: "150px" }}
              // onChange={onChange}
            />
          </div>
          <Button
            style={{
              width: "400px",
              height: "28px",
              background:
                "var(--linear-gradient, linear-gradient(91deg, #F09819 0.44%, #FF512F 99.74%))",
              borderRadius: "16px",
              color: "#FFFFFF",
              marginTop: "34px",
            }}
          >
            Add to Smoothie
          </Button>
        </div>
      </StyledModal>
    </>
  );
};

export default AddSmothieModal;
