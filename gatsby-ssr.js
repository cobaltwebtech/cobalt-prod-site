import * as React from "react"

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/ProximaNova-Regular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="proximanovaFont"
    />,
    <link
      rel="preload"
      href="/fonts/ProximaNova-Bold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="proximanovaFont"
    />,
    <link
      rel="preload"
      href="/fonts/ProximaNova-ExtraBold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="proximanovaFont"
    />,
  ])
}