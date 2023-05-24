import React, {useState} from 'react';
import {useModalForm} from 'sunflower-antd';
import {Modal, Input, Button, Form, Spin, Checkbox, Row, Col, List, Typography, Space, notification} from 'antd';
import {postFetch} from "../../request/Fetch";
import ModalCenter from "../../Modal/ModalCenter";
import css from "../../styles/Master.module.css"

const {Text, Title} = Typography;

function MasterWorkComment({starType, userId, allClass, fetchAllKlass}) {
	// сообщение об успешном изминения данных
	const [api, contextHolder] = notification.useNotification();
	const openNotificationWithIcon = (type, code, message) => {
		api[type]({
			message: code,
			description: message,
			duration: 3,
		});
	};
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [values, setValue] = useState("");

	const openModal = () => {
		setOpen(true)
	}
	const handleCancel = () => {
		setOpen(false)
	}
	const [form] = Form.useForm();

	function handleChange(e) {
		setValue(e.target.value);
	}

	// console.log(starType)
	const onClass = (val) => {
		setLoading(true)
		const data = {star: Number(values), user_id: userId}
		// console.log(data)
		postFetch({path: "insert-klass", value: data}).then((res) => {
			// console.log(res)
			fetchAllKlass()
			setOpen(false)
			setLoading(false)
		}).catch((err) => {
			openNotificationWithIcon("error", err.code, err.message);
			setLoading(false)
		})
	}

	return (
		<div className={css.MasterCommentWrapper}>
			{contextHolder}
			<List
				className={css.MasterCommentList}
				itemLayout="horizontal"
				dataSource={allClass}
				renderItem={(item) => (<List.Item>
					<List.Item.Meta
						// avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
						title={<p style={{fontSize: 18}}>{item.firstname}</p>}
						description={<Text>{item.name + " / " + item.name_ru}</Text>}
					/>
					<div>{item.stars}</div>
				</List.Item>)}
			/>
			<div className={css.MasterCommentBtn}>
				<Button type="primary" onClick={openModal}>Fikir qoldirish</Button>
			</div>
			<ModalCenter title="Fikir qoldirish" open={open} handleCancel={handleCancel} width={600}>
				<Spin spinning={loading}>
					<Space direction="vertical" style={{width: "100%"}}>
						{starType.map((i) =>
							<Checkbox key={i.value} checked={values === i.value} value={i.value}
							          onChange={handleChange}>{i.label}</Checkbox>
						)}
						<div className={css.MasterCommentListBtn}>
							<Button type="primary" onClick={onClass}>Qo`shish</Button>
						</div>
					</Space>
				</Spin>
			</ModalCenter>
		</div>);
};

export default MasterWorkComment