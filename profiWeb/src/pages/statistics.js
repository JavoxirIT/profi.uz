import React from "react";
import { Card } from "antd";
import { PageWrapperSingle } from "components/PageWrapperSingle";
import StatisticsBlock from "components/Statistics/StatisticsBlock";
import StatisticsChart from "components/Statistics/StatisticsChart";
import css from "../styles/Statistics.module.css";

export default function Statistics({ t }) {
  return (
    <PageWrapperSingle title="Statistika" pageTitle={"Statistika"} t={t}>
      <Card
        className={css.StatisticsWrapperCard}
        bodyStyle={{
          height: "100%",
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <StatisticsBlock t={t} />
        <StatisticsChart t={t} />
      </Card>
    </PageWrapperSingle>
  );
}
