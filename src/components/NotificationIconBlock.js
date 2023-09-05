"use client"
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {AiOutlineHeart} from "react-icons/ai";
import {FiUser} from "react-icons/fi";
import {BsChatRightText} from "react-icons/bs";
import css from "../styles/NotificationIconBlock.module.css";
import linkCss from "../styles/Links.module.css";
import {Badge} from "antd";
import {TbDoorExit} from "react-icons/tb";
import {useRouter} from "next/router";
import {eraseCookie, getCookie} from "utils/setCookie";
import DropDown from "./Dropdown/Dropdown";
import {postFetch} from "../request/Fetch";

export default function NotificationIconBlock({t}) {
	const router = useRouter();
	const goBack = (e) => {
		eraseCookie("access_token");
		eraseCookie("user_id");
		router.push("/authorization");
		localStorage.clear()
	};

	const [unread, setUnread] = useState()
	useEffect(() => {
		if (getCookie("access_token") !== null) {
			setInterval(() => {
				postFetch({path: "unread-messages"}).then((res) => {
					if(!res.code && res.status === 200){
						setUnread(res.data?.count)
						// console.log("unread", res)
					}
				}).catch((err) => {
					// console.log(err)
				})
			}, 10000)
		}else setUnread(0)
	}, []);

	return (
		<div className={css.NotificationIconBlock}>
			<DropDown/>
			<Badge
				size="small"
				count={unread}
				className={css.NotificationIconBlockBadge}
			>
				<Link href={"/chat"}>
					<BsChatRightText
						className={css.NotificationIconBlockIcon}
						title="yangi xabar"
						aria-label="nitification"
					/>
				</Link>
			</Badge>

			<div className={css.NotificationIconBlock2}>
				<Link className={linkCss.link} href={"/likeslist"}>
					<AiOutlineHeart
						className={css.NotificationIconBlockIcon}
						title="sevimlilar"
						aria-label="like"
					/>
				</Link>
				<Link className={linkCss.link} href="/cabinet">
					<FiUser
						className={css.NotificationIconBlockIcon}
						aria-label="cabinet"
						title="cabinet"
					/>
				</Link>
			</div>

			<TbDoorExit
				title="chiqish"
				aria-label="exit"
				className={css.NotificationIconBlockIcon}
				onClick={goBack}
				color={"red"}
			/>
		</div>
	);
}
