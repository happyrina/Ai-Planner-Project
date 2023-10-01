import {
  BrandVariants,
  GriffelStyle,
  Theme,
  createDarkTheme,
  createLightTheme,
  makeStyles,
  shorthands,
  themeToTokensObject,
  tokens,
} from "@fluentui/react-components";

//아래 80번 수정함 원래 #a53e63
export const semanticKernelBrandRamp = {
  10: "#060103",
  20: "#261018",
  30: "#431426",
  40: "#591732",
  50: "#701A3E",
  60: "#861F4B",
  70: "#982C57",
  80: "#DCE9FF",
  90: "#B15070",
  100: "#BC627E",
  110: "#C6748B",
  120: "#CF869A",
  130: "#D898A8",
  140: "#E0AAB7",
  150: "#E8BCC6",
  160: "#EFCFD6",
};

export const semanticKernelLightTheme = {
  ...createLightTheme(semanticKernelBrandRamp),
  colorMeBackground: "#0047FF",
};

export const semanticKernelDarkTheme = {
  ...createDarkTheme(semanticKernelBrandRamp),
  colorMeBackground: "#2b2b3e",
};

export const customTokens = themeToTokensObject(semanticKernelLightTheme);

export const Breakpoints = {
  small: (style) => {
    return { "@media (max-width: 744px)": style };
  },
};

export const ScrollBarStyles = {
  overflowY: "scroll",
  "&:hover": {
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: tokens.colorScrollbarOverlay,
      visibility: "visible",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: tokens.colorNeutralBackground1,
      WebkitBoxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.1)",
      visibility: "visible",
    },
  },
};

export const SharedStyles = {
  scroll: {
    height: "100%",
    ...ScrollBarStyles,
  },
  overflowEllipsis: {
    ...shorthands.overflow("hidden"),
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
};

export const useSharedClasses = makeStyles({
  informativeView: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.padding("80px"),
    alignItems: "center",
    ...shorthands.gap(tokens.spacingVerticalXL),
    marginTop: tokens.spacingVerticalXXXL,
  },
});

export const useDialogClasses = makeStyles({
  root: {
    height: "515px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
  },
  scopes: {
    display: "flex",
    flexDirection: "column",
    rowGap: "5px",
    paddingLeft: "20px",
  },
  error: {
    color: "#d13438",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    rowGap: "10px",
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    minWidth: "175px",
  },
});
