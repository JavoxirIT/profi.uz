import React, {useEffect, useState} from 'react';
import {useStepsForm} from 'sunflower-antd';
import {Steps, Button, Form, Result, Checkbox, Typography, Space, Spin} from 'antd';
import ModalCenter from "../../Modal/ModalCenter";
import {useRouter} from "next/router";
import css from "../../styles/Index.module.css";
import useSessionStorage from "../../hooks/useSessionStorage";


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
		setIsPath(pathname)
	}

	// TODO: функцыя для филтера относться к второму блоку формы
	const [newValue, setNewValue] = useState([])
	const checkedSpecial = (e) => {
		if (e.target.checked === true) {
			special.map((i) => i.subspecial.filter((sub) => sub.p_type_id === e.target.value ? subArr.push(sub) : null))
			setNewValue(Array.from(new Set(subArr)))
		} else {
			const filterArr = newValue.filter((item) => item.p_type_id !== e.target.value)
			setNewValue(filterArr)
			if (filterArr.length === 0) {
				subArr.length = 0
			}
		}
	}


	const [checked, setChecked] = useState(null)
	const onRegionChange = (e) => {
		setChecked(e.target.value)
	}

	const {
		form, current, gotoStep, stepsProps, formProps, submit, formLoading,
	} = useStepsForm({
		async submit(values) {
			const {region, special} = values;
			// console.log(user)
			onFinish(values);
			setIsPath(pathname)
			setNewValue([])
			form.resetFields()
			gotoStep(current - 3);
			await new Promise(r => setTimeout(r, 1000));
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
	</>, <>

		<Form.Item rules={[{required: true, message: 'Please input your username!'}]}>
			<Checkbox.Group>
				<div className={css.MasterModalFilterCheckbox}>
					{special.sort(userSort).map((i, index) => <Checkbox
						key={i.id}
						value={i.id}
						onChange={(e) => checkedSpecial(e)}
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
	</>, <>
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

			{current === 3 && (user.length > 0 ? <Result
				status="success"
				title={t.topildi}
				extra={<>
					<Button
						type="primary"
						onClick={() => {
							// form.resetFields();
							gotoStep(0);
							subArr = Array()
						}}
					>
						{t.qayta}
					</Button>
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