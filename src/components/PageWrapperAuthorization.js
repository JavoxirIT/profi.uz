import React from "react";
import {Layout, Typography} from "antd";
import Head from "next/head";
import Link from "next/link";
import css from "../styles/PageWrapper.module.css";
import DropDown from "./Dropdown/Dropdown";
import {useRouter} from "next/router";

const {Header, Content} = Layout;
const {Title} = Typography;

export default function PageWrapperAuthorization({children, title, pageTitle,}) {
	const {route} = useRouter();
	let style;
	if (
		route === "/authorization" ||
		route === "/registration" ||
		route === "/anketa" || route === "/myworks" || route === "/404" || route === "/500"
	) {
		style = "headerLogo2";
	} else {
		style = "css.headerLogo";
	}

	return (
		<>
			<Head>
				<meta charSet="utf-8"/>
				<meta httpEquiv="Content-Language" content="uz_UZ"/>
				<meta name="theme-color" content="#0c0d15"/>
				<meta
					name="description"
					content="iProfi - mutaxassislarni qidirish xizmati: ta'mirlash ustalari, repetitorlar, murabbiylar, rassomlar va musiqachilar, go'zallik ustalari va boshqalar."
				/>
				{/*<meta*/}
				{/*	name="description"*/}
				{/*	content="iProfi — сервис поиска специалистов: мастера по ремонту, репетиторы, тренеры, артисты и музыканты, мастера красоты и другие."*/}
				{/*/>*/}
				<meta name="keywords" content="profi, профи, iprofi, iprofi.uz"/>
				<meta name="viewport" content="width=device-width"/>
				<meta property="og:type" content="website"/>
				<meta property="og:title" content="Muammolaringizni hal qilish uchun iprofini tanlang."/>
				<meta property="og:url" content="//iprofi.uz"/>
				<link rel="manifest" href="../../manifest.json"/>
				<title>{title}</title>
			</Head>
			<Layout
				className={css.layout}
				//   style={{
				//     display: "flex",
				//     flexDirection: "column",
				//     justifyContent: "center",
				//     alignItems: "center",
				//   }}
			>
				<Header className={css.header}>
					<Link className={style} href="/">
						profi.uz
					</Link>
					<Title level={4}>{pageTitle}</Title>
					<div>
						<DropDown/>
					</div>
				</Header>

				<Content className={css.content}>{children}</Content>
			</Layout>
		</>
	);
}

// className={route === "/authorization" || route === "/registration" ? css.headerLogo : css.headerLogo2}
