import {Modal} from 'antd';
import {useState} from 'react';

const ModalCenter = ({title, children, open, handleCancel, width}) => {
	return (
		<Modal width={width} title={title} open={open}  onCancel={handleCancel} footer={false}>
			{children}
		</Modal>
	);
};
export default ModalCenter;