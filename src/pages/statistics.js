import React, {useEffect, useState} from "react";
import {Card} from "antd";
import {PageWrapperSingle} from "components/PageWrapperSingle";
import StatisticsBlock from "components/Statistics/StatisticsBlock";
import StatisticsChart from "components/Statistics/StatisticsChart";
import css from "../styles/Statistics.module.css";
import {useRouter} from "next/router";
import {getCookie} from "../utils/setCookie";

export default function Statistics({t}) {
	const router = useRouter();
	const [isChecked, setChecked] = useState(false);

	useEffect(() => {
		if (!getCookie("access_token")) {
			router.push("/authorization").then(() => {
				setChecked(false);
			});
		} else {
			setChecked(true);
		}
	}, [router]);
	return isChecked && (
		<PageWrapperSingle title={t.pageTitleStatictic} pageTitle={t.pageTitleStatictic} t={t}>
			<Card
				bordered={false}
				className={css.StatisticsWrapperCard}
			>
				<StatisticsBlock t={t}/>
				<StatisticsChart t={t}/>
			</Card>
		</PageWrapperSingle>
	);
}
