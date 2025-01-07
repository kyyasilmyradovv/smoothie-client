import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { EThemeEnum, TThemePropsType } from "../../types/themePropsType";

type SliceState = {
  appCustomization: TThemePropsType;
  language: string;
  isSidebarOpen: boolean;
};

const initialState: SliceState = {
  appCustomization: {
    theme: EThemeEnum.DARK,
    primaryColor: "#ffeef",
    rowHoverBg: "#586CC6",
    fontSize: 14,
    borderRadius: 3,
    isCompact: false,
    cellPaddingBlock: 6,
    cellPaddingInline: 8,
    isSidebarOpen: false,
  },
  language: localStorage.getItem("I18N_LANGUAGE") ?? "en",
  isSidebarOpen: false,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setAppCustomization(state, action: PayloadAction<TThemePropsType>) {
      state.appCustomization = { ...state.appCustomization, ...action.payload };
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setIsSidebarOpen(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setAppCustomization, setLanguage, setIsSidebarOpen } =
  generalSlice.actions;
export default generalSlice.reducer;
