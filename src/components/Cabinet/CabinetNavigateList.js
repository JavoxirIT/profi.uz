import { Tag, Typography } from "antd";
import Link from "next/link";
import { eraseCookie } from "utils/setCookie";
import css from "../../styles/Cabinet.module.css";

const { Text } = Typography;

const CabinetNavigateList = ({ t, id }) => {
  const data = [
    {
      id: 1,
      link: `/index/${id}`,
      title: t.anketa,
    },
    {
      id: 2,
      link: "/myworks",
      title: t.mywork,
    },
    {
      id: 3,
      link: "/statistics",
      title: t.statistics,
    },
    {
      id: 4,
      link: "/chat",
      title: t.news,
    },
    {
      id: 5,
      link: "/anketa",
      title: t.edit,
    },
    {
      id: 6,
      link: "",
      title: t.exit,
    },
  ];
  // функцыя для выхода
  const handleLink = (e) => {
    if (e.id === 6) {
      eraseCookie("access_token");
      sessionStorage.removeItem("user");
    }
  };

  return data.map((i) => (
    <Tag
      key={i.id}
      bordered
      size="large"
      onClick={() => handleLink(i)}
      className={css.CabinetNavigateBlockList}
    >
      <Link
        className={css.NavigateLinkBlockItem}
        //   href={i.link}
        href={{
          pathname: i.link,
          query: { user_id: id },
        }}
        style={{ display: "block", width: "100%" }}
      >
        <Text>{i.title}</Text>
      </Link>
    </Tag>
  ));
};
export default CabinetNavigateList;
