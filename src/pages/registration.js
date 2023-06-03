import React, {useEffect, useState} from "react";
import {Button, Form, Input, notification, Switch, Typography} from "antd";
import {PatternFormat} from "react-number-format";
import PageWrapperAuthorization from "../components/PageWrapperAuthorization";
import Link from "next/link";
import style from "../styles/Authorization.module.css";
import {NumberStr} from "utils/NumberString";
import {postFetch} from "request/Fetch";
import {setCookie} from "utils/setCookie";
import {useRouter} from "next/router";
import useSessionStorage from "hooks/useSessionStorage";

const {Text} = Typography;
const {Item} = Form
const admin = process.env.NEXT_PUBLIC_USER_ADMIN;
const customer = process.env.NEXT_PUBLIC_USER_CUSTOMER;
const spesialist = process.env.NEXT_PUBLIC_USER_SPECIALIST;

function Registration({t}) {
	const router = useRouter();
	const [api, contextHolder] = notification.useNotification();

	const openNotificationWithIcon = (type, code, message) => {
		api[type]({
			message: code,
			description: message,
			duration: 5,
		});
	};
	const [user, setUser] = useSessionStorage([], "user");
	const [isSwitch, setIsSwitch] = useState(2);
	// отправляем запрос для регистрации
	const RegistrationPost = (value) => {
		value.role_id = String(isSwitch);
		value.phone = NumberStr(value["phone"]);
		// отправляем запрос для  регистрации
		postFetch({path: "register", value})
		.then((res) => {
			if (res.status === 200) {
				openNotificationWithIcon(
					"success",
					t.success
				);
				setCookie("access_token", res.data.access_token, res.data.expires_in);
				setCookie("access_type", res.data.token_type);
				setUser(res.data.user);
				//   распридиляем по ролям
				res.data.user.role_id === Number(spesialist)
					? router.push("/cabinet")
					: res.data.user.role_id === Number(admin)
						? router.push("/admin")
						: res.data.user.role_id === Number(customer)
							? router.push("/")
							: null;
			} else if (res.code === "ERR_BAD_REQUEST") {
				openNotificationWithIcon(
					"error",
					`${res.code + " " + res.message}`,
					t.error
				);
			} else if (res.response.status === 302) {
				openNotificationWithIcon(
					"error",
					t.error302
				);
			}
		})
		.catch((err) => openNotificationWithIcon("error", err.code, err.message));
	};
	const onFinishFailed = (errorInfo) => {
		const info = errorInfo.errorFields.map((item) =>
			<p style={{fontSize: 16, color: "#000"}}  key={item.errors}>{item.errors}</p>
		)
		openNotificationWithIcon("error", info);
	};

	useEffect(() => {
		router.prefetch("/cabonet");
	}, [router]);

	return (
		<PageWrapperAuthorization
			title={t.pageTitleRegistration}
			// pageTitle="Ro’yxatdan o’tish"
		>
			{contextHolder}
			<div className={style.AuthorizationFormBlock}>
				<div>
					{" "}
					<Form
						layout="vertical"
						name="basic"
						onFinish={RegistrationPost}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						className={style.AuthorizationForm}
					>
						<Item
							label={t.firstname}
							name="firstname"
							rules={[
								{
									required: true,
									message: t.formReqMessFirstName,
								},
							]}
						>
							<Input className={style.AuthorizationFormInput} placeholder={t.firstname}/>
						</Item>
						<Item
							label={t.lastname}
							name="lastname"
							rules={[
								{
									required: true,
									message: t.formReqMessLastName,
								},
							]}
						>
							<Input className={style.AuthorizationFormInput} placeholder={t.lastname}/>
						</Item>
						<Item
							label={t.phone}
							name="phone"
							rules={[
								{
									required: true,
									message: t.formReqMess,
								},
							]}
						>
							<PatternFormat
								format="+998 (##) ### ## ##"
								allowEmptyFormatting
								mask="_"
								customInput={Input}
								className={style.AuthorizationFormInput}
							/>
						</Item>

						<Item
							label={t.formReqMessParol2}
							name="password"
							rules={[
								{
									required: true,
									message: t.formReqMessParol,
								},
							]}
						>
							<Input.Password
								placeholder={t.formReqMessParol2}
								className={style.AuthorizationFormInput}
							/>
						</Item>
						<Item
							valuePropName="checked"
							wrapperCol={{
								offset: 3,
								span: 24,
							}}
						>
							<Text>{t.customer}</Text>
							<Switch
								style={{margin: "0 20px"}}
								onChange={(e) => setIsSwitch(e.target === false ? 2 : 3)}
							/>
							<Text>{t.specialist}</Text>
						</Item>
						<Item className={style.AuthorizationFormButtonForm}>
							<Button
								type="primary"
								htmlType="submit"
								className={style.AuthorizationFormButton}
							>
								{t.regButtonTitle}
							</Button>
						</Item>
					</Form>

					<div className={style.AuthorizationLinkBlock}>
						<Link href={"/"}>{t.linkHome}</Link>
					</div>
					<div className={style.AuthorizationLinkBlock}>
						<Link href={"/authorization"}>{t.pageTitleAuth}</Link>
					</div>
				</div>
			</div>
		</PageWrapperAuthorization>
	);
}

export default Registration;
