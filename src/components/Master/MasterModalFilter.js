import React, {useEffect, useState} from 'react';
import {useStepsForm} from 'sunflower-antd';
import {Steps, Input, Button, Form, Result, Checkbox, Row, Col, Card, Rate, Tag, Typography, Space} from 'antd';
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

const items = [{
	title: "Viloyatni tanlang",
}, {
	title: "Yo`nalishni tanlang",
}, {
	title: "Ichki yo`nalishni tanlang",
}, {
	title: "Resultat",
},]
let subArr = []
const MasterModalFilter = ({special, vil, onFinish, open, setOpen, ollSpecial, user}) => {
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
	useEffect(() => {
		ollSpecial.map((i) => i.subspecial.filter((sub) => sub.p_type_id === specialValue ? subArr.push(sub) : null))
	}, [ollSpecial, specialValue]);
	const subData = subArr.map((i) => ({value: i.id, label: i.name}))


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
			const vilArr = Array()
			vilArr.push(Number(checked))
			values.region = vilArr
			onFinish(values);
			// console.log(values)
			// subArr = Array()
			setIsPath(pathname)
			setTimeout(() => {
				setOpen(false)
			}, 2000)
			await new Promise(r => setTimeout(r, 1000));
			return 'ok';
		}, total: 4,

	});
	const formList = [
		<>
			<Form.Item name={"region"}>
				<div className={css.MasterModalFilterCheckbox}>
					{vil.map((i, index) =>
						<Checkbox
							key={i.value}
							value={i.value}
							onChange={onRegionChange}
							checked={checked === i.value}
						>
							{i.label}
						</Checkbox>
					)}

				</div>
			</Form.Item>
			<Form.Item className={css.MasterModalFilterBtn}>
				<Button type="primary" onClick={() => gotoStep(current + 1)}>Qabul qilish</Button>
			</Form.Item>
		</>, <>
			<Form.Item>
				{/*<Checkbox.Group options={special} onChange={(e) => setSpecialValue(e)}/>*/}
				<div className={css.MasterModalFilterCheckbox}>
					{special.map((i, index) =>
						<Checkbox
							key={i.value}
							value={i.value}
							onChange={(e) => setSpecialValue(e.target.value)}
							checked={specialValue === i.value}
						>
							{i.label}
						</Checkbox>
					)}

				</div>
			</Form.Item>
			<Form.Item className={css.MasterModalFilterBtn}>
				<Button
					style={{marginRight: 10}}
					type="primary"
					loading={formLoading}
					onClick={() => gotoStep(current + 1)}
				>
					Qabul qilish
				</Button>
				<Button onClick={() => gotoStep(current - 1)}>Qaytish</Button>
			</Form.Item>
		</>, <>
			<Form.Item name="special">
				<Checkbox.Group options={subData}/>
			</Form.Item>
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
					Qabul qilish
				</Button>
				<Button onClick={() => gotoStep(current - 1)}>Qaytish</Button>
			</Form.Item>
		</>];

	return (<ModalCenter title="Uch qadamda kerakli muttaxisisni toping" open={open} handleCancel={handleCancel}
	                     width={"100vw"}>
		<Steps {...stepsProps} items={items}/>
		<div style={{marginTop: 15}}>
			<Form  {...formProps} >
				{formList[current]}
			</Form>

			{current === 3 && (user.length !== 0 ? <Result
				status="success"
				title="Mutaxasis topildi!"
				extra={
					<>
						<Button
							type="primary"
							onClick={() => {
								// form.resetFields();
								gotoStep(0);
								// subArr = Array()
							}}
						>
							Qayta so`rov yuborish
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
				title="Malumot topilmadi!"
				extra={<>
					<Button
						type="primary"
						onClick={() => {
							form.resetFields();
							gotoStep(0);
							subArr = Array()
						}}
					>
						Qayta so`rov yuborish
					</Button>
					{/*<Button>Batafsil ko`rish</Button>*/}
				</>}
			/>)}
		</div>
	</ModalCenter>);
};

export default MasterModalFilter