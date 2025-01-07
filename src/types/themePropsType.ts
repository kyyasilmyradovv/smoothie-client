export enum EThemeEnum {
  "DEFAULT" = "default",
  "DARK" = "dark",
  "LIGHT" = "light",
}

export type TThemePropsType = {
  theme: EThemeEnum;
  primaryColor: string;
  rowHoverBg: string;
  colorTextBase?: string;
  isCompact: boolean;
  borderRadius: number;
  fontSize: number;
  cellPaddingBlock: number;
  cellPaddingInline: number;
  isSidebarOpen: boolean;
};
