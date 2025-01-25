// client/src/components/modal/JoinModal.tsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Input,
  Typography,
  Divider,
  message,
  Image,
} from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { styled } from "styled-components";
import logo from "../../assets/logo.png";

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
  // 1) Task states
  const [hasJoinedWaitlist, setHasJoinedWaitlist] = useState(false);
  const [hasXAuthenticated, setHasXAuthenticated] = useState(false);
  const [hasFollowed, setHasFollowed] = useState(false);
  const [hasWalletConnected, setHasWalletConnected] = useState(false);
  const [hasReferralApplied, setHasReferralApplied] = useState(false);

  // 2) App data from user
  const [userData, setUserData] = useState<any>(null);
  const [myReferralCode, setMyReferralCode] = useState("");
  const [successfulReferrals, setSuccessfulReferrals] = useState(0);
  const [rank, setRank] = useState<number | null>(null);

  // 3) Input fields
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    // A) Load tasks from localStorage
    const localHasJoinedWaitlist = localStorage.getItem("hasJoinedWaitlist");
    if (localHasJoinedWaitlist === "true") setHasJoinedWaitlist(true);

    const localHasXAuthenticated = localStorage.getItem("hasXAuthenticated");
    if (localHasXAuthenticated === "true") setHasXAuthenticated(true);

    const localHasFollowed = localStorage.getItem("hasFollowed");
    if (localHasFollowed === "true") setHasFollowed(true);

    const localHasWalletConnected = localStorage.getItem("hasWalletConnected");
    if (localHasWalletConnected === "true") setHasWalletConnected(true);

    const localHasReferralApplied = localStorage.getItem("hasReferralApplied");
    if (localHasReferralApplied === "true") setHasReferralApplied(true);

    // B) If hasXAuthenticated is true, we can fetch user data
    if (localHasXAuthenticated === "true") {
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    // Save tasks changes to localStorage
    localStorage.setItem("hasJoinedWaitlist", hasJoinedWaitlist.toString());
    localStorage.setItem("hasXAuthenticated", hasXAuthenticated.toString());
    localStorage.setItem("hasFollowed", hasFollowed.toString());
    localStorage.setItem("hasWalletConnected", hasWalletConnected.toString());
    localStorage.setItem("hasReferralApplied", hasReferralApplied.toString());
  }, [
    hasJoinedWaitlist,
    hasXAuthenticated,
    hasFollowed,
    hasWalletConnected,
    hasReferralApplied,
  ]);

  // fetch user data from the server (session-based)
  const fetchUserData = async () => {
    try {
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

  // Task Handlers
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

  const handleSignInWithX = () => {
    // Start Twitter OAuth flow
    window.location.href = "http://localhost:4004/auth/twitter/start";
  };

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

  const handleConnectWallet = () => {
    setHasWalletConnected(true);
    message.success("Wallet connected (simulated).");
  };

  const handleApplyReferral = async () => {
    if (!hasXAuthenticated) {
      message.error("Please sign in with X first!");
      return;
    }
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
      fetchUserData();
    } catch (err) {
      console.error(err);
      message.error("Invalid referral code or error applying it.");
    }
  };

  const handleTweetReferral = () => {
    const tweetText = encodeURIComponent(
      `Check out Smoothie! My referral code is ${myReferralCode} #smoothiefun`
    );
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "_blank");
  };

  const handleComplete = () => {
    onClose();
  };

  // Helper to show a check mark or the button
  function InlineAction({
    done,
    children,
  }: {
    done: boolean;
    children: React.ReactNode;
  }) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {done ? (
          <CheckCircleFilled style={{ color: "#00C853", fontSize: 20 }} />
        ) : (
          children
        )}
      </div>
    );
  }

  // Rendering tasks
  const gradientButtonStyle: React.CSSProperties = {
    border: "2px solid transparent",
    borderRadius: "9999px",
    background:
      "linear-gradient(#1D1D1D, #1D1D1D) padding-box," +
      "linear-gradient(91deg, #F09819, #FF512F) border-box",
    backgroundClip: "padding-box, border-box",
    color: "#FFFFFF",
    padding: "6px 16px",
    cursor: "pointer",
    width: 90,
  };

  const gradientButtonStyleLarge: React.CSSProperties = {
    ...gradientButtonStyle,
    marginTop: 8,
    width: 200,
  };

  const renderWaitlistTask = () => (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
          1. Join waitlist with your email
        </Typography.Text>
        <InlineAction done={hasJoinedWaitlist}>
          <Button onClick={handleJoinWaitlist} style={gradientButtonStyle}>
            Join
          </Button>
        </InlineAction>
      </div>
      {!hasJoinedWaitlist && (
        <div style={{ marginTop: 8 }}>
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ maxWidth: 300 }}
          />
        </div>
      )}
    </div>
  );

  const renderXAuthTask = () => (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
          2. Authenticate with X
        </Typography.Text>
        <InlineAction done={hasXAuthenticated}>
          <Button onClick={handleSignInWithX} style={gradientButtonStyle}>
            Sign in
          </Button>
        </InlineAction>
      </div>

      {hasXAuthenticated && (
        <div
          style={{
            marginTop: 8,
            border: "1px solid #505050",
            borderRadius: 8,
            padding: 12,
          }}
        >
          <Typography.Text style={{ display: "block", fontWeight: 500 }}>
            Referral Code: {myReferralCode || "N/A"}
          </Typography.Text>
          <Typography.Text style={{ display: "block", fontWeight: 500 }}>
            Successful Referrals: {successfulReferrals}
          </Typography.Text>
          <Typography.Text style={{ display: "block", fontWeight: 500 }}>
            Your Rank: {rank ?? "N/A"}
          </Typography.Text>
          <Button
            onClick={handleTweetReferral}
            style={gradientButtonStyleLarge}
          >
            Tweet your referral
          </Button>
        </div>
      )}
    </div>
  );

  const renderFollowTask = () => (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
          3. Follow @smoothiedotfun on X
        </Typography.Text>
        <InlineAction done={hasFollowed}>
          <Button onClick={handleFollowOnX} style={gradientButtonStyle}>
            Follow
          </Button>
        </InlineAction>
      </div>
    </div>
  );

  const renderWalletTask = () => (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
          4. Connect your wallet
        </Typography.Text>
        <InlineAction done={hasWalletConnected}>
          <Button onClick={handleConnectWallet} style={gradientButtonStyle}>
            Connect
          </Button>
        </InlineAction>
      </div>
    </div>
  );

  const renderReferralTask = () => (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
          5. Enter a friend's referral code
        </Typography.Text>
        <InlineAction done={hasReferralApplied}>
          <Button onClick={handleApplyReferral} style={gradientButtonStyle}>
            Apply
          </Button>
        </InlineAction>
      </div>

      {!hasReferralApplied && (
        <div style={{ marginTop: 8 }}>
          <Input
            placeholder="Referral code"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            style={{ maxWidth: 200 }}
          />
        </div>
      )}
    </div>
  );

  return (
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
          style={{ width: "45px", height: "45px", marginBottom: 8 }}
        />
        <Typography.Title level={3}>Join Smoothie</Typography.Title>
        <Typography.Text>
          Complete the tasks below to join our waitlist & referral program.
        </Typography.Text>
      </div>

      <Divider />
      {renderWaitlistTask()}
      {renderXAuthTask()}
      {renderFollowTask()}
      {renderWalletTask()}
      {renderReferralTask()}
      <Divider />

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
  );
};

export default JoinModal;
