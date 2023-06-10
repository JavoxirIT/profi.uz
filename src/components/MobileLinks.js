import React from "react";
import Link from "next/link";
import { CgHomeAlt } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { TbCategory } from "react-icons/tb";
import { RiArrowGoBackLine } from "react-icons/ri";
import css from "../styles/Links.module.css";
import { useRouter } from "next/router";

function MobileLinks({ t }) {
  const router = useRouter();
  const goBack = (e) => router.back();
  return (
    <div style={{ display: "flex", justifyContent: "space-around"}}>
      <Link className={css.link} href={"/"}>
        <CgHomeAlt style={{color: "#fff"}} />
        <p style={{ fontSize: 14, color: "#fff" }}>{t.home}</p>
      </Link>
      <Link className={css.link} href={"/likeslist"}>
        <AiOutlineHeart  style={{color: "#fff"}}/>
        <p style={{ fontSize: 14, color: "#fff" }}>{t.live}</p>
      </Link>
      <Link className={css.link} href={"/cabinet"}>
        <FiUser  style={{color: "#fff"}}/>
        <p style={{ fontSize: 14, color: "#fff" }}>{t.cabinet}</p>
      </Link>
      <div className={css.link} onClick={goBack}>
        <RiArrowGoBackLine color={"red"}/>
        <p style={{ fontSize: 14, color: "red" }}>{t.back}</p>
      </div>
    </div>
  );
}
export default MobileLinks;
