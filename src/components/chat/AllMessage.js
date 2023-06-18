import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
	Button,
	Card,
	Form,
	Input,
	Space,
	Upload,
	Layout,
	notification, Spin,
} from "antd";
import ImgCrop from "antd-img-crop";
import {getCookie} from "../../utils/setCookie";
import Image from "next/image";
import {ImAttachment} from "react-icons/im"
import {FaTelegramPlane} from "react-icons/fa"
import css from "../../styles/Chat.module.css"
import {postFetch} from "../../request/Fetch";
import useMessage from "../../store/chatStor";
import ResultNoChats from "../../utils/ResultNoChats";
import {Preloader} from "../../utils/Preloader";
import {scrollIntoTheView} from "../../utils/scrollIntoTheView";


const urlImg = process.env.NEXT_PUBLIC_IMG_URL;
const isType = typeof window !== undefined;
export const CommentList = ({queryID, userid, messageLoading, t, name}) => {
	const message = useMessage(state => state.message)
	const loading = useMessage(state => state.loading)
	const [loadings, setLoading] = useState(true);

	// const imageLoader = ({src, width, quality}) => {
	// 	return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
	// };

	// console.log(message)
	if (loading) {
		return <ResultNoChats t={t} name={name}/>
	} else if (messageLoading) {
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
						                  className={css.chatCommentImage} loading="lazy"/>}

					</div>
				</div>
			)}

		</div>
	);
};

export const Editor = ({onSubmit, submitting, form,}) => {

	return <>
		<Form form={form} onFinish={onSubmit} autoComplete="off" initialValues={{
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

function AllMessage({userid, queryID, messageLoading, t, name, fetchAllRooms}) {
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
			duration: 10,
			style: {
				width: 600,
			},
		});
	};
	const handleSubmit = (values) => {
		if (!values) return;
		setSubmitting(true);
		values.user_id = Number(userid ?? queryID)
		const value = JSON.stringify(values)
		postFetch({path: "send-message", value}).then((res) => {
				console.log("1", res.data)
				if (res.status === 200) {
					let msg = {
						date: res.data.date,
						file: res.data.file,
						id: res.data.id,
						message: res.data.message,
						room_id: res.data.room_id,
						user_id: res.data.user_id
					}
					openNotificationWithIcon("success", t.xabarYuborildi);
					addMessage(msg)
					setSubmitting(false)
					fetchAllRooms()
					form.resetFields()

				} else if (res.response.status === 302) {
					openNotificationWithIcon("error", t.avalTanlang);
					setSubmitting(false)
				} else {
					setSubmitting(false)
					openNotificationWithIcon("error", "");
				}
			}
		).catch((err) => {
			openNotificationWithIcon("error", err.code, err.message);
			setSubmitting(false)
		})

	};
	//Скролим вниз чат
	useLayoutEffect(() => {
		scrollIntoTheView("scroll")
	});

	return (
		<Layout className={css.AllMessageWrapper}>
			{contextHolder}
			<Card className={css.ChatDataMessage}>
				<CommentList queryID={queryID} userid={userid} messageLoading={messageLoading} t={t} name={name}/>
				<div style={{float: "left", clear: "both"}} id="scroll" />
			</Card>
			<div className={css.ChatEditor}>
				<Editor onSubmit={handleSubmit} submitting={submitting} form={form}/>
			</div>
		</Layout>
	);
}

export default AllMessage;