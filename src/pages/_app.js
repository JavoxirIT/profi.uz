import React, { useEffect, useState } from "react";
import NextNProgress from "nextjs-progressbar";
import { StyleProvider } from "@ant-design/cssinjs";
import "../../public/antd.min.css"; //antd theme global css
import "../styles/global.css"; //may-global style
import withTheme from "../theme/index"; // antd theme
import { Switch } from "antd";
import { uz } from "components/language/uz";
import { ru } from "components/language/ru";
import useSessionStorage from "hooks/useSessionStorage";
import { postFetch } from "request/Fetch";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Segmented } from "antd";

export default function App({ Component, pageProps }) {
  const [language, setLanguage] = useSessionStorage(uz, "language");
  const [viloyat, setViloyat] = useState([]);
  const [special, setSpecial] = useState([]);

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
  const [value, setValue] = useState(uz);
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
      <NextNProgress
        color="#f4d201"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
        showOnShallow={true}
      />
      <Component {...pageProps} t={value} viloyat={viloyat} special={special} />
    </StyleProvider>
  );
}
