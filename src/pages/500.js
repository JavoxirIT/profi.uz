import React from "react";
import { Button, Result } from "antd";
import Link from "next/link";

const Error500 = () => {
  const router = useRouter();
  return (
    <Result
      status="500"
      title="500"
      subTitle="Произошла ошибка на стороне сервера."
      extra={
        <>
          <Button type="primary" onClick={() => router.back()}>
            Назад
          </Button>
          <Link href={"/"}>Главная страница</Link>
        </>
      }
    />
  );
};

export default Error500;
