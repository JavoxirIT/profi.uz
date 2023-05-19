import React from "react";
import { ConfigProvider, theme } from "antd";

const testGreenColor = "#52c41a";
const testRedColor = "#ff0000";

const withTheme = (node: JSX.Element) => (
  <>
    <ConfigProvider
      theme={{
        // algorithm: theme.darkAlgorithm,
        algorithm: theme.defaultAlgorithm,
        //   token: {
        //     colorTextBase: "#f4d201",
        //   },
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            // colorPrimaryBg: "#0c0d15;",
            colorInfoText: "#ffdd00",
            colorInfo: "#ffdd00",
            colorText: "#ffdd00",
            colorTextTertiary: "#ffdd00",
            // colorBorder: "#334155",
            colorBorder: "#c4c4c4",
            // colorBgContainer: "#0c0d15",
            colorBgContainer: "#ffffff",
            // colorBgLayout: "#0c0d15",
            colorBgLayout: "#ffffff",
            // colorBorderSecondary: "#334155",
            colorBorderSecondary: "#c4c4c4",
            colorPrimary: "#ffdd00",
            // colorBgBase: "#161616",
            colorBgBase: "#ffffff",
            borderRadius: 16,
            // borderRadius: 15,
          },
          components: {
            Card: {
              // colorBgContainer: "#0E1926",
              colorBgContainer: "#f5f5f5",
            },
            Typography: {
              colorText: "#000000",
              colorTextHeading: "#000000",
            },
            Checkbox: {
              borderRadiusSM: 5,
              controlInteractiveSize: 18,
              colorWhite: "#0c0d15",
              colorText: "#000",
            },
            // Rate: {
            //     // colorFillContent: "red"
            //     fontSize: 20
            // },
            Tabs: {
              colorBgContainer: "#ffdd00",
              colorPrimary: "#fff",
              fontSize: 16,
              // colorFillAlter: "#0c0d15",
              colorFillAlter: "#ffffff",
              colorText: "#40577D",
            },
            Tag: {
              borderRadius: 10,
              // colorBgContainer: "#000",
              colorBgContainer: "#fff",
              fontSizeSM: 16,
              lineHeight: 2,
              // colorFillQuaternary: "#0c0d15",
              colorFillQuaternary: "#ffffff",
              // colorBorder: "#0c0d15",
              colorBorder: "#ffdd00",
            },
            Layout: {
              // colorBgContainer: "#0c0d15",
              colorBgContainer: "#ffffff",
              // colorBgLayout: "#0c0d15",
              colorBgLayout: "#ffffff",
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
              colorTextHeading: "#bbbbbb",
            },
            Input: {
              colorText: "#000",
              colorTextDescription: "#000",
              colorIconHover: "#1677ff",
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
// #fadb14
