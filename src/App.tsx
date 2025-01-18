import { FC, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ConfigProvider, theme } from "antd";

import "./App.scss";
import "./plugins/reactI18n";

import ru from "antd/locale/ru_RU";
import en from "antd/locale/en_US";

import { useAppSelector } from "./store/hooks";

import MainLayout from "./layouts/MainLayout";
import Loader from "./components/Loader";
import { PageRoutes } from "./Routes";

const App: FC = () => {
  const language = useAppSelector((state) => state.general.language);
  const appCustomization = useAppSelector(
    (state) => state.general.appCustomization
  );

  const themeConfig = {
    algorithm:
      appCustomization.theme === "dark"
        ? [theme.darkAlgorithm]
        : [theme.defaultAlgorithm],
    token: {
      colorPrimary: appCustomization.primaryColor,
      borderRadius: appCustomization.borderRadius,
      fontFamily: "Poppins, sans-serif",
      fontSize: appCustomization.fontSize,
      colorBgContainer: "inherit",
    },
    components: {
      Typography: {
        titleMarginTop: 0,
        titleMarginBottom: 0,
      },
      Table: {
        headerBg: "inherit",
        footerBg: "inherit",
        rowHoverBg: appCustomization.theme === "dark" ? undefined : "#FFFFFF",
      },
      Layout: {
        bodyBg:
          appCustomization.theme === "dark"
            ? "#090909"
            : "var(--background-color-light-mode, #F0F2F5)",
      },
      Modal: {
        // contentBg: appCustomization.theme === "dark" ? "#010118" : "#FFF",
      },
      Select: {
        optionSelectedBg:
          appCustomization.theme === "dark" ? undefined : "rgb(241, 241, 241)",
      },
    },
  };

  // if (appCustomization.isCompact) {
  themeConfig.algorithm.push(theme.compactAlgorithm);
  // }
  const currentLanguage = () => {
    if (localStorage.getItem("I18N_LANGUAGE") === "en") {
      return en;
    }
    if (localStorage.getItem("I18N_LANGUAGE") === "ru") {
      return ru;
    }
  };

  const [systemLanguage, setSystemLanguage] = useState(currentLanguage);

  useEffect(() => {
    setSystemLanguage(currentLanguage);
  }, [language]);

  return (
    <ConfigProvider locale={systemLanguage} theme={themeConfig}>
      <Routes>
        {/* <Route
          path="/login"
          element={
            <Suspense fallback={<Loader />}>
              <LoginPage />
            </Suspense>
          }
        /> */}

        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <MainLayout />
            </Suspense>
          }
        >
          {PageRoutes.map((route, index) => {
            return (
              <Route
                path={route.path}
                element={route.element}
                key={`route-index-${index}`}
              />
            );
          })}
        </Route>
      </Routes>
    </ConfigProvider>
  );
};
export default App;
