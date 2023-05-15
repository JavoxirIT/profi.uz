import React from "react";
import {RiSearchLine, RiFilterLine} from "react-icons/ri";
import css from "../styles/SerchInp.module.css";
import {Input} from "antd";

export default function SerchInp() {
    const onSearch = (e) => {
        console.log(e.target.value);
    };

    return <Input
        className={css.Search_Inpblock}
        prefix={<RiSearchLine className={css.Search_BtnIcons}/>}
        placeholder="Kerakli mutaxasisni qidiring..."
        allowClear
        onChange={onSearch}
        onPressEnter={onSearch}
        onBlur={onSearch}
        // suffix={<RiFilterLine className={css.Search_BtnIcons} />}
        size="large"
    />

}
