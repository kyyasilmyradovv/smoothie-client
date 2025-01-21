import React from "react";
import { Carousel, Grid, List, Modal, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsHelpModalOpen } from "../../store/general/generalSlice";
import styled from "styled-components";
const { Paragraph, Text } = Typography;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
  }
  .ant-modal-title {
    padding-left: 20px;
  }
`;
const { useBreakpoint } = Grid;
const HelpModal: React.FC = () => {
  const screens = useBreakpoint();
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
        title="How does Smoothie.fun work?"
        styles={{
          body: {
            height: screens.lg ? "undefined" : "530px",
            overflow: "auto",
            // padding: "20px",
          },
        }}
        centered
        width={800}
        open={isHelpModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Carousel arrows infinite={false}>
          <div style={{ padding: "20px" }}>
            <Typography.Text>
              Nothing on Smoothie is a financial advice. Smoothie is a platform
              for crypto analysis, and we do not recommend to base ANY
              investment decisions based on the analysis on Smoothie.
            </Typography.Text>
          </div>
          <div>
            <Typography.Text>
              <Paragraph>
                <Text strong>Smoothie.fun</Text> is a streaming platform for
                crypto analysts.
              </Paragraph>{" "}
              <Paragraph>
                Verified analysts can create streams, analyse projects, and add
                a rating to each project.
              </Paragraph>{" "}
              <Paragraph>
                Users (watchers of the stream) can create “Coin Smoothies” or
                “Moonbags” or simply “portfolios” based on those analyses by
                using a simple prompt.
              </Paragraph>{" "}
              <Paragraph>
                Users can track the performance of the streamers and the Coin
                Smoothies they create on the Smoothie platform.<br></br>
                <Text>
                  In addition, users can add thesis/comments and import the TLDR
                  of the streamer analysis to each Smoothie they create and as a
                  result have a better overview of the reasons why they created
                  the particular Smoothie.
                  <br></br> <br></br>Users will get notifications once the
                  target FDVs are hit (set by the analyst) and can automate
                  exits based on those targets.
                </Text>
              </Paragraph>
            </Typography.Text>
          </div>
          <div>
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
          </div>
          <div>
            <Paragraph style={{ marginTop: "10px" }}>
              Smoothie is not permissionless for all analysts. We only allow
              analysts/streamers who have managed to grow an audience and are
              reputable KOLs or are recommended by reputable KOLs/builders as
              valuable voices in the space.
            </Paragraph>

            <Paragraph>
              Smoothie takes a commission from all transactions, and half of
              that goes to the analysts.
            </Paragraph>

            <Paragraph>
              Additionally, the streamer earns Smoothie XP based on the dollar
              value of the created Smoothies, and users earn XP with each
              transaction (creating Smoothies).
            </Paragraph>
          </div>
        </Carousel>
      </StyledModal>
    </>
  );
};

export default HelpModal;
