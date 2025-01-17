/* eslint-disable prefer-const */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { EThemeEnum, TThemePropsType } from "../../types/themePropsType";

type SliceState = {
  appCustomization: TThemePropsType;
  language: string;
  isSidebarOpen: boolean;
  isHelpModalOpen: boolean;
  isConnectWalletModalOpen: boolean;
  isAddSmothieModalOpen: boolean;
  addSmothieName: string;
  userMail: string;
  smothies: { [key: string]: { type: string; value: number } };
  settedSmothies: { [key: string]: { type: string; value: number } };
};

const initialState: SliceState = {
  appCustomization: {
    theme: EThemeEnum.DARK,
    primaryColor: "",
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
  isHelpModalOpen: false,
  isConnectWalletModalOpen: false,
  isAddSmothieModalOpen: false,
  addSmothieName: "",
  userMail: localStorage.getItem("userMail") ?? "",
  smothies: {
    $GOAT: { type: "USDT", value: 3500.45 },
    $KINGLANAND: { type: "USDT", value: 3500.45 },
    $GRIFFAIN: { type: "USDT", value: 3500.45 },
    $FARTCOIN: { type: "USDT", value: 3500.45 },
  },
  settedSmothies: {
    // $GOAT: { type: "USDT", value: 3500.45 },
    // $KINGLANAND: { type: "USDT", value: 3500.45 },
    // $GRIFFAIN: { type: "USDT", value: 3500.45 },
    // $FARTCOIN: { type: "USDT", value: 3500.45 },
  },
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
    setIsHelpModalOpen(state, action: PayloadAction<boolean>) {
      state.isHelpModalOpen = action.payload;
    },
    setIsConnectWalletModalOpen(state, action: PayloadAction<boolean>) {
      state.isConnectWalletModalOpen = action.payload;
    },
    setIsAddSmothieModalOpen(state, action: PayloadAction<boolean>) {
      state.isAddSmothieModalOpen = action.payload;
    },
    setAddSmothieName(state, action: PayloadAction<string>) {
      state.addSmothieName = action.payload;
    },
    setUserMail(state, action: PayloadAction<string>) {
      state.userMail = action.payload;
    },
    setSettedSmothies(
      state,
      action: PayloadAction<{ [key: string]: { type: string; value: number } }>
    ) {
      state.settedSmothies = action.payload;
    },
    updateSmothies(
      state,
      action: PayloadAction<{ [key: string]: { type: string; value: number } }>
    ) {
      state.smothies = action.payload;
    },
    setSmothies(
      state,
      action: PayloadAction<{ [key: string]: { type: string; value: number } }>
    ) {
      const updkey = Object.keys(action.payload)[0];
      const updValue = action.payload[updkey];
      let smothies = state.smothies;
      smothies[updkey] = updValue;
      state.smothies = smothies;
    },
  },
});

export const {
  setAppCustomization,
  setLanguage,
  setIsSidebarOpen,
  setIsHelpModalOpen,
  setIsConnectWalletModalOpen,
  setIsAddSmothieModalOpen,
  setAddSmothieName,
  setUserMail,
  setSmothies,
  setSettedSmothies,
  updateSmothies,
} = generalSlice.actions;
export default generalSlice.reducer;
