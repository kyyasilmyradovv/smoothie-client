import { Image, MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import React from "react";
import logo1 from "../../assets/Signal.svg";
import logo2 from "../../assets/Calendar.png";
import logo3 from "../../assets/type of icon=flag.png";
import logo4 from "../../assets/type of icon=analyse.png";

export type MenuItem = Required<MenuProps>["items"][number];

const SiderItems: () => MenuItem[] = () => {
  const { t } = useTranslation();

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
      t("Live streams"),
      "/",
      true,
      <div style={{ display: "flex", alignItems: " center" }}>
        <Image
          src={logo1}
          preview={false}
          style={{ width: "20px", height: "20px" }}
        />
      </div>
    ),
    getItem(
      t("Upcoming streams"),
      "/upcomingStreams",
      true,
      <div style={{ display: "flex", alignItems: " center" }}>
        <Image
          src={logo2}
          preview={false}
          style={{ width: "20px", height: "20px" }}
        />
      </div>
    ),
    getItem(
      t("Finished Streams"),
      "/finishedStreams",
      true,
      <div style={{ display: "flex", alignItems: " center" }}>
        <Image
          src={logo3}
          preview={false}
          style={{ width: "20px", height: "20px" }}
        />
      </div>
    ),
    getItem(
      t("Written Analysis"),
      "/writtenAnalysis",
      true,
      <div style={{ display: "flex", alignItems: " center" }}>
        <Image
          src={logo4}
          preview={false}
          style={{ width: "20px", height: "20px" }}
        />
      </div>
    ),
  ];
};
export default SiderItems;
