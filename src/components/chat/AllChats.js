import React, { useState } from "react";
import { Button } from "antd";
import { Avatar, List } from "antd";
import css from "../../styles/Chat.module.css"
// {"id":37,"firstname":"Javoxir","lastname":"Xasanov","phone":"998901005588","image":"/upload/user/U-1682326652.jpg","description":"teat","role_id":2,"room_id":2}
const urlImg = process.env.NEXT_PUBLIC_IMG_URL;

function AllChats({ data, allMessage, unread, queryID }) {
  const listData = data.map((i) => {
    return {
      title: `${i.firstname + " " + i.lastname}`,
      avatar: `${urlImg + i.image}`,
      id: i.room_id,
      key: i.id,
    };
  });
  // console.log("listData", listData)
const dataState = data.map((i) =>
    <div key={i.id} onClick={() => allMessage(i.room_id, i.id)} className={css.AllChatsBlock} >
        <Avatar shape="square" size={50} src={urlImg + i.image} />
        <p className={css.AllChatsBlockName} >{i.firstname + " " + i.lastname}</p>
        <Button
            type="primary"
            shape="circle"
            onClick={() => clickAllMessage(i.room_id, i.id)}
        >
            0
        </Button>
    </div>
)
  const clickAllMessage = (id, key) => {
    allMessage(id, key);
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
