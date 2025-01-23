import {
  Avatar,
  Button,
  Divider,
  Grid,
  Image,
  Input,
  // Switch,
  Typography,
} from "antd";
import ISearch from "../../assets/Magnifier.png";
import WISearch from "../../assets/WMagnifier.png";
// import IAvatar from "../../assets/a cute minimalistic simple hedgehog side profile C (1).png";
// import IBell from "../../assets/Bell.png";
// import IWorld from "../../assets/World.png";

import HelpModal from "../modal/HelpModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  // setAppCustomization,
  setIsConnectWalletModalOpen,
  setIsHelpModalOpen,
  setIsSidebarOpen,
} from "../../store/general/generalSlice";
import ConnectWalletModal from "../modal/ConnectWalletModal";
import {
  BarsOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  // MoonOutlined,
  // SunOutlined,
} from "@ant-design/icons";
// import { EThemeEnum, TThemePropsType } from "../../types/themePropsType";
import Switch from "../Switch";
// import { ExclamationCircleFilled } from "@ant-design/icons";
// import { DownOutlined } from "@ant-design/icons";
const { useBreakpoint } = Grid;
const Navbar = () => {
  const dispatch = useAppDispatch();
  const appCustomization = useAppSelector(
    (state) => state.general.appCustomization
  );
  const userMail = useAppSelector((state) => state.general.userMail);
  const screens = useBreakpoint();

  return (
    <div>
      <div
        style={{
          background:
            appCustomization.theme === "dark" ? "rgb(19 19 19)" : "#FFFFFF",
          borderRadius: "16px",
          height: "60px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 16px",
        }}
      >
        {screens.lg ? (
          <Input
            size="small"
            placeholder="Search here..."
            prefix={
              <Image
                src={appCustomization.theme === "dark" ? ISearch : WISearch}
                preview={false}
                style={{ width: "20px", height: "20px", marginRight: "16px" }}
              />
            }
            style={{
              borderRadius: "45px",
              width: "400px",
              padding: "7px 25px",
              border: "0.5px solid #B1B1B1",
              background: "inherit",
            }}
          />
        ) : (
          <Button
            onClick={() => {
              dispatch(setIsSidebarOpen(true));
            }}
            style={{ marginRight: "12px" }}
            type="text"
            icon={<BarsOutlined style={{ fontSize: "22px" }} />}
          />
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {screens.lg && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={() => {
                  const url = `https://fr9lr27d5om.typeform.com/to/ABFoOUOp`;
                  window.open(url, "_blank");
                }}
                type="text"
                style={{
                  // marginRight: "12px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                }}
                // icon={}
              >
                <Typography.Text
                  style={{ fontWeight: "500", lineHeight: "18px" }}
                >
                  Become an analyst
                </Typography.Text>
              </Button>
              <Divider type="vertical" style={{ margin: "0 5px" }} />
            </div>
          )}

          {screens.lg && (
            <Button
              type="text"
              style={{
                marginRight: "12px",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => {
                dispatch(setIsHelpModalOpen(true));
              }}
            >
              <Typography.Text
                style={{ fontWeight: "500", lineHeight: "18px" }}
              >
                How it works
              </Typography.Text>
              <QuestionCircleOutlined />
              {/* <ExclamationCircleFilled style={{ fontSize: "14px" }} /> */}
            </Button>
          )}

          {!screens.lg && (
            <Button
              style={{ marginRight: "12px" }}
              type="text"
              icon={
                <Image
                  src={appCustomization.theme === "dark" ? ISearch : WISearch}
                  preview={false}
                  style={{ width: "20px", height: "20px" }}
                />
              }
            />
          )}

          <BellOutlined
            style={{
              fontSize: "18px",
              marginRight: "12px",
              color: appCustomization.theme === "dark" ? "#FFFFFF" : "black",
            }}
          />
          <div style={{ marginRight: "12px" }}>
            <Switch />
          </div>

          {localStorage.getItem("userMail") === null ||
          localStorage.getItem("userMail") === undefined ? (
            <Button
              size="large"
              style={{
                borderRadius: "16px",
                background:
                  "linear-gradient(0deg, #f00 -52.7%, #f5af19 191.82%)",
                color: "#FFFFFF",
              }}
              onClick={() => {
                dispatch(setIsConnectWalletModalOpen(true));
              }}
            >
              Connect wallet
            </Button>
          ) : (
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Divider type="vertical" style={{ margin: "0 5px 0 0" }} />
              <Avatar size={35} icon={<UserOutlined />} />
              <Typography.Text
                ellipsis={{ tooltip: localStorage.getItem("userMail") }}
                style={{
                  fontWeight: "500",
                  lineHeight: "18px",
                  width: "100px",
                }}
              >
                {userMail}
              </Typography.Text>
            </div>
          )}

          {/* <div
          style={{
            borderRadius: "45px",
            background: "#323232",
            padding: "5px 10px 5px 5px",
          }}
        >
          <Avatar size={35} shape="circle" src={IAvatar} />
          <DownOutlined style={{ color: "#FFFFFF", marginLeft: "15px" }} />
        </div> */}
        </div>
      </div>
      <HelpModal />
      <ConnectWalletModal />
    </div>
  );
};

export default Navbar;
