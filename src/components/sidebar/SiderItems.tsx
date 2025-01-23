import { Image, MenuProps, Tooltip, Typography } from "antd";
import { useTranslation } from "react-i18next";
import React from "react";
// import logo1 from "../../assets/Signal.svg";
// import logo2 from "../../assets/Calendar.png";
// import Wlogo2 from "../../assets/WCalendar.png";
// import logo3 from "../../assets/type of icon=flag.png";
// import Wlogo3 from "../../assets/Wtype of icon=flag.png";
import logo4 from "../../assets/type of icon=analyse.png";
import Wlogo4 from "../../assets/Wtype of icon=analyse.png";
import { useAppSelector } from "../../store/hooks";
import { HiOutlineSignal } from "react-icons/hi2";
import { QuestionCircleOutlined, RobotOutlined } from "@ant-design/icons";
import logo from "../../assets/Smoothie logo 1.png";
// import CalendarIcon from "../../icons/CalendarIcon";

export type MenuItem = Required<MenuProps>["items"][number];

const SiderItems: () => MenuItem[] = () => {
  const { t } = useTranslation();
  const appCustomization = useAppSelector(
    (state) => state.general.appCustomization
  );

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    visible?: boolean,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    if (visible) {
      return {
        key,
        icon,
        children,
        // label,
        label,
      } as MenuItem;
    } else {
      return null;
    }
  }

  return [
    getItem(
      t("Watch Streams"),
      "/",
      true,
      <div style={{ display: "flex", alignItems: " center" }}>
        {/* <Image
          src={logo1}
          preview={false}
          style={{ width: "20px", height: "20px" }}
        /> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "25px",
            height: "20px",
          }}
        >
          <HiOutlineSignal style={{ fontSize: "20px" }} />
        </div>
      </div>
    ),
    // getItem(
    //   t("Upcoming streams"),
    //   "/upcomingStreams",
    //   true,
    //   <div style={{ display: "flex", alignItems: " center" }}>
    //     <Image
    //       src={appCustomization.theme === "dark" ? logo2 : Wlogo2}
    //       preview={false}
    //       style={{ width: "20px", height: "20px" }}
    //     />
    //     {/* <CalendarIcon style={{ fontSize: "20px" }} /> */}
    //   </div>
    // ),
    // getItem(
    //   t("Finished Streams"),
    //   "/finishedStreams",
    //   true,
    //   <div style={{ display: "flex", alignItems: " center" }}>
    //     <Image
    //       src={appCustomization.theme === "dark" ? logo3 : Wlogo3}
    //       preview={false}
    //       style={{ width: "25px", height: "25px" }}
    //     />
    //   </div>
    // ),
    getItem(
      <Tooltip
        styles={{
          body: {
            width: "200px",
            background: appCustomization.theme === "dark" ? "#010118" : "#FFF",
            color: "black",
            padding: "10px",
          },
        }}
        placement="left"
        title={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              src={logo}
              preview={false}
              style={{
                width: "35px",
                height: "35px",
                marginRight: "10px",
              }}
            />
            <br></br>
            <Typography.Text
              style={{
                color: appCustomization.theme === "dark" ? "#FFFFFF" : "black",
                textAlign: "center",
              }}
            >
              Written analyses follow the same structure as streams: ratings,
              entry and exit targets and performance tracking. Analysts earn
              commission from created Smoothies.
            </Typography.Text>
          </div>
        }
      >
        <Typography.Text
        // style={{ color: !isSidebarOpen ? "#FFFFFF" : undefined }}
        >
          {t("Written Analyses")}
        </Typography.Text>
        <QuestionCircleOutlined
          style={{ fontSize: "12px", marginLeft: "3px" }}
        />
      </Tooltip>,
      "/writtenAnalyses",
      true,
      <div style={{ display: "flex", alignItems: " center" }}>
        <Image
          src={appCustomization.theme === "dark" ? logo4 : Wlogo4}
          preview={false}
          style={{ width: "25px", height: "25px" }}
        />
      </div>
    ),
    getItem(
      <Tooltip
        styles={{
          body: {
            width: "200px",
            background: appCustomization.theme === "dark" ? "#010118" : "#FFF",
            color: appCustomization.theme === "dark" ? "#FFFFFF" : "black",
            padding: "10px",
          },
        }}
        placement="left"
        title={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              src={logo}
              preview={false}
              style={{
                width: "35px",
                height: "35px",
                marginRight: "10px",
              }}
            />
            <br></br>
            <Typography.Text
              style={{
                color: appCustomization.theme === "dark" ? "#FFFFFF" : "black",
                textAlign: "center",
              }}
            >
              Developers can add their alpha AI Agents to the platform to
              publish calls and earn the commission from created Smoothies
              similarly to human analysts.
            </Typography.Text>
          </div>
        }
      >
        <Typography.Text
        // style={{ color: !isSidebarOpen ? "#FFFFFF" : undefined }}
        >
          {t("AI Agent Calls")}
        </Typography.Text>
        <QuestionCircleOutlined
          style={{ fontSize: "12px", marginLeft: "3px" }}
        />
      </Tooltip>,
      "/AIAgentCalls",
      true,
      <div style={{ display: "flex", alignItems: " center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "25px",
            height: "20px",
          }}
        >
          <RobotOutlined style={{ fontSize: "20px" }} />
        </div>
      </div>
    ),
  ];
};
export default SiderItems;
