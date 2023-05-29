import React, {useState} from 'react';
import {AiOutlineFrown, AiOutlineMeh, AiOutlineSmile} from "react-icons/ai"
import {
	List, Typography,
} from 'antd';

const {Text, Title} = Typography;

function MasterWorkComment({allClass, lang}) {
	const customIcons = {
		1: <AiOutlineFrown style={{fontSize: 40, color: "#f5222d"}} />,
		2: <AiOutlineFrown style={{fontSize: 40, color: "#f5222d"}} />,
		3: <AiOutlineMeh style={{fontSize: 40}} />,
		4: <AiOutlineSmile style={{fontSize: 40, color: "#52c41a"}} />,
		5: <AiOutlineSmile style={{fontSize: 40, color: "#52c41a"}} />,
	};
	console.log(customIcons)
	return (<List
		size="small"
		itemLayout="horizontal"
		dataSource={allClass}
		renderItem={(item) => (<List.Item>
			<List.Item.Meta
				// avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
				title={<p style={{fontSize: 18}}>{item.firstname}</p>}
				description={<Text>{lang === "ru" ? item.name_ru : item.name}</Text>}
			/>
			<div
				style={{fontSize: 20}}>{Object.entries(customIcons).map(([key, value]) => Number(item.stars) === Number(key) ? value : null)}</div>
		</List.Item>)}
	/>)
};

export default MasterWorkComment