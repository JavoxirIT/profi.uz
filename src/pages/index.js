import { PageWrapperGlobal } from "../components/PageWrapperGlobal";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiFillHeart, AiOutlineEye } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import {
  Typography,
  Card,
  Tag,
  Rate,
  Checkbox,
  Form,
  Button,
  notification,
  Space,
  Divider,
  Tooltip,
} from "antd";
import css from "../styles/Index.module.css";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { getCookie } from "utils/setCookie";
import { postFetch } from "../request/Fetch";
import img from "../img/noimage.png";
import MasterCarusel from "../components/Master/MasterCarusel";
import MasterModalFilter from "../components/Master/MasterModalFilter";
import Preloader from "../components/Preloder/Preloader";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import { IndexTitleFadeEffect } from "../components/Master/IndexTitleFadeEffect";
import IndexFooterFilter from "../components/Index/IndexFooterFilter";
import ModalCenter from "../Modal/ModalCenter";
import { scrollIntoTheView } from "../utils/scrollIntoTheView";
import { BsChatRightText } from "react-icons/bs";
import { useRouter } from "next/router";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const urlAlUser = process.env.NEXT_PUBLIC_ALL_USER;
const urlImg = process.env.NEXT_PUBLIC_IMG_URL;
const { Text, Title } = Typography;
const isType = typeof window !== undefined;

function HomePage({ data, t, lang }) {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // натификацыя
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useCallback(
    (type, code, message) => {
      api[type]({
        message: code,
        description: message,
        duration: 5,
      });
    },
    [api]
  );

  function userSort(a, b) {
    return a.reyting - b.reyting;
  }

  // const [user, setUser] = useState(data.sort(userSort).reverse());
  const [user, setUser] = useState([]);
  const [caruselUser, setCaruselUser] = useState(user);
  // console.log("newData", user);
  useEffect(() => {
    if (!data) {
      postFetch({ path: "all-user" })
        .then((res) => {
          if (res.status === 200) {
            //  console.log(res.data);
            setUser(res.data);
            setCaruselUser(res.data);
          }
        })
        .catch((err) => {
          openNotificationWithIcon("error", err.code, err.message);
        });
    } else {
      setUser(data);
    }
  }, [data, openNotificationWithIcon]);
  const [vil, setVil] = useState([]);
  useEffect(() => {
    setLoading(true);
    postFetch({ path: "viloyat", method: "GET" })
      .then((res) => {
        if (res.status === 200) {
          setVil(res.data.viloyat);
          setLoading(false);
        }
      })
      .catch((err) => {
        openNotificationWithIcon("error", err.code, err.message);
      });
    // 	eslint-disable-next-line
  }, []);

  const [isSpecial, setSpecial] = useState([]);
  const [ollSpecial, setOllSpecial] = useState([]);
  useEffect(() => {
    postFetch({ path: "special", method: "GET", value: "" })
      .then((res) => {
        if (res.status === 200) {
          setSpecial(res.data.special);
          setOllSpecial(res.data.special);
        }
      })
      .catch((err) => {
        openNotificationWithIcon("error", err.code, err.message);
      });
    // 	eslint-disable-next-line
  }, []);
  // filter
  const [subId, setSubId] = useState(null);
  // index modal footer
  const [openModal, setOpenModal] = useState(false);
  const handleCancelModal = () => {
    setOpenModal(false);
  };
  const [dataModalFilter, setModalFilter] = useState([]);
  const onFinish = async (value) => {
    if (subId !== null) {
      value.special = Array();
      value.special[0] = Number(subId);
    }
    postFetch({ path: "sorted-user", value: JSON.stringify(value) })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length !== 0) {
            setUser(res.data);
            setModalFilter(res.data);
            form.resetFields();
            scrollIntoTheView("scroll");
            setOpenModal(false);
            setOpen(false);
            openNotificationWithIcon("success", t.topildi, res.data.length);
          } else {
            openNotificationWithIcon("error", t.errorNoUser);
          }
        } else openNotificationWithIcon("error", res.code, res.message);
      })
      .catch((err) => {
        openNotificationWithIcon("error", err.code, err.message);
      });
  };

  const ChangeLike = (e) => {
    if (getCookie("access_token") === null) {
      openNotificationWithIcon("error", t.likenotification);
      return false;
    }
    let like;
    if (e.like === false) {
      like = 1;
    } else if (e.like?.likes === 0) {
      like = 1;
    } else {
      like = 0;
    }
    const value = JSON.stringify({ user_id: e.id, like: like });
    postFetch({ path: "like", value })
      .then((res) => {
        if (res.status === 200) {
          const dd = data.find((i) => i.id === res.data.user_id);
          const nd = data.filter((i) => i.id !== res.data.user_id);
          if (dd.like.likes) {
            dd.like.likes = res.data.likes;
          } else {
            dd.like = res.data.likes;
          }
          setUser([...nd, dd].sort(userSort).reverse());
          if (res.data.likes === 1) {
            openNotificationWithIcon("success", t.qushildi);
          } else {
            openNotificationWithIcon("warning", t.chiqarildi);
          }
        }
      })
      .catch((err) => {
        // console.log(err)
        openNotificationWithIcon("error", err.code, err.message);
      });
    // console.log(value);
  };
  const [mayRating, setMayRating] = useState();

  const ratingChange = (id, reyting) => {
    const value = JSON.stringify({
      star: String(reyting),
      user_id: Number(id),
    });
    postFetch({ path: "insert-star", value })
      .then((res) => {
        if (res.status === 200) {
          const oneUser = data.find((i) => i.id === res.data.user_id);
          const newArrUser = data.filter((i) => i.id !== res.data.user_id);
          oneUser.reyting = res.data.reyting;
          setUser([...newArrUser, oneUser].sort(userSort).reverse());
          openNotificationWithIcon("success", t.baho);
        } else {
          openNotificationWithIcon("error", res.code, t.bajarilmadi);
        }
      })
      .catch((err) => {
        openNotificationWithIcon("error", err.code, err.message);
      });
  };

  const [filtered, setFiltered] = useState([]);
  useEffect(
    (_) => {
      setFiltered(user);
    },
    [user]
  );

  const Search = (val) => {
    //текущие задачи и новые отфильтрованные задачи
    let currentTodos = [],
      newList = [];
    if (val !== "") {
      //делаем копию нашего стейта
      currentTodos = user;
      //фильтруем стейт в поисках совпадений
      newList = currentTodos.filter((todo) => {
        // значение которое пользователь ввел и которое у нас
        // в стейте делаем строчными буквами чтобы конфликтов не было
        // мало ли пользователь ввель строчными буквами а у нас заглавные
        const lc = todo.firstname.toLowerCase();
        const filter = val.toLowerCase();
        // проверяем есть ли у нас этот элемент если есть возвращаем его
        return lc.includes(filter);
      });
    } else {
      // если в input ничего нету то есть пользователь стер то
      // что ввел тогда возвращаем все задачи
      newList = user;
    }
    setFiltered(newList);
  };
  // console.log(data)
  const [open, setOpen] = useState(false);

  if (!filtered) {
    return <Preloader />;
  }
  return (
    <PageWrapperGlobal
      title={t.wrapperTitle}
      pageTitle=""
      t={t}
      setUser={setUser}
      vil={vil}
      isSpecial={isSpecial}
      onFinish={onFinish}
      Search={Search}
    >
      {/*для скрола*/}
      <div id="scroll" />
      {contextHolder}
      <MasterModalFilter
        vil={vil}
        special={isSpecial}
        onFinish={onFinish}
        setOpen={setOpen}
        open={open}
        loading={loading}
        lang={lang}
        t={t}
        user={dataModalFilter}
        form={form}
      />
      <IndexTitleFadeEffect t={t} />
      <MasterCarusel caruselUser={caruselUser} />
      <main className={css.indexContainer}>
        <div>
          <Title level={4} className={css.indexTitltFilter}>
            {t.reklama}
          </Title>
          <div className={css.indexCheckBoxBlock}>
            <Card bordered={false} className={css.indexCheckBox1}>
              <div className={css.indexCheckBox1Reklama}>
                <p className={css.indexCheckBox1Text}>{t.reklamaText}</p>
              </div>
            </Card>
            <Card bordered={false} className={css.indexCheckBox1}>
              <div className={css.indexCheckBox1Reklama}>
                <p className={css.indexCheckBox1Text}>{t.reklamaText}</p>
              </div>
            </Card>
          </div>
        </div>
        <div>
          <div className={css.indexUserCardInfoHeader}>
            <Title level={4}>{t.engOmmaboplari}</Title>
            <Button size="large" type="primary" onClick={() => setOpen(true)}>
              {t.qidirish}
            </Button>
          </div>
          {filtered.map((i) => (
            <Card
              hoverable
              bordered={false}
              key={i.id}
              className={css.indexUserCard}
            >
              <div className={css.indexUserCardInfo}>
                <div className={css.indexUserCardInfo1}>
                  {i.image !== null ? (
                    <Image
                      src={`${urlImg + i.image}`}
                      alt="avatar"
                      width={90}
                      height={90}
                      className={css.indexUserImage}
                      priority={true}
                    />
                  ) : (
                    <Image
                      src={img}
                      alt="avatar"
                      width={90}
                      height={90}
                      className={css.indexUserImage}
                      priority={true}
                    />
                  )}

                  <div style={{ padding: "10px 0 0 20px" }}>
                    <Tag style={{ fontSize: 14 }} key={i.special?.id || null}>
                      {lang === "ru" ? i.special?.nameru : i.special?.name}
                    </Tag>
                    <br />
                    <Link href={"/index/[id]"} as={`/index/${i.id}`}>
                      <Title level={4} style={{ paddingTop: 10 }}>
                        {i.firstname} {i.lastname}
                      </Title>
                    </Link>
                    <Rate
                      className={css.indexUserRate}
                      onChange={(e) => ratingChange(i.id, e)}
                      value={i.reyting}
                      allowHalf
                    />{" "}
                    <div>
                      <Text>
                        {t.umumiyReyting}: {i.reyting}
                      </Text>
                    </div>
                  </div>
                </div>
                <div className={css.indexUserNavigateBtn}>
                  <AiFillHeart
                    aria-labelledby="like"
                    onClick={() => ChangeLike(i)}
                    className={
                      i.like?.likes === 0 ||
                      i.like === "Unauthorized" ||
                      i.like === false ||
                      i.like === 0
                        ? `${css.indexUserRate}`
                        : `${css.indexUserRateTrue}`
                    }
                  />
                  <Tooltip title={t.batafsilMalumot}>
                    <Button
                      onClick={() => router.push(`/index/${i.id}`)}
                      type="primary"
                      shape="circle"
                      size="large"
                      icon={
                        <AiOutlineEye
                          style={{ fontSize: 20 }}
                          title="batafsil"
                          aria-label="nitification"
                        />
                      }
                    />
                  </Tooltip>
                  <Tooltip title={t.murojaatQilish}>
                    <Button
                      onClick={() =>
                        router.push({
                          pathname: "/chat",
                          query: {
                            id: i.id,
                            name: i.lastname + " " + i.firstname,
                          },
                        })
                      }
                      type="primary"
                      shape="circle"
                      size="large"
                      icon={
                        <BsChatRightText
                          style={{ fontSize: 20 }}
                          title="chat"
                          aria-label="nitification"
                        />
                      }
                    />
                  </Tooltip>
                </div>
              </div>
              <div>
                <p style={{ marginBottom: 10, paddingTop: 10 }}>
                  <HiOutlineLocationMarker />
                  <Text style={{ paddingLeft: 10 }}>
                    {lang === "ru"
                      ? i.distirct?.vil_name_ru
                      : i.distirct?.vil_name}
                  </Text>
                </p>
                <div style={{ paddingTop: 16 }}>
                  {i.sub_special?.map((i) => (
                    <Tag color="default" key={i.id}>
                      {lang === "ru" ? i.nameru : i.name}
                    </Tag>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
      <Divider />
      <section className={css.IndexFooterFilterBlock}>
        <IndexFooterFilter
          vil={vil}
          special={isSpecial}
          onFinish={onFinish}
          loading={loading}
          lang={lang}
          t={t}
          setOpenModal={setOpenModal}
          setSubId={setSubId}
        />
        <ModalCenter
          title={t.modaltitleFilter}
          open={openModal}
          handleCancel={handleCancelModal}
          width={"max-content"}
        >
          <Divider />
          <Form onFinish={onFinish} form={form}>
            <Form.Item name="region">
              <Checkbox.Group>
                <div className={css.MasterModalFilterCheckbox}>
                  {vil.map((i, index) => (
                    <Checkbox
                      key={i.id}
                      value={i.id}
                      // onChange={onRegionChange}
                      // checked={checked === i.id}
                    >
                      {lang === "ru" ? i.vil_name_ru : i.vil_name}
                    </Checkbox>
                  ))}
                </div>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item className={css.MasterModalFilterBtn}>
              <Button type="primary" htmlType="submit">
                {t.qabul}
              </Button>
            </Form.Item>
          </Form>
        </ModalCenter>
      </section>
    </PageWrapperGlobal>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + req.cookies.access_token,
    },
  };
  const response = await fetch(urlAlUser, config);
  const newData = await response.json();
  // console.log(newData)
  const data = newData.filter((i) => i.image !== null);
  return {
    props: {
      data,
    },
  };
}

export default HomePage;
