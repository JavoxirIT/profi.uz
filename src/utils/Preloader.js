import React from "react";
import { Space, Spin } from "antd";

export const Preloader = () => (
  <div style={{ background: "none", width: "100%" }}>
    <Spin size="large" />
  </div>
);
