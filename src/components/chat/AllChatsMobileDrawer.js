import React, {useState} from 'react';
import DrawerModal from "./DrawerModal";
import {Avatar, Badge, Button, Card, List, Row} from "antd";
import css from "../../styles/Chat.module.css";


const urlImg = process.env.NEXT_PUBLIC_IMG_URL;
function AllChatsMobileDrawer({data, allMessage, unread}) {

	const [visible, setVisible] = useState(false);
	const clickAllMessage = (room_id, user_id) => {
		allMessage(room_id, user_id)
		setVisible(false)
	}
	const dataState = data.map((i) =>
		<Card bordered={false} hoverable key={i.id} onClick={() => clickAllMessage(i.room_id, i.id)}
		      className={css.AllChatsBlock}>
			<Row justify="space-between" align="middle">
				<Avatar shape="square" size={50} src={urlImg + i.image}/>
				<p className={css.AllChatsBlockName}>{i.firstname + " " + i.lastname}</p>
				<Badge
					className="site-badge-count-109"
					count={i.message_count}
					style={{
						backgroundColor: '#ffdd00',
					}}
				/>
			</Row>
		</Card>
	)
	return (
		<DrawerModal setVisible={setVisible} visible={visible}>
			{dataState}
		</DrawerModal>
	);
}

export default AllChatsMobileDrawer;