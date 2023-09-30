import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getCookie } from "utils/setCookie";
import {
  Typography,
  Card,
  Checkbox,
  Form,
  Button,
  notification,
  Divider,
  Pagination,
  Row,
} from "antd";
import { PageWrapperGlobal } from "../components/PageWrapperGlobal";
import React, { useCallback, useEffect, useState } from "react";
import { postFetch } from "../request/Fetch";
// import MasterCarusel from "../components/Master/MasterCarusel";
import MasterModalFilter from "../components/Master/MasterModalFilter";
import { IndexTitleFadeEffect } from "../components/Master/IndexTitleFadeEffect";
// import IndexFooterFilter from "../components/Index/IndexFooterFilter";
import ModalCenter from "../Modal/ModalCenter";
import { scrollIntoTheView } from "../utils/scrollIntoTheView";
import EmptyData from "../components/Preloder/EmptyData";
import { Preloader } from "../utils/Preloader";
import css from "../styles/Index.module.css";

const MasterCarusel = dynamic(
  () => import("../components/Master/MasterCarusel"),
  {
    loading: () => <Preloader />,
  }
);
const IndexFooterFilter = dynamic(() =>
  import("../components/Index/IndexFooterFilter")
);

const IndexUserCard = dynamic(
  () => import("../components/Index/IndexUserCard"),
  {
    loading: () => <Preloader />,
  }
);

const { Title } = Typography;

function HomePage({ json, t, lang }) {
  const [user, setUser] = useState(json.data);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // натификацыя
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useCallback(
    (type, code, message, placement) => {
      api[type]({
        message: code,
        description: message,
        duration: 10,
        style: {
          width: 600,
        },
        placement,
      });
    },
    [api]
  );

  //TODO пагинация
  const [current, setCurrent] = useState();
  const [total, setTotal] = useState(json.total);

  const onPagination = (page) => {
    setCurrent(page);
    postFetch({ path: `all-user?page=${page}` })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.data);
          setTotal(res.data.total);
          setCurrent(res.data.current_page);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  //

  const [vil, setVil] = useState([]);
  useEffect(() => {
    setLoading(true);
    postFetch({ path: "viloyat", method: "GET" })
      .then((res) => {
        if (res.status === 200) {
          setVil(res.data.viloyat);
        } else setVil([]);
      })
      .catch((err) => {
        // openNotificationWithIcon("error", t.errorNoUser500);
      })
      .finally(() => {
        setLoading(false);
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
        // openNotificationWithIcon("error", err.code, err.message);
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
  const sortedUser = async (value) => {
    setModalFilter([]);
    if (subId !== null) {
      value.special = Array();
      value.special[0] = Number(subId);
    }
    postFetch({ path: "sorted-user", value: JSON.stringify(value) })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.length !== 0) {
            // console.log(res.data)
            setUser(res.data.data);
            setModalFilter(res.data);
            form.resetFields();
            scrollIntoTheView("scroll");
            setOpenModal(false);
            setOpen(false);
            openNotificationWithIcon("success", t.topildi);
          } else {
            openNotificationWithIcon("error", t.errorNoUser);
          }
        } else openNotificationWithIcon("error", t.errorNoUser500);
      })
      .catch((err) => {
        // openNotificationWithIcon("error", err.code, err.message);
        console.error(err);
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
    const value = JSON.stringify({ user_id: e.id, like });
    postFetch({ path: "like", value })
      .then((res) => {
        if (res.status === 200) {
          const dd = json.data.find((i) => i.id === res.data.user_id);
          const nd = json.data.filter((i) => i.id !== res.data.user_id);
          if (dd.like.likes) {
            dd.like.likes = res.data.likes;
          } else {
            dd.like = res.data.likes;
          }
          setUser([...nd, dd]);
          if (res.data.likes === 1) {
            openNotificationWithIcon("success", t.qushildi);
          } else {
            openNotificationWithIcon("warning", t.chiqarildi);
          }
        }
      })
      .catch((err) => {
        // console.log(err)
        // openNotificationWithIcon("error", err.code, err.message);
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
        if (res.status) {
          const oneUser = json.data.find((i) => i.id === res.data.user_id);
          const newArrUser = json.data.filter((i) => i.id !== res.data.user_id);
          oneUser.reyting = res.data.reyting;
          setUser([...newArrUser, oneUser]);
          openNotificationWithIcon("success", t.baho);
        } else {
          openNotificationWithIcon("error", t.insertStarError);
        }
      })
      .catch((err) => {
        openNotificationWithIcon("error", t.errorNoUser500);
      });
  };

  //поиск специалиста на стороне сервера
  const [loader, setLoader] = useState(false);
  const Search = async (val) => {
    setLoader(true);
    const data = {
      data: val,
    };
    await postFetch({ path: "search", value: data })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setLoader(false);
          setUser(res.data);
          if (res.data.length === 0) {
            openNotificationWithIcon("error", t.errorNoUser);
          }
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };

  const [open, setOpen] = useState(false);

  //   if (user.length === 0 || loader === true) {
  //     return <Preloader />;
  //   }
  return (
    <PageWrapperGlobal
      title={t.wrapperTitle}
      pageTitle=""
      t={t}
      setUser={setUser}
      vil={vil}
      isSpecial={isSpecial}
      onFinish={sortedUser}
      Search={Search}
    >
      {/*для скрола*/}
      <div id="scroll" />
      {contextHolder}
      <MasterModalFilter
        vil={vil}
        special={isSpecial}
        onFinish={sortedUser}
        setOpen={setOpen}
        open={open}
        loading={loading}
        lang={lang}
        t={t}
        user={dataModalFilter}
        form={form}
      />
      <IndexTitleFadeEffect t={t} />
      <div className={css.IndexTopUsers}>
        <h2>{t.topSpecial}</h2>
      </div>

      <MasterCarusel lang={lang} />

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

          {user.length === 0 ? (
            <EmptyData t={t} />
          ) : loader === true ? (
            <Preloader />
          ) : (
            <IndexUserCard
              user={user}
              t={t}
              lang={lang}
              ratingChange={ratingChange}
              ChangeLike={ChangeLike}
            />
          )}
          <Row justify="center">
            <Pagination
              style={{ marginTop: 15 }}
              current={current}
              onChange={onPagination}
              total={total}
            />
          </Row>
        </div>
      </main>
      <Divider />
      <section className={css.IndexFooterFilterBlock}>
        <IndexFooterFilter
          vil={vil}
          special={isSpecial}
          onFinish={sortedUser}
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
          <Form onFinish={sortedUser} form={form}>
            <Form.Item name="region">
              <Checkbox.Group>
                <div className={css.MasterModalFilterCheckbox}>
                  {vil.map((i, index) => (
                    <Checkbox
                      key={i.id}
                      value={i.id}
                      // onPagination={onRegionChange}
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
  const response = await fetch(process.env.NEXT_PUBLIC_ALL_USER, config);
  const json = await response.json();

  return {
    props: {
      json,
    },
  };
}

export default HomePage;
