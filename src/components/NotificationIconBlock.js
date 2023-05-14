import React, {useEffect, useState} from "react";
import Link from "next/link";
import {AiOutlineHeart} from "react-icons/ai";
import {RiEarthFill} from "react-icons/ri";
import {MdOutlineNotifications} from "react-icons/md";
import {FiUser} from "react-icons/fi";
import css from "../styles/NotificationIconBlock.module.css";
import linkCss from "../styles/Links.module.css";
import {Badge} from "antd";
import {TbDoorExit} from "react-icons/tb";
import {useRouter} from "next/router";
import {eraseCookie} from "utils/setCookie";
import DropDown from "./Dropdown/Dropdown";
import {postFetch} from "../request/Fetch";

export default function NotificationIconBlock({t, setNotif}) {
	const router = useRouter();
	const goBack = (e) => {
		eraseCookie("access_token");
		eraseCookie("access_type");
		localStorage.removeItem("user");
		router.push("/authorization");
	};
	const [unread, setUnread] = useState()
	const unreadMessages = () =>{
		const method = "POST"
		const path = "unread-messages"
		postFetch({path, method, value: ""}).then((res)=>{
			// console.log("unread",res)
			setUnread(res.data?.length)
			setNotif(res.data)
		}).catch((err)=>{
			console.log(err)
		})
	}
	useEffect(() => {
		unreadMessages()
	});


	return (
		<div className={css.NotificationIconBlock}>
			<DropDown/>
			<Badge size="small" count={unread} className={css.NotificationIconBlockBadge}>
				<Link href={"/chat"}>
					<MdOutlineNotifications
						className={css.NotificationIconBlockIcon}
						title="yangi xabar"
						aria-label="nitification"
					/>
				</Link>
			</Badge>

			<div className={css.NotificationIconBlock2}>
				<Link className={linkCss.link} href={"/likeslist"}><AiOutlineHeart
					className={css.NotificationIconBlockIcon}
					title="sevimlilar"
					aria-label="like"
				/></Link>
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
			/>
		</div>
	);
}
