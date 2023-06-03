import React, {useEffect, useState} from 'react';
import {useStepsForm} from 'sunflower-antd';
import {Steps, Input, Button, Form, Result, Checkbox, Row, Col, Card, Rate, Tag, Typography, Space, Spin} from 'antd';
import ModalCenter from "../../Modal/ModalCenter";
import {useRouter} from "next/router";
import css from "../../styles/Index.module.css";
import Image from "next/image";
import img from "../../img/noimage.png";
import {AiFillHeart} from "react-icons/ai";
import Link from "next/link";
import {HiOutlineLocationMarker} from "react-icons/hi";
import useSessionStorage from "../../hooks/useSessionStorage";

const imgUrl = process.env.NEXT_PUBLIC_IMG_URL
const {Text, Title} = Typography;


let subArr = []
const MasterModalFilter = ({special, vil, onFinish, open, setOpen, loading, user, lang, t}) => {
	const items = [{
		title: t.viloyatniTanlang,
	}, {
		title: t.yunalish,
	}, {
		title: t.ichkiyunalish,
	}, {
		title: t.result,
	},]
	const [isPath, setIsPath] = useSessionStorage(null, "dataPath")

	const {pathname} = useRouter()
	useEffect(() => {
		if (pathname === "/" && isPath === null) {
			setOpen(true)
		}
	}, [isPath, pathname, setOpen])
	const handleCancel = () => {
		setOpen(false)
	}

	const [specialValue, setSpecialValue] = useState([])
	const [newValue, setNewValue] = useState([])
	useEffect(() => {
		special.map((i) => i.subspecial.filter((sub) => sub.p_type_id === specialValue ? subArr.push(sub) : null))
		setNewValue(Array.from(new Set(subArr)))
	}, [special, specialValue]);

	const [checked, setChecked] = useState(null)
	const [values, setValues] = useState(vil)
	const onRegionChange = (e) => {
		setChecked(e.target.value)
	}

	const {
		form, current, gotoStep, stepsProps, formProps, submit, formLoading,
	} = useStepsForm({
		async submit(values) {
			const {region, special} = values;
			onFinish(values);
			setIsPath(pathname)
			setSpecialValue(null)
			form.resetFields()
			// setTimeout(() => {
			// 	gotoStep(current - 3)
			//
			// }, 3000)
			await new Promise(r => setTimeout(r, 500));
			return 'ok';
		}, total: 4,

	});
	//очищаем массив когда возвращаемся с 3 степа
	const resetArr = () => {
		subArr.length = 0
		setNewValue(newValue.splice(0, newValue.length))
	}

	// сортировка по алфавиту
	function userSort(a, b) {
		if (lang === "ru") {
			if (a.nameru > b.nameru) return 1;
			if (a.nameru === b.nameru) return 0;
			if (a.nameru < b.nameru) return -1;
		} else {
			if (a.name > b.name) return 1;
			if (a.name === b.name) return 0;
			if (a.name < b.name) return -1;
		}
	}

	const formList = [<>
		<Form.Item name="region">
			<Checkbox.Group>
				<div className={css.MasterModalFilterCheckbox}>
					{vil.map((i, index) => <Checkbox
						key={i.id}
						value={i.id}
						onChange={onRegionChange}
						checked={checked === i.id}
					>
						{lang === 'ru' ? i.vil_name_ru : i.vil_name}
					</Checkbox>)}
				</div>
			</Checkbox.Group>
		</Form.Item>
		<Form.Item className={css.MasterModalFilterBtn}>
			<Button type="primary" onClick={() => gotoStep(current + 1)}>{t.qabul}</Button>
		</Form.Item>
	</>,
		<>
			<Form.Item>
				<Checkbox.Group>
					<div className={css.MasterModalFilterCheckbox}>
						{special.sort(userSort).map((i, index) => <Checkbox
							key={i.id}
							value={i.id}
							onChange={(e) => setSpecialValue(e.target.value)}
							// checked={specialValue === i.value}
						>
							{lang === 'ru' ? i.nameru : i.name}
						</Checkbox>)}

					</div>
				</Checkbox.Group>
			</Form.Item>
			<Form.Item className={css.MasterModalFilterBtn}>
				<Button
					style={{marginRight: 10}}
					type="primary"
					loading={formLoading}
					onClick={() => gotoStep(current + 1)}
				>
					{t.qabul}
				</Button>
				<Button onClick={() => {
					gotoStep(current - 1);
					resetArr()
				}}>{t.qaytish}</Button>
			</Form.Item>
		</>,
		<>
			<Space direction="vertical">
				<Form.Item name="special">
					<Checkbox.Group>
						<div className={css.MasterModalFilterCheckbox}>
							{newValue.length !== 0 ? newValue.sort(userSort).map((i) => <Checkbox
								key={i.id}
								value={i.id}
								// checked={specialValue === i.value}
							>
								{lang === 'ru' ? i.nameru : i.name}
							</Checkbox>) : null}

						</div>
					</Checkbox.Group>
				</Form.Item>
			</Space>
			<Form.Item className={css.MasterModalFilterBtn}>
				<Button
					style={{marginRight: 10}}
					type="primary"
					loading={formLoading}
					onClick={() => {
						submit().then(result => {
							if (result === 'ok') {
								gotoStep(current + 1);
							}
						});
					}}
				>
					{t.qabul}
				</Button>
				<Button onClick={() => {
					gotoStep(current - 1);
					resetArr()
				}}>{t.qaytish}</Button>
			</Form.Item>
		</>];

	return (<ModalCenter
		title={t.modaltitle}
		open={open}
		handleCancel={handleCancel}
		width={"max-content"}>
		<Steps {...stepsProps} items={items}/>
		<div style={{marginTop: 15}}>
			<Spin spinning={loading}>
				<Form  {...formProps} form={form}>
					{formList[current]}
				</Form>
			</Spin>

			{current === 3 && (user.length !== 0 ? <Result
				status="success"
				title={t.topildi}
				extra={<>
					<Button
						type="primary"
						onClick={() => {
							// form.resetFields();
							gotoStep(0);
							// subArr = Array()
						}}
					>
						{t.qayta}
					</Button>
					{/*<div className={css.MasterModalFilterUserCard}>*/}
					{/*	{user.map((i) =>*/}
					{/*		<div key={i.id}>*/}
					{/*			<Card className={css.indexUserCardBody} key={i.id}>*/}
					{/*				<div className={css.indexUserCardHeader} key={i.id}>*/}
					{/*					{i.image !== null ? (<Image*/}
					{/*						src={`${imgUrl + i.image}`}*/}
					{/*						alt="avatar"*/}
					{/*						width={50}*/}
					{/*						height={50}*/}
					{/*						className={css.indexCaruselImage}*/}
					{/*						priority={true}*/}
					{/*					/>) : (<Image*/}
					{/*						src={img}*/}
					{/*						alt="avatar"*/}
					{/*						width={50}*/}
					{/*						height={50}*/}
					{/*						className={css.indexCaruselImage}*/}
					{/*						priority={true}*/}
					{/*					/>)}*/}

					{/*					<div>*/}
					{/*						<Rate*/}
					{/*							className={css.indexUserRate}*/}
					{/*							// onChange={(e) => ratingChange(i.id, e)}*/}
					{/*							value={i.reyting}*/}
					{/*							allowHalf*/}
					{/*							disabled*/}
					{/*						/> <br/>*/}
					{/*						<Text>Umumiy reyting: {i.reyting}</Text>*/}
					{/*					</div>*/}
					{/*					<AiFillHeart*/}
					{/*						key={i.like?.id}*/}
					{/*						aria-labelledby="like"*/}
					{/*						// onClick={() => ChangeLike({id: i.id, like: i.like?.likes})}*/}
					{/*						className={i.like?.likes === 0 || i.like === "Unauthorized" ? `${css.indexUserRate}` : `${css.indexUserRateTrue}`}*/}
					{/*					/>*/}
					{/*				</div>*/}
					{/*				<div>*/}
					{/*					<Text style={{fontSize: 12}} key={i.special?.id || null}>*/}
					{/*						{i.special?.name}*/}
					{/*					</Text>*/}
					{/*					<br/>*/}
					{/*					<Link href={"/index/[id]"} as={`/index/${i.id}`}>*/}
					{/*						<Title level={4}>*/}
					{/*							{i.firstname} {i.lastname}*/}
					{/*						</Title>*/}
					{/*					</Link>*/}
					{/*					<p style={{marginBottom: 5}}>*/}
					{/*						<HiOutlineLocationMarker/>*/}
					{/*						<Text style={{paddingLeft: 10}} key={i.distirct?.vil_name}>*/}
					{/*							{i.distirct?.vil_name}*/}
					{/*						</Text>*/}
					{/*					</p>*/}

					{/*					<Tag key={i.sub_special?.id}>{i.sub_special?.name || null}</Tag>*/}
					{/*				</div>*/}
					{/*			</Card>*/}
					{/*		</div>*/}
					{/*	)}*/}
					{/*</div>*/}
				</>}
			/> : <Result
				status="error"
				title={t.topilmadi}
				extra={<>
					<Button
						type="primary"
						onClick={() => {
							form.resetFields();
							gotoStep(current - 3);
							resetArr()
						}}
					>
						{t.qayta}
					</Button>
					{/*<Button>Batafsil ko`rish</Button>*/}
				</>}
			/>)}
		</div>
	</ModalCenter>);
};

export default MasterModalFilter