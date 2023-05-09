import React, { useEffect, useState } from "react";
// import NextNProgress from "nextjs-progressbar";
import { StyleProvider } from "@ant-design/cssinjs";
import withTheme from "../theme/index"; // antd theme
import { uz } from "components/language/uz";
import { postFetch } from "request/Fetch";
import Preloader from "components/Preloder/Preloader";
import Preloade2 from "components/Preloder/Preloade2";
import useLang from "../store/store";
import { useRouter } from "next/router";
import "../../public/antd.min.css"; //antd theme global css
import "../styles/global.css"; //may-global style
import "../scripts/loding";
export default function App({ Component, pageProps }) {
  const lang = useLang((state) => state.lang);
  const [loding, setLoding] = useState(false);
  const [language, setLanguage] = useState(uz);
  const router = useRouter();
  // прелоадер
  useEffect(() => {
    //  Обработка начала загрузки
    router.events.on("routeChangeStart", () => {
      setLoding(true);
    });
    //  Обработка окончания загрузки
    router.events.on("routeChangeComplete", () => {
      setLoding(false);
    });
  }, [router.asPath, router.events]);

  //

  useEffect(() => {
    setLanguage(lang);
  }, [lang]);

  return withTheme(
    <StyleProvider hashPriority="high">
      <Preloade2 />
      {loding && <Preloader />}
      <Component
        {...pageProps}
        t={language}
      />
    </StyleProvider>
  );
}
