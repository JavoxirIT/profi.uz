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

export default function Anketa({lang, t}) {
	// сообщение об успешном изминения данных
	const [api, contextHolder] = notification.useNotification();
	const openNotificationWithIcon = (type, code, message) => {
		api[type]({
			message: code, description: message, duration: 3,
		});
	};
	const [user, setUser] = useState({})
	// console.log(user)
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
		postFetch({path: "viloyat", method: "Get"})
		.then((res) => {
			if (res.status === 200) {
				setViloyat(res.data.viloyat);
			}
		})
		.catch((err) => {
			console.error(err);
		});
	}, [setViloyat]);
	//
	useEffect(() => {
		postFetch({path: "special", method: "GET"})
		.then((res) => {
			if (res.status === 200) {
				setSpecial(res.data.special);
			}
		})
		.catch((err) => {
			console.error(err);
		});
	}, []);


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


	// получаем ид регионов и передаём её state для селекта
	const [tuman, setTuman] = useState([]);
	const onViloyatSelect = (e) => {
		postFetch({path: `tuman/${e}`, method: "GET"})
		.then((res) => {
			if (res.status === 200) {
				setTuman(res.data.tuman);
			}
		})
		.catch((err) => {
			console.error(err);
		});
	};

	// получаем ид из спецыалистов
	const [isspecial, setIsSpecial] = useState([]);
	const onSpecialSelect = (e) => {
		postFetch({path: `sub-special/${e}`, method: "GET"})
		.then((res) => {
			if (res.status === 200) {
				setIsSpecial(res.data.special);
			}
		})
		.catch((err) => {
			console.error(err);
		});
	};

	// update user


	// выводим под категории специальностей
	const effectSpecial = (id) => {
		postFetch({path: `sub-special/${id}`, method: "GET"}).then((res) => {
			if (res.status === 200) {
				setIsSpecial(res.data.special);
			}
		}).catch((err) => {
			console.error(err)
		})
	}
	const effectProvince = (id) => {
		postFetch({path: `tuman/${id}`, method: "GET"}).then((res) => {
			if (res.status === 200) {
				setTuman(res.data.tuman);
			}
		}).catch((err) => {
			console.log(err)
		})
	}
	// console.log("1", query)
	useEffect(() => {
		// console.log("2", query)
		const data = {user_id: Number(query.user_id)}
		if (query.user_id) {
			postFetch({path: "one-user", value: data}).then((res) => {
				if (res.status === 200) {
					setUser(res.data)
					// console.log(res.data)
					// const subSpecial = res.data.sub_special.map((i) => ({label: i.name, value: i.id}))
					form.setFieldsValue({
						firstname: res.data?.firstname,
						lastname: res.data?.lastname,
						spets_id: res.data?.spets_id,
						sub_spets: res.data.sub_special.map((i) => i.id),
						region_id: Number(res.data?.distirct.id),
						// district_id: {
						// 	label: res.data.tuman.tuman_name, value: Number(res.data.tuman.id)
						// },
						district_id: Number(res.data.tuman.id),
						description: res.data?.description,
						image: res.data?.image
					})
					effectSpecial(res.data?.spets_id)
					effectProvince(res.data?.distirct.id)
				}
			}).catch((err) => {
				console.error(err)
			})
		}
	}, [form, query.id, query.user_id])

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
		<p className="ant-upload-text">{t.format} JPG, PNG, JPEG</p>
		<p className="ant-upload-hint">{t.rasmTanlang}</p>
		{user && <Image src={urlImage + user?.image} alt={"img"} width={50} height={50}/>}
	</div>);

	// отправляем данные
	const onFinishUserData = (value) => {
		// console.log(value);
		postFetch({path: "user-update", value})
		.then((res) => {
			// console.log("udate user", res);
			if (res.status === 200) {
				openNotificationWithIcon("success", res.statusText, t.saqlandi);
				router.push("/cabinet")
			} else if (res.code === "ERR_BAD_REQUEST") {
				openNotificationWithIcon("error", res.code, t.error404);
			} else {
				openNotificationWithIcon("error", res.code, res.message);
			}
		})
		.catch((err) => {
			openNotificationWithIcon("error", err.code, err.message);
		});
		//  form.resetFields();
	};
	return isChecked && (<PageWrapperAuthorization title={t.pageTitleAnketa}>
		{contextHolder}
		<div className={css.AnketaFormBlock}>
			<Title level={3}>{t.pageTitleAnketa}</Title>
			<Form
				autoComplete="off"
				onFinish={onFinishUserData}
				form={form}
				layout="vertical"
				className={css.AnketaForm}
			>
				<Form.Item
					name="firstname"
					label={t.firstname}
					rules={[{
						required: true, message: t.formReqMessFirstName,
					},]}
				>
					<Input className={css.AnketaFormInput} allowClear/>
				</Form.Item>
				<Form.Item
					name="lastname"
					label={t.lastname}
					rules={[{
						required: true, message: t.formReqMessLastName,
					},]}
				>
					<Input className={css.AnketaFormInput} allowClear/>
				</Form.Item>
				<Form.Item
					name="spets_id"
					label={t.mutaxasislig}
					rules={[{
						required: true, message: t.mutaxasisligRequired,
					},]}
					// hasFeedback
				>
					<Select allowClear onSelect={onSpecialSelect} virtual={false}>
						{special.map((i) => (<Option key={i.id} value={i.id}>
							{lang === "ru" ? i.nameru : i.name}
						</Option>))}
					</Select>
				</Form.Item>
				<Form.Item
					name="sub_spets"
					label={t.yulanishlar}
					rules={[{
						required: true, message: t.yunalishRequired, type: "array",
					},]}
				>
					<Select mode="multiple" virtual={false}>
						{isspecial.map((i) => (<Option key={i.id} value={i.id}>
							{lang === "ru" ? i.nameru : i.name}
						</Option>))}
					</Select>
				</Form.Item>
				<Form.Item
					name="region_id"
					label={t.district}
					rules={[{
						required: true, message: t.districtRequired,
					},]}
					// hasFeedback
				>
					<Select allowClear onSelect={onViloyatSelect} virtual={false}>
						{viloyat.map((i) => (<Option key={i.id} value={i.id}>
							{lang === "ru" ? i.vil_name_ru : i.vil_name}
						</Option>))}
					</Select>
				</Form.Item>
				<Form.Item
					name="district_id"
					label={t.subDistrict}
					rules={[{
						required: true, message: t.subDistrictRequired,
					},]}
					// hasFeedback
				>
					<Select allowClear virtual={false}>
						{tuman.map((i) => (<Option key={i.id} value={i.id}>
							{lang === "ru" ? i.tuman_name_ru : i.tuman_name}
						</Option>))}
					</Select>
				</Form.Item>
				<Form.Item name="description" label={t.batafsilMalumot}>
					<Input.TextArea
						rows={3}
						showCount
						maxLength={500}
						className={css.AnketaFormTextArea}
						allowClear
					/>
				</Form.Item>

				<Form.Item name="image" label={t.rasm} valuePropName="picture">
					<ImgCrop
						showGrid
						rotationSlider
						aspectSlider
						showReset
						modalCancel={t.modalCancel}
						modalOk={t.modalOk}
						modalTitle={t.modalTitle}
						onModalOk={(file) => {
							const formData = new FormData();
							formData.append("image", file);
							const config = {
								method: "POST", headers: {
									authorization: isType ? "Bearer" + " " + getCookie("access_token") : null,
								}, body: formData,
							};
							// console.log(config)
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
						{t.qushish}
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
					<FiUser style={{marginRight: 10}}/> {t.cabinet}
				</Button>
				<Button type="link" size="large" onClick={handleHome}>
					<CgHomeAlt style={{marginRight: 10}}/> {t.home}
				</Button>
			</div>
		</div>
	</PageWrapperAuthorization>);
}