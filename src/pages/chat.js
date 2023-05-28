import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Card, notification} from "antd";
import {PageWrapperSingle} from "components/PageWrapperSingle";
import {getCookie} from "../utils/setCookie";
import AllChats from "../components/chat/AllChats";
import {postFetch} from "../request/Fetch";
import AllMessage from "../components/chat/AllMessage";
import css from "../styles/Chat.module.css";
import useMessage from "../store/chatStor";
import ResultNoData from "../utils/ResultNoData";
import AllChatsMobileDrawer from "../components/chat/AllChatsMobileDrawer";
import id from "./index/[id]";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Chat = ({t, unread}) => {
	const [effectRooms, setEffectRooms] = useState(true)
	const [messageLoading, setMessageLoading] = useState(false)
	const fetchMessage = useMessage((state) => state.fetchMessage);
	const router = useRouter();
	const {query} = router;
	//проверяем авторизован ли пользователь
	const [isChecked, setChecked] = useState(false);
	useEffect(() => {
		if (!getCookie("access_token")) {
			router.push("/authorization").then(() => {
				setChecked(false);
			});
		} else {
			setChecked(true);
		}
	}, [router]);

	// увидамление
	const [api, contextHolder] = notification.useNotification();
	const openNotificationWithIcon = (type, code, message) => {
		api[type]({
			message: code,
			description: message,
			duration: 2,
		});
	};

	// получаем переписки с пользователем по клику
	const [userid, setUserId] = useState(null);
	const allMessage = (room_id, user_id) => {
		setMessageLoading(true)
		setEffectRooms(false)
		setUserId(user_id);
		const value = JSON.stringify({room_id: Number(room_id)});
		postFetch({path: "all-messages", value})
		.then((res) => {
			if (res.status === 200) {
				// console.log(res.data)
				setTimeout(() => {
					setMessageLoading(false)
				}, 500)
				fetchMessage(res.data);
			} else {
				openNotificationWithIcon("error", "Ma'lumotlani olib bo'lmadi");
			}
		})
		.catch((err) => {
			// console.log(err)
			openNotificationWithIcon("error", err.code, err.message);
		});
	};


	const [rooms, setRooms] = useState([]);
	const [oneRooms, setOneRooms] = useState(0);
	// получаем все чаты
	useEffect(() => {
		postFetch({path: "all-rooms"})
		.then((res) => {
			if (res.status === 200) {
				setRooms(res.data);
				//получаем один объект и выодим из него room_id для отправки запроси через useEffect
				if (query.id) {
					const oneRoomID = res.data.find(i => Number(query.id) === i.id)
					setOneRooms(oneRoomID.room_id)
					setUserId(oneRoomID.id);
				} else {
					setOneRooms(0)
				}


			} else {
				openNotificationWithIcon("error", res.code, res.message);
			}
			// console.log("rooms",res)
		})
		.catch((err) => {
			openNotificationWithIcon("error", err.code, err.message);
		});
		//eslint-disable-next-line
	}, []);


	// выводим чат к которому обращаемся из кабинета спецыалиста
	useEffect(() => {
		if (oneRooms !== 0) {
			const value = JSON.stringify({room_id: Number(oneRooms)});
			if (effectRooms) {
				postFetch({path: "all-messages", value})
				.then((res) => {
					if (res.status === 200) {
						// console.log("effect", res)
						fetchMessage(res.data);
					}
				})
				.catch((err) => {
					// console.log("err",err)
					openNotificationWithIcon("error", err.code, err.message);
				});
			}
		}
	}, [effectRooms, fetchMessage, oneRooms, openNotificationWithIcon])
// else {
// 		openNotificationWithIcon("error", "Ma'lumotlani olib bo'lmadi 11111");
// 	}
	return (
		isChecked && (
			<PageWrapperSingle
				title="Suhbatlar"
				pageTitle={"Suhbatlar"}
				t={t}
				unread={unread}
			>
				{contextHolder}
				<AllChatsMobileDrawer
					data={rooms}
					allMessage={allMessage}
					unread={unread}
				/>
				<div className={css.chatWrapper}>
					<Card className={css.chatBlockContact}>
						{!rooms.length ? (
							<ResultNoData/>
						) : (
							<AllChats
								data={rooms}
								allMessage={allMessage}
								unread={unread}
								queryID={query.id}
							/>
						)}
					</Card>

					<div>
						<AllMessage
							messageLoading={messageLoading}
							name={query.name}
							queryID={query.id}
							unread={unread}
							userid={userid}
						/>
					</div>
				</div>
			</PageWrapperSingle>
		)
	);
};

export default Chat;
