import React, {useEffect, useState} from "react";
import {notification, Tabs, Typography} from "antd";
import css from "../../styles/TabCard.module.css";
import MasterWorkComment from "./MasterWorkComment";
import Image from "next/image";
import noImg from "../../img/noimage.png";
import {postFetch} from "../../request/Fetch";

const {Text, Title, Paragraph} = Typography;
const urlImg = process.env.NEXT_PUBLIC_IMG_URL;
const MasterTabCard = ({t,lang, data, fetchAllKlass, allClass, fetchStarType }) => {
	const [api, contextHolder] = notification.useNotification();
	const openNotificationWithIcon = (type, code, message) => {
		api[type]({
			message: code,
			description: message,
			duration: 5,
		});
	};


	useEffect(() => {
		fetchStarType()
		fetchAllKlass()
		// 	eslint-disable-next-line
	}, [data.id])
	const items = [
		{
			key: 1,
			label: t.batafsil,
			children: (
				<>
					<div>
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
			label: t.bajarilgan,
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
							<div className={css.bajarilganIshlarBlockImage} >
								{i.gallery !== null ? (
									<Image
										priority
										src={urlImg + i.image}
										width={650}
										height={500}
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
			label: t.fikirlar,
			children: <MasterWorkComment lang={lang}  t={t} userId={data.id} allClass={allClass} />,
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
