import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Modal,
  Upload,
  Select,
  Typography,
  Button,
  notification,
} from "antd";
import ImgCrop from "antd-img-crop";
import PageWrapperAuthorization from "components/PageWrapperAuthorization";
import { CloudUploadOutlined } from "@ant-design/icons";
import Image from "next/image";
import { getCookie } from "utils/setCookie";
import { useRouter } from "next/router";
import { FiUser } from "react-icons/fi";
import { CgHomeAlt } from "react-icons/cg";
import { postFetch } from "request/Fetch";
import css from "../styles/MyWorks.module.css";

const { Option } = Select;
const { Title, Text } = Typography;

const isType = typeof window !== undefined;

export default function MyWorks() {
  // сообщение об успешном изминения данных
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, code, message) => {
    api[type]({
      message: code,
      description: message,
      dduration: 0,
    });
  };
  const [form] = Form.useForm();
  const router = useRouter();
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
  const onFineshMyWork = (value) => {
    //  console.log(value);
  };

  // действия с upload
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    //  console.log(newFileList);
  };
  const uploadButton = (
    <div style={{ width: "100%" }}>
      <CloudUploadOutlined />
      <p className="ant-upload-text">Format JPG, PNG, JPEG</p>
      <p className="ant-upload-hint">Faylni tanlash</p>
    </div>
  );
  return (
    <PageWrapperAuthorization title="Bajarilgan ishlar">
      {contextHolder}
      <div className={css.MyWorkBlock}>
        <Title level={4}>Bajarilgan ishlar</Title>
        <Form
          name=""
          layout="vertical"
          onFinesh={onFineshMyWork}
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
          <Form.Item
            name="image"
            label="Rasm"
            valuePropName="picture"

            // rules={[
            //   {
            //     required: true,
            //     message: "Rasm tanlang!",
            //   },
            // ]}
          >
            <ImgCrop
              showGrid
              rotationSlider
              aspectSlider
              modalCancel="Закрыть"
              modalOk="Добавить"
              modalTitle="Настройки изоброжения"
              onModalOk={(file) => {
                const formData = new FormData();
                formData.append("image", file);
                const config = {
                  method: "POST",
                  headers: {
                    authorization: isType
                      ? getCookie("access_type") +
                        " " +
                        getCookie("access_token")
                      : null,
                  },
                  body: formData,
                };
                //  fetch("", config)
                //    .then((res) => res.json())
                //    .then((json) => {
                //      console.log("json", json.status);
                //      console.log("image:", json.data.image);
                //      if (json.status === "success") {
                //        form.setFieldsValue({
                //          image: json.data.image,
                //        });
                //      }
                //    })
                //    .catch((err) => {
                //      console.log(err);
                //    });
              }}
            >
              <Upload
                style={{ width: "100vw" }}
                action=""
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                progress
                multiple
              >
                {fileList.length >= 10 ? null : uploadButton}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item name="description" label="Batafsil ma’lumot">
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
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <Image src={previewImage} alt="image" width={330} height={350} />
        </Modal>
        <div className={css.MayWorkNavigateBlock}>
          <Button type="link" size="large" onClick={handleCabinet}>
            <FiUser style={{ marginRight: 10 }} /> Kabinet
          </Button>
          <Button type="link" size="large" onClick={handleHome}>
            <CgHomeAlt style={{ marginRight: 10 }} /> Bosh sahifa
          </Button>
        </div>
      </div>
    </PageWrapperAuthorization>
  );
}
