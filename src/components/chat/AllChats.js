import React, {useState} from 'react';
import {Button} from "antd";
import {Avatar, List} from 'antd';


// {"id":37,"firstname":"Javoxir","lastname":"Xasanov","phone":"998901005588","image":"/upload/user/U-1682326652.jpg","description":"teat","role_id":2,"room_id":2}
const urlImg = process.env.NEXT_PUBLIC_IMG_URL;

function AllChats({data, allMessage, unread, queryID}) {

	const listData = data.map((i) => {
		return {
			title: `${i.firstname + " " + i.lastname}`,
			avatar: `${urlImg + i.image}`,
			id: i.room_id,
			key: i.id
		}
	});
	// console.log("listData", listData)

	const clickAllMessage = (id, key) => {
		allMessage(id, key)
	}


	return (<List
			itemLayout="vertical"
			size="small"
			dataSource={listData}
			footer={""}
			// header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
			renderItem={(item) => (
				<List.Item
					key={item.title}
					extra={
						<Button type="primary" shape="circle" onClick={() => clickAllMessage(item.id, item.key)}>
							0
						</Button>
					}
					onClick={() => allMessage(item.id, item.key)}
				>
					<List.Item.Meta
						avatar={<Avatar src={item.avatar}/>}
						title={<a href={item.href} style={{fontSize: 14}}>{item.title}</a>}

					/>
				</List.Item>
			)}
		/>

	);
}


export default AllChats;

// https://4biz.uz/api/all-messages
// 	'room_id' => 'required|integer',


// https://4biz.uz/api/send-message
// 	'message' => 'required|string',
// 	'user_id' => 'required|integer',
// 	'file' => 'file_url',

// https://4biz.uz/api/file-message
// 	'file' => 'file',

