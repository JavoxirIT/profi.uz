import React, {useEffect, useState} from "react";
import { Card } from "antd";
import { PageWrapperSingle } from "components/PageWrapperSingle";
import StatisticsBlock from "components/Statistics/StatisticsBlock";
import StatisticsChart from "components/Statistics/StatisticsChart";
import css from "../styles/Statistics.module.css";
import {useRouter} from "next/router";
import {getCookie} from "../utils/setCookie";

export default function Statistics({ t }) {
    const router = useRouter();
    const [isChecked, setChecked] = useState(false);

    useEffect(() => {
        if (!getCookie("access_token")) {
            router.push("/authorization").then(() => {
                setChecked(false);
            });
        }else {
            setChecked(true);
        }
    }, [router]);
  return isChecked && (
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
