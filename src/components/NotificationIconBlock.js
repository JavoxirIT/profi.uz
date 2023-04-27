import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { RiEarthFill } from "react-icons/ri";
import { MdOutlineNotifications } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import css from "../styles/NotificationIconBlock.module.css";
import linkCss from "../styles/Links.module.css";
import { Badge } from "antd";
import { TbDoorExit } from "react-icons/tb";
import { useRouter } from "next/router";
import { eraseCookie } from "utils/setCookie";
import DropDown from "./Dropdown/Dropdown";

export default function NotificationIconBlock({ t }) {
  const router = useRouter();
  const goBack = (e) => {
    eraseCookie("access_token");
    eraseCookie("access_type");
    localStorage.removeItem("user");
    router.push("/authorization");
  };

  return (
    <div className={css.NotificationIconBlock}>
      <DropDown />
      <Badge size="small" count={5} className={css.NotificationIconBlockBadge}>
        <MdOutlineNotifications
          className={css.NotificationIconBlockIcon}
          title="yangi xabar"
          aria-label="nitification"
        />
      </Badge>

      <div className={css.NotificationIconBlock2}>
        <AiOutlineHeart
          className={css.NotificationIconBlockIcon}
          title="sevimlilar"
          aria-label="like"
        />
        <Link className={linkCss.link} href="/cabinet">
          <FiUser
            className={css.NotificationIconBlockIcon}
            aria-label="cabinet"
          />
        </Link>
      </div>

      <TbDoorExit
        title="chiqish"
        aria-label="exit"
        className={css.NotificationIconBlockIcon}
        onClick={goBack}
      />
    </div>
  );
}
