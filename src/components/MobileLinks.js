import React from "react";
import Link from "next/link";
import { CgHomeAlt } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { TbCategory } from "react-icons/tb";
import { RiArrowGoBackLine } from "react-icons/ri";
import css from "../styles/Links.module.css";
import { useRouter } from "next/router";

function MobileLinks() {
  const router = useRouter();

  const goBack = (e) => router.back();

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Link className={css.link} href={"/"}>
        <CgHomeAlt />
        <p style={{ fontSize: 10 }}>Asosiy</p>
      </Link>
      <Link className={css.link} href={""}>
        <TbCategory />
        <p style={{ fontSize: 10 }}>Kategoriyalar</p>
      </Link>
      <Link className={css.link} href={""}>
        <AiOutlineHeart />
        <p style={{ fontSize: 10 }}>Sevimlilar</p>
      </Link>
      <Link className={css.link} href={"/cabinet"}>
        <FiUser />
        <p style={{ fontSize: 10 }}>Kabinet</p>
      </Link>
      <div className={css.link} onClick={goBack}>
        <RiArrowGoBackLine />
        <p style={{ fontSize: 10 }}>Qaytish</p>
      </div>
    </div>
  );
}
export default MobileLinks;
