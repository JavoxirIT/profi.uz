import {Modal} from 'antd';
import {useState} from 'react';

const ModalCenter = ({title, children, open, handleCancel, width}) => {
	return (
		<Modal width={width} title={<p style={{color: " #001529", marginTop: 15}} >{title}</p>} open={open}  onCancel={handleCancel} footer={false}>
			{children}
		</Modal>
	);
};
export default ModalCenter;