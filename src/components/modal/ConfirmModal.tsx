import React from "react";
import { Image, Modal, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsConfirmModalOpen } from "../../store/general/generalSlice";
import logo1 from "../../assets/logo.png";
import styled from "styled-components";
const { Title } = Typography;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
  }
`;

const ConfirmModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isConfirmModalOpen = useAppSelector(
    (state) => state.general.isConfirmModalOpen
  );

  const handleCancel = () => {
    dispatch(setIsConfirmModalOpen(false));
  };

  return (
    <>
      <StyledModal
        styles={{
          body: {
            // height: screens.lg ? "undefined" : "530px",
            overflow: "auto",
            padding: "20px",
          },
        }}
        centered
        width={450}
        open={isConfirmModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Image width="40px" height="40px" src={logo1} preview={false} />
          <Typography>
            <Title level={4}>This feature is currently not active</Title>
          </Typography>
        </div>
      </StyledModal>
    </>
  );
};

export default ConfirmModal;
