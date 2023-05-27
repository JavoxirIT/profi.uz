import { PageWrapperSingle } from "../../components/PageWrapperSingle";
import {notification, Typography} from "antd";
import React, {useState} from "react";
import MasterTabCard from "../../components/Master/MasterTabCard";
import css from "../../styles/Master.module.css";
import MasterCard from "../../components/Master/MasterCard";
// import { getCookie } from "utils/setCookie";
// import useSWR, { unstable_serialize } from "swr";
import { useRouter } from "next/router";
import {postFetch} from "../../request/Fetch";
// import axios from "axios";
// import { postFetch } from "request/Fetch";

const { Title } = Typography;

const url = process.env.NEXT_PUBLIC_ONE_USER;

const Master = ({ t, data }) => {
  // console.log(data)
  const { query } = useRouter();

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, code, message) => {
    api[type]({
      message: code,
      description: message,
      duration: 3,
    });
  };

  const [starType, setStarType] = useState([])
  const fetchStarType = () => {
    postFetch({path: "star-type"}).then((res) => {
      if (res.status === 200) {
        setStarType(res.data.map((i) => ({value: i.id, label: i.name + "/" + i.name_ru})))
      } else {
        openNotificationWithIcon("error", res.code, res.message);
      }
    }).catch((err) => {
      openNotificationWithIcon("error", err.code, err.message);
    })
  }


  const [allClass, setAllClass] = useState([])
  const fetchAllKlass = () => {
    const value = {user_id: data.id}
    postFetch({path: "all-klass", value}).then((res) => {
      if (res.status === 200) {
        setAllClass(res.data)
      } else {
        openNotificationWithIcon("error", res.code, res.message);
      }
    }).catch((err) => {
      openNotificationWithIcon("error", err.code, err.message);
    })
  }


  return (
    <PageWrapperSingle title={data.firstname  + " " + data.lastname} pageTitle="Portfolio" t={t}>
      {contextHolder}
      <main className={css.masterWrapper}>
        <div>
          <Title style={{ marginBottom: 22 }} level={4}>
            Ba’tafsil malumotlari
          </Title>
          <MasterCard data={data} t={t} user_id={query.id} fetchAllKlass={fetchAllKlass} starType={starType} openNotificationWithIcon={openNotificationWithIcon}/>
        </div>
        <div className={css.MasterTab}>
          <MasterTabCard data={data} t={t} allClass={allClass} fetchStarType={fetchStarType} fetchAllKlass={fetchAllKlass}/>
        </div>
      </main>
    </PageWrapperSingle>
  );
};

export async function getServerSideProps(context) {
  const { query, req } = context;
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: query.id }),
  };
  const response = await fetch(url, config);
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}

export default Master;
