import React from "react";
import { Card } from "antd";
import { PageWrapperSingle } from "components/PageWrapperSingle";
import StatisticsBlock from "components/Statistics/StatisticsBlock";
import StatisticsChart from "components/Statistics/StatisticsChart";
import css from "../styles/Statistics.module.css";

export default function Statistics() {
  return (
    <PageWrapperSingle title="Statistika" pageTitle={"Statistika"}>
      <Card
        className={css.StatisticsWrapperCard}
        bodyStyle={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignContent: "space-between",
        }}
      >
        <StatisticsBlock />
        <StatisticsChart />
      </Card>
    </PageWrapperSingle>
  );
}
