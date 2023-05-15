import React, {useState} from 'react';
import {Button, Card, Form, Input, List, Modal, Space, Upload, Layout, Avatar} from "antd";
import ImgCrop from "antd-img-crop";
import {getCookie} from "../../utils/setCookie";
import Image from "next/image";
import {ImAttachment} from "react-icons/im"
import {FaTelegramPlane} from "react-icons/fa"
import useLocalStorage from "../../hooks/useLocalStorage";
import { Comment } from '@ant-design/compatible';
import css from "../../styles/Master.module.css";

const urlImg = process.env.NEXT_PUBLIC_IMG_URL;
export const CommentList = ({comments}) => {
	console.log(comments)
	// const listData = comments.map((i) => ({
	// 	avatar: `${i.avatar}`,
	// 	title: `${i.content.props.children}`,
	// 	description: `${i.datetime}`,
	// 	key: `${i.id}`
	// }));
	return (
		<List
			dataSource={comments}
			// dataSource={listData}
			// header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
			itemLayout="horizontal"
			renderItem={(props)=> <Comment {...props} />}
			// renderItem={(item) => (
			// 	<List.Item
			// 		key={item.key}
			// 		// extra={
			// 		// 	<Button type="primary" shape="circle">
			// 		// 		2
			// 		// 	</Button>
			// 		// }
			// 	>
			// 		<List.Item.Meta
			// 			avatar={<Avatar src={item.avatar}/>}
			// 			title={<a href={item.href}>{item.title}</a>}
			// 			description={item.description}
			// 		/>
			// 	</List.Item>
			// )}
		/>
	);
};

export const Editor = ({onChange, onSubmit, submitting, value}) => {
	const getBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const [fileList, setFileList] = useState([]);
	const handleCancel = () => setPreviewOpen(false);
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
		);
	};
	const handleChange = ({fileList: newFileList}) => {
		setFileList(newFileList);
	};
	return <>
		<Form onFinish={onSubmit}>
			<Space.Compact block>
				<Form.Item name="image" valuePropName="picture">
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
							formData.append("image", file);
							const config = {
								method: "POST",
								headers: {
									authorization: isType
										? getCookie("access_type") +
										" " +
										getCookie("access_token")
										: null,
								},
								body: formData,
							};

							fetch("", config)
							.then((res) => res.json())
							.then((json) => {
								console.log("json", json);
								//   console.log("json", json.status);
								//   console.log("image:", json.data.image);
								if (json.status === "success") {
									form.setFieldsValue({
										image: json.data.image,
									});
								}
							})
							.catch((err) => {
								console.log(err);
							});
						}}
					>
						<Upload
							style={{width: "100vw"}}
							action=""
							listType="picture"
							fileList={fileList}
							onPreview={handlePreview}
							onChange={handleChange}
						>
							<Button> <ImAttachment/> </Button>
						</Upload>
					</ImgCrop>
				</Form.Item>
				<Form.Item style={{width: "100%",}}>
					<Input onChange={onChange} value={value}/>
				</Form.Item>
				<Form.Item>
					<Button
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
		<Modal
			open={previewOpen}
			title={previewTitle}
			footer={null}
			onCancel={handleCancel}
		>
			<Image src={`${previewImage}`} alt="image" width={330} height={350}/>
		</Modal>
	</>
}

function MasterWorkComment(props) {
	const [ user] = useLocalStorage( [], "user")
	const [comments, setComments] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [value, setValue] = useState("");
	const handleSubmit = () => {
		if (!value) return;
		setSubmitting(true);
		setTimeout(() => {
			setSubmitting(false);
			setValue("");
			setComments([
				...comments,
				{
					author: `${user.firstname + " " + user.lastname}`,
					avatar: `${urlImg + user.image}`,
					content: <p>{value}</p>,
					datetime: new Date().toLocaleString(),
					id: Date.now()
				},
			]);
		}, 1000);
	};
	const handleChange = (e) => {
		setValue(e.target.value);
	};
	return (
		<main className={css.MasterMessageWrapper}>
			<Card className={css.MasterDataMessage}>
				{comments.length > 0 && <CommentList comments={comments}/>}
			</Card>
			<Card className={css.MasterChatEditor}>
				<Editor onChange={handleChange} onSubmit={handleSubmit} submitting={submitting} value={value}/>
			</Card>
		</main>
	);
}

export default MasterWorkComment;