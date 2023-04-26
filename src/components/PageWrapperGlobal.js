import Head from "next/head";
import React from "react";
import Links from "./MobileLinks";
import Link from "next/link";
import { MenuOutlined } from "@ant-design/icons";
import { AiOutlineAppstore, AiOutlineHeart } from "react-icons/ai";
import { RiEarthFill } from "react-icons/ri";
import { MdOutlineNotifications } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import SerchInp from "./SerchInp";
import NotificationIconBlock from "./NotificationIconBlock";
import css from "../styles/PageWrapper.module.css";

import { Layout } from "antd";
import FooterMenu from "./Footer/FooterMenu";

const { Header, Footer, Sider, Content } = Layout;
export const PageWrapperGlobal = ({ children, title = "Профи", pageTitle }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="site for finding and hiring or using various services"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width" />
        <meta httpEquiv="Content-Language" content="uz_UZ" />
        <title>{title}</title>
      </Head>
      <Layout className={css.layout}>
        <Header
          className={css.header}
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
          }}
        >
          <div className={css.headerBlock1}>
            <div className={css.headerMobileMenu}>
              <MenuOutlined className={css.headerMobileMenuIcon} />
            </div>
            <Link className={css.headerLogo} href="/">
              profi.uz
            </Link>
            <div className={css.headerCategoryBlock}>
              <AiOutlineAppstore className={css.headerCategoryIcons} />
              <p className={css.headerCategoryText}>Kategoriyalar</p>
            </div>
            <h1 className={css.headerKondidatText}>{pageTitle}</h1>
            <div className={css.headerSerchMobile}>
              <SerchInp />
            </div>
            <NotificationIconBlock />
            {/* <div className={css.headerNotificationIconBlock}>
            </div> */}
          </div>

          {/* <nav className={css.headerNav}>
          <Links />
        </nav> */}
        </Header>
        <Content className={css.content}>
          <div className={css.section}> {children}</div>
        </Content>
        <Footer className={css.footer}>
          <FooterMenu />
        </Footer>
      </Layout>
    </>
  );
};
