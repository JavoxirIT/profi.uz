import { Statistic, Tag, Typography } from "antd";
import React from "react";
import { RiUserSearchLine } from "react-icons/ri";
import { TbPhone, TbUserCheck } from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import css from "../../styles/Statistics.module.css";

const { Text, Title } = Typography;

export default function StatisticsBlock() {
  return (
    <div className={css.StatisticBlock}>
      <Tag>
        <div className={css.StatisticBlocItem}>
          <RiUserSearchLine className={css.StatisticBlockIcon} />
          <p className={css.StatisticBlockData}>60</p>
          <p className={css.StatisticBlockTitle}>Ko`rilgan</p>
        </div>
      </Tag>
      <Tag>
        <div className={css.StatisticBlocItem}>
          <TbUserCheck className={css.StatisticBlockIcon} />
          <p className={css.StatisticBlockData}>7</p>
          <p className={css.StatisticBlockTitle}>Saqlangan</p>
        </div>
      </Tag>
      <Tag>
        <div className={css.StatisticBlocItem}>
          <TbPhone className={css.StatisticBlockIcon} />
          <p className={css.StatisticBlockData}>16</p>
          <p className={css.StatisticBlockTitle}>Qong`iroq</p>
        </div>
      </Tag>
      <Tag>
        <div className={css.StatisticBlocItem}>
          <CgClose className={css.StatisticBlockIcon} />
          <p className={css.StatisticBlockData}>29</p>
          <p className={css.StatisticBlockTitle}> Bekor qilgan</p>
        </div>
      </Tag>
    </div>
  );
}
