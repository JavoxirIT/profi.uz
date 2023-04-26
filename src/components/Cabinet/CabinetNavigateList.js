import { Tag } from "antd";
import Link from "next/link";
import { eraseCookie } from "utils/setCookie";
import css from "../../styles/Cabinet.module.css";
const data = [
  {
    id: 1,
    link: "/anketa",
    title: "Shaxsiy ma’lumotlar",
  },
  {
    id: 2,
    link: "/myworks",
    title: "Bajarilgan ishlar",
  },
  {
    id: 3,
    link: "/statistics",
    title: "Statistika",
  },
  {
    id: 4,
    link: "",
    title: "Xabarlar",
  },
  {
    id: 5,
    link: "/asdasd",
    title: "Taxrirlash",
  },
  {
    id: 6,
    link: "",
    title: "Chiqish",
  },
];
const CabinetNavigateList = () => {
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
