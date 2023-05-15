import React from "react";
import { Layout, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import css from "../styles/PageWrapper.module.css";
import DropDown from "./Dropdown/Dropdown";
import { useRouter } from "next/router";
const { Header, Content } = Layout;
const { Title } = Typography;

export default function PageWrapperAuthorization({
  children,
  title,
  pageTitle,
}) {
  const { route } = useRouter();
  let style;
  if (
    route === "/authorization" ||
    route === "/registration" ||
    route === "/anketa" || route === "/myworks"
  ) {
    style = "headerLogo2";
  } else {
    style = "css.headerLogo";
  }

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
            <DropDown />
          </div>
        </Header>

        <Content className={css.content}>{children}</Content>
      </Layout>
    </>
  );
}

// className={route === "/authorization" || route === "/registration" ? css.headerLogo : css.headerLogo2}
