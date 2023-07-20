import React, {useEffect, useState} from 'react';
import {postFetch} from "../request/Fetch";
import PageWrapperAuthorization from "../components/PageWrapperAuthorization";

import parse from 'html-react-parser';

import {Typography} from "antd";

const {Title} = Typography

function Agreements({t, lang}) {

	const styles = {
		width: "100%",
		maxWidth: "calc(100vw - 400px)",
		paddingTop: 20
	}

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

			<div style={styles} >
				<Title level={3}>{t.agreemetText}</Title>
				<div>
					{lang === "uz" ? parse(uzDesc) : parse(ruDesc)}
				</div>
			</div>
		</PageWrapperAuthorization>
	);
}

export default Agreements;