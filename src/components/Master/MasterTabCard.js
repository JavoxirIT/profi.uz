import { Tabs } from "antd";
import React from "react";
import css from "../../styles/TabCard.module.css";
const MasterTab = ({ data }) => {
  const information = data.info.map((i) => {
    return {
      label: `${i.title}`,
      key: `${i.id}`,
      children: `${i.info}`,
    };
  });

  return (
    <Tabs
      defaultActiveKey="1"
      type="card"
      size={"middle"}
      items={information}
      className={css.MasterTab}
    />
  );
};
//
export default MasterTab;
