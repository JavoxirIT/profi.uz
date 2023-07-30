import React from "react";
import {Spin} from "antd";

const style = {
	width: "100%",
	background: "none",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	paddingTop: "30vh"
}
export const Preloader = () => (
	<div style={style}>
		<Spin size="large"/>
	</div>
);
