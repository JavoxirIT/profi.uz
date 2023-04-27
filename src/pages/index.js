import { PageWrapperGlobal } from "../components/PageWrapperGlobal";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { Typography, Card, Tag, Rate, Checkbox, Space } from "antd";
import css from "../styles/Index.module.css";
import { useEffect } from "react";

const { Text, Title } = Typography;

function HomePage({ data, t }) {
  const masterData = data.map((i) => (
    <Card
      key={i.id}
      style={{
        marginBottom: 15,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={i.image} alt="avatar" width={40} height={40} />
          <div style={{ paddingLeft: 10 }}>
            <Text style={{ fontSize: 12 }}>{i.type[0].type}</Text>
            <br />

            <Link href={"/index/[id]"} as={`/index/${i.id}`}>
              <Title level={5}> {i.name} </Title>
            </Link>
          </div>
        </div>
        <Rate count={1} character={<AiFillHeart aria-labelledby="like" />} />
      </div>
      <div>
        <p style={{ marginBottom: 10 }}>
          <HiOutlineLocationMarker />
          <Text style={{ paddingLeft: 10 }}>{i.location}</Text>
        </p>
        {i.type.map((e) => (
          <Tag key={e.id}>{e.type}</Tag>
        ))}
      </div>
    </Card>
  ));

  return (
    <PageWrapperGlobal title="Asosi" pageTitle="Kategoriyalar" t={t}>
      <main className={css.indexContainer}>
        <div>
          <Title level={4} className={css.indexTitltFilter}>
            Filtrlash
          </Title>
          <div className={css.indexCheckBoxBlock}>
            <Card className={css.indexCheckBox1}>
              <Space direction="vertical">
                <p className={css.indexCheckTitle}>VILOYATLAR</p>
                <Checkbox>
                  <Text>Toshkent</Text>
                </Checkbox>
                <Checkbox>
                  {" "}
                  <Text>Samarqand</Text>{" "}
                </Checkbox>
                <Checkbox>
                  {" "}
                  <Text>Jizzax</Text>{" "}
                </Checkbox>
                <Checkbox>
                  {" "}
                  <Text>Sirdaryo</Text>{" "}
                </Checkbox>
                <Checkbox>
                  {" "}
                  <Text>Andijon</Text>{" "}
                </Checkbox>
                <Checkbox>
                  {" "}
                  <Text>Fargona</Text>{" "}
                </Checkbox>
                <Checkbox>
                  {" "}
                  <Text>Namangan</Text>{" "}
                </Checkbox>
                <Checkbox>
                  {" "}
                  <Text>Buxora</Text>{" "}
                </Checkbox>
                <Checkbox>
                  {" "}
                  <Text>Surxandaryo</Text>{" "}
                </Checkbox>
                <Checkbox>
                  {" "}
                  <Text>Qashqadaryo</Text>{" "}
                </Checkbox>
                <Checkbox>
                  {" "}
                  <Text>Navoiy</Text>{" "}
                </Checkbox>
                <Checkbox>
                  {" "}
                  <Text>Xorazm</Text>{" "}
                </Checkbox>
              </Space>
            </Card>
            <Card className={css.indexCheckBox2}>
              <Space direction="vertical">
                <p className={css.indexCheckTitle}>MUTTAXASISLIKLAR</p>
                <Checkbox>
                  <Text>Santexnik</Text>
                </Checkbox>
                <Checkbox>
                  <Text>Santexnik</Text>
                </Checkbox>
                <Checkbox>
                  <Text>Santexnik</Text>
                </Checkbox>
                <Checkbox>
                  <Text>Santexnik</Text>
                </Checkbox>
                <Checkbox>
                  <Text>Santexnik</Text>
                </Checkbox>
                <Checkbox>
                  <Text>Santexnik</Text>
                </Checkbox>
                <Checkbox>
                  <Text>Santexnik</Text>
                </Checkbox>
                <Checkbox>
                  <Text>Santexnik</Text>
                </Checkbox>
                <Checkbox>
                  <Text>Santexnik</Text>
                </Checkbox>
                <Checkbox>
                  <Text>Santexnik</Text>
                </Checkbox>
              </Space>
            </Card>
          </div>
        </div>
        <div>
          <Title level={4}>Eng Ommaboplari</Title>
          {masterData}
        </div>
      </main>
    </PageWrapperGlobal>
  );
}

export async function getServerSideProps() {
  // Получить данные из внешнего API
  const res = await fetch("http://localhost:4200/master");
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }
  // Передать данные на страницу через реквизит
  return { props: { data } };
}
export default HomePage;
