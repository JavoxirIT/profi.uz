import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
	Button,
	Card,
	Form,
	Input,
	Space,
	Upload,
	Layout,
	Typography,
	notification,
} from "antd";
import ImgCrop from "antd-img-crop";
import {getCookie} from "../../utils/setCookie";
import Image from "next/image";
import {ImAttachment} from "react-icons/im"
import {FaTelegramPlane} from "react-icons/fa"
import css from "../../styles/Chat.module.css"
import {Comment} from '@ant-design/compatible';
import {postFetch} from "../../request/Fetch";
import useMessage from "../../store/chatStor";
import ResultNoChats from "../../utils/ResultNoChats";
import {Preloader} from "../../utils/Preloader";


const urlImg = process.env.NEXT_PUBLIC_IMG_URL;
const isType = typeof window !== undefined;
export const CommentList = ({queryID, userid}) => {
	const [mess, setMess] = useState([])
	const message = useMessage(state => state.message)
	const loading = useMessage(state => state.loading)

	const ID = message.find((i => userid === i.user_id || queryID === i.user_id))


	if (loading) {
		return <Preloader/>
	}
	return (
		<div className={css.chatCommentGlobal}>
			{message.map((i) =>
				<div key={i.id}
				     className={userid === i.user_id || queryID === i.user_id ? `${css.chatComment}` : `${css.chatComment2}`}>
					<div
						className={userid === i.user_id || queryID === i.user_id ? `${css.chatCommentchild}` : `${css.chatCommentchild2}`}>
						<small className={css.chatCommentchildTime}>{i.date}</small>
						<p className={css.chatCommentchildText}>{i.message}</p>
						{i.file && <Image src={urlImg + i.file} alt={"img"} width={200} height={200}
						                  style={{borderRadius: "15px 15px 0 15px", marginTop: 10}}/>}
					</div>
				</div>
			)}
		</div>
	);
};

export const Editor = ({onSubmit, submitting, form,}) => {

	return <>
		<Form form={form} onFinish={onSubmit} initialValues={{
			file: ""
		}}>
			<Space.Compact block>
				<Form.Item name="file" valuePropName="picture">
					<ImgCrop
						showGrid
						rotationSlider
						aspectSlider
						showReset
						modalCancel="Закрыть"
						modalOk={"Добавить"}
						modalTitle="Настройки изоброжения"
						onModalOk={(file) => {
							const formData = new FormData();
							formData.append("file", file);
							const config = {
								method: "POST",
								headers: {
									authorization: isType
										? "Bearer" +
										" " +
										getCookie("access_token")
										: null,
								},
								body: formData,
							};

							fetch("https://4biz.uz/api/file-message", config)
							.then((res) => res.json())
							.then((json) => {
								console.log(json)
								if (json.status === "success") {
									form.setFieldsValue({
										file: json.data.image,
									});
								}
							})
							.catch((err) => {
								console.log(err);
							});
						}}
					>
						{/*showUploadList={false}*/}
						<Upload style={{width: "100vw"}}>
							<Button size={"large"} type="primary" className={css.chatFormItems}> <ImAttachment/>
							</Button>
						</Upload>
					</ImgCrop>
				</Form.Item>
				<Form.Item name="message" style={{width: "100%",}}>
					<Input className={css.chatFormItems}/>
				</Form.Item>
				<Form.Item>
					<Button
						className={css.chatFormItems}
						htmlType="submit"
						loading={submitting}
						// onClick={onSubmit}
						type="primary"
					>
						<FaTelegramPlane/>
					</Button>
				</Form.Item>
			</Space.Compact>
		</Form>
	</>
}

function AllMessage({userid, queryID}) {
	const message = useMessage(state => state.message)
	const [form] = Form.useForm()
	const addMessage = useMessage(state => state.addMessage)
	const [submitting, setSubmitting] = useState(false);

	// увидамлене
	const [api, contextHolder] = notification.useNotification();
	const openNotificationWithIcon = (type, code, message) => {
		api[type]({
			message: code,
			description: message,
			duration: 2,
		});
	};
	const handleSubmit = (values) => {
		if (!values) return;
		setSubmitting(true);
		const path = "send-message"
		const method = "POST"
		values.user_id = Number(userid ?? queryID)
		const value = JSON.stringify(values)
		postFetch({path, method, value}).then((res) => {
				if (res.status === 200) {
					let msg = {
						date: res.data.date,
						file: res.data.file,
						id: res.data.id,
						message: res.data.message
						// room_id:4
						// user_id:40
					}
					openNotificationWithIcon("success", "Xabar yuborildi");
					addMessage(msg)
					setSubmitting(false)
					form.resetFields()
				} else if (res.response.status === 302) {
					openNotificationWithIcon("error", "Avval foydalanuvchini tanlang");
					setSubmitting(false)
				} else {
					setSubmitting(false)
					openNotificationWithIcon("error", "Xabar yuborilmadi");
				}
			}
		).catch((err) => {
			openNotificationWithIcon("error", err.code, err.message);
			setSubmitting(false)
		})

	};
	//Скролим вниз чат
	let messagesEnd;
	useLayoutEffect(() => {
		messagesEnd.scrollIntoView({behavior: "smooth"});
	});

	return (
		<Layout className={css.AllMessageWrapper}>
			{contextHolder}
			<Card className={css.ChatDataMessage}>
				<CommentList queryID={queryID} userid={userid}/>
				<div style={{float: "left", clear: "both"}}
				     ref={(el) => {
					     messagesEnd = el;
				     }}>
				</div>
			</Card>
			<div className={css.ChatEditor}>
				<Editor onSubmit={handleSubmit} submitting={submitting} form={form}/>
			</div>
		</Layout>
	);
}

export default AllMessage;