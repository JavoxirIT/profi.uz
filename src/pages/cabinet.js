import React, {useEffect, useState} from "react";
import {PageWrapperSingle} from "../components/PageWrapperSingle";
import {Card, Tag, Typography} from "antd";
import {useRouter} from "next/router";
import {getCookie} from "utils/setCookie";
import Image from "next/image";
import css from "../styles/Cabinet.module.css";
import CabinetNavigateList from "components/Cabinet/CabinetNavigateList";
import userImage from "../../public/assets/images/no-image.png"

const {Title, Text} = Typography;
const spesialist = process.env.NEXT_PUBLIC_USER_SPECIALIST;
const url = process.env.NEXT_PUBLIC_ONE_USER;
const urlImg = process.env.NEXT_PUBLIC_IMG_URL;

export default function Cabinet({user, t}) {
	console.log("user:", user)
	const [isChecked, setChecked] = useState(false);
	const router = useRouter();
	const localData =
		typeof window !== "undefined" ? localStorage.getItem("user") : null;

	useEffect(() => {
		const userData = JSON.parse(localData) ?? 0;
		if (!getCookie("access_token")) {
			router.push("/authorization").then(() => {
				setChecked(false);
			});
		} else if (Number(spesialist) !== Number(userData?.role_id)) {
			router.push("/").then(() => {
				setChecked(false);
			});
		} else {
			setChecked(true);
		}
	}, [router, localData]);

	// заранее загружаем страницу
	useEffect(() => {
		router.prefetch("/authorization");
	}, [router]);

	return (
		<PageWrapperSingle title="Kabinet" pageTitle={t.cabinet} t={t}>
			{isChecked && (
				<div className={css.cabinetCardBlock}>
					<Card className={css.cabinetCardUserInfo}>
						<div className={css.cabinetCardUserInfoBody}>
							{!user.image ? <Image
									src={userImage}
									width={90}
									height={90}
									alt="avatar"
									className={css.UserInfoBodyImg}
								/> :
								<Image
									src={`${urlImg + user.image}`}
									width={90}
									height={90}
									alt="avatar"
									className={css.UserInfoBodyImg}
								/>}
							<Title level={3} style={{paddingTop: 16}}>
								{!user.firstname ? "Shaxsiy ma`lumotlar kiritilmagan" : user.firstname + " " + user.lastname}
							</Title>
							<div style={{paddingTop: 16}}>
								<Tag color="default" key={user?.special?.id}>
									{user?.special?.name}
								</Tag>
							</div>
						</div>
					</Card>
					<Card className={css.cabinetCardUserNavigate}>
						<div className={css.CardUserNavigateLinkBlock}>
							<CabinetNavigateList t={t} id={user?.id}/>
						</div>
					</Card>
				</div>
			)}
		</PageWrapperSingle>
	);
}

export async function getServerSideProps(context) {
	const {query, req} = context;
	const config = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer" + " " + req.cookies.access_token,
		},
		body: JSON.stringify({user_id: req.cookies.user_id}),
	};
	const response = await fetch(url, config);
	const user = await response.json();
	return {
		props: {
			user,
		},
	};
}
