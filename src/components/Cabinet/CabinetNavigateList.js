import { Tag } from "antd";
import Link from "next/link";
import { eraseCookie } from "utils/setCookie";
import css from "../../styles/Cabinet.module.css";

const CabinetNavigateList = ({ t }) => {
  const data = [
    {
      id: 1,
      link: "/anketa",
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
      link: "",
      title: t.news,
    },
    {
      id: 5,
      link: "/asdasd",
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
      eraseCookie("access_type");
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
      <Link className={css.NavigateLinkBlockItem} href={i.link}>
        {i.title}
      </Link>
    </Tag>
  ));
};
export default CabinetNavigateList;
