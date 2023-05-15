import React, { useEffect, useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { PatternFormat } from "react-number-format";
import PageWrapperAuthorization from "../components/PageWrapperAuthorization";
import Link from "next/link";
import style from "../styles/Authorization.module.css";

import { postFetch } from "request/Fetch";
import { NumberStr } from "../utils/NumberString";

import { Preloader } from "../utils/Preloader";
import { useRouter } from "next/router";
import { setCookie } from "utils/setCookie";

// session storage
import useSessionStorage from "hooks/useSessionStorage";

const admin = process.env.NEXT_PUBLIC_USER_ADMIN;
const customer = process.env.NEXT_PUBLIC_USER_CUSTOMER;
const spesialist = process.env.NEXT_PUBLIC_USER_SPECIALIST;

function Authorization({ t }) {
  const router = useRouter();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  // иницыализацыя session storage
  const [isuser, setUser] = useSessionStorage([], "user");
  // loder
  const [loder, setLoader] = useState(false);
  // натификацыя
  const openNotificationWithIcon = (type, code, message) => {
    api[type]({
      message: code,
      description: message,
      duration: 1500,
    });
  };

  // отправляем запрос для авторизации
  const AuthorizationPost = async (value) => {
    value.phone = NumberStr(value["phone"]);
    setLoader(true);
    const method = "post";
    const path = "login";
    await postFetch({ path, method, value })
      .then((res) => {
        setLoader(false);
        //   console.log(res);
        if (res.status === 200) {
          setCookie("access_token", res.data.access_token, res.data.expires_in);
          setCookie("user_id", res.data.user.id, res.data.expires_in);
          setUser(res.data.user);
          openNotificationWithIcon(
            "success",
            "Xush kelibsiz",
            "Tizimga muvaffaqiyatli kirdingiz"
          );
          //  res.data.user.role_id === spesialist
          //    ? router.push("/cabinet")
          //    : res.data.user.role_id === admin
          //    ? router.push("/admin")
          //    : res.data.user.role_id === customer
          //    ? router.push("/")
          //    : null;

          switch (res.data.user.role_id) {
            case Number(spesialist):
              router.push("/cabinet");
              break;
            case Number(admin):
              router.push("/admin");
              break;
            case Number(customer):
              router.push("/");
              break;
            default:
              null;
              break;
          }
        } else if (res.code === "ERR_BAD_REQUEST") {
          openNotificationWithIcon(
            "error",
            `${res.code + " " + res.message}`,
            "Xatolik faydalanuvchi mavjut emas"
          );
        } else {
          openNotificationWithIcon("error", res.code, res.message);
        }
      })
      .catch((err) => {
        console.error("message:", err);
        setLoader(false);
        openNotificationWithIcon("error", err.code, err.message);
      });
  };
  const onFinishFailed = (errorInfo) => {
    openNotificationWithIcon("error", errorInfo, errorInfo);
  };

  // заранее загружаем страницы
  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/registration");
    router.prefetch("/cabinet");
  }, [router]);

  return (
    <PageWrapperAuthorization title="Kirish">
      {contextHolder}
      <div className={style.AuthorizationFormBlock}>
        {loder ? (
          <Preloader />
        ) : (
          <Form
            form={form}
            name="basic"
            onFinish={AuthorizationPost}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: t.formReqMess,
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
              name="password"
              rules={[
                {
                  required: true,
                  message: t.formReqMessParol,
                },
              ]}
            >
              <Input.Password
                placeholder={t.formReqMessParol2}
                className={style.AuthorizationFormInput}
              />
            </Form.Item>

            <Form.Item >
              <Button
                type="primary"
                htmlType="submit"
                className={style.AuthorizationFormButton}
              >
                {t.authButtonTitle}
              </Button>
            </Form.Item>
          </Form>
        )}
        <div className={style.AuthorizationLinkBlock}>
          <Link href={"/"}>{t.linkHome}</Link>
        </div>
        <div className={style.AuthorizationLinkBlock}>
          <Link href={"/registration"}>{t.linkRegistration}</Link>
        </div>
      </div>
    </PageWrapperAuthorization>
  );
}
export default Authorization;
