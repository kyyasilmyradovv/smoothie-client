import React, { useState } from "react";
import {
  Button,
  ConfigProvider,
  Form,
  Image,
  Input,
  message,
  Modal,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setIsConnectWalletModalOpen,
  setUserMail,
} from "../../store/general/generalSlice";
import logo from "../../assets/logo.png";
import { styled } from "styled-components";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCXB1hlNGPK8HBffwZvIOIIyBh2QavcFzc",
  authDomain: "smoothie-emails.firebaseapp.com",
  databaseURL:
    "https://smoothie-emails-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "smoothie-emails",
  storageBucket: "smoothie-emails.firebasestorage.app",
  messagingSenderId: "512943615341",
  appId: "1:512943615341:web:3494641f50c7f33ee2fe64",
  measurementId: "G-11LJK2EH94",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database
const database = getDatabase(app);

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
  }
`;

const ConnectWalletModal: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const appCustomization = useAppSelector(
    (state) => state.general.appCustomization
  );

  const isConnectWalletModalOpen = useAppSelector(
    (state) => state.general.isConnectWalletModalOpen
  );

  const [loading, setLoading] = useState(false);

  const handleJoinWaitlist = async (values: { email: string }) => {
    setLoading(true);
    const email = values.email;
    try {
      const emailsRef = ref(database, "emails");
      await push(emailsRef, email);
      dispatch(setUserMail(email));
      localStorage.setItem("userMail", email);
      messageApi.open({
        type: "success",
        content: `${email} added to Firebase database`,
      });
      dispatch(setIsConnectWalletModalOpen(false));
    } catch (err) {
      messageApi.open({
        type: "error",
        content: `Error adding email`,
      });
      console.log(err);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    dispatch(setIsConnectWalletModalOpen(false));
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: appCustomization.theme === "dark" ? "#010118" : "#FFF",
            },
          },
        }}
      >
        {contextHolder}
        <StyledModal
          centered
          width={400}
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

            <Form
              name="nest-messages"
              onFinish={handleJoinWaitlist}
              style={{ maxWidth: "100%", width: "100%" }}
              // validateMessages={validateMessages}
            >
              <div
                style={{
                  width: "100%",
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Form.Item
                  name={["email"]}
                  rules={[
                    { type: "email", message: "Please enter a valid email." },
                    { required: true, message: "Please input your mail!" },
                  ]}
                  style={{ width: "100%", height: "50px" }}
                >
                  <Input
                    style={{
                      borderRadius: "16px",
                      marginTop: "5px",
                      height: "40px",
                    }}
                    placeholder="Email"
                    // onChange={(e) => setEmail(e.target.value)}
                    // onKeyDown={(e) => {
                    //   if (e.key === "Enter") {
                    //     handleJoinWaitlist();
                    //   }
                    // }}
                  />
                </Form.Item>

                <Form.Item label={null}>
                  <Button
                    htmlType="submit"
                    loading={loading}
                    type="primary"
                    style={{
                      borderRadius: "16px",
                      background:
                        "linear-gradient(0deg, #f00 -52.7%, #f5af19 191.82%)",
                      height: "40px",
                    }}
                    // onClick={() => handleJoinWaitlist()}
                  >
                    Join waitlist
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </StyledModal>
      </ConfigProvider>
    </>
  );
};

export default ConnectWalletModal;
