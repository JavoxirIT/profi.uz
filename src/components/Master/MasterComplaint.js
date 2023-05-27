import React, {useState} from 'react';
import ModalCenter from "../../Modal/ModalCenter";
import {Button, Form, Input, notification, Row} from "antd";
import {postFetch} from "../../request/Fetch";
import {getCookie} from "../../utils/setCookie";
const {TextArea} = Input;
const {Item} = Form
function MasterComplaint({t, open, userId, handleCancel, setIsModalOpen, openNotificationWithIcon, }) {

	const [btnLoading, setBtnLoading ] = useState(false)
	const onSubmit = (val) =>{
		val.user_id = Number(userId)
		setBtnLoading(true)
		setIsModalOpen(false)
		if(!getCookie("access_token")){
			setBtnLoading(false)
			openNotificationWithIcon("error", "Aval ro'yxatdan o'ting");
			return false
		}
		postFetch({path: "insert-complaint", value: val}).then((res)=>{
			if(res.status === 200){
				openNotificationWithIcon("success", "Shikoyat adminga yuborildi");
				setBtnLoading(false)
			}else{
				openNotificationWithIcon("error", "Kechurasiz xabar yuborilmadi");
				setBtnLoading(false)
			}
		}).catch((err)=>{
			openNotificationWithIcon("error", err.code , "Kechirasiz xabar yuborilmadi");
			setBtnLoading(false)
		})
	}
	return (
		<ModalCenter title={t.complaintModalTitle} open={open} handleCancel={handleCancel}>
			<Form onFinish={onSubmit}>
				<Item name="comment" style={{width: "100%",}}>
					<TextArea allowClear rows={4}  maxLength={1000} placeholder={t.complaint}/>
				</Item>
				<Row justify="end" >
					<Item>
						<Button
							htmlType="submit"
							loading={btnLoading}
							type="primary"
							size="large"
						>
							{t.complaintButton}
						</Button>
					</Item>
				</Row>

			</Form>
		</ModalCenter>
	);
}

export default MasterComplaint;