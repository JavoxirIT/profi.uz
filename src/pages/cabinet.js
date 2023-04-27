import React, { useEffect, useState } from "react";
import { PageWrapperSingle } from "../components/PageWrapperSingle";
import { Card, List, Tag, Typography } from "antd";
import { useRouter } from "next/router";
import { getCookie } from "utils/setCookie";
import Image from "next/image";
import css from "../styles/Cabinet.module.css";
import CabinetNavigateList from "components/Cabinet/CabinetNavigateList";
import img from "../../public/assets/images/users1.png";

const { Title, Text } = Typography;
const spesialist = process.env.NEXT_PUBLIC_USER_SPECIALIST;

export default function Cabinet({ data, t }) {
  const [isChecked, setChecked] = useState(false);
  const router = useRouter();
  const user =
    typeof window !== "undefined" ? sessionStorage.getItem("user") : null;

  useEffect(() => {
    const userData = JSON.parse(user) ?? 0;
    if (!getCookie("access_token")) {
      router.push("/authorization").then(() => {
        setChecked(false);
      });
    } else if (Number(spesialist) !== Number(userData.role_id)) {
      setChecked(false);
      router.push("/");
    } else {
      setChecked(true);
    }
  }, [router, user]);

  // заранее загружаем страницу
  useEffect(() => {
    router.prefetch("/authorization");
  }, [router]);

  return (
    <PageWrapperSingle title="Kabinet" pageTitle={t.cabinet} t={t}>
      {isChecked && (
        <div className={css.cabinetCardBlock}>
          <Card className={css.cabinetCardUserInfo}>
            <div className={css.cabinetCardUserInfoBody}>
              <Image
                src={img}
                width={90}
                height={90}
                alt="avatar"
                className={css.UserInfoBodyImg}
              />
              <Title level={3} style={{ paddingTop: 16 }}>
                {data.name}
              </Title>
              <Text>{data.username}</Text>
              <div style={{ paddingTop: 16 }}>
                <Tag color="default" key={data.company.bs}>
                  {data.company.bs}
                </Tag>
              </div>
            </div>
          </Card>
          <Card className={css.cabinetCardUserNavigate}>
            <div className={css.CardUserNavigateLinkBlock}>
              <CabinetNavigateList t={t} />
            </div>
          </Card>
        </div>
      )}
    </PageWrapperSingle>
  );
}
// Это вызывается при каждом запросе
export async function getServerSideProps({ query }) {
  // Получить данные из внешнего API
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/1`);
  const data = await res.json();
  // Передать данные на страницу через реквизит
  return { props: { data } };
}
