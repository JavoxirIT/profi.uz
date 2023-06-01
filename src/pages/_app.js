import React, {useEffect, useState} from "react";
// import NextNProgress from "nextjs-progressbar";
import {StyleProvider} from "@ant-design/cssinjs";
import withTheme from "../theme/index"; // antd theme
import {uz} from "components/language/uz";
import {postFetch} from "request/Fetch";
import Preloader from "components/Preloder/Preloader";
import useLang from "../store/languageStore";
import {useRouter} from "next/router";
import "../../public/antd.min.css"; //antd theme global css
import "../styles/global.css"; //may-global style
import "../scripts/loding";
import useLocalStorage from "../hooks/useLocalStorage";

export default function App({Component, pageProps}) {
	const lang = useLang((state) => state.lang);
	const langName = useLang((state) => state.langName);
	const [loading, setLoading] = useState(false);
	const [language, setLanguage] = useState(uz);
	const [isLangName, setLangName] = useState("uz");
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

	// const [online, setOnline] = useLocalStorage("", "loadData")
	//
	// function updateOnlineStatus() {
	// 	document.body.setAttribute("id", "status");
	// 	document.getElementById("status").innerHTML = navigator.onLine
	// 		? "online"
	// 		: "offline";
	// }
	//
	// useEffect(() => {
	// 	window.addEventListener("online", updateOnlineStatus);
	// 	window.addEventListener("offline", updateOnlineStatus);
	// 	// window.addEventListener("online", router.push('/').then(()=> setOnline(true)));
	// 	if (navigator.onLine === true && window.localStorage.loadData !== "1") {
	// 		window.location.reload()
	// 		// router.push(window.history.state.url)
	// 	} else if (navigator.onLine === false) {
	// 		window.localStorage.loadData = "0"
	// 	}
	// 	console.log(window)
	// 	console.log(navigator)
	//
	// }, [online, setOnline])

	useEffect(() => {
		setLanguage(lang);
		setLangName(langName)
	}, [lang, langName]);

	return withTheme(
		<StyleProvider hashPriority="high">
			{loading && <Preloader/>}
			<Component
				{...pageProps}
				t={language}
				lang={isLangName}
			/>
		</StyleProvider>
	);
}
