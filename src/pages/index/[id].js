import { PageWrapperSingle } from "../../components/PageWrapperSingle";
import { Typography } from "antd";
import { useRouter } from "next/router";
import React from "react";
import MasterTabCard from "../../components/Master/MasterTabCard";
import css from "../../styles/Master.module.css";
import MasterCard from "../../components/Master/MasterCard";
const { Text, Title } = Typography;

const Master = ({ data }) => {
  return (
    <PageWrapperSingle title={data.name} pageTitle="Portfolio">
      <main className={css.masterWrapper}>
        <div>
          <Title style={{ marginBottom: 22 }} level={4}>
            Ba’tafsil malumotlari
          </Title>
          <MasterCard data={data} />
        </div>
        <div className={css.MasterTab}>
          <MasterTabCard data={data} />
        </div>
      </main>
    </PageWrapperSingle>
  );
};
// Это вызывается при каждом запросе
export async function getServerSideProps({ query }) {
  // Получить данные из внешнего API
  const res = await fetch(`http://localhost:4200/master_data/${query.id}`);
  const data = await res.json();

  // Передать данные на страницу через реквизит
  return { props: { data } };
}

export default Master;
