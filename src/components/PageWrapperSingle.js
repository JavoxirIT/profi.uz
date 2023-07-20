import Head from "next/head";
import React from "react";
import Link from "next/link";
import NotificationIconBlock from "./NotificationIconBlock";
import {Layout, Typography} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import css from "../styles/PageWrapper.module.css";
import FooterMenu from "./Footer/FooterMenu";
import {RiArrowGoBackLine} from "react-icons/ri";
import {useRouter} from "next/router";

const {Header, Footer, Sider, Content} = Layout;

const {Title} = Typography;

export const PageWrapperSingle = ({
	                                  children,
	                                  title,
	                                  pageTitle = "Sahifa",
	                                  t,
                                  }) => {
	const router = useRouter();
	const goBack = (e) => router.back();
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
				{/*	content="iProfi -Профи — сервис поиска специалистов: мастера по ремонту, репетиторы, тренеры, артисты и музыканты, мастера красоты и другие."*/}
				{/*/>*/}
				<meta name="keywords" content="profi, профи, profi.uz, iprofi.uz"/>
				<meta name="viewport" content="width=device-width"/>
				<meta property="og:type" content="website"/>
				<meta property="og:title" content="Muammolaringizni hal qilish uchun iprofini tanlang."/>
				<meta property="og:url" content="//iprofi.uz"/>
				<link rel="manifest" href="../../manifest.json"/>
				<title>{title}</title>
			</Head>
			<Layout className={css.layout}>
				<Header className={css.header}>
					<div className={css.headerMobileMenu} onClick={goBack}>
						<RiArrowGoBackLine className={css.headerMobileMenuIcon} t={t}/>
					</div>
					<Link className={css.headerLogo} href={"/"}>
						profi.uz
					</Link>
					<Title level={4} style={{color: "#d0b400"}}>{pageTitle}</Title>
					<NotificationIconBlock t={t}/>
				</Header>
				<div className={css.content}>
					<div className={css.section}>
						{children}
					</div>
				</div>
				<Footer className={css.footer}>
					<div className={css.footerChildMenu}>
						<FooterMenu t={t}/>
					</div>
					<div className={css.footerChildLink} >
						<div style={{textAlign: "center", fontWeight: '700'}}>
							<a href={"https://cyberarea.uz"}>CYBER AREA UZB | STEBIZ</a>
						</div>
						<div style={{textAlign: "center", fontWeight: '700', paddingLeft: 80, textTransform: "uppercase"}}>
							<Link href='/agreements'>{t.agreemetText}</Link>
						</div>
					</div>
				</Footer>
			</Layout>
		</>
	);
};
