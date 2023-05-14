import React, {useState} from 'react';
import DrawerModal from "./DrawerModal";
import {Avatar, Button, List} from "antd";


const urlImg = process.env.NEXT_PUBLIC_IMG_URL;
function AllChatsMobileDrawer({data, allMessage, notif}) {
	const [visible, setVisible] = useState(false);
	const clickAllMessage = (key) => {
		allMessage(key)
		setVisible(false)
	}
	const listData = data.map((i) => {
		return {
			title: `${i.firstname + " " + i.lastname}`,
			avatar: `${urlImg + i.image}`,
			id: i.room_id,
			key: i.id
		}
	});
	return (
		<DrawerModal setVisible={setVisible} visible={visible}>
			<List
				itemLayout="vertical"
				size="small"
				dataSource={listData}
				footer={""}
				// header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
				renderItem={(item) => (
					<List.Item
						key={item.title}
						extra={
							<Button type="primary" shape="circle" onClick={() => clickAllMessage(item.id)}>
								{notif.length ? notif.map((j) => j.user?.id === item.key ? j.message_count : 0) : 0}
							</Button>
						}
					>
						<List.Item.Meta
							avatar={<Avatar src={item.avatar}/>}
							title={<a href={item.href} style={{fontSize: 14}}>{item.title}</a>}

						/>
					</List.Item>
				)}
			/>
		</DrawerModal>
	);
}

export default AllChatsMobileDrawer;