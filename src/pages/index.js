import {PageWrapperGlobal} from "../components/PageWrapperGlobal";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {AiFillHeart} from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import {
	Typography,
	Card,
	Tag,
	Rate,
	Checkbox,
	Form,
	Button,
	notification, Space,
} from "antd";
import css from "../styles/Index.module.css";
import React, {useEffect, useState} from "react";
import {getCookie} from "utils/setCookie";
import {postFetch} from "../request/Fetch";
import img from "../img/noimage.png";
import MasterCarusel from "../components/Master/MasterCarusel";
import MasterModalFilter from "../components/Master/MasterModalFilter";
import Preloader from "../components/Preloder/Preloader"


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const urlAlUser = process.env.NEXT_PUBLIC_ALL_USER;
const urlImg = process.env.NEXT_PUBLIC_IMG_URL;
const {Text, Title} = Typography;
const isType = typeof window !== undefined;

function HomePage({data, t}) {
	const [loading, setLoading] = useState(false)
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

	const [user, setUser] = useState(data.sort(userSort).reverse());
	const [caruselUser, setCaruselUser] = useState(user);
	// console.log("newData", user);
	useEffect(() => {
		if (!data) {
			postFetch({path: "all-user"})
			.then((res) => {
				if (res.status === 200) {
					//  console.log(res.data);
					setUser(res.data);
					setCaruselUser(res.data)
				}
			})
			.catch((err) => {
				openNotificationWithIcon("error", err.code, err.message);
			});
		} else {
			setUser(data);
		}
	}, [data]);
	const [vil, setVil] = useState([]);
	useEffect(() => {
		setLoading(true)
		const path = "viloyat";
		const method = "GET";
		postFetch({path, method, value: ""})
		.then((res) => {
			if (res.status === 200) {
				setVil(
					res.data.viloyat.map((i) => ({value: i.id, label: i.vil_name}))
				);
				setLoading(false)
			}
		})
		.catch((err) => {
			openNotificationWithIcon("error", err.code, err.message);
		});
		// 	eslint-disable-next-line
	}, []);


	const [isSpesial, setSpesial] = useState([]);
	const [ollSpecial, setOllSpecial] = useState([]);
	useEffect(() => {
		postFetch({path: "special", method: "GET", value: ""})
		.then((res) => {
			if (res.status === 200) {
				setSpesial(
					res.data.special.map((i) => ({value: i.id, label: i.name}))
				);
				setOllSpecial(res.data.special)
			}
		})
		.catch((err) => {
			openNotificationWithIcon("error", err.code, err.message);
		});
		// 	eslint-disable-next-line
	}, []);
	// передаём данные в мщдалку
	const [dataFilter, setDataFilter] = useState([])
	const onFinish = async (value) => {
		postFetch({path: "sorted-user", value: JSON.stringify(value)})
		.then((res) => {
			if (res.status === 200) {
				setDataFilter(res.data)
				setUser(res.data)
			} else openNotificationWithIcon("error", res.code, res.message);
		})
		.catch((err) => {
			openNotificationWithIcon("error", err.code, err.message);
		});
	};
	const ChangeLike = (e) => {
		if (getCookie("access_token") === null) {
			openNotificationWithIcon("error", "Iltimos avval ro'yxatdan o'ting");
			return false;
		}
		const like = e.like === 0 ? 1 : 0;
		const value = JSON.stringify({user_id: e.id, like: like});
		postFetch({path: "like", value})
		.then((res) => {
			if (res.status === 200) {
				const dd = data.find((i) => i.id === res.data.user_id);
				const nd = data.filter((i) => i.id !== res.data.user_id);
				dd.like.likes = res.data.likes;
				setUser([...nd, dd].sort(userSort).reverse())
				if (res.data.likes === 1) {
					openNotificationWithIcon("success", "Sevimlilar ro'yxatiga qo'shildi");
				} else {
					openNotificationWithIcon("warning", "Sevimlilar ro'yxatidan chiqarildi");
				}
			}
		})
		.catch((err) => {
			openNotificationWithIcon("error", err.code, err.message);
		});
		// console.log(value);
	};
	const [mayRating, setMayRating] = useState();

	const ratingChange = (id, reyting) => {
		console.log(id, reyting);
		const path = "insert-star";
		const value = JSON.stringify({
			star: String(reyting),
			user_id: Number(id),
		});
		postFetch({path, value})
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				const oneUser = data.find((i) => i.id === res.data.user_id);
				const newArrUser = data.filter((i) => i.id !== res.data.user_id);
				oneUser.reyting = res.data.reyting;
				setUser([...newArrUser, oneUser].sort(userSort).reverse());
				openNotificationWithIcon("success", "Baho qabul qilindi");
			} else {
				openNotificationWithIcon("error", res.code, "Soʻrov bajarilmadi");
			}
		})
		.catch((err) => {
			openNotificationWithIcon("error", err.code, err.message);
		});
	};

	const [filtered, setFiltered] = useState([]);
	useEffect(
		(_) => {
			setFiltered(user);
		},
		[user]
	);

	const Search = (val) => {
		//текущие задачи и новые отфильтрованные задачи
		let currentTodos = [],
			newList = [];
		if (val !== "") {
			//делаем копию нашего стейта
			currentTodos = user;
			//фильтруем стейт в поисках совпадений
			newList = currentTodos.filter((todo) => {
				// значение которое пользователь ввел и которое у нас
				// в стейте делаем строчными буквами чтобы конфликтов не было
				// мало ли пользователь ввель строчными буквами а у нас заглавные
				const lc = todo.firstname.toLowerCase();
				const filter = val.toLowerCase();
				// проверяем есть ли у нас этот элемент если есть возвращаем его
				return lc.includes(filter);
			});
		} else {
			// если в input ничего нету то есть пользователь стер то
			// что ввел тогда возвращаем все задачи
			newList = user;
		}
		setFiltered(newList);
	};

	// console.log("filtered", filtered)
	const [open, setOpen] = useState(false)
	if (!filtered) {
		return <Preloader/>;
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
			Search={Search}
		>
			{contextHolder}
			{/*vil={modalvil}*/}
			<MasterModalFilter
				vil={vil}
				special={isSpesial}
				onFinish={onFinish}
				setOpen={setOpen}
				open={open}
				ollSpecial={ollSpecial}
				user={dataFilter}
				loading={loading}
			/>
			<h1 className={css.IndexTitle}>{t.wrapperTitiel}</h1>
			<MasterCarusel caruselUser={caruselUser}/>
			<main className={css.indexContainer}>
				<div>
					<Title level={4} className={css.indexTitltFilter}>
						Filtrlash
					</Title>
					<div className={css.indexCheckBoxBlock}>
						<Form
							onFinish={onFinish}
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
					<div className={css.indexUserCardInfoHeader}>
						<Title level={4}>Eng Ommaboplari</Title>
						<Button type="primary" onClick={() => setOpen(true)}>Saralash</Button>
					</div>
					{filtered.map((i) => (
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
										<Tag style={{fontSize: 14}} key={i.special?.id || null}>
											{i.special?.name}
										</Tag>
										<br/>
										<Link href={"/index/[id]"} as={`/index/${i.id}`}>
											<Title level={4}>
												{i.firstname} {i.lastname}
											</Title>
										</Link>
										<Rate
											className={css.indexUserRate}
											onChange={(e) => ratingChange(i.id, e)}
											value={i.reyting}
											allowHalf
										/>{" "}
										<div>
											<Text>Umumiy reyting: {i.reyting}</Text>
										</div>
									</div>
								</div>
								<div>
									<AiFillHeart
										aria-labelledby="like"
										onClick={() =>
											ChangeLike({id: i.id, like: i.like?.likes || 0})
										}
										className={
											i.like?.likes === 0 || i.like === "Unauthorized"
												? `${css.indexUserRate}`
												: `${css.indexUserRateTrue}`
										}
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
								<div style={{paddingTop: 16}}>
									{/*{i.sub_special?.map((i) =>*/}
									{/*	<Tag color="default" key={i.id}>*/}
									{/*		{i.name}*/}
									{/*	</Tag>*/}
									{/*)}*/}

								</div>
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
	const newData = await response.json();
	// console.log(newData)
	const data = newData.filter((i) => i.image !== null);
	return {
		props: {
			data,
		},
	};
}

export default HomePage;
