import {Button, Card, Tag, Typography, Rate, notification} from "antd";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import css from "../../styles/TabCard.module.css";
import img from "../../img/noimage.png";
import Image from "next/image";
import useLocalStorage from "../../hooks/useLocalStorage";
import {postFetch} from "../../request/Fetch";
import MasterComplaint from "./MasterComplaint";

const {Text, Title} = Typography;

const urlImg = process.env.NEXT_PUBLIC_IMG_URL;

export default function MasterCard({data, t, user_id}) {
	const [api, contextHolder] = notification.useNotification();
	const openNotificationWithIcon = (type, code, message) => {
		api[type]({
			message: code,
			description: message,
			duration: 3,
		});
	};
	const [reyt, setReyt] = useState(data.reyting)
	const [reyting, setReyting] = useState(data.reyting)
	const rateChange = (e) => {
		setReyting(e)
		const path = "insert-star"
		const value = JSON.stringify({
			star: String(e),
			user_id: Number(user_id)
		})
		postFetch({path, value}).then((res) => {
			// console.log(res)
			if (res.status === 200) {
				setReyt(res.data.reyting)
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

	const [user, setUser] = useState([]);
	const router = useRouter();

	//   const goChat = () =>
	//     router.push({ pathname: "/chat", query: { pid: `${data.id}` } });
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = (key) => {
		setIsModalOpen(true);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			{contextHolder}
			<Card className={css.TabCard}>
				<div className={css.UserTabCard}>
					{data.image ? (
						<Image
							className={css.UserTabCardImage}
							priority
							src={urlImg + data.image}
							width={90}
							height={90}
							alt="avatar"
							// placeholder="blur"
							// blurDataURL={user.thumbnailUrl}
						/>
					) : (
						<Image
							width={150}
							src={img}
							preview={user.thumbnailUrl}
							alt="img"
						/>
					)}
					{/*  */}

					<h4 className={css.UserTabCardName}>
						{data.firstname} {data.lastname}
					</h4>
					<Text className={css.TabCardText}>{data?.distirct?.vil_name}</Text>
					<div style={{paddingTop: 16}}>
						<Tag color="default" key={1} style={{margin: 5}}>
							{data?.special?.name}{" "}
						</Tag>
					</div>
					<div style={{textAlign: "center"}} >
						<Rate style={{fontSize: 30}} onChange={rateChange} value={reyting} allowHalf/> {" "}
						<div>
							<Text>umumiy reyting: {reyt}</Text>
						</div>
					</div>
				</div>
			</Card>
			<Button
				onClick={() => {
					router.push({
						pathname: "/chat",
						query: {id: data.id, name: data.lastname + " " + data.firstname},
					});
				}}
				type="primary"
				size="large"
				className={css.TabCardButton}
			>
				Murojaat qilish
			</Button>
			<Button
				onClick={() => showModal(data.id)}
				type="primary"
				size="large"
				className={css.TabCardButton}
			>
				{t.complaintModalTitle}
			</Button>
			<MasterComplaint userId={user_id} open={isModalOpen} t={t} handleCancel={handleCancel} setIsModalOpen={setIsModalOpen}/>
		</>
	);
}
