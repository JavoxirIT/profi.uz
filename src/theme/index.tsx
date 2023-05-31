import React from "react";
import {ConfigProvider, theme} from "antd";


const withTheme = (node: JSX.Element) => (
    <ConfigProvider
        theme={{
            token: {
                colorPrimaryBgHover: "#008080",
                // colorPrimaryBg: "#0c0d15;",
                colorInfoText: "#d0b400",
                colorInfo: "#ffdd00",
                colorText: "#ffdd00",
                colorTextTertiary: "#ffdd00",
                // colorBorder: "#334155",
                // colorBorder: "#c4c4c4",
                colorBorder: "rgba(0,0,49,0.2)",
                // colorBgContainer: "#0c0d15",
                colorBgContainer: "#ffffff",
                // colorBgLayout: "#0c0d15",
                colorBgLayout: "#ffffff",
                // colorBorderSecondary: "#334155",
                colorBorderSecondary: "#c4c4c4",
                colorPrimary: "#d0b400",
                // colorBgBase: "#161616",
                colorBgBase: "#ffffff",
                borderRadius: 16,
                // borderRadius: 15,
            },
            components: {
                Card: {
                    // colorBgContainer: "#0E1926",
                    colorBgContainer: "rgba(255,255,255,0.67)",
                    paddingLG: 15,
                    // boxShadowTertiary: '0 1px 2px 0 rgba(0, 0, 0, 0.08), 0 1px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
                    boxShadowTertiary: "0px 3px 15px -1px rgba(34, 60, 80, 0.2)",
                    // boxShadowTertiary: "0px 3px 21px -9px rgba(34, 60, 80, 0.4)",
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
                    fontSizeSM: 14,
                    lineHeight: 2,
                    // colorFillQuaternary: "#0c0d15",
                    colorFillQuaternary: "#ffffff",
                    // colorBorder: "#0c0d15",
                    colorBorder: "#d0b400",
                    colorText: "#000031ee"
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
                Carousel: {
                    motionDurationSlow: "1.5s"
                },
                Spin: {
                    colorBgContainer: "#000031ee"
                },
                Segmented: {
                    colorBgLayout: "#000031ee",
                    // colorFillSecondary: "#fff",
                    // colorText: "#fff",
                    colorTextLabel: "#ffff",
                    borderRadius: 8,
                    // boxShadowTertiary: "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
                    fontSize: 18
                },
                List: {
                    paddingContentHorizontal: 5,
                },
            },
        }}
    >
        {node}
    </ConfigProvider>
);

export default withTheme;

//   "lint": "eslint src/**/*.{js.jsx}",
// #fadb14
