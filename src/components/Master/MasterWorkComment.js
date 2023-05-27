import React, {useState} from 'react';
import {useModalForm} from 'sunflower-antd';
import {
	List, Typography,
} from 'antd';

const {Text, Title} = Typography;

function MasterWorkComment({starType, userId, allClass, fetchAllKlass}) {
	return (<List
		size="small"
		itemLayout="horizontal"
		dataSource={allClass}
		renderItem={(item) => (<List.Item>
			<List.Item.Meta
				// avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
				title={<p style={{fontSize: 18}}>{item.firstname}</p>}
				description={<Text>{item.name + " / " + item.name_ru}</Text>}
			/>
			<div>{item.stars}</div>
		</List.Item>)}
	/>)
};

export default MasterWorkComment