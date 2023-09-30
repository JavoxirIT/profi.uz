import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Card, Tag, Typography, Rate, Tooltip, Button } from "antd";
import img from "../../img/noimage.png";
import { AiFillHeart, AiOutlineEye } from "react-icons/ai";
import { BsChatRightText } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import css from "../../styles/Index.module.css";

const { Text, Title } = Typography;

const urlImg = process.env.NEXT_PUBLIC_IMG_URL;

export default function IndexUserCard({
  user,
  t,
  lang,
  ratingChange,
  ChangeLike,
}) {
  const router = useRouter();
  function userSort(a, b) {
    return a.reyting > b.reyting ? 1 : -1;
  }
  return user
    .sort(userSort)
    .reverse()
    .map((i) => (
      <Card hoverable bordered={false} key={i.id} className={css.indexUserCard}>
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

            <div className={css.CardInfo1Child}>
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
                  {t.umumiyReyting}: {Number(i.reyting).toFixed(1)}
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
              {lang === "ru" ? i.distirct?.vil_name_ru : i.distirct?.vil_name}
            </Text>
          </p>
          <div style={{ paddingTop: 16 }}>
            {i.sub_special?.map((i) => (
              <Tag color="default" key={i.id} style={{ marginBlock: 5 }}>
                {lang === "ru" ? i.nameru : i.name}
              </Tag>
            ))}
          </div>
        </div>
      </Card>
    ));
}
