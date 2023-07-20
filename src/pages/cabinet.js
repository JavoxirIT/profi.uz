import React, {useEffect, useState} from "react";
import {PageWrapperSingle} from "../components/PageWrapperSingle";
import {Card, Tag, Typography} from "antd";
import {useRouter} from "next/router";
import {getCookie} from "utils/setCookie";
import Image from "next/image";
import css from "../styles/Cabinet.module.css";
import CabinetNavigateList from "components/Cabinet/CabinetNavigateList";
import userImage from "../img/noimage.png";

const {Title, Text} = Typography;
// const spesialist = process.env.NEXT_PUBLIC_USER_SPECIALIST;
const url = process.env.NEXT_PUBLIC_ONE_USER;
const urlImg = process.env.NEXT_PUBLIC_IMG_URL;

export default function Cabinet({user, t, lang}) {
	// console.log("router",router)
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

	// заранее загружаем страницу
	useEffect(() => {
		router.prefetch("/authorization");
	}, [router]);

	return (
		<PageWrapperSingle title="Kabinet" pageTitle={t.cabinet} t={t}>
			{isChecked && (
				<div className={css.cabinetCardBlock}>
					<Card bordered={false}  className={css.cabinetCardUserInfo}>
						<div className={css.cabinetCardUserInfoBody}>
							{!user.image ? (
								<Image
									src={userImage}
									width={200}
									height={200}
									alt="avatar"
									className={css.UserInfoBodyImg}
									priority
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								/>
							) : (
								<Image
									src={`${urlImg + user.image}`}
									width={200}
									height={200}
									alt="avatar"
									className={css.UserInfoBodyImg}
									priority
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								/>
							)}
							<h1 style={{paddingTop: 16, textAlign: "center", color: "#001529"}}>
								{!user.firstname
									? t.nodata
									: user.firstname + " " + user.lastname}
							</h1>
							<div style={{paddingTop: 16}}>
								<Tag color="default" key={user?.special?.id}>
									{lang === "ru" ? user?.special?.nameru : user?.special?.name}
								</Tag>
							</div>
							<div className={css.UserInfoSubSpecial}>
								{user?.sub_special?.map((i) =>
									<Tag color="default" key={i.id} style={{margin: "5px 0"}}>
										{lang === "ru" ? i.nameru : i.name}
									</Tag>
								)}
							</div>
						</div>
					</Card>
					<Card bordered={false} className={css.cabinetCardUserNavigate}>
						<div className={css.CardUserNavigateLinkBlock}>
							<CabinetNavigateList t={t} id={user.id}/>
						</div>
					</Card>
				</div>
			)}
		</PageWrapperSingle>
	);
}

export async function getServerSideProps(context) {
	const {req} = context;
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
