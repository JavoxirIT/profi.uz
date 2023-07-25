import React, {useEffect, useState} from 'react';
import {postFetch} from "../request/Fetch";
import PageWrapperAuthorization from "../components/PageWrapperAuthorization";
import parse from 'html-react-parser';
import Link from "next/link";
import {Typography} from "antd";
import css from "../styles/Agreements.module.css"
import style from "../styles/Authorization.module.css";

const {Title} = Typography

function Agreements({t, lang}) {


	const [uzDesc, setUzDesc] = useState('');
	const [ruDesc, setRuDesc] = useState('');

	// agreement ru
	useEffect(() => {
		postFetch({path: "policy/ru", method: "GET"}).then(res => {
			setRuDesc(res.data.text)
		}).catch(err => {
			console.log("ru err", err)
		})
	}, [])


	// agreement uz
	useEffect(() => {
		postFetch({path: "policy/uz", method: "GET"}).then(res => {
			setUzDesc(res.data.text)
		}).catch(err => {
			console.log("ru err", err)
		})
	}, [])


	return (
		<PageWrapperAuthorization title={t.agreemetText}>

			<div className={css.agreementsBlock}>
				<Title level={3}>{t.agreemetText}</Title>
				<div className={css.agreementsBlockText}>
					{lang === "uz" ? parse(uzDesc) : parse(ruDesc)}
				</div>
				<div className={style.AuthorizationLinkBlock}>
					<Link href={"/"}>
                <span className={style.AuthorizationLinkSpan}>
                  {t.linkHome}
                </span>
					</Link>
				</div>
				<div className={style.AuthorizationLinkBlock}>
					<Link href={"/registration"}>
						{" "}
						<span className={style.AuthorizationLinkSpan}>
                  {t.linkRegistration}
                </span>{" "}
					</Link>
				</div>
				<div className={style.AuthorizationLinkBlock}>
					<Link href={"/authorization"}><span
						className={style.AuthorizationLinkSpan}>{t.pageTitleAuth}</span></Link>
				</div>
			</div>
		</PageWrapperAuthorization>
	);
}

export default Agreements;