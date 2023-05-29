import React, { useEffect, useState } from "react";
import { Form, Input, Upload, Typography, Button, notification } from "antd";
import PageWrapperAuthorization from "components/PageWrapperAuthorization";
import { CloudUploadOutlined } from "@ant-design/icons";
import { getCookie } from "utils/setCookie";
import { useRouter } from "next/router";
import { FiUser } from "react-icons/fi";
import { CgHomeAlt } from "react-icons/cg";
import css from "../styles/MyWorks.module.css";
import { postFetch } from "../request/Fetch";

// const { Option } = Select;
const { Title } = Typography;
const workImageUrl = process.env.NEXT_PUBLIC_IMG_WORK;
const isType = typeof window !== undefined;
export default function MyWorks({ t, lang }) {
  const router = useRouter();
  const { query } = router;
  // console.log(query);
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    if (!getCookie("access_token")) {
      router.push("/authorization").then(() => {
        setChecked(false);
      });
    } else {
      setChecked(true);
    }
  }, [router]);
  // сообщение об успешном изминения данных
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, code, message) => {
    api[type]({
      message: code,
      description: message,
      duration: 5,
    });
  };
  const [form] = Form.useForm();
  // фунуции для кнопок навигацыии button
  const handleCabinet = (e) => {
    e.preventDefault();
    router.back("/cabinet");
  };
  const handleHome = (e) => {
    e.preventDefault();
    router.push("/");
  };
  // заранее подгружаем страниццы
  useEffect(() => {
    router.prefetch("/cabinet");
    router.prefetch("/");
  }, [router]);

  // действия с upload
  const [cookie, setCookie] = useState(null);
  useEffect(() => {
    setCookie(getCookie("access_token"));
  }, []);
  const props = {
    method: "POST",
    name: "image",
    action: workImageUrl,
    headers: {
      authorization: "Bearer" + " " + cookie,
    },
    onChange({ file }) {
      if (file.response?.status === "success") {
        // console.log(file.response.data.image)
        form.setFieldsValue({
          gallery: file.response.data.image,
        });
        openNotificationWithIcon("success", t.yuklndi, `${file.name}`);
      } else if (file.status === "error") {
        openNotificationWithIcon("error", t.yuklanmadi, `${file.name}`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  const uploadButton = (
    <div style={{ width: "100%" }}>
      <CloudUploadOutlined />
      <p className="ant-upload-text">{t.format}  JPG, PNG, JPEG</p>
      <p className="ant-upload-hint">{t.rasmTanlang}</p>
    </div>
  );
  // отправляем данные в бак
  const onFinishMyWork = (values) => {
    const path = "insert-work";
    const method = "POST";
    const value = JSON.stringify(values);
    postFetch({ path, method, value })
      .then((res) => {
        if (res.status === 200) {
          openNotificationWithIcon("success", t.saqlandi);
          router.push(`/index/${query.user_id}`);
        } else {
          openNotificationWithIcon("error", t.saqlanmadi, res.message);
        }
      })
      .catch((err) => {
        openNotificationWithIcon("error", err.code, err.message);
      });
  };
  return (
    isChecked && (
      <PageWrapperAuthorization title={t.pageTitleMyWork} t={t}>
        {contextHolder}
        <div className={css.MyWorkBlock}>
          <Title level={4}>{t.bajarilganIshlar}</Title>
          <Form
            name=""
            layout="vertical"
            onFinish={onFinishMyWork}
            form={form}
            className={css.MyWorkForm}
          >
            <Form.Item
              name="work_name"
              label={t.ishNomi}
              rules={[
                {
                  required: true,
                  message: t.ishNomiRequared,
                },
              ]}
            >
              <Input className={css.MyWorkormInput} />
            </Form.Item>
            <Form.Item name="gallery" label={t.rasm} valuePropName="picture">
              <Upload
                {...props}
                style={{ width: "100vw" }}
                listType="picture-card"
                progress
                maxCount={1}
              >
                {uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item name="about" label={t.batafsilMalumot}>
              <Input.TextArea
                rows={3}
                showCount
                maxLength={1000}
                className={css.MyWorkFormTextArea}
                allowClear
                placeholder={t.batafsilMalumot2}
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                style={{ width: "100%", marginTop: 30 }}
              >
                {t.qushish}
              </Button>
            </Form.Item>
          </Form>
          <div className={css.MayWorkNavigateBlock}>
            <Button type="link" size="large" onClick={handleCabinet}>
              <FiUser style={{ marginRight: 10 }} /> {t.cabinet}
            </Button>
            <Button type="link" size="large" onClick={handleHome}>
              <CgHomeAlt style={{ marginRight: 10 }} /> {t.home}
            </Button>
          </div>
        </div>
      </PageWrapperAuthorization>
    )
  );
}
