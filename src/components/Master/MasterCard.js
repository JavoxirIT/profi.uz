import {Button, Card, Tag, Typography, Rate, notification, Spin, Space, Checkbox, Form} from "antd";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import css from "../../styles/TabCard.module.css";
import img from "../../img/noimage.png";
import Image from "next/image";
import useLocalStorage from "../../hooks/useLocalStorage";
import {postFetch} from "../../request/Fetch";
import MasterComplaint from "./MasterComplaint";
import ModalCenter from "../../Modal/ModalCenter";
import {HiOutlineLocationMarker} from "react-icons/hi";

const {Text, Title} = Typography;

const urlImg = process.env.NEXT_PUBLIC_IMG_URL;

export default function MasterCard({data, t, user_id, starType, fetchAllKlass, openNotificationWithIcon}) {
	console.log(data)
	const [reyt, setReyt] = useState(data.reyting)
	const [reyting, setReyting] = useState(data.reyting)
	const rateChange = (e) => {
		setReyting(e)
		const path = "insert-star"
		const value = JSON.stringify({
			star: String(e), user_id: Number(user_id)
		})
		postFetch({path, value}).then((res) => {
			// console.log(res)
			if (res.status === 200) {
				setReyt(res.data.reyting)
				openNotificationWithIcon("success", "Baho qabul qilindi");
			} else {
				openNotificationWithIcon("error", res.code, "Soʻrov bajarilmadi");
			}
		}).catch((err) => {
			openNotificationWithIcon("error", err.code, err.message,);
		})
	}

	const [user, setUser] = useState([]);
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = (key) => {
		setIsModalOpen(true);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};


	//****************************** fikir qpldirish
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [values, setValue] = useState("");
	const openModal = () => {
		setOpen(true)
	}
	const handleCancelModal = () => {
		setOpen(false)
	}
	const [form] = Form.useForm();

	function handleChange(e) {
		setValue(e.target.value);
	}

	// console.log(starType)
	const onClass = (val) => {
		setLoading(true)
		const data = {star: Number(values), user_id: user_id}
		// console.log(data)
		postFetch({path: "insert-klass", value: data}).then((res) => {
			// console.log(res)
			fetchAllKlass()
			setOpen(false)
			setLoading(false)
			openNotificationWithIcon("success", "Fikir qo`shganiz uchun raxmat");
		}).catch((err) => {
			openNotificationWithIcon("error", err.code, err.message);
			setLoading(false)
		})
	}


	return (<>
		<Card className={css.TabCard}>
			<div className={css.UserTabCard}>
				{data.image ? (<Image
					className={css.UserTabCardImage}
					priority
					src={urlImg + data.image}
					width={90}
					height={90}
					alt="avatar"
					// placeholder="blur"
					// blurDataURL={user.thumbnailUrl}
				/>) : (<Image
					width={150}
					src={img}
					preview={user.thumbnailUrl}
					alt="img"
				/>)}
				{/*  */}

				<h4 className={css.UserTabCardName}>
					{data.firstname} {data.lastname}
				</h4>
				<Text className={css.TabCardText}> <HiOutlineLocationMarker/>  {data?.distirct?.vil_name}</Text>
				<div style={{paddingTop: 16}}>
					<Tag color="default" key={1} style={{margin: 5}}>
						{data?.special?.name}{" "}
					</Tag>
				</div>
				<div style={{padding: "10px 0"}}>
					{data.sub_special.map((i) =>
						<Tag color="default" key={i.id}>
							{i.name}
						</Tag>
					)}

				</div>
				<div style={{textAlign: "center"}}>
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
					pathname: "/chat", query: {id: data.id, name: data.lastname + " " + data.firstname},
				});
			}}
			type="primary"
			size="large"
			className={css.TabCardButton}
		>
			Murojaat qilish
		</Button>
		<Button type="primary"
		        size="large" className={css.TabCardButton} onClick={openModal}>Fikir qoldirish</Button>
		<Button
			onClick={() => showModal(data.id)}
			type="primary"
			size="large"
			danger
			className={css.TabCardButton}
		>
			{t.complaintModalTitle}
		</Button>
		<ModalCenter title="Fikir qoldirish" open={open} handleCancel={handleCancelModal} width={600}>
			<Spin spinning={loading}>
				<Space direction="vertical" style={{width: "100%"}}>
					{starType.map((i) => <Checkbox key={i.value} checked={values === i.value} value={i.value}
					                               onChange={handleChange}>{i.label}</Checkbox>)}
					<div className={css.MasterCommentListBtn}>
						<Button type="primary" onClick={onClass}>Qo`shish</Button>
					</div>
				</Space>
			</Spin>
		</ModalCenter>
		<MasterComplaint userId={user_id} open={isModalOpen} t={t} handleCancel={handleCancel}
		                 setIsModalOpen={setIsModalOpen} openNotificationWithIcon={openNotificationWithIcon}/>
	</>);
}
