import { Button, Card, Tag, Typography, Image } from "antd";
// import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import css from "../../styles/TabCard.module.css";
import img from "../../../public/assets/images/2.png";
const { Text, Title } = Typography;

export default function MasterCard({ data, t }) {
  const [user, setUser] = useState([]);
  const router = useRouter();

  //   const goChat = () =>
  //     router.push({ pathname: "/chat", query: { pid: `${data.id}` } });

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos/${router.query.id}`)
      .then((response) => response.json())
      .then((json) => setUser(json));
  }, [router.query.id]);

  return (
    <>
      <Card className={css.TabCard}>
        <div className={css.UserTabCard}>
          {/* <Image
            priority
            src={user.url}
            width={90}
            height={90}
            alt="avatar"
            // placeholder="blur"
            // blurDataURL={user.thumbnailUrl}
          /> */}
          <Image width={150} src={user.url} preview={user.thumbnailUrl} />
          <Title level={3} style={{ paddingTop: 16 }}>
            {data.name}
          </Title>
          <Text className={css.TabCardText}>{data.phone}</Text>
          <div style={{ paddingTop: 16 }}>
            <Tag color="default" key={1} style={{ margin: 5 }}>
              {data.address.city}
            </Tag>
          </div>
        </div>
      </Card>
      <Button
        onClick={() => {
          router.push({
            pathname: "/chat",
            query: { id: data.id, name: data.name },
          });
        }}
        type="primary"
        size="large"
        className={css.TabCardButton}
      >
        Murojaat qilish
      </Button>
    </>
  );
}
