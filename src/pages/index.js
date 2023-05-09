import { PageWrapperGlobal } from "../components/PageWrapperGlobal";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { Typography, Card, Tag, Rate, Checkbox, Form, Button } from "antd";
import css from "../styles/Index.module.css";
import { useEffect, useState } from "react";
import { getCookie } from "utils/setCookie";
import axios from "axios";
import Preloader from "components/Preloder/Preloader";
import { postFetch } from "../request/Fetch";
import img from "../../public/assets/images/2.png";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const urlAlUser = process.env.NEXT_PUBLIC_ALL_USER;
const urlImg = process.env.NEXT_PUBLIC_IMG_URL;
const { Text, Title } = Typography;
const isType = typeof window !== undefined;

function HomePage({ data, t }) {
  const [user, setUser] = useState(data);
  useEffect(() => {
    const config = {
      method: "POST",
      url: urlAlUser,
      headers: {
        "Content-Type": "application/json",
        Authorization: isType
          ? getCookie("access_type") + " " + getCookie("access_token")
          : null,
      },
    };
    if (!data && !filter) {
      axios(config)
        .then((res) => {
          if (res.status === 200) {
            //  console.log(res.data);
            setUser(res.data);
          } else {
            setUser(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [data]);
  const [vil, setVil] = useState([]);
  useEffect(() => {
    const path = "viloyat";
    const method = "GET";

    postFetch({ path, method, value: "" })
      .then((res) => {
        if (res.status === 200) {
          setVil(
            res.data.viloyat.map((i) => ({ value: i.id, label: i.vil_name }))
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [isSpesial, setSpesial] = useState([]);
  useEffect(() => {
    const path = "special";
    const method = "GET";
    postFetch({ path, method, value: "" })
      .then((res) => {
        if (res.status === 200) {
          setSpesial(
            res.data.special.map((i) => ({ value: i.id, label: i.name }))
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onFinish = async (value) => {
    const config = {
      method: "POST",
      url: `${apiUrl}sorted-user`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(value),
    };
    console.log(config);
    await axios(config)
      .then((res) => {
        if (res.status === 200) return setUser(res.data);
        else console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!user) {
    return <Preloader />;
  }
  return (
    <PageWrapperGlobal
      title="Asosi"
      pageTitle="Kategoriyalar"
      t={t}
      setUser={setUser}
      vil={vil}
      isSpesial={isSpesial}
      onFinish={onFinish}
    >
      <main className={css.indexContainer}>
        <div>
          <Title level={4} className={css.indexTitltFilter}>
            Filtrlash
          </Title>
          <div className={css.indexCheckBoxBlock}>
            <Form
              onFinish={onFinish}
              initialValues={{
                region: [1],
              }}
            >
              <Card className={css.indexCheckBox1}>
                <Text className={css.indexCheckTitle}>VILOYATLAR</Text>
                <Form.Item name="region">
                  <Checkbox.Group options={vil} />
                </Form.Item>
              </Card>
              <Card className={css.indexCheckBox2}>
                <Text className={css.indexCheckTitle}>MUTTAXASISLIKLAR</Text>
                <Form.Item name="special">
                  <Checkbox.Group options={isSpesial} />
                </Form.Item>
              </Card>
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  style={{ width: "100%", margin: "10px 0" }}
                >
                  Saralash
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div>
          <Title level={4}>Eng Ommaboplari</Title>
          {user.map((i) => (
            <Card key={i.id} className={css.indexUserCard}>
              <div className={css.indexUserCardInfo}>
                <div className={css.indexUserCardInfo1}>
                  {i.image !== null ? (
                    <Image
                      src={`${urlImg + i.image}`}
                      alt="avatar"
                      width={70}
                      height={70}
                      className={css.indexUserImage}
                      priority={true}
                    />
                  ) : (
                    <Image
                      src={img}
                      alt="avatar"
                      width={70}
                      height={70}
                      className={css.indexUserImage}
                      priority={true}
                    />
                  )}

                  <div style={{ paddingLeft: 20 }}>
                    <Text style={{ fontSize: 14 }} key={i.special?.id || null}>
                      {i.special?.name}
                    </Text>
                    <br />

                    <Link href={"/index/[id]"} as={`/index/${i.id}`}>
                      <Title level={4}>
                        {i.firstname} {i.lastname}
                      </Title>
                    </Link>
                  </div>
                </div>
                <Rate
                  count={i.like}
                  character={<AiFillHeart aria-labelledby="like" />}
                />
              </div>
              <div>
                <p style={{ marginBottom: 10, paddingTop: 10 }}>
                  <HiOutlineLocationMarker />
                  <Text style={{ paddingLeft: 10 }}>
                    {i.distirct?.vil_name}
                  </Text>
                </p>

                <Tag key={i.sub_special?.id}>{i.sub_special?.name || null}</Tag>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </PageWrapperGlobal>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(urlAlUser, config);
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}

export default HomePage;
