import Head from "next/head";
import React from "react";
import Link from "next/link";
import NotificationIconBlock from "./NotificationIconBlock";
import { Layout, Typography } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import css from "../styles/PageWrapper.module.css";
import FooterMenu from "./Footer/FooterMenu";

const { Header, Footer, Sider, Content } = Layout;

const { Title } = Typography;

export const PageWrapperSingle = ({
  children,
  title,
  pageTitle = "Sahifa",
  t,
}) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Language" content="uz_UZ" />
        <meta name="theme-color" content="#0c0d15" />
        <meta
          name="description"
          content="site for finding and hiring or using various services"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width" />
        <link rel="manifest" href="../../manifest.json" />
        <title>{title}</title>
      </Head>
      <Layout className={css.layout}>
        <Header className={css.header}>
          <div className={css.headerMobileMenu}>
            <MenuOutlined className={css.headerMobileMenuIcon} t={t} />
          </div>
          <Link className={css.headerLogo} href={"/"}>
            profi.uz
          </Link>
          <Title level={4}>{pageTitle}</Title>
          <NotificationIconBlock t={t} />
        </Header>
        <Content className={css.content}>
          <div className={css.section}> {children}</div>
        </Content>
        <Footer className={css.footer}>
          <FooterMenu t={t} />
        </Footer>
      </Layout>
    </>
  );
};
