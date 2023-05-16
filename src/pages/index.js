import {PageWrapperGlobal} from "../components/PageWrapperGlobal";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {AiFillHeart} from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import {Typography, Card, Tag, Rate, Checkbox, Form, Button, notification} from "antd";
import css from "../styles/Index.module.css";
import React, {useEffect, useState} from "react";
import {getCookie} from "utils/setCookie";
import axios from "axios";
import Preloade from "components/Preloder/Preloade";
import {postFetch} from "../request/Fetch";
import img from "../img/noimage.png";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const urlAlUser = process.env.NEXT_PUBLIC_ALL_USER;
const urlImg = process.env.NEXT_PUBLIC_IMG_URL;
const {Text, Title} = Typography;
const isType = typeof window !== undefined;

function HomePage({newData, t}) {
	// натификацыя
	const [api, contextHolder] = notification.useNotification();
	const openNotificationWithIcon = (type, code, message) => {
		api[type]({
			message: code,
			description: message,
			duration: 5,
		});
	};

	function userSort(a, b) {
		return a.reyting - b.reyting;
	}

	const [user, setUser] = useState(newData.sort(userSort).reverse());
	console.log("newData", user)
	useEffect(() => {
		const config = {
			method: "POST",
			url: urlAlUser,
			headers: {
				"Content-Type": "application/json",
				Authorization: isType
					? getCookie("access_type") + " " + getCookie("access_token")
					: null,
			},
		};
		if (!newData) {
			axios(config)
			.then((res) => {
				if (res.status === 200) {
					//  console.log(res.data);
					setUser(res.data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
		} else {
			setUser(newData);
		}
	}, [newData]);
	const [vil, setVil] = useState([]);
	useEffect(() => {
		const path = "viloyat";
		const method = "GET";

		postFetch({path, method, value: ""})
		.then((res) => {
			if (res.status === 200) {
				setVil(
					res.data.viloyat.map((i) => ({value: i.id, label: i.vil_name}))
				);
			}
		})
		.catch((err) => {
			console.log(err);
		});
	}, []);
	const [isSpesial, setSpesial] = useState([]);
	useEffect(() => {
		const path = "special";
		const method = "GET";
		postFetch({path, method, value: ""})
		.then((res) => {
			if (res.status === 200) {
				setSpesial(
					res.data.special.map((i) => ({value: i.id, label: i.name}))
				);
			}
		})
		.catch((err) => {
			console.log(err);
		});
	}, []);

	// филтрт
	// console.log("user:", user)
	const onFinish = async (value) => {
		const config = {
			method: "POST",
			url: `${apiUrl}sorted-user`,
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify(value),
		};
		// console.log(config);
		await axios(config)
		.then((res) => {
			if (res.status === 200) return setUser(res.data);
			else console.log(res);
		})
		.catch((error) => {
			console.log(error);
		});
	};
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
				const dd = newData.find(i => i.id === res.data.user_id)
				const nd = newData.filter(i => i.id !== res.data.user_id)
				dd.like.likes = res.data.likes
				setUser([...nd, dd])
			}
		}).catch((err) => {
			console.log(err)
		})
		console.log(value)
	}
	const [mayRating, setMayRating] = useState()

	const ratingChange = (id, reyting) => {
		console.log(id, reyting)
		const path = "insert-star"
		const value = JSON.stringify({
			star: String(reyting),
			user_id: Number(id)
		})
		postFetch({path, value}).then((res) => {
			console.log(res)
			if (res.status === 200) {
				const oneUser = newData.find(i => i.id === res.data.user_id)
				const newArrUser = newData.filter(i => i.id !== res.data.user_id)
				oneUser.reyting = res.data.reyting
				setUser([...newArrUser, oneUser])
				openNotificationWithIcon(
					"success",
					"Baho qabul qilindi"
				);
			} else {
				openNotificationWithIcon(
					"error",
					res.code,
					"Soʻrov bajarilmadi"
				);
			}
		}).catch((err) => {
			openNotificationWithIcon(
				"error",
				err.code,
				err.message,
			);
		})
	}


	if (!user) {
		return <Preloade/>;
	}
	return (
		<PageWrapperGlobal
			title="Asosi"
			pageTitle="Kategoriyalar"
			t={t}
			setUser={setUser}
			vil={vil}
			isSpesial={isSpesial}
			onFinish={onFinish}
		>
			{contextHolder}
			<main className={css.indexContainer}>
				<div>
					<Title level={4} className={css.indexTitltFilter}>
						Filtrlash
					</Title>
					<div className={css.indexCheckBoxBlock}>
						<Form
							onFinish={onFinish}
							initialValues={{
								region: [1],
							}}
						>
							<Card className={css.indexCheckBox1}>
								<Text className={css.indexCheckTitle}>VILOYATLAR</Text>
								<Form.Item name="region">
									<Checkbox.Group options={vil}/>
								</Form.Item>
							</Card>
							<Card className={css.indexCheckBox2}>
								<Text className={css.indexCheckTitle}>MUTTAXASISLIKLAR</Text>
								<Form.Item name="special">
									<Checkbox.Group options={isSpesial}/>
								</Form.Item>
							</Card>
							<Form.Item>
								<Button
									htmlType="submit"
									type="primary"
									size="large"
									style={{width: "100%", margin: "10px 0"}}
								>
									Saralash
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
				<div>
					<Title level={4}>Eng Ommaboplari</Title>
					{user.map((i) => (
						<Card key={i.id} className={css.indexUserCard}>
							<div className={css.indexUserCardInfo}>
								<div className={css.indexUserCardInfo1}>
									{i.image !== null ? (
										<Image
											src={`${urlImg + i.image}`}
											alt="avatar"
											width={90}
											height={90}
											className={css.indexUserImage}
											priority={true}
										/>
									) : (
										<Image
											src={img}
											alt="avatar"
											width={90}
											height={90}
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

										<Rate 	className={css.indexUserRate} onChange={(e) => ratingChange(i.id, e)}
										      value={i.reyting} allowHalf/> {" "}
										<div>
											<Text>Umumiy reyting: {i.reyting}</Text>
										</div>

									</div>

								</div>
								<div>
									<AiFillHeart aria-labelledby="like"
									             onClick={() => ChangeLike({id: i.id, like: i.like?.likes})}
									             className={i.like?.likes === 0 || i.like === "Unauthorized" ? `${css.indexUserRate}` : `${css.indexUserRateTrue}`}
									/>
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
			</main>
		</PageWrapperGlobal>
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
	const response = await fetch(urlAlUser, config);
	const data = await response.json();
	const newData = data.filter((i) => i.image !== null);
	return {
		props: {
			newData,
		},
	};
}

export default HomePage;
