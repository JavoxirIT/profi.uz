import React from "react";
import {Layout} from "antd";

export default function Preloade2() {
  return (
    <Layout className="preloader">
      <div className="preloader__row">
        <div className="preloader__item"></div>
        <div className="preloader__item"></div>
        <div className="preloader__item"></div>
        <div className="preloader__item"></div>
      </div>
    </Layout>
  );
}
