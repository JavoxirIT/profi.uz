import React, { useEffect, useState } from "react";
// import NextNProgress from "nextjs-progressbar";
import { StyleProvider } from "@ant-design/cssinjs";
import withTheme from "../theme/index"; // antd theme
import { uz } from "components/language/uz";
import { postFetch } from "request/Fetch";
import Preloader from "components/Preloder/Preloader";
import useLang from "../store/languageStore";
import { useRouter } from "next/router";
import "../../public/antd.min.css"; //antd theme global css
import "../styles/global.css"; //may-global style
import "../scripts/loding";
export default function App({ Component, pageProps }) {
  const lang = useLang((state) => state.lang);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(uz);
  const router = useRouter();
  // прелоадер
  useEffect(() => {
    //  Обработка начала загрузки
    router.events.on("routeChangeStart", () => {
      setLoading(true);
    });
    //  Обработка окончания загрузки
    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
  }, [router.asPath, router.events]);

  //

  useEffect(() => {
    setLanguage(lang);
  }, [lang]);

  const [unread, setUnread] = useState()
  const unreadMessages = () => {
    const method = "POST"
    const path = "unread-messages"
    postFetch({path, method, value: ""}).then((res) => {
      // console.log("unread",res)
      setUnread(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
   setInterval(()=>{
     unreadMessages()
   }, 10000000)
  }, []);


  return withTheme(
    <StyleProvider hashPriority="high">
      {loading && <Preloader />}
      <Component
        {...pageProps}
        t={language}
        unread={unread}
      />
    </StyleProvider>
  );
}
