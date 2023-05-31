import Head from "next/head";
import React from "react";
import Link from "next/link";
import {RiArrowGoBackLine} from "react-icons/ri";
import SerchInp from "./SerchInp";
import NotificationIconBlock from "./NotificationIconBlock";
import css from "../styles/PageWrapper.module.css";

import {Layout} from "antd";
import FooterMenu from "./Footer/FooterMenu";
import CategoryFilter from "../Modal/CategoryFilter";
import {useRouter} from "next/router";

const {Header, Footer, Sider, Content} = Layout;
export const PageWrapperGlobal = ({
	                                  children,
	                                  title = "Профи",
	                                  pageTitle,
	                                  t, Search
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
					content="site for finding and hiring or using various services"
				/>
				<meta name="keywords" content=""/>
				<meta name="viewport" content="width=device-width"/>
				<link rel="manifest" href="../../manifest.json"/>
				<title>{title}</title>
			</Head>
			<Layout className={css.layout}>
				<Header className={css.header}>
					<div className={css.headerBlock1}>
						<div className={css.headerMobileMenu} onClick={goBack}>
							<RiArrowGoBackLine className={css.headerMobileMenuIcon}/>
						</div>
						<Link className={css.headerLogo} href="/">
							profi.uz
						</Link>
						<h1 className={css.headerKondidatText}>{pageTitle}</h1>
						<div className={css.headerSerchMobile}>
							<SerchInp Search={Search} t={t}/>
						</div>
						<div className={css.headerNotificationIconBlock}>
							<NotificationIconBlock t={t}/>
						</div>
					</div>
				</Header>
				<div className={css.content}>
					<div className={css.section}> {children}</div>
				</div>
				<Footer className={css.footer}>
					<FooterMenu t={t}/>
				</Footer>
			</Layout>
		</>
	);
};
