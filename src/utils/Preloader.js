import React from "react";
import { Spin } from "antd";

const style = {
  width: "100%",
  height: "100vh",
  background: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#000",
};
export const Preloader = () => (
  <div style={style}>
    {/* <Spin size="large" /> */}
    <h1 style={{ color: "#000" }}>Загрузка....</h1>
  </div>
);
