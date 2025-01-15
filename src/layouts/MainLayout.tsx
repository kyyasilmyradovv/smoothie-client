/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { useAppSelector } from "../store/hooks";
import styles from "./mainLayout.module.scss";
import { Layout } from "antd";
// import ITrade from "../assets/image.png";

import { Suspense } from "react";
import Loader from "../components/Loader";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const isSidebarOpen = useAppSelector((state) => state.general.isSidebarOpen);
  const appCustomization = useAppSelector(
    (state) => state.general.appCustomization
  );

  return (
    <Layout style={{ minHeight: "100vh", padding: "16px 10px" }} id="body">
      <Sidebar />
      <Layout
        className={styles["main-layout-container"]}
        style={{
          width: isSidebarOpen ? "calc(100% - 450px)" : "calc(100% - 200px)",
          margin: "0 0 0 10px",
          position: "relative",
        }}
      >
        <Navbar />
        <div
          style={{
            background:
              appCustomization.theme == "dark" ? "rgb(19 19 19)" : "#FFFFFF",
            borderRadius: "16px",
            marginTop: "16px",
            height: "calc(100vh - 108px)",
            padding: "15px",
            overflow: "auto",
          }}
        >
          <Suspense fallback={<Loader />}>
            <Content className={styles["content"]}>
              <Outlet />
            </Content>
          </Suspense>
        </div>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
