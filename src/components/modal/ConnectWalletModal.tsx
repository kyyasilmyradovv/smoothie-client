import React, { useState } from 'react';
import { Button, ConfigProvider, Image, Input, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setIsConnectWalletModalOpen } from '../../store/general/generalSlice';
import logo from '../../assets/logo.png';
import { styled } from 'styled-components';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCXB1hlNGPK8HBffwZvIOIIyBh2QavcFzc',
  authDomain: 'smoothie-emails.firebaseapp.com',
  databaseURL:
    'https://smoothie-emails-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'smoothie-emails',
  storageBucket: 'smoothie-emails.firebasestorage.app',
  messagingSenderId: '512943615341',
  appId: '1:512943615341:web:3494641f50c7f33ee2fe64',
  measurementId: 'G-11LJK2EH94',
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
  const dispatch = useAppDispatch();
  const appCustomization = useAppSelector(
    (state) => state.general.appCustomization
  );
  const isConnectWalletModalOpen = useAppSelector(
    (state) => state.general.isConnectWalletModalOpen
  );
  const [email, setEmail] = useState('');

  const handleJoinWaitlist = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      console.log('Please enter an email.');
      return;
    }

    if (!emailRegex.test(email)) {
      console.log('Please enter a valid email.');
      return;
    }

    try {
      // If email is valid, push it to Firebase
      const emailsRef = ref(database, 'emails');
      await push(emailsRef, email);

      console.log('Email added to Firebase database:', email);
    } catch (err) {
      console.error('Error adding email:', err);
    }
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
              contentBg: appCustomization.theme === 'dark' ? '#010118' : '#FFF',
            },
          },
        }}
      >
        <StyledModal
          width={400}
          // title={<Typography.Title level={4}>Connect wallet</Typography.Title>}
          open={isConnectWalletModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Image
              src={logo}
              preview={false}
              style={{
                width: '70px',
                height: '70px',
                marginTop: '20px',
              }}
            />
            {/* <Typography.Title style={{ marginTop: "10px" }} level={3}>
            Join waitlist
          </Typography.Title> */}

            <div
              style={{
                width: '100%',
                marginTop: '10px',
                display: 'flex',
                // flexDirection: "column",
                alignItems: 'center',
                gap: '10px',
              }}
            >
              {/* <Typography.Text type="secondary" style={{ fontSize: "14px" }}>
              Please enter your email to join our waitlist.
            </Typography.Text> */}
              <Input
                style={{
                  borderRadius: '16px',
                  marginTop: '5px',
                  height: '40px',
                }}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleJoinWaitlist();
                  }
                }}
              />
              <Button
                type="primary"
                style={{
                  borderRadius: '16px',
                  background:
                    'linear-gradient(0deg, #f00 -52.7%, #f5af19 191.82%)',
                  height: '40px',
                }}
                onClick={() => handleJoinWaitlist()}
              >
                Join waitlist
              </Button>
            </div>
          </div>
        </StyledModal>
      </ConfigProvider>
    </>
  );
};

export default ConnectWalletModal;
