import { Statistic, Tag, Typography } from "antd";
import React from "react";
import { RiUserSearchLine } from "react-icons/ri";
import { TbPhone, TbUserCheck } from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import css from "../../styles/Statistics.module.css";

const { Text, Title } = Typography;

export default function StatisticsBlock({t}) {
  return (
    <div className={css.StatisticBlock}>
      <Tag>
        <div className={css.StatisticBlocItem}>
          <RiUserSearchLine className={css.StatisticBlockIcon} />
          <p className={css.StatisticBlockData}>60</p>
          <p className={css.StatisticBlockTitle}>{t.kurilgan}</p>
        </div>
      </Tag>
      <Tag>
        <div className={css.StatisticBlocItem}>
          <TbUserCheck className={css.StatisticBlockIcon} />
          <p className={css.StatisticBlockData}>7</p>
          <p className={css.StatisticBlockTitle}>{t.saqlangan}</p>
        </div>
      </Tag>
      <Tag>
        <div className={css.StatisticBlocItem}>
          <TbPhone className={css.StatisticBlockIcon} />
          <p className={css.StatisticBlockData}>16</p>
          <p className={css.StatisticBlockTitle}>{t.boglangan}</p>
        </div>
      </Tag>
      <Tag>
        <div className={css.StatisticBlocItem}>
          <CgClose className={css.StatisticBlockIcon} />
          <p className={css.StatisticBlockData}>29</p>
          <p className={css.StatisticBlockTitle}>{t.bekorqilgan}</p>
        </div>
      </Tag>
    </div>
  );
}
