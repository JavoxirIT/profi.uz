import {Button, Card, Tag, Typography, Rate} from "antd";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import css from "../../styles/TabCard.module.css";
import img from "../../../public/assets/images/no-image.png";
import Image from "next/image";
import useLocalStorage from "../../hooks/useLocalStorage";

const {Text, Title} = Typography;

const urlImg = process.env.NEXT_PUBLIC_IMG_URL;

export default function MasterCard({data, t}) {
	const [rateStorage, setRateStorage] = useLocalStorage([], "rate")
	const [rate, setRate] = useState(0);
	const rateChange = (e) => {
		setRateStorage(e);
	}
	useEffect(() => {
		setRate(rateStorage)
	}, [rateStorage]);

	const [user, setUser] = useState([]);
	const router = useRouter();

	//   const goChat = () =>
	//     router.push({ pathname: "/chat", query: { pid: `${data.id}` } });

	return (
		<>
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

					<Title level={3} style={{paddingTop: 16}}>
						{data.firstname} {data.lastname}
					</Title>
					<Text className={css.TabCardText}>{data.distirct.vil_name}</Text>
					<div style={{paddingTop: 16}}>
						<Tag color="default" key={1} style={{margin: 5}}>
							{data.special.name}{" "}
						</Tag>
					</div>
					<div>
						<Rate style={{fontSize: 30}} onChange={rateChange} value={rate}/>
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
		</>
	);
}
