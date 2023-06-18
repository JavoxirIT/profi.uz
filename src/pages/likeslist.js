import React, {useEffect, useState} from 'react';
import {Card, notification, Rate, Tag, Typography} from "antd";
import css from "../styles/Index.module.css";
import Image from "next/image";
import img from "../img/noimage.png";
import Link from "next/link";
import {AiFillHeart} from "react-icons/ai";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {getCookie} from "../utils/setCookie";
import {postFetch} from "../request/Fetch";
import {PageWrapperSingle} from "../components/PageWrapperSingle";
import {useRouter} from "next/router";


const apiUrl = process.env.NEXT_PUBLIC_API_URL
const urlImg = process.env.NEXT_PUBLIC_IMG_URL
const {Text, Title} = Typography;

function LikeList({data, t, lang}) {
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

	const clickUser = (e) => {
		router.push(`/index/[id]`)
	}

	const [api, contextHolder] = notification.useNotification();
	// натификацыя
	const openNotificationWithIcon = (type, code, message) => {
		api[type]({
			message: code, description: message,  duration: 10,
			style: {
				width: 600,
			},
		});
	};

	function userSort(a, b) {
		return a.reyting - b.reyting;
	}

	const [user, setUser] = useState(data);
	const ChangeLike = (e) => {
		if (getCookie("access_token") === null) {
			openNotificationWithIcon("error", t.likenotification,);
			return false
		}
		let like;
		if (e.like === false) {
			like = 1
		} else if (e.like?.likes === 0) {
			like = 1
		} else {
			like = 0
		}
		const value = JSON.stringify({user_id: e.id, like: like})
		postFetch({path: "like", value}).then((res) => {
			if (res.status === 200) {
				const dd = data.find(i => i.id === res.data.user_id)
				const nd = data.filter(i => i.id !== res.data.user_id)
				dd.like.likes = res.data.likes
				setUser([...nd, dd].sort(userSort).reverse())
			}
			if (res.data.likes === 1) {
				openNotificationWithIcon("success", t.qushildi);
			} else {
				openNotificationWithIcon("warning", t.chiqarildi);
			}
		}).catch((err) => {
			openNotificationWithIcon("error", err.code, err.message);
		})
		// console.log(value)
	}


	return isChecked && (<PageWrapperSingle title={t.pageTitleLike} pageTitle={t.pageTitleLike} t={t}>
		{contextHolder}
		<div style={{paddingTop: 20}}>

			{data.length === 0 ? <Text>{t.likeNoData}</Text> : data.map((i) => (
				<Card bordered={false} hoverable key={i.id} className={css.indexUserCard}>
					<div className={css.indexUserCardInfo}>
						<div className={css.indexUserCardInfo1}>
							{i.image !== null ? (<Image
								src={`${urlImg + i.image}`}
								alt="avatar"
								width={70}
								height={70}
								className={css.indexUserImage}
								priority={true}
							/>) : (<Image
								src={img}
								alt="avatar"
								width={70}
								height={70}
								className={css.indexUserImage}
								priority={true}
							/>)}

							<div style={{paddingLeft: 20}}>
								<Tag style={{fontSize: 14, marginBottom: 10}} key={i.special?.id || null}>
									{lang === "ru" ? i.special?.nameru : i.special?.name}
								</Tag>
								<br/>

								<Link href={"/index/[id]"} as={`/index/${i.id}`}>
									<Title level={4}>
										{i.firstname} {i.lastname}
									</Title>
								</Link>
								<Rate
									className={css.indexUserRate}
									value={i.reyting}
									allowHalf
								/>{" "}
								<div>
									<Text>{t.umumiyReyting}: {i.reyting}</Text>
								</div>
							</div>
						</div>
						<div>
							<AiFillHeart
								aria-labelledby="like"
								onClick={() => ChangeLike(i)}
								className={i.like?.likes === 0 || i.like === "Unauthorized" || i.like === false || i.like === 0 ? `${css.indexUserRate}` : `${css.indexUserRateTrue}`}
							/>
						</div>
					</div>
					<div>
						<p style={{marginBottom: 10, paddingTop: 10}}>
							<HiOutlineLocationMarker/>
							<Text style={{paddingLeft: 10}}>
								{lang === "ru" ? i.distirct?.vil_name_ru : i.distirct?.vil_name}
							</Text>
						</p>

						<Tag
							key={i.sub_special?.id}>{lang === "ru" ? i.sub_special?.nameru : i.sub_special?.name || null}</Tag>
					</div>
				</Card>))}
		</div>
	</PageWrapperSingle>);
}

export async function getServerSideProps(context) {
	const {req} = context;

	const config = {
		method: "POST", headers: {
			"Content-Type": "application/json", Authorization: "Bearer" + " " + req.cookies.access_token,
		},
	};
	if (req.cookies.access_token) {
		const response = await fetch(`${apiUrl + "user-likes"}`, config);
		const data = await response.json();
		// const newData = data.filter((i) => i.image !== null);
		return {
			props: {
				data,
			},
		};
	} else {
		return {
			props: {
				data: [],
			},
		}
	}
}

export default LikeList;