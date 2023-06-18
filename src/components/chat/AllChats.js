import React, {useState} from "react";
import {Badge, Button, Card, Row} from "antd";
import {Avatar, List} from "antd";
import css from "../../styles/Chat.module.css"
// {"id":37,"firstname":"Javoxir","lastname":"Xasanov","phone":"998901005588","image":"/upload/user/U-1682326652.jpg","description":"teat","role_id":2,"room_id":2}
const urlImg = process.env.NEXT_PUBLIC_IMG_URL;

function AllChats({data, allMessage}) {
	const dataState = data.map((i) =>
		<Card bordered={false} hoverable key={i.id} onClick={() => allMessage(i.room_id, i.id)}
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
		<div>{dataState}</div>
	);
}

export default AllChats;
