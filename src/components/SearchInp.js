import React from "react";
import {RiSearchLine, RiFilterLine} from "react-icons/ri";
import css from "../styles/SerchInp.module.css";
import {Input} from "antd";

const {Search} = Input;
export default function SearchInp(props) {
	// const onSearch = (e) => {
	// 	// setIsSearch({search: e.target.value});
	// 	console.log(e.target.value);
	// };

	const search = <Search
		className={css.Search_Inpblock}
		// prefix={<RiSearchLine/>}
		placeholder={props.t.search}
		onSearch={props.Search}
		onPressEnter={({target: {value}}) => props.Search(value)}
		onBlur={({target: {value}}) => props.Search(value)}
		// suffix={<RiFilterLine className={css.Search_BtnIcons} />}
		size="large"
		enterButton
	/>;
	return search

}
