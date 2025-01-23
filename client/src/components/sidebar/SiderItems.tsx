import { Image, MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import React from "react";
// import logo1 from "../../assets/Signal.svg";
import logo2 from "../../assets/Calendar.png";
import Wlogo2 from "../../assets/WCalendar.png";
import logo3 from "../../assets/type of icon=flag.png";
import Wlogo3 from "../../assets/Wtype of icon=flag.png";
import logo4 from "../../assets/type of icon=analyse.png";
import Wlogo4 from "../../assets/Wtype of icon=analyse.png";
import { useAppSelector } from "../../store/hooks";
import { HiOutlineSignal } from "react-icons/hi2";

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
      t("Live streams"),
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
            width: "20px",
            height: "20px",
          }}
        >
          <HiOutlineSignal style={{ fontSize: "20px" }} />
        </div>
      </div>
    ),
    getItem(
      t("Upcoming streams"),
      "/upcomingStreams",
      true,
      <div style={{ display: "flex", alignItems: " center" }}>
        <Image
          src={appCustomization.theme === "dark" ? logo2 : Wlogo2}
          preview={false}
          style={{ width: "20px", height: "20px" }}
        />
        {/* <CalendarIcon style={{ fontSize: "20px" }} /> */}
      </div>
    ),
    getItem(
      t("Finished Streams"),
      "/finishedStreams",
      true,
      <div style={{ display: "flex", alignItems: " center" }}>
        <Image
          src={appCustomization.theme === "dark" ? logo3 : Wlogo3}
          preview={false}
          style={{ width: "25px", height: "25px" }}
        />
      </div>
    ),
    getItem(
      t("Written Analysis"),
      "/writtenAnalysis",
      true,
      <div style={{ display: "flex", alignItems: " center" }}>
        <Image
          src={appCustomization.theme === "dark" ? logo4 : Wlogo4}
          preview={false}
          style={{ width: "25px", height: "25px" }}
        />
      </div>
    ),
  ];
};
export default SiderItems;
