/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Typography } from "antd";
import { useEffect, useState } from "react";
// import Loader from "../../Loader";
// import { UserOutlined } from "@ant-design/icons";

const DelayedResponse = () => {
  const [showResponse, setShowResponse] = useState(false);
  const [showThinking, setShowThinking] = useState(true);

  useEffect(() => {
    const thinkingTimer = setTimeout(() => {
      setShowThinking(false); // Hide "Thinking..." after 3 seconds
      setShowResponse(true); // Show the response
    }, 3000);

    return () => clearTimeout(thinkingTimer); // Cleanup on unmount
  }, []);

  if (showThinking) {
    return (
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {/* <Avatar size={35} icon={<UserOutlined />} src={logo1} /> */}
        <Typography.Text style={{ fontSize: "14px", fontStyle: "italic" }}>
          Thinking...
        </Typography.Text>
        {/* <Spin style={{ color: "white" }} /> */}
      </div>
    );
  }

  if (showResponse) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography.Text
          style={{
            marginTop: "5px",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Smoothie
        </Typography.Text>

        <Card bordered style={{ marginTop: "10px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography.Text
              style={{
                fontSize: "14px",
                fontWeight: "200",
              }}
            >
              You’re creating a Smoothie with 4 tokens worth of $455
            </Typography.Text>
            <Button style={{ marginTop: "10px" }}>
              Confirm the transaction
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return null;
};

export default DelayedResponse;
