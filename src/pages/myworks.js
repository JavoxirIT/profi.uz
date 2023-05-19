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
export default function MyWorks({ t }) {
  const router = useRouter();
  const { query } = router;
  console.log(query);
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
        openNotificationWithIcon("success", " Yuklandi", `${file.name}`);
      } else if (file.status === "error") {
        openNotificationWithIcon("error", " Yuklanmadi", `${file.name}`);
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
      <p className="ant-upload-text">Format JPG, PNG, JPEG</p>
      <p className="ant-upload-hint">Rasimni tanlang</p>
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
          openNotificationWithIcon("success", "Malumotlar saqlandi");
          router.push(`/index/${query.user_id}`);
        } else {
          openNotificationWithIcon("error", "Saqlanmadi", res.message);
        }
      })
      .catch((err) => {
        openNotificationWithIcon("error", er.code, err.message);
      });
  };
  return (
    isChecked && (
      <PageWrapperAuthorization title="Bajarilgan ishlar" t={t}>
        {contextHolder}
        <div className={css.MyWorkBlock}>
          <Title level={4}>Bajarilgan ishlar</Title>
          <Form
            name=""
            layout="vertical"
            onFinish={onFinishMyWork}
            form={form}
            className={css.MyWorkForm}
          >
            <Form.Item
              name="work_name"
              label="Ish nomi"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input className={css.MyWorkormInput} />
            </Form.Item>
            <Form.Item name="gallery" label="Rasm" valuePropName="picture">
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
            <Form.Item name="about" label="Batafsil ma’lumot">
              <Input.TextArea
                rows={3}
                showCount
                maxLength={1000}
                className={css.MyWorkFormTextArea}
                allowClear
                placeholder="To’liqroq yozing..."
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                style={{ width: "100%", marginTop: 30 }}
              >
                Saqlash
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
