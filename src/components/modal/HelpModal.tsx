import React from "react";
import { Modal, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsHelpModalOpen } from "../../store/general/generalSlice";

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
      <Modal
        title={
          <Typography.Title level={4}>
            How does Smoothie.fun work?
          </Typography.Title>
        }
        open={isHelpModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Typography.Text>
          Smoothie.fun is a streaming platform for crypto analysts. Verified
          analysts can create streams, analyse projects, and add a rating to
          each project. Users (watchers of the stream) can create “Coin
          Smoothies” or “Moonbags” or simply “portfolios” based on those
          analyses by using a simple prompt or a blink. Users can track the
          performance of the streamers and the Coin Smoothies they create on the
          Smoothie platform. Our goal is to a) simplify the creation of
          portfolios b) enable tracking of portfolios c) enable tracking the
          performance of analysts, and d) give tools to streamers to monetise
          their work. Unlike pump dot fun and its equivalents, our platform is
          not permissionless. We only allow streamers who have managed to grow
          an audience and are reputable KOLs or are recommended by reputable
          KOLs/builders as valuable voices in the space.
        </Typography.Text>
        <Typography.Title level={4}>Fees</Typography.Title>
        <Typography.Text>
          In the beta stage Smoothie takes a 5% commission from all
          transactions, and half of that (2.5%) goes to the streamers. For
          example: A KOL named “1000x Caller” does six streams during the week.
          Total Coin Smoothies created from streams (Smoothies can also be
          created during recordings, i.e. earning fees is not dependent on
          watchers of the live stream) amount to $150,000 during that particular
          week. The Streamer earns $150,000 x 0.025 = $3750 during that
          particular week (and continues to earn as people watch recordings and
          create smoothies). Additionally, the streamer earns Smoothie XP based
          on how many viewers they attract and the dollar value of the created
          Smoothies, and users earn XP with each transaction (creating
          Smoothies).
        </Typography.Text>
      </Modal>
    </>
  );
};

export default HelpModal;
