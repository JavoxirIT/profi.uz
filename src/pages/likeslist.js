import React, {useEffect, useState} from 'react';
import {PageWrapperGlobal} from "../components/PageWrapperGlobal";
import {Card, notification, Tag, Typography} from "antd";
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

function Likeslist({data, t}) {
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
			message: code,
			description: message,
			duration: 5,
		});
	};


	const [user, setUser] = useState(data);
	const ChangeLike = (e) => {
		if (getCookie("access_token") === null) {
			openNotificationWithIcon(
				"error",
				"Iltimos avval ro'yxatdan o'ting",
			);
			return false
		}
		const like = e.like === 0 ? 1 : 0;
		const path = "like"
		const method = "POST"
		const value = JSON.stringify({user_id: e.id, like: like})
		postFetch({path, method, value}).then((res) => {
			if (res.status === 200) {
				const dd = data.find(i => i.id === res.data.user_id)
				const nd = data.filter(i => i.id !== res.data.user_id)
				dd.like.likes = res.data.likes
				setUser([...nd, dd])
			}
		}).catch((err) => {
			console.log(err)
		})
		console.log(value)
	}


	return isChecked && (
		<PageWrapperSingle title={"Sevimlilar"} pageTitle="Sevimlilar" t={t}>
			{contextHolder}
			<div style={{paddingTop: 10}}>

				{data.length === 0 ? <Text>Sizda sevimlilar ro`yhati mavjut emas</Text> : data.map((i) => (
					<Card key={i.id} className={css.indexUserCard}>
						<div className={css.indexUserCardInfo}>
							<div className={css.indexUserCardInfo1}>
								{i.image !== null ? (
									<Image
										src={`${urlImg + i.image}`}
										alt="avatar"
										width={70}
										height={70}
										className={css.indexUserImage}
										priority={true}
									/>
								) : (
									<Image
										src={img}
										alt="avatar"
										width={70}
										height={70}
										className={css.indexUserImage}
										priority={true}
									/>
								)}

								<div style={{paddingLeft: 20}}>
									<Text style={{fontSize: 14}} key={i.special?.id || null}>
										{i.special?.name}
									</Text>
									<br/>

									<Link href={"/index/[id]"} as={`/index/${i.id}`}>
										<Title level={4}>
											{i.firstname} {i.lastname}
										</Title>
									</Link>
								</div>
							</div>
							<div>
								<AiFillHeart aria-labelledby="like"
								             onClick={() => ChangeLike({id: i.id, like: i.like?.likes})}
								             className={i.like?.likes === 0 || i.like === "Unauthorized" ?
									             `${css.indexUserRate}` : `${css.indexUserRateTrue}`}/>
							</div>
						</div>
						<div>
							<p style={{marginBottom: 10, paddingTop: 10}}>
								<HiOutlineLocationMarker/>
								<Text style={{paddingLeft: 10}}>
									{i.distirct?.vil_name}
								</Text>
							</p>

							<Tag key={i.sub_special?.id}>{i.sub_special?.name || null}</Tag>
						</div>
					</Card>
				))}
			</div>
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
	};
	const response = await fetch(`${apiUrl + "user-likes"}`, config);
	const data = await response.json();
	// const newData = data.filter((i) => i.image !== null);
	return {
		props: {
			data,
		},
	};
}

export default Likeslist;