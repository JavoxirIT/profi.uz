import { PageWrapperSingle } from "../../components/PageWrapperSingle";
import { Typography } from "antd";
import React from "react";
import MasterTabCard from "../../components/Master/MasterTabCard";
import css from "../../styles/Master.module.css";
import MasterCard from "../../components/Master/MasterCard";
const { Text, Title } = Typography;

const Master = ({ data, t }) => {
  return (
    <PageWrapperSingle title={data.name} pageTitle="Portfolio" t={t}>
      <main className={css.masterWrapper}>
        <div>
          <Title style={{ marginBottom: 22 }} level={4}>
            Ba’tafsil malumotlari
          </Title>
          <MasterCard data={data} t={t} />
        </div>
        <div className={css.MasterTab}>
          <MasterTabCard data={data} t={t} />
        </div>
      </main>
    </PageWrapperSingle>
  );
};
// Это вызывается при каждом запросе
Master.getInitialProps = async ({ query }) => {
  // Получить данные из внешнего API
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${query.id}`
  );
  const data = await res.json();

  // Передать данные на страницу через реквизит
  return { data };
};

export default Master;
