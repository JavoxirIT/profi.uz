import { PageWrapperSingle } from "../../components/PageWrapperSingle";
import { Typography} from "antd";
import React from "react";
import MasterTabCard from "../../components/Master/MasterTabCard";
import css from "../../styles/Master.module.css";
import MasterCard from "../../components/Master/MasterCard";
// import { getCookie } from "utils/setCookie";
// import useSWR, { unstable_serialize } from "swr";
import { useRouter } from "next/router";
// import axios from "axios";
// import { postFetch } from "request/Fetch";

const { Title } = Typography;

const url = process.env.NEXT_PUBLIC_ONE_USER;

const Master = ({ t, data }) => {

  // console.log(data)
  //   const { data, error } = useSWR(repoInfo);
  const { query } = useRouter();
  return (
    <PageWrapperSingle title={data.firstname  + " " + data.lastname} pageTitle="Portfolio" t={t}>
      <main className={css.masterWrapper}>
        <div>
          <Title style={{ marginBottom: 22 }} level={4}>
            Ba’tafsil malumotlari
          </Title>
          <MasterCard data={data} t={t} user_id={query.id} />
        </div>
        <div className={css.MasterTab}>
          <MasterTabCard data={data} t={t} />
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
