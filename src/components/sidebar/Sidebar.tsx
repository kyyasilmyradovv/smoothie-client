/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
//packages
import React from "react";
// import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Drawer,
  Grid,
  Image,
  Menu,
  Typography,
} from "antd";
import Sider from "antd/es/layout/Sider";
//hooks
import { useAppDispatch, useAppSelector } from "../../store/hooks";

//components
import SiderItems from "./SiderItems";
import {
  setIsHelpModalOpen,
  setIsSidebarOpen,
} from "../../store/general/generalSlice";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ExclamationCircleOutlined,
  LikeOutlined,
  RightOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import logo from "../../assets/smoothie logo (1).png";
import log1 from "../../assets/portfolio 1 (1).png";
// import log3 from "../../assets/video-camera 1.png";
// import log4 from "../../assets/likes 1.png";
import log5 from "../../assets/follow (2) 1.png";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledDrawer = styled(Drawer)`
  & .ant-drawer-body {
    padding: 0 10px;
    position: relative;
  }
`;
export const activeMode = () => {
  return location.pathname.split("/").splice(0, 3).join("/");
};
const { useBreakpoint } = Grid;
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const appCustomization = useAppSelector(
    (state) => state.general.appCustomization
  );
  const screens = useBreakpoint();
  const isSidebarOpen = useAppSelector((state) => state.general.isSidebarOpen);
  const menuSection = () => {
    return (
      <Menu
        theme={appCustomization.theme === "dark" ? "dark" : "light"}
        selectedKeys={[activeMode()]}
        onSelect={({ key }) => {
          if (key === "/") navigate(key);
        }}
        style={{
          background: "inherit",
        }}
        mode="inline"
        items={SiderItems()}
        onClick={(e) => {
          if (e.key === "/") navigate(`${e.key}`, { replace: true });
        }}
      />
    );
  };

  return screens.lg ? (
    <Sider
      breakpoint="lg"
      width={250}
      trigger={null}
      collapsible
      collapsed={!isSidebarOpen}
      //   collapsed={false}
      onCollapse={(value) => dispatch(setIsSidebarOpen(value))}
      style={{
        background:
          appCustomization.theme === "dark" ? "rgb(19 19 19)" : "#FFFFFF",
        padding: "0 10px",
        borderRadius: "16px",
        // opacity: "0.2",
        // textAlign: "center",
        // justifyContent: "center",
        // display: "flex",
        // position: "relative",
      }}
    >
      <div
        style={{
          margin: "7px 0 15px",
          display: "flex",
          alignItems: "center",
          justifyContent: isSidebarOpen ? "right" : "center",
        }}
      >
        <Button
          onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}
          size="small"
          icon={isSidebarOpen ? <ArrowLeftOutlined /> : <ArrowRightOutlined />}
          style={
            {
              // background: "rgba(53, 56, 64, 0.52)",
              // float: isSidebarOpen ? "right" : undefined,
            }
          }
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          onClick={() => {
            navigate("/");
          }}
          src={logo}
          preview={false}
          style={{
            width: isSidebarOpen ? "100px" : "70px",
            height: isSidebarOpen ? "100px" : "70px",
            marginBottom: "20px",
            cursor: "pointer",
          }}
        />
      </div>

      {menuSection()}
      <Button
        style={{
          marginLeft: isSidebarOpen ? "22px" : "25px",
          marginTop: "10px",
        }}
        type="text"
        size="small"
        icon={
          <Image
            src={log1}
            preview={false}
            style={{ width: "20px", height: "20px" }}
          />
        }
      >
        {/* <Typography.Text
          style={{
            marginLeft: "10px",
            color: "red",
          }}
        >
          Coin Smoothies
        </Typography.Text> */}
        {isSidebarOpen && (
          <div
            style={{
              background:
                "linear-gradient(91deg, #FF512F 0.44%, #F09819 99.74%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginLeft: "10px",
            }}
          >
            Coin Smoothies
          </div>
        )}
      </Button>
      <Divider
        style={{
          margin: "15px 0",
          background:
            appCustomization.theme === "dark"
              ? "rgba(255, 255, 255, 0.50)"
              : "black",
        }}
      />
      {!isSidebarOpen ? (
        <Button
          style={{
            marginLeft: isSidebarOpen ? "24px" : "25px",
          }}
          type="text"
          size="small"
          icon={<VideoCameraOutlined style={{ fontSize: "16px" }} />}
        ></Button>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography.Text style={{ fontSize: "12px" }}>
              Best Performing Streamers 24h
            </Typography.Text>
            <RightOutlined style={{ color: "#1832D6" }} />
          </div>
          {[
            { name: "Grant Blocmates", value: "1,925" },
            { name: "notthreadguy", value: "980" },
            { name: "Taiki", value: "834" },
          ]?.map((e: any) => (
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Badge dot offset={[-5, 22]} status="success">
                  <Avatar size={25} shape="circle" icon={<UserOutlined />} />
                </Badge>
                <Typography.Text
                  style={{
                    color: "color: #FFF;",
                    fontSize: "10px",
                    marginLeft: "12px",
                  }}
                >
                  {e.name}
                </Typography.Text>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    appCustomization.theme === "dark" ? "#282828" : "#E9E9E9",
                  borderRadius: "12px",
                  padding: "2px 6px",
                  color: "#00C853",
                  fontSize: "10px",
                }}
              >
                +{e.value}%
              </div>
            </div>
          ))}
        </div>
      )}
      <Divider
        style={{
          margin: "15px 0",
          background:
            appCustomization.theme === "dark"
              ? "rgba(255, 255, 255, 0.50)"
              : "black",
        }}
      />
      {!isSidebarOpen ? (
        <Button
          style={{
            marginLeft: isSidebarOpen ? "24px" : "25px",
          }}
          type="text"
          size="small"
          icon={<LikeOutlined style={{ fontSize: "16px" }} />}
        ></Button>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography.Text
              style={{ color: "rgba(255, 255, 255, 0.60)", fontSize: "12px" }}
            >
              Followed streamers
            </Typography.Text>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "15px",
            }}
          >
            <Image
              src={log5}
              preview={false}
              style={{ width: "50px", height: "50px" }}
            />
            <Typography.Text
              style={{ color: "#373737", fontWeight: 500, lineHeight: "36px" }}
            >
              {" "}
              Follow your Favorites
            </Typography.Text>
          </div>
        </div>
      )}
    </Sider>
  ) : (
    <StyledDrawer
      styles={{
        header: { display: "none" },
      }}
      placement="left"
      closable={true}
      onClose={() => {
        dispatch(setIsSidebarOpen(false));
      }}
      closeIcon={null}
      width={280}
      open={isSidebarOpen}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <Image
          onClick={() => {
            navigate("/");
          }}
          src={logo}
          preview={false}
          style={{
            width: "100px",
            height: "100px",
            marginBottom: "20px",
            cursor: "pointer",
          }}
        />
      </div>

      {menuSection()}
      <Button
        style={{
          marginLeft: "22px",
          marginTop: "10px",
        }}
        type="text"
        size="small"
        icon={
          <Image
            src={log1}
            preview={false}
            style={{ width: "20px", height: "20px" }}
          />
        }
      >
        {isSidebarOpen && (
          <div
            style={{
              background:
                "linear-gradient(91deg, #FF512F 0.44%, #F09819 99.74%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginLeft: "10px",
            }}
          >
            Coin Smoothies
          </div>
        )}
      </Button>
      <Divider
        style={{
          margin: "15px 0",
          background:
            appCustomization.theme === "dark"
              ? "rgba(255, 255, 255, 0.50)"
              : "black",
        }}
      />

      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography.Text style={{ fontSize: "12px" }}>
            Best Performing Streamers 24h
          </Typography.Text>
          <RightOutlined style={{ color: "#1832D6" }} />
        </div>
        {[
          { name: "Grant Blocmates", value: "1,925" },
          { name: "notthreadguy", value: "980" },
          { name: "Taiki", value: "834" },
        ]?.map((e: any) => (
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Badge dot offset={[-5, 22]} status="success">
                <Avatar size={25} shape="circle" icon={<UserOutlined />} />
              </Badge>
              <Typography.Text
                style={{
                  color: "color: #FFF;",
                  fontSize: "10px",
                  marginLeft: "12px",
                }}
              >
                {e.name}
              </Typography.Text>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  appCustomization.theme === "dark" ? "#282828" : "#E9E9E9",
                borderRadius: "12px",
                padding: "2px 6px",
                color: "#00C853",
                fontSize: "10px",
              }}
            >
              +{e.value}%
            </div>
          </div>
        ))}
      </div>

      <Divider
        style={{
          margin: "15px 0",
          background:
            appCustomization.theme === "dark"
              ? "rgba(255, 255, 255, 0.50)"
              : "black",
        }}
      />

      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography.Text
            style={{ color: "rgba(255, 255, 255, 0.60)", fontSize: "12px" }}
          >
            Followed streamers
          </Typography.Text>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "15px",
          }}
        >
          <Image
            src={log5}
            preview={false}
            style={{ width: "50px", height: "50px" }}
          />
          <Typography.Text
            style={{ color: "#373737", fontWeight: 500, lineHeight: "36px" }}
          >
            {" "}
            Follow your Favorites
          </Typography.Text>
        </div>
        <Divider
          style={{
            margin: "15px 0",
            background:
              appCustomization.theme === "dark"
                ? "rgba(255, 255, 255, 0.50)"
                : "black",
          }}
        />
        <div style={{ display: "flex" }}>
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
            <Typography.Text style={{ fontWeight: "500", lineHeight: "18px" }}>
              How it works
            </Typography.Text>
            <ExclamationCircleOutlined />
            {/* <ExclamationCircleFilled style={{ fontSize: "14px" }} /> */}
          </Button>
        </div>
      </div>
    </StyledDrawer>
  );
};
export default React.memo(Sidebar);
