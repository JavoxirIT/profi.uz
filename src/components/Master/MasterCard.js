import React from "react";
import { Button, Card, Tag, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import css from "../../styles/TabCard.module.css";
const { Text, Title } = Typography;

const urlImg = process.env.NEXT_PUBLIC_IMG_URL;

export default function MasterCard({ data, t }) {
  const router = useRouter();

  //   const goChat = () =>
  //     router.push({ pathname: "/chat", query: { pid: `${data.id}` } });

  return (
    <>
      <Card className={css.TabCard}>
        <div className={css.UserTabCard}>
          <Image
            className={css.UserTabCardImage}
            priority
            src={urlImg + data.image}
            width={90}
            height={90}
            alt="avatar"
            // placeholder="blur"
            // blurDataURL={user.thumbnailUrl}
          />
          <Title level={3} style={{ paddingTop: 16 }}>
            {data?.firstname} {data?.lastname}
          </Title>
          <Text className={css.TabCardText}>{data?.distirct.vil_name}</Text>
          <div style={{ paddingTop: 16 }}>
            <Tag color="default" key={1} style={{ margin: 5 }}>
              {data?.special.name}{" "}
            </Tag>
          </div>
        </div>
      </Card>
      <Button
        onClick={() => {
          router.push({
            pathname: "/chat",
            query: { id: data?.id, name: data?.lastname },
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
