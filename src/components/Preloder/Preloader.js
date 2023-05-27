import React from "react";
import {Layout} from "antd";

export default function Preloader() {
  return (
    <Layout className="preloader">
      <div className="preloader__row">
        <div className="preloader__item"></div>
        <div className="preloader__item"></div>
      </div>
    </Layout>
  );
}
