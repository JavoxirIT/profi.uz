import { useRouter } from "next/router";
import { PageWrapperGlobal } from "../components/PageWrapperGlobal";
import MasterWrapper from "../components/Master/MasterWrapper";
import { Typography, Checkbox, Card, Space } from "antd";
import css from "../styles/Index.module.css";

// import {
//   HeartTwoTone,
//   ArrowDownOutlined,
//   HeartOutlined,
// } from "@ant-design/icons";

const { Text, Title } = Typography;

function HomePage({ data, t }) {
  return (
    <PageWrapperGlobal title="Asosi" pageTitle="Kategoriyalar">
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
          {data.map((i) => (
            <MasterWrapper
              key={i.id}
              id={i.id}
              image={i.image}
              location={i.location}
              name={i.name}
              type={i.type}
            />
          ))}
        </div>
      </main>
    </PageWrapperGlobal>
  );
}

export async function getStaticProps() {
  // Получить данные из внешнего API
  const res = await fetch(`http://localhost:4200/master`);
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
