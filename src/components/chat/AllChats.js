import React, {useState} from "react";
import {Badge, Button, Card, Row} from "antd";
import {Avatar, List} from "antd";
import css from "../../styles/Chat.module.css"
// {"id":37,"firstname":"Javoxir","lastname":"Xasanov","phone":"998901005588","image":"/upload/user/U-1682326652.jpg","description":"teat","role_id":2,"room_id":2}
const urlImg = process.env.NEXT_PUBLIC_IMG_URL;

function AllChats({data, allMessage, unread, queryID}) {
	// console.log("rooms", data)
	// const listData = data.map((i) => {
	// 	return {
	// 		title: `${i.firstname + " " + i.lastname}`,
	// 		avatar: `${urlImg + i.image}`,
	// 		id: i.room_id,
	// 		key: i.id,
	// 		message: i.message_count
	// 	};
	// });
	// console.log("listData", listData)
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
	const clickAllMessage = (room_id, user_id) => {
		allMessage(room_id, user_id);
	};

	return (
		// <List
		//   itemLayout="vertical"
		//   size="small"
		//   dataSource={listData}
		//   footer={""}
		//   // header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
		//   renderItem={(item) => (
		//     <List.Item
		//
		//       key={item.title}
		//       extra={
		//         <Button
		//           type="primary"
		//           shape="circle"
		//           onClick={() => clickAllMessage(item.id, item.key)}
		//         >
		//           0
		//         </Button>
		//       }
		//       onClick={() => allMessage(item.id, item.key)}
		//     >
		//       <List.Item.Meta
		//         avatar={<Avatar shape="square" size={50} src={item.avatar} />}
		//         title={
		//           <a href={item.href} style={{ fontSize: 14, color: "#000031ee" }}>
		//             {item.title}
		//           </a>
		//         }
		//       />
		//     </List.Item>
		//   )}
		// />
		<div>{dataState}</div>
	);
}

export default AllChats;
