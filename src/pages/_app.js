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
  const [viloyat, setViloyat] = useState([]);
  const [special, setSpecial] = useState([]);
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
    const path = "viloyat";
    const method = "GET";

    postFetch({ path, method, value: "" })
      .then((res) => {
        if (res.status === 200) {
          setViloyat(res.data.viloyat);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setViloyat]);
  //
  useEffect(() => {
    const path = "special";
    const method = "GET";
    postFetch({ path, method, value: "" })
      .then((res) => {
        if (res.status === 200) {
          setSpecial(res.data.special);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setLanguage(lang);
  }, [lang]);

  return withTheme(
    <StyleProvider hashPriority="high">
      {/* <Switch
        onChange={(e) => setLanguage(e === false ? uz : ru)}
        checkedChildren="uz"
        unCheckedChildren="ru"
        className="language-switch"
      /> */}
      {/* <Segmented
        className="language-switch"
        options={["uz", "ru"]}
        value={value}
        onChange={(e) => setValue(e === "uz" ? ru : uz)}
      /> */}
      {/* <NextNProgress
        color="#f4d201"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
        showOnShallow={true}
      /> */}
      <Preloade2 />
      {loding && <Preloader />}
      <Component
        {...pageProps}
        t={language}
        viloyat={viloyat}
        special={special}
      />
    </StyleProvider>
  );
}
