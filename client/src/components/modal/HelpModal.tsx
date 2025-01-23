/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { Button, Carousel, Image, List, Modal, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsHelpModalOpen } from "../../store/general/generalSlice";
import styled from "styled-components";
import logo from "../../assets/Smoothie logo 1.png";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Paragraph, Text } = Typography;

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
  const carouselRef = useRef<any>(null); // Create a reference for the Carousel
  const [currentSlide, setCurrentSlide] = useState(0); // Track current slide index
  const totalSlides = 5; // Total number of slides (update if slides change)

  useEffect(() => {
    carouselRef.current?.goTo(0);
    setCurrentSlide(0);
  }, [isHelpModalOpen]);

  const handleNext = () => {
    carouselRef.current?.next(); // Call the `next` method
  };

  const handlePrev = () => {
    carouselRef.current?.prev(); // Call the `prev` method
  };

  const handleCancel = () => {
    dispatch(setIsHelpModalOpen(false));
  };

  const onCarouselChange = (current: number) => {
    setCurrentSlide(current); // Update the current slide index
  };

  return (
    <>
      <StyledModal
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              src={logo}
              preview={false}
              style={{
                width: "35px",
                height: "35px",
                marginRight: "7px",
              }}
            />
            <Typography.Title level={4}>
              "How does Smoothie.fun work?"
            </Typography.Title>
          </div>
        }
        styles={{
          body: {
            height: "auto",
            overflow: "auto",
            position: "relative",
            padding: "0 25px",
          },
          header: {
            paddingLeft: "25px",
          },
        }}
        centered
        width={500}
        open={isHelpModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Carousel
          ref={carouselRef}
          afterChange={onCarouselChange} // Track the current slide
          infinite={false}
          style={{ marginTop: "10px" }}
        >
          <div>
            <Typography.Text>
              <Text strong>DISCLAIMER:</Text> Nothing on Smoothie is financial
              advice. ALWAYS do your own research. Smoothie is a platform for
              crypto analyses, and we do not recommend to base ANY investment
              decisions based on the analyses done on Smoothie platform. Any
              opinions of analysts are solely their own opinions and DO NOT
              constitute financial advice.
            </Typography.Text>
          </div>
          <div>
            <Typography.Text>
              <Paragraph>
                <Text strong>Smoothie.fun</Text> is a streaming platform for
                crypto analysts. Verified analysts can do live streams, create
                written analyses, add a rating to each project, mark entries,
                and add target FDVs for exits.
              </Paragraph>
              <Paragraph>
                Users (watchers of the stream) can create “Coin Smoothies” or
                “Smoothfolios” based on those analyses by using Smoothie AI
                automating both entries and exits based on analyst targets.
              </Paragraph>
            </Typography.Text>
          </div>
          <div>
            <Typography.Text>
              <Paragraph>
                Users can track the performance of the streamers, both for
                specific analysis and overall performance.{" "}
              </Paragraph>
              <Paragraph>
                In addition, users can add thesis/comments and import the TLDR
                of the streamer analysis to each Smoothie they create and as a
                result have a better overview of the reasons why they created
                the particular Smoothie.
              </Paragraph>
              <Paragraph>
                Users will get notifications once the target FDVs are hit (set
                by the analyst) and can automate exits based on those targets.
              </Paragraph>
            </Typography.Text>
          </div>
          <div>
            <Text>To recap, our goal is to:</Text>
            <List
              style={{ marginTop: "10px" }}
              split={false}
              dataSource={[
                "a) simplify the creation of portfolios",
                "b) simplify tracking specific portfolios",
                "c) enable adding context to investment decisions",
                "d) simplify exiting from positions",
                "e) enable tracking the performance of analysts, and",
                "f) give tools to analysts to monetise their work.",
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
        <div
          style={{
            // position: "absolute",
            top: "40%",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            disabled={!(currentSlide > 0)}
            type="primary"
            onClick={handlePrev}
            icon={<LeftOutlined />}
          />
          {/* Hide "Next" button on the last slide */}

          <Button
            disabled={!(currentSlide < totalSlides - 1)}
            type="primary"
            onClick={handleNext}
            icon={<RightOutlined />}
          />
        </div>
      </StyledModal>
    </>
  );
};

export default HelpModal;
