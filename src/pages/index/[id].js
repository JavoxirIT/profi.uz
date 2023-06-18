import {PageWrapperSingle} from "../../components/PageWrapperSingle";
import {notification, Typography} from "antd";
import React, {useEffect, useState} from "react";
import MasterTabCard from "../../components/Master/MasterTabCard";
import css from "../../styles/Master.module.css";
import MasterCard from "../../components/Master/MasterCard";
// import useSWR, { unstable_serialize } from "swr";
import {useRouter} from "next/router";
import {postFetch} from "../../request/Fetch";
import {getCookie} from "../../utils/setCookie";
// import axios from "axios";
// import { postFetch } from "request/Fetch";

const {Title} = Typography;

const url = process.env.NEXT_PUBLIC_ONE_USER;

const Master = ({t, data, lang}) => {
	console.log(data)
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

	const [api, contextHolder] = notification.useNotification();
	const openNotificationWithIcon = (type, code, message) => {
		api[type]({
			message: code,
			description: message,
			duration: 10,
			style: {
				width: 600,
			},
		});
	};

	const [starType, setStarType] = useState([])
	const fetchStarType = () => {
		postFetch({path: "star-type"}).then((res) => {
			if (res.status === 200) {
				setStarType(res.data)
			} else {
				openNotificationWithIcon("error", res.code, res.message);
			}
		}).catch((err) => {
			openNotificationWithIcon("error", err.code, err.message);
		})
	}


	const [allClass, setAllClass] = useState([])
	const fetchAllKlass = () => {
		const value = {user_id: data.id}
		postFetch({path: "all-klass", value}).then((res) => {
			if (res.status === 200) {
				setAllClass(res.data)
			} else {
				openNotificationWithIcon("error", res.code, res.message);
			}
		}).catch((err) => {
			openNotificationWithIcon("error", err.code, err.message);
		})
	}


	return isChecked && (
		<PageWrapperSingle title={data.firstname + " " + data.lastname} pageTitle="" t={t}>
			{contextHolder}
			<main className={css.masterWrapper}>
				<div>
					<Title style={{marginBottom: 22}} level={4}>
						{t.batafsilMalumot}
					</Title>
					<MasterCard lang={lang} data={data} t={t} user_id={router.query.id} fetchAllKlass={fetchAllKlass}
					            starType={starType} openNotificationWithIcon={openNotificationWithIcon}/>
				</div>
				<div className={css.MasterTab}>
					<MasterTabCard lang={lang} data={data} t={t} allClass={allClass} fetchStarType={fetchStarType}
					               fetchAllKlass={fetchAllKlass}/>
				</div>
			</main>
		</PageWrapperSingle>
	);
};

export async function getServerSideProps(context) {
	const {query, req} = context;
	const config = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({user_id: query.id}),
	};
	const response = await fetch(url, config);
	const data = await response.json();
	return {
		props: {
			data,
		},
	};
}

export default Master;