import React from "react";
import { ConfigProvider, theme } from "antd";

const testGreenColor = "#52c41a";
const testRedColor = "#ff0000";

const withTheme = (node: JSX.Element) => (
  <>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        //   token: {
        //     colorTextBase: "#f4d201",
        //   },
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            colorPrimaryBg: "#0c0d15;",
            colorInfoText: "#ffdd00",
            colorInfo: "#f4d201",
            colorText: "#ffdd00",
            colorTextTertiary: "#fff500",
            colorBorder: "#334155",
            colorBgContainer: "#0c0d15",
            colorBgLayout: "#0c0d15",
            colorBorderSecondary: "#334155",
            colorPrimary: "#debf00",
            colorBgBase: "#161616",
            borderRadius: 16,
            // borderRadius: 15,
          },
          components: {
            Card: {
              colorBgContainer: "#0E1926",
            },
            Typography: {
              colorText: "#fff",
              colorTextHeading: "#fff",
            },
            Checkbox: {
              borderRadiusSM: 5,
              controlInteractiveSize: 18,
              colorWhite: "#0c0d15",
            },
            Rate: {
              //   colorFillContent: "red",
            },
            Input: {},
            Tabs: {
              colorBgContainer: "rgba(240, 206, 0, 1)",
              colorPrimary: "#fff",
              fontSize: 16,
              colorFillAlter: "#0c0d15",
              colorText: "#40577D",
            },
            Tag: {
              borderRadius: 10,
              colorBgContainer: "#000",
              fontSizeSM: 20,
              lineHeight: 2,
              colorFillQuaternary: "#0c0d15",
              colorBorder: "#0c0d15",
            },
            Layout: {
              colorBgContainer: "#0c0d15",
              colorBgLayout: "#0c0d15",
            },
            Switch: {
              //   fontSize: 20,
              fontSizeSM: 18,
            },
            Select: {
              controlHeight: 56,
              fontSize: 18,
              fontSizeIcon: 18,
            },
            Form: {
              marginLG: 10,
            },
            Dropdown: {
              zIndexPopup: 15,
            },
          },
        }}
      >
        {node}
      </ConfigProvider>
    </ConfigProvider>
  </>
);

export default withTheme;

//   "lint": "eslint src/**/*.{js.jsx}",
