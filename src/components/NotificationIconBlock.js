import React from "react";
import Link from "next/link";
import { AiOutlineHeart, AiFillWechat } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { BsChatRightText } from "react-icons/bs";
import css from "../styles/NotificationIconBlock.module.css";
import linkCss from "../styles/Links.module.css";
import { Badge } from "antd";
import { TbDoorExit } from "react-icons/tb";
import { useRouter } from "next/router";
import { eraseCookie } from "utils/setCookie";
import DropDown from "./Dropdown/Dropdown";

export default function NotificationIconBlock({ t, unread }) {
  const router = useRouter();
  const goBack = (e) => {
    eraseCookie("access_token");
    eraseCookie("user_id");
    localStorage.removeItem("user");
    router.push("/authorization");
  };

  return (
    <div className={css.NotificationIconBlock}>
      <DropDown />
      <Badge
        size="small"
        // count={unread?.length}
        count={10}
        className={css.NotificationIconBlockBadge}
      >
        <Link href={"/chat"}>
          <BsChatRightText
            className={css.NotificationIconBlockIcon}
            title="yangi xabar"
            aria-label="nitification"
          />
        </Link>
      </Badge>

      <div className={css.NotificationIconBlock2}>
        <Link className={linkCss.link} href={"/likeslist"}>
          <AiOutlineHeart
            className={css.NotificationIconBlockIcon}
            title="sevimlilar"
            aria-label="like"
          />
        </Link>
        <Link className={linkCss.link} href="/cabinet">
          <FiUser
            className={css.NotificationIconBlockIcon}
            aria-label="cabinet"
            title="cabinet"
          />
        </Link>
      </div>

      <TbDoorExit
        title="chiqish"
        aria-label="exit"
        className={css.NotificationIconBlockIcon}
        onClick={goBack}
        color={"red"}
      />
    </div>
  );
}
