import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, notification } from "antd";
import { PageWrapperSingle } from "components/PageWrapperSingle";
import { getCookie } from "../utils/setCookie";
import AllChats from "../components/chat/AllChats";
import { postFetch } from "../request/Fetch";
import AllMessage from "../components/chat/AllMessage";
import css from "../styles/Chat.module.css";
import useMessage from "../store/chatStor";
import ResultNoData from "../utils/ResultNoData";
import AllChatsMobileDrawer from "../components/chat/AllChatsMobileDrawer";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Chat = ({ t, unread }) => {

  const fetchMessage = useMessage((state) => state.fetchMessage);
  const router = useRouter();
  const { query } = router;
  //проверяем авторизован ли пользователь
  const [isChecked, setChecked] = useState(false);
  useEffect(() => {
    if (!getCookie("access_token")) {
      router.push("/authorization").then(() => {
        setChecked(false);
      });
    }else {
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

  const [rooms, setRooms] = useState([]);
  // получаем все чаты
  useEffect(() => {
    const method = "POST";
    const path = "all-rooms";
    postFetch({ path, method, value: "" })
      .then((res) => {
        if (res.status === 200) {
          setRooms(res.data);
        }
        // console.log("rooms",res)
      })
      .catch((err) => {
        openNotificationWithIcon("error", err.code, err.message);
      });
    //eslint-disable-next-line
  }, []);

  // получаем переписки с пользователем по клику
  const [userid, setUserId] = useState(null);
  const allMessage = (id, key) => {
    setUserId(key);
    const method = "POST";
    const path = "all-messages";
    const value = JSON.stringify({ room_id: Number(id) });
    postFetch({ path, method, value })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data)
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
              <ResultNoData />
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
