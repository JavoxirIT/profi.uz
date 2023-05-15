import React, { useEffect, useState } from "react";
import { Button, Form, Input, notification, Switch, Typography } from "antd";
import { PatternFormat } from "react-number-format";
import PageWrapperAuthorization from "../components/PageWrapperAuthorization";
import Link from "next/link";
import style from "../styles/Authorization.module.css";
import { NumberStr } from "utils/NumberString";
import { postFetch } from "request/Fetch";
import { setCookie } from "utils/setCookie";
import { useRouter } from "next/router";
import useSessionStorage from "hooks/useSessionStorage";

const { Text } = Typography;

const admin = process.env.NEXT_PUBLIC_USER_ADMIN;
const customer = process.env.NEXT_PUBLIC_USER_CUSTOMER;
const spesialist = process.env.NEXT_PUBLIC_USER_SPECIALIST;

function Registration({ t }) {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, code, message) => {
    api[type]({
      message: code,
      description: message,
      dduration: 0,
    });
  };
  const [user, setUser] = useSessionStorage([], "user");
  const [isSwitch, setIsSwitch] = useState(2);
  // отправляем запрос для регистрации
  const RegistrationPost = (value) => {
    value.role_id = String(isSwitch);
    value.phone = NumberStr(value["phone"]);

    const method = "post";
    const path = "register";
    // отправляем запрос для  регистрации
    postFetch({ path, method, value })
      .then((res) => {
        if (res.status === 200) {
          openNotificationWithIcon(
            "success",
            "Xush kelibsiz",
            "Tizimga muvaffaqiyatli kirdingiz"
          );
          setCookie("access_token", res.data.access_token, res.data.expires_in);
          setCookie("access_type", res.data.token_type);
          setUser(res.data.user);
          //   распридиляем по ролям
          res.data.user.role_id === Number(spesialist)
            ? router.push("/cabinet")
            : res.data.user.role_id === Number(admin)
            ? router.push("/admin")
            : res.data.user.role_id === Number(customer)
            ? router.push("/")
            : null;
        } else if (res.code === "ERR_BAD_REQUEST") {
          openNotificationWithIcon(
            "error",
            `${res.code + " " + res.message}`,
            "Xatolik"
          );
        }
      })
      .catch((err) => openNotificationWithIcon("error", err.code, err.message));
  };

  useEffect(() => {
    router.prefetch("/cabonet");
  }, [router]);

  return (
    <PageWrapperAuthorization
      title="Ro’yxatdan o’tish"
      // pageTitle="Ro’yxatdan o’tish"
    >
      {contextHolder}
      <div className={style.AuthorizationFormBlock}>
        {" "}
        <Form
          layout="vertical"
          name="basic"
          onFinish={RegistrationPost}
          autoComplete="off"
          className={style.AuthorizationForm}
        >
          <Form.Item
            label="Telefon raqamingiz"
            name="phone"
            rules={[
              {
                required: true,
                message: "Iltomos telefon raqamizni kiriting!",
              },
            ]}
          >
            <PatternFormat
              format="+998 (##) ### ## ##"
              allowEmptyFormatting
              mask="_"
              customInput={Input}
              className={style.AuthorizationFormInput}
            />
          </Form.Item>

          <Form.Item
            label="Parol"
            name="password"
            rules={[
              {
                required: true,
                message: "Iltomos parolni kiriting!",
              },
            ]}
          >
            <Input.Password
              placeholder="Parol"
              className={style.AuthorizationFormInput}
            />
          </Form.Item>
          <Form.Item
            valuePropName="checked"
            wrapperCol={{
              offset: 3,
              span: 24,
            }}
          >
            <Text>Buyurtmachi</Text>
            <Switch
              style={{ margin: "0 20px" }}
              onChange={(e) => setIsSwitch(e.target === false ? 2 : 3)}
            />
            <Text>Mutaxasis</Text>
          </Form.Item>
          <Form.Item className={style.AuthorizationFormButtonForm}>
            <Button
              type="primary"
              htmlType="submit"
              className={style.AuthorizationFormButton}
            >
              {t.regButtonTitle}
            </Button>
          </Form.Item>
        </Form>
        <div className={style.AuthorizationLinkBlock}>
          <Link href={"/"}>BOSH SAHIFA</Link>
        </div>
        <div className={style.AuthorizationLinkBlock}>
          <Link href={"/authorization"}>KIRISH</Link>
        </div>
      </div>
    </PageWrapperAuthorization>
  );
}
export default Registration;
