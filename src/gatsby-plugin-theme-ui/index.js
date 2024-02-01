import defaultColors from "../util/default-colors.json"
import darkColors from "../util/dark-theme-colors.json"
import { lightness } from "@theme-ui/color"
const theme = {
  colors: {
    ...defaultColors,
    text: "#323232",
    heading: "#001166",
    background: "#FFF",
    primary: "#5C2941",
    accent: "#FFF",
    muted: "rgba(0, 0, 0, 0.7)",
    cardBg: "#E5E7F3",
    borderColor: "#540229",
    labelText: "#777",
    inputBorder: "#AAA",
    inputBackground: "#FFF",
    socialIcons: lightness("siteColor", 0.4),
    socialIconsHover: lightness("siteColor", 0.3),
    buttonColor: lightness("siteColor", 1.0),
    buttonHoverBg: lightness("siteColor", 0.4),
    buttonHoverColor: "#D67D15",
    bhbackground: "#EEE3FF",
    bhborderColor: "#82CCA0",
    modes: {
      dark: {
        text: "#F5F5F5",
        heading: "#9FE8F5",
        background: "#000A3D",
        primary: "#252525",
        accent: "#5C2941",
        muted: "rgba(255, 255, 255, 0.7)",
        cardBg: "#001166",
        borderColor: "#888",
        labelText: "#777",
        inputBorder: "#777",
        inputBackground: "#333",
        socialIcons: lightness("siteColor", 0.5),
        socialIconsHover: lightness("siteColor", 0.9),
        buttonColor: lightness("siteColor", 1.0),
        buttonHoverBg: lightness("siteColor", 0.3),
        buttonHoverColor: "#D67D15",
        bhbackground: "#512B81",
        bhborderColor: "#517F64",
        ...darkColors,
      },
    },
  },
  links: {
    postLink: {
      color: "muted",
      "&:hover": {
        color: "text",
      },
    },
  },
  variants: {
    button: {
      bg: "siteColor",
      color: "buttonColor",
      "&:hover": {
        bg: "buttonHoverBg",
        color: "buttonHoverColor",
      },
    },
    socialIcons: {
      a: {
        color: "socialIcons",
        ":hover": {
          color: "socialIconsHover",
        },
      },
    },
  },
}

export default theme
