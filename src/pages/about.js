import { Typography } from "antd";
import React from "react";
import { PageWrapperGlobal } from "../components/PageWrapperGlobal";

const { Title } = Typography;

function About() {
  return (
    <PageWrapperGlobal title="Biz haqimizda" pageTitle="Biz haqimizda">
      <Title level={4}>About</Title>
    </PageWrapperGlobal>
  );
}
export default About;
