import { Button, Card, Tag, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import css from "../../styles/TabCard.module.css";
const { Text, Title } = Typography;

export default function TabCard({ data }) {
  const router = useRouter();

  const [isType] = useState(
    data?.type.slice(0, 1).map((i) => {
      return i.type;
    })
  );

  //   const goChat = () =>
  //     router.push({ pathname: "/chat", query: { pid: `${data.id}` } });

  return (
    <>
      <Card className={css.TabCard}>
        <div className={css.UserTabCard}>
          <Image
            priority
            src={data.image}
            width={90}
            height={90}
            alt="avatar"
            placeholder="blur"
            blurDataURL="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88MDjPQAHqQL56h3ziQAAAABJRU5ErkJggg==)"
          />
          <Title level={3} style={{ paddingTop: 16 }}>
            {data.name}
          </Title>
          <Text className={css.TabCardText}>{isType}</Text>
          <div style={{ paddingTop: 16 }}>
            {data.type.map((i) => (
              <Tag color="default" key={i.id} style={{ margin: 5 }}>
                {i.type}
              </Tag>
            ))}
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
