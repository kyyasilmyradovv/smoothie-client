import React from "react";
import { List, Modal, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsHelpModalOpen } from "../../store/general/generalSlice";
import styled from "styled-components";
const { Title, Paragraph, Text } = Typography;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
  }
`;
const HelpModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isHelpModalOpen = useAppSelector(
    (state) => state.general.isHelpModalOpen
  );

  const handleCancel = () => {
    dispatch(setIsHelpModalOpen(false));
  };

  return (
    <>
      <StyledModal
        styles={{
          body: {
            // height: "530px",
            overflow: "auto",
            padding: "20px",
          },
        }}
        width={800}
        open={isHelpModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Typography>
          <Title style={{ marginBottom: "10px" }} level={4}>
            How does Smoothie.fun work?
          </Title>

          <Paragraph>
            <Text strong>Smoothie.fun</Text> is a streaming platform for crypto
            analysts.
          </Paragraph>

          <Paragraph>
            Verified analysts can create streams, analyse projects, and add a
            rating to each project.
          </Paragraph>

          <Paragraph>
            Users (watchers of the stream) can create “Coin Smoothies” or
            “Moonbags” or simply “portfolios” based on those analyses by using a
            simple prompt.
          </Paragraph>

          <Paragraph>
            Users can track the performance of the streamers and the Coin
            Smoothies they create on the Smoothie platform.<br></br>
            <Text underline>
              In addition, users can add thesis to each Smoothie they create and
              as a result, create a trading/investing journal to review reasons
              they made a particular decision and import AI-created TLDR for
              each token analysis done by the streamer to the journal.
            </Text>
          </Paragraph>

          <Text>Our goal is to:</Text>
          <List
            style={{ marginTop: "10px" }}
            split={false}
            dataSource={[
              "a) simplify the creation of portfolios",
              "b) simplify tracking specific portfolios",
              "c) enable tracking the performance of analysts, and",
              "d) give tools to streamers to monetise their work. ",
            ]}
            renderItem={(item) => (
              <List.Item style={{ padding: "0" }}>
                <Text> {item}</Text>
              </List.Item>
            )}
          />

          <Paragraph style={{ marginTop: "10px" }}>
            Unlike <Text strong>pump dot fun</Text> its equivalents, our
            platform is not permissionless. We only allow streamers who have
            managed to grow an audience and are reputable KOLs or are
            recommended by reputable KOLs/builders as valuable voices in the
            space.
          </Paragraph>

          <Paragraph>
            Smoothie takes a commission from all transactions, and half of that
            goes to the streamers.
          </Paragraph>

          <Paragraph>
            Additionally, the streamer earns Smoothie XP based on the dollar
            value of the created Smoothies, and users earn XP with each
            transaction (creating Smoothies).
          </Paragraph>
        </Typography>
      </StyledModal>
    </>
  );
};

export default HelpModal;
