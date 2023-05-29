import React from "react";
import {RiSearchLine, RiFilterLine} from "react-icons/ri";
import css from "../styles/SerchInp.module.css";
import {Input} from "antd";

const {Search} = Input;
export default function SerchInp(props) {
	// const onSearch = (e) => {
	// 	// setIsSearch({search: e.target.value});
	// 	console.log(e.target.value);
	// };

	return <Input
		className={css.Search_Inpblock}
		prefix={<RiSearchLine className={css.Search_BtnIcons}/>}
		placeholder={props.t.search}
		allowClear
		onChange={({ target: { value } }) => props.Search(value)}
		onPressEnter={({ target: { value } }) => props.Search(value)}
		onBlur={({ target: { value } }) => props.Search(value)}
		// suffix={<RiFilterLine className={css.Search_BtnIcons} />}
		size="large"
	/>

}
