import React, { useEffect, useState } from "react";
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
import { useAppKitTheme } from "@reown/appkit/react";

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

type UserData = {
  referralCode?: string;
  referralCount?: number;
  rank?: number;
};

const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  const [hasJoinedWaitlist, setHasJoinedWaitlist] = useState(false);
  const [hasXAuthenticated, setHasXAuthenticated] = useState(false);
  const [hasFollowed, setHasFollowed] = useState(false);
  const [hasWalletConnected, setHasWalletConnected] = useState(false);
  const [hasReferralApplied, setHasReferralApplied] = useState(false);
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);

  const [userData, setUserData] = useState<UserData | null>(null);
  const [myReferralCode, setMyReferralCode] = useState("");
  const [successfulReferrals, setSuccessfulReferrals] = useState(0);
  const [rank, setRank] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const { setThemeMode } = useAppKitTheme();
  setThemeMode("dark");

  useEffect(() => {
    if (!isOpen) return;
    if (hasLoadedFromStorage) return;

    const localHasJoinedWaitlist = localStorage.getItem("hasJoinedWaitlist");
    const localHasXAuthenticated = localStorage.getItem("hasXAuthenticated");
    const localHasFollowed = localStorage.getItem("hasFollowed");
    const localHasWalletConnected = localStorage.getItem("hasWalletConnected");
    const localHasReferralApplied = localStorage.getItem("hasReferralApplied");

    if (localHasJoinedWaitlist === "true") setHasJoinedWaitlist(true);
    if (localHasXAuthenticated === "true") setHasXAuthenticated(true);
    if (localHasFollowed === "true") setHasFollowed(true);
    if (localHasWalletConnected === "true") setHasWalletConnected(true);
    if (localHasReferralApplied === "true") setHasReferralApplied(true);

    setHasLoadedFromStorage(true);

    if (localHasXAuthenticated === "true") {
      fetchUserData();
    }
  }, [isOpen, hasLoadedFromStorage]);

  useEffect(() => {
    if (!hasLoadedFromStorage) return;

    localStorage.setItem("hasJoinedWaitlist", hasJoinedWaitlist.toString());
    localStorage.setItem("hasXAuthenticated", hasXAuthenticated.toString());
    localStorage.setItem("hasFollowed", hasFollowed.toString());
    localStorage.setItem("hasWalletConnected", hasWalletConnected.toString());
    localStorage.setItem("hasReferralApplied", hasReferralApplied.toString());
  }, [
    hasLoadedFromStorage,
    hasJoinedWaitlist,
    hasXAuthenticated,
    hasFollowed,
    hasWalletConnected,
    hasReferralApplied,
  ]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log("fetchUserData => token =>", token);

      if (!token) {
        throw new Error("No accessToken in localStorage");
      }

      const res = await axios.get("https://smoothie.fun/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = res.data;
      console.log("fetchUserData => got user =>", user);

      setUserData(user);
      setMyReferralCode(user.referralCode || "");
      setSuccessfulReferrals(
        typeof user.referralCount === "number" ? user.referralCount : 0
      );
      setRank(typeof user.rank === "number" ? user.rank : null);
    } catch (err) {
      console.error("fetchUserData => error =>", err);
      message.error("Could not fetch user data");
    }
  };

  const handleJoinWaitlist = async () => {
    if (!email) {
      message.error("Please provide an email");
      return;
    }
    try {
      const res = await axios.post("https://smoothie.fun/api/join", { email });
      const user = res.data.user;
      setUserData(user);

      if (user.referralCode) {
        setMyReferralCode(user.referralCode);
      }
      setHasJoinedWaitlist(true);
      message.success("Email waitlist joined!");
    } catch (err) {
      console.error(err);
      message.error("Could not join waitlist");
    }
  };

  const handleSignInWithX = () => {
    window.location.href = "https://smoothie.fun/auth/twitter/start";
  };

  const handleFollowOnX = () => {
    window.open("https://x.com/smoothiedotfun", "_blank");
    axios.post(
      "https://smoothie.fun/api/follow",
      {},
      { withCredentials: true }
    );
    setHasFollowed(true);
    message.success("Thank you for following us on X!");
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
      const token = localStorage.getItem("accessToken");
      if (!token) {
        message.error("No JWT token found; please log in again.");
        return;
      }

      await axios.post(
        "https://smoothie.fun/api/referral",
        { referralCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #505050",
            borderRadius: 20,
          }}
        >
          <appkit-button />
        </div>
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
