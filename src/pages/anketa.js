import React, {useEffect, useState} from "react";
import {
	Form, Input, Modal, Upload, Select, Typography, Button, notification,
} from "antd";
import ImgCrop from "antd-img-crop";
import PageWrapperAuthorization from "components/PageWrapperAuthorization";
import {CloudUploadOutlined} from "@ant-design/icons";
import Image from "next/image";
import css from "../styles/Anketa.module.css";
import {getCookie} from "utils/setCookie";
import {useRouter} from "next/router";
import {FiUser} from "react-icons/fi";
import {CgHomeAlt} from "react-icons/cg";
import {postFetch} from "request/Fetch";

const {Option} = Select;
const {Title, Text} = Typography;

const isType = typeof window !== undefined;
const url = process.env.NEXT_PUBLIC_ONE_USER;
const urlImage = process.env.NEXT_PUBLIC_IMG_URL;

export default function Anketa({}) {
	const [user, setUser] = useState({})
	console.log(user)
	const [form] = Form.useForm();
	const router = useRouter();
	const {query} = router


	const [isChecked, setChecked] = useState(false);

	useEffect(() => {
		if (!getCookie("access_token")) {
			router.push("/authorization").then(() => {
				setChecked(false);
			});
		} else {
			setChecked(true);
		}
	}, [router]);
	const [viloyat, setViloyat] = useState([]);
	const [special, setSpecial] = useState([]);
	useEffect(() => {
		const path = "viloyat";
		const method = "GET";

		postFetch({path, method, value: ""})
		.then((res) => {
			if (res.status === 200) {
				setViloyat(res.data.viloyat);
			}
		})
		.catch((err) => {
			console.log(err);
		});
	}, [setViloyat]);
	//
	useEffect(() => {
		const path = "special";
		const method = "GET";
		postFetch({path, method, value: ""})
		.then((res) => {
			if (res.status === 200) {
				setSpecial(res.data.special);
			}
		})
		.catch((err) => {
			console.log(err);
		});
	}, []);
	// сообщение об успешном изминения данных
	const [api, contextHolder] = notification.useNotification();
	const openNotificationWithIcon = (type, code, message) => {
		api[type]({
			message: code, description: message, duration: 3,
		});
	};

	//   console.log(special);

	// фунуции для кнопок навигацыии button
	const handleCabinet = (e) => {
		e.preventDefault();
		router.back("/cabinet");
	};
	const handleHome = (e) => {
		e.preventDefault();
		router.push("/");
	};
	// заранее подгружаем страниццы
	useEffect(() => {
		router.prefetch("/cabinet");
		router.prefetch("/");
	}, [router]);
	//! действия с upload
	const getBase64 = (file) => new Promise((resolve, reject) => {
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
		setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
	};
	const handleChange = ({fileList: newFileList}) => {
		setFileList(newFileList);
	};
	const uploadButton = (<div style={{width: "100%", height: "auto"}}>
		<CloudUploadOutlined/>
		<p className="ant-upload-text">Format JPG, PNG, JPEG</p>
		<p className="ant-upload-hint">Faylni tanlash</p>
		{user && <Image src={urlImage + user?.image} alt={"img"} width={50} height={50}/>}
	</div>);

	// получаем ид регионов и передаём её state для селекта
	const [tuman, setTuman] = useState([]);
	const onViloyatSelect = (e) => {
		const method = "GET";
		const path = `tuman/${e}`;
		postFetch({path, method, value: ""})
		.then((res) => {
			if (res.status === 200) {
				setTuman(res.data.tuman);
			}
		})
		.catch((err) => {
			console.log(err);
		});
	};
	// получаем ид из спецыалистов
	const [isspecial, setIsSpecial] = useState([]);
	const onSpecialSelect = (e) => {
		const method = "GET";
		const path = `sub-special/${e} `;
		postFetch({path, method, value: ""})
		.then((res) => {
			if (res.status === 200) {
				setIsSpecial(res.data.special);
			}
		})
		.catch((err) => {
			console.log(err);
		});
	};

	// update user
	const onFinishAnketa = (value) => {
		if(value.district_id.value){
			value.district_id = value.district_id.value
		}
		if(value.sub_spets.value){
			value.sub_spets.push( value.sub_spets.value)
		}
		const method = "POST";
		const path = "user-update";
		// console.log(value);
		postFetch({path, method, value})
		.then((res) => {
			// console.log("udate user", res);
			if (res.status === 200) {
				openNotificationWithIcon("success", res.statusText, "Ma'lumotlar saqlandi");
				router.push("/cabinet")
			} else if (res.code === "ERR_BAD_REQUEST") {
				openNotificationWithIcon("error", res.code, "404 holat kodi bilan soʻrov bajarilmadi");
			} else {
				openNotificationWithIcon("error", res.code, res.message);
			}
		})
		.catch((err) => {
			openNotificationWithIcon("error", err.code, err.message);
		});
		//  form.resetFields();
	};


	useEffect(() => {
		const data = {user_id: query.user_id}
		postFetch({path: "one-user", value: data}).then((res) => {
			if (res.status === 200) {
				setUser(res.data)
				// console.log(res.data)
				const subSpecial = res.data.sub_special.map((i) => ({label: i.name, value: i.id}))
				form.setFieldsValue({
					firstname: res.data?.firstname,
					lastname: res.data?.lastname,
					spets_id: res.data?.spets_id,
					sub_spets: subSpecial,
					region_id: Number(res.data?.distirct.id),
					district_id: {
						label: res.data.tuman.tuman_name,
						value: Number(res.data.tuman.id)
					},
					description: res.data?.description,
					image: res.data?.image
				})
			}
		}).catch((err) => {
			console.log(err)
		})
	}, [form, query.id, query.user_id])

	//   Запрос не выполнен с кодом состояния 404.
	return isChecked && (<PageWrapperAuthorization title="Anketa">
		{contextHolder}
		<div className={css.AnketaFormBlock}>
			<Title level={3}>Anketa</Title>
			<Form
				autoComplete="off"
				onFinish={onFinishAnketa}
				form={form}
				layout="vertical"
				className={css.AnketaForm}
				initialValues={{
					// district_id: {
					// 	label: 0,
					// 	value: user.tuman?.id,
					// },
				}}
			>
				<Form.Item
					name="firstname"
					label="To’liq ismingiz"
					rules={[{
						required: true, message: "Ismingizni kiriting!",
					},]}
				>
					<Input className={css.AnketaFormInput} allowClear/>
				</Form.Item>
				<Form.Item
					name="lastname"
					label="To’liq Sharifingiz"
					rules={[{
						required: true, message: "Sharifingizni kiriting!",
					},]}
				>
					<Input className={css.AnketaFormInput} allowClear/>
				</Form.Item>
				<Form.Item
					name="spets_id"
					label="Mutaxasislig"
					rules={[{
						required: true, message: "Mutaxasisligingiz tanlang!",
					},]}
					// hasFeedback
				>
					<Select allowClear onSelect={onSpecialSelect} virtual={false}>
						{special.map((i) => (<Option key={i.id} value={i.id}>
							{i.name}
						</Option>))}
					</Select>
				</Form.Item>
				<Form.Item
					name="sub_spets"
					label="Yo'lanishlar"
					rules={[{
						required: true, message: "Yo'nalishlarni tanlang", type: "array",
					},]}
				>
					<Select mode="multiple" virtual={false}>
						{isspecial.map((i) => (
							<Option key={i.id} value={i.id}>
								{i.name}
							</Option>))}
					</Select>
				</Form.Item>
				<Form.Item
					name="region_id"
					label="Viloyat"
					rules={[{
						required: true, message: "Mutaxasisligingiz tanlang!",
					},]}
					// hasFeedback
				>
					<Select allowClear onSelect={onViloyatSelect} virtual={false}>
						{viloyat.map((i) => (
							<Option key={i.id} value={i.id}>
								{i.vil_name}
							</Option>))}
					</Select>
				</Form.Item>
				<Form.Item
					name="district_id"
					label="Tuman"
					rules={[{
						required: true, message: "Tumanni tanlang!",
					},]}
					// hasFeedback
				>
					<Select allowClear virtual={false}>
						{tuman.map((i) => (
							<Option key={i.id} value={i.id}>
								{i.tuman_name}
							</Option>))}
					</Select>
				</Form.Item>
				<Form.Item name="description" label="Batafsil ma’lumot">
					<Input.TextArea
						rows={3}
						showCount
						maxLength={500}
						className={css.AnketaFormTextArea}
						allowClear
					/>
				</Form.Item>

				<Form.Item name="image" label="Rasm" valuePropName="picture">
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
								method: "POST", headers: {
									authorization: isType ? "Bearer" + " " + getCookie("access_token") : null,
								}, body: formData,
							};
							console.log(config)
							fetch("https://4biz.uz/api/profile-img", config)
							.then((res) => res.json())
							.then((json) => {
								// console.log("json", json);
								//   console.log("json", json.status);
								//   console.log("image:", json.data.image);
								if (json.status === "success") {
									form.setFieldsValue({
										image: json.data.image,
									});
								}
							})
							.catch((err) => {
								openNotificationWithIcon("error", err.code, err.message);
							});
						}}
					>
						<Upload
							style={{width: "100vw"}}
							action=""
							listType="picture-card"
							fileList={fileList}
							onPreview={handlePreview}
							onChange={handleChange}
							progress
						>
							{fileList.length >= 1 ? null : uploadButton}
						</Upload>
					</ImgCrop>
				</Form.Item>
				<Form.Item>
					<Button
						htmlType="submit"
						type="primary"
						size="large"
						style={{width: "100%", marginTop: 10}}
					>
						Saqlash
					</Button>
				</Form.Item>
			</Form>
			<Modal
				open={previewOpen}
				title={previewTitle}
				footer={null}
				onCancel={handleCancel}
			>
				<Image src={`${previewImage}`} alt="image" width={330} height={350}/>
			</Modal>
			<div className={css.AnketaNavigateBlock}>
				<Button type="link" size="large" onClick={handleCabinet}>
					<FiUser style={{marginRight: 10}}/> Kabinet
				</Button>
				<Button type="link" size="large" onClick={handleHome}>
					<CgHomeAlt style={{marginRight: 10}}/> Bosh sahifa
				</Button>
			</div>
		</div>
	</PageWrapperAuthorization>);
}
