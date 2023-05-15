import React from "react";
import { ConfigProvider, theme } from "antd";

const AntdTheme = ({ children }) => (
  <ConfigProvider
    theme={{
      algorithm: theme.compactAlgorithm,
    }}
  >
    {children}
  </ConfigProvider>
);

export default AntdTheme;
