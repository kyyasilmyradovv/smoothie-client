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
  Image,
} from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { styled } from "styled-components";
import logo from "../../assets/logo.png";

/**
 * Styled modal with round corners and padding
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

  // “Referral stats” sub‐modal & data
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [myReferralCode, setMyReferralCode] = useState("");
  const [successfulReferrals, setSuccessfulReferrals] = useState(0);
  const [rank, setRank] = useState<number | null>(null);

  // User inputs
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
      // Adjust to your own server route/port
      const res = await axios.get("http://localhost:4004/api/user", {
        withCredentials: true,
      });
      const user = res.data;
      setUserData(user);
      if (user.referralCode) setMyReferralCode(user.referralCode);
      if (typeof user.referralCount === "number") {
        setSuccessfulReferrals(user.referralCount);
      }
      if (typeof user.rank === "number") setRank(user.rank);
    } catch (err) {
      console.error(err);
      message.error("Could not fetch user data");
    }
  };

  /** 1) Insert email waitlist */
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

  /** 2) X Auth */
  const handleSignInWithX = () => {
    window.location.href = "http://localhost:4004/auth/twitter";
  };

  /** 3) Follow on X */
  const handleFollowOnX = () => {
    window.open("https://x.com/smoothiedotfun", "_blank");
    axios.post(
      "http://localhost:4004/api/follow",
      {},
      { withCredentials: true }
    );
    setHasFollowed(true);
    message.success("Thank you for following us on X!");
  };

  /** 4) Connect wallet */
  const handleConnectWallet = () => {
    // If you have an existing ConnectWalletModal or logic, open it here
    setHasWalletConnected(true);
    message.success("Wallet connected (simulated).");
  };

  /** 5) Enter referral code */
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
      fetchUserData(); // refresh stats
    } catch (err) {
      console.error(err);
      message.error("Invalid referral code or error applying it.");
    }
  };

  /** View referral stats in sub‐modal */
  const openReferralModal = () => {
    if (!hasXAuthenticated) {
      message.warning("You must authenticate with X first.");
      return;
    }
    if (!userData) fetchUserData();
    setIsReferralModalOpen(true);
  };
  const closeReferralModal = () => setIsReferralModalOpen(false);

  /** Tweet referral */
  const handleTweetReferral = () => {
    const tweetText = encodeURIComponent(
      `Check out Smoothie! My referral code is ${myReferralCode} #smoothiefun`
    );
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "_blank");
  };

  /** 6) Complete */
  const handleComplete = () => {
    onClose();
  };

  /**
   * Here's the key style object for a *rounded gradient border*:
   * We use a two-layer background:
   *   1) The first layer (padding-box) can be black, white, or transparent
   *   2) The second layer (border-box) is the gradient
   */
  const gradientButtonStyle: React.CSSProperties = {
    border: "2px solid transparent",
    borderRadius: "9999px",
    // This sets up two backgrounds:
    // 1. Solid or transparent for the inside,
    // 2. The gradient for the border area.
    background:
      "linear-gradient(#1D1D1D, #1D1D1D) padding-box," + // inside color
      "linear-gradient(91deg, #F09819, #FF512F) border-box",
    backgroundClip: "padding-box, border-box",
    color: "#FFFFFF",
    padding: "6px 16px",
    cursor: "pointer",
    width: 80,
  };

  /**
   * Helper to render each task row: a label, check if done, or an action button
   */
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
        alignItems: "stretch", // Ensures all columns are of equal height
      }}
    >
      <Col flex="auto">
        <div
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
            {title}
          </Typography.Text>
          {children && (
            <div style={{ marginTop: 8, flexGrow: 1 }}>{children}</div>
          )}
        </div>
      </Col>
      <Col
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end", // Pushes the button to the bottom of the column
          alignItems: "center", // Centers the button horizontally
        }}
      >
        {isDone ? (
          <CheckCircleFilled style={{ color: "#00C853", fontSize: 20 }} />
        ) : onAction ? (
          <Button
            onClick={onAction}
            disabled={disabled}
            style={gradientButtonStyle}
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
          <Image
            src={logo}
            preview={false}
            style={{
              width: "45px",
              height: "45px",
              marginBottom: 8,
            }}
          />
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
          title="2. Authenticate with X"
          isDone={hasXAuthenticated}
          onAction={handleSignInWithX}
          actionLabel="Sign in"
        />

        {/* Button to see referral stats, only if X Auth is done */}
        {hasXAuthenticated && (
          <Row style={{ marginBottom: 16, justifyContent: "flex-end" }}>
            <button style={gradientButtonStyle} onClick={openReferralModal}>
              View referral stats
            </button>
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
          size="large"
          style={{
            width: "100%",
            borderRadius: 9999,
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
            <strong>Referral Code: </strong>
            {myReferralCode || "N/A"}
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>Successful Referrals: </strong>
            {successfulReferrals}
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>Your Rank: </strong>
            {rank ?? "N/A"}
          </Typography.Paragraph>
        </div>
        <Row justify="center" style={{ marginBottom: 24 }}>
          <button
            style={{ ...gradientButtonStyle, marginRight: "0.5rem" }}
            onClick={handleTweetReferral}
          >
            Tweet referral
          </button>
          <button style={gradientButtonStyle} onClick={closeReferralModal}>
            Back to tasks
          </button>
        </Row>
      </StyledModal>
    </>
  );
};

export default JoinModal;
