import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Input,
  Typography,
  Divider,
  message,
  Row,
  Col,
} from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { styled } from "styled-components";

/**
 * Example of styling your modal similarly to "AddSmothieModal"
 * (rounded corners, padding, etc.)
 */
const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    padding: 24px;
  }
`;

type JoinModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  // Track “which tasks are done?”
  const [hasJoinedWaitlist, setHasJoinedWaitlist] = useState(false);
  const [hasXAuthenticated, setHasXAuthenticated] = useState(false);
  const [hasFollowed, setHasFollowed] = useState(false);
  const [hasWalletConnected, setHasWalletConnected] = useState(false);
  const [hasReferralApplied, setHasReferralApplied] = useState(false);

  // For the “referral stats”:
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null); // the DB record
  const [myReferralCode, setMyReferralCode] = useState("");
  const [successfulReferrals, setSuccessfulReferrals] = useState(0);
  const [rank, setRank] = useState<number | null>(null);

  // For user input of email and referral code
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    // If we detect ?loggedIn=true, user has come back from X
    const queryParams = new URLSearchParams(window.location.search);
    const loggedIn = queryParams.get("loggedIn");
    if (loggedIn) {
      setHasXAuthenticated(true);
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      // Adjust to your actual server port/URL
      const res = await axios.get("http://localhost:4004/api/user", {
        withCredentials: true,
      });
      const user = res.data;
      setUserData(user);
      if (user.referralCode) setMyReferralCode(user.referralCode);
      if (typeof user.referralCount === "number")
        setSuccessfulReferrals(user.referralCount);
      if (typeof user.rank === "number") setRank(user.rank);
    } catch (err) {
      console.error(err);
      message.error("Could not fetch user data");
    }
  };

  // 1) Insert email waitlist
  const handleJoinWaitlist = async () => {
    if (!email) {
      message.error("Please provide an email");
      return;
    }
    try {
      const res = await axios.post("http://localhost:4004/api/join", { email });
      const user = res.data.user;
      setUserData(user);
      if (user.referralCode) setMyReferralCode(user.referralCode);
      setHasJoinedWaitlist(true);
      message.success("Email waitlist joined!");
    } catch (err) {
      console.error(err);
      message.error("Could not join waitlist");
    }
  };

  // 2) X Auth
  const handleSignInWithX = () => {
    // Trigger your server route for Twitter OAuth
    window.location.href = "http://localhost:4004/auth/twitter";
  };

  // 3) Follow on X
  const handleFollowOnX = () => {
    window.open("https://x.com/smoothiedotfun", "_blank");
    // Optionally notify server
    axios.post(
      "http://localhost:4004/api/follow",
      {},
      { withCredentials: true }
    );
    setHasFollowed(true);
    message.success("Thank you for following us on X!");
  };

  // 4) Connect wallet
  const handleConnectWallet = () => {
    // If you have an existing ConnectWalletModal or logic, you can trigger it
    // For demonstration we just mark it done
    setHasWalletConnected(true);
    message.success("Wallet connected (simulated).");
  };

  // 5) Enter referral code
  const handleApplyReferral = async () => {
    if (!referralCode) {
      message.error("Please enter a referral code");
      return;
    }
    try {
      await axios.post(
        "http://localhost:4004/api/referral",
        { referralCode },
        { withCredentials: true }
      );
      setHasReferralApplied(true);
      message.success("Referral code applied!");
      // Possibly refetch to see updated referral counts
      fetchUserData();
    } catch (err) {
      console.error(err);
      message.error("Invalid referral code or error applying it.");
    }
  };

  // “View referral stats” – open a second sub‐modal
  const openReferralModal = () => {
    if (!hasXAuthenticated) {
      message.warning("You must authenticate with X first.");
      return;
    }
    // If we don’t yet have user data, fetch it
    if (!userData) fetchUserData();
    setIsReferralModalOpen(true);
  };

  const closeReferralModal = () => {
    setIsReferralModalOpen(false);
  };

  // “Tweet referral”
  const handleTweetReferral = () => {
    const tweetText = encodeURIComponent(
      `Check out Smoothie! My referral code is ${myReferralCode} #smoothiefun`
    );
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "_blank");
  };

  // 6) Complete
  const handleComplete = () => {
    // If you only want to allow "complete" if all tasks are done, check here:
    // const allDone = hasJoinedWaitlist && hasXAuthenticated && hasFollowed && hasWalletConnected && hasReferralApplied;
    // If you want to enforce that, you can conditionally allow them to close.
    onClose();
  };

  // Helper to render a row with a label, whether it’s done, and an action button if not done
  const TaskRow = ({
    title,
    isDone,
    onAction,
    actionLabel,
    children,
    disabled,
  }: {
    title: string;
    isDone: boolean;
    onAction?: () => void;
    actionLabel?: string;
    children?: React.ReactNode;
    disabled?: boolean;
  }) => (
    <Row
      gutter={12}
      style={{
        marginBottom: 16,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Col flex="auto">
        <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
          {title}
        </Typography.Text>
        {children ? <div style={{ marginTop: 8 }}>{children}</div> : null}
      </Col>
      <Col>
        {isDone ? (
          <CheckCircleFilled style={{ color: "#00C853", fontSize: 20 }} />
        ) : onAction ? (
          <Button
            type="primary"
            onClick={onAction}
            disabled={disabled}
            style={{ borderRadius: 8 }}
          >
            {actionLabel || "Do it"}
          </Button>
        ) : null}
      </Col>
    </Row>
  );

  return (
    <>
      {/* MAIN “JOIN” MODAL */}
      <StyledModal
        visible={isOpen}
        onCancel={onClose}
        footer={null}
        width={500}
        centered
      >
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <Typography.Title level={3}>Join Smoothie</Typography.Title>
          <Typography.Text>
            Complete the tasks below to join our waitlist & referral program.
          </Typography.Text>
        </div>
        <Divider />

        {/* Task 1: Join waitlist */}
        <TaskRow
          title="1. Join waitlist with your email"
          isDone={hasJoinedWaitlist}
          onAction={handleJoinWaitlist}
          actionLabel="Join"
        >
          {!hasJoinedWaitlist && (
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ maxWidth: 300 }}
            />
          )}
        </TaskRow>

        {/* Task 2: X Auth */}
        <TaskRow
          title="2. Authenticate with X (Twitter)"
          isDone={hasXAuthenticated}
          onAction={handleSignInWithX}
          actionLabel="Sign in"
        />

        {/* Button to see referral stats, only if X Auth is done */}
        {hasXAuthenticated && (
          <Row style={{ marginBottom: 16, justifyContent: "flex-end" }}>
            <Button style={{ borderRadius: 8 }} onClick={openReferralModal}>
              View referral stats
            </Button>
          </Row>
        )}

        {/* Task 3: Follow on X */}
        <TaskRow
          title="3. Follow @smoothiedotfun on X"
          isDone={hasFollowed}
          onAction={handleFollowOnX}
          actionLabel="Follow"
        />

        {/* Task 4: Connect wallet */}
        <TaskRow
          title="4. Connect your wallet"
          isDone={hasWalletConnected}
          onAction={handleConnectWallet}
          actionLabel="Connect"
        />

        {/* Task 5: Enter referral code (optional) */}
        <TaskRow
          title="5. Enter a friend's referral code"
          isDone={hasReferralApplied}
          onAction={handleApplyReferral}
          actionLabel="Apply"
        >
          {!hasReferralApplied && (
            <Input
              placeholder="Referral code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              style={{ maxWidth: 200 }}
            />
          )}
        </TaskRow>

        <Divider />
        {/* Task 6: Complete (close) */}
        <Button
          type="primary"
          size="large"
          style={{
            width: "100%",
            borderRadius: 8,
            background: "linear-gradient(91deg, #F09819 0.44%, #FF512F 99.74%)",
            color: "#FFFFFF",
          }}
          onClick={handleComplete}
        >
          Complete
        </Button>
      </StyledModal>

      {/* “REFERRAL STATS” SUB‐MODAL */}
      <StyledModal
        visible={isReferralModalOpen}
        onCancel={closeReferralModal}
        footer={null}
        width={500}
        centered
      >
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <Typography.Title level={3}>Your Referral Info</Typography.Title>
        </div>
        <Divider />
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <Typography.Paragraph>
            <strong>Referral Code: </strong> {myReferralCode || "N/A"}
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>Successful Referrals: </strong> {successfulReferrals}
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>Your Rank: </strong> {rank ?? "N/A"}
          </Typography.Paragraph>
        </div>
        <Row justify="center" style={{ marginBottom: 24 }}>
          <Button
            style={{
              marginRight: "0.5rem",
              borderRadius: 8,
            }}
            onClick={handleTweetReferral}
          >
            Tweet referral
          </Button>
          <Button
            style={{
              borderRadius: 8,
            }}
            onClick={closeReferralModal}
          >
            Back to tasks
          </Button>
        </Row>
      </StyledModal>
    </>
  );
};

export default JoinModal;
