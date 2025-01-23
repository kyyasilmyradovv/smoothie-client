import "./Switch.scss";
import ISon from "../assets/Son.png";
import IMoon from "../assets/Moon.png";
import { Image } from "antd";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { EThemeEnum, TThemePropsType } from "../types/themePropsType";
import { setAppCustomization } from "../store/general/generalSlice";
const Switch = () => {
  const dispatch = useAppDispatch();
  const appCustomization = useAppSelector(
    (state) => state.general.appCustomization
  );

  const handleThemeChange = () => {
    const newTheme =
      appCustomization.theme === "dark" ? EThemeEnum.LIGHT : EThemeEnum.DARK; // Determine the new theme based on the switch state
    dispatch(
      setAppCustomization({ theme: newTheme } as unknown as TThemePropsType)
    );
  };
  return (
    <div className="switch_btn" onClick={handleThemeChange}>
      <Image
        src={IMoon}
        preview={false}
        style={{ width: "20px", height: "20px" }}
      />
      <Image
        src={ISon}
        preview={false}
        style={{ width: "20px", height: "20px" }}
      />
      <input type="checkbox" className="virtual_btn" id="theme_switch" />
      <span className="circle"></span>
    </div>
  );
};

export default Switch;
