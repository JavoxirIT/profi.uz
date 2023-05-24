import React, {useEffect, useState} from "react";
import {notification, Tabs, Typography} from "antd";
import css from "../../styles/TabCard.module.css";
import MasterWorkComment from "./MasterWorkComment";
import Image from "next/image";
import noImg from "../../img/noimage.png";
import {postFetch} from "../../request/Fetch";

const {Text, Title, Paragraph} = Typography;
const urlImg = process.env.NEXT_PUBLIC_IMG_URL;
const MasterTabCard = ({t, data}) => {
	const [api, contextHolder] = notification.useNotification();
	const openNotificationWithIcon = (type, code, message) => {
		api[type]({
			message: code,
			description: message,
			duration: 5,
		});
	};
	const [starType, setStarType] = useState([])
	const fetchStarType = () => {
		postFetch({path: "star-type"}).then((res) => {
			if (res.status === 200) {
				setStarType(res.data.map((i) => ({value: i.id, label: i.name + "/" + i.name_ru})))
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
	useEffect(() => {
		fetchAllKlass()
		fetchStarType()
		// 	eslint-disable-next-line
	}, [data.id])
	const items = [
		{
			key: 1,
			label: "Batafsil",
			children: (
				<>
					<div>
						<Title level={4}>Batafsil</Title>
						<Text>{data?.description}</Text>
					</div>
					<div key={data?.sub_special?.id}>
						<Title level={4}>{data?.sub_special?.name}</Title>
						<Text>{data?.sub_special?.desc}</Text>
					</div>
				</>
			),
		},
		{
			key: 2,
			label: "Bajargan ishlari",
			children: (
				<div className={css.bajarilganIshlarBlock}>
					{data?.allworks?.map((i, index) => (
						<div className={css.bajarilganIshlarBlockChild} key={i.id}>
							<div>
								{" "}
								<Title level={4}>{i.name}</Title>
								<div>
									<Text>{i.about}</Text>
								</div>
								<div>
									<small>{i.time}</small>
								</div>
							</div>
							<div>
								{i.gallery !== null ? (
									<Image
										priority
										src={urlImg + i.image}
										width={200}
										height={200}
										alt="work"
										className={css.bajarilganIshlarImage}
									/>
								) : (
									<Image
										priority
										src={noImg}
										width={200}
										height={200}
										alt="work"
										className={css.bajarilganIshlarImage}
									/>
								)}
							</div>
						</div>
					))}
				</div>
			),
		},
		{
			key: 3,
			label: "Fikrlar",
			children: <MasterWorkComment t={t} starType={starType} userId={data.id} allClass={allClass} fetchAllKlass={fetchAllKlass}/>,
		},
	];

	return (
		<>
			{contextHolder}
			<Tabs
				defaultActiveKey="1"
				type="card"
				size={"middle"}
				items={items}
				className={css.MasterTab}
			/>
		</>
	);
};
//
export default MasterTabCard;
