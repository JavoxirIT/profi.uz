import { Tabs, Typography } from "antd";
import React from "react";
import css from "../../styles/TabCard.module.css";
import MasterWorkComment from "./MasterWorkComment"
const { Text, Title, Paragraph } = Typography;
const MasterTab = ({ t, data }) => {
  const items = [
    {
      key: 1,
      label: "Batafsil",
      children: (
        <>
          <div>
            <Title level={4}>Batafsil</Title>
            <Text>{data.description}</Text>
          </div>
          <div key={data.sub_special.id}>
            <Title level={4}>{data.sub_special.name}</Title>
            <Text>{data.sub_special.desc}</Text>
          </div>
        </>
      ),
    },
    {
      key: 2,
      label: "Bajargan ishlari",
      children: "",
    },
    {
      key: 3,
      label: "Fikrlar",
      children: (<MasterWorkComment/>),
    },
  ];

  return (
    <Tabs
      defaultActiveKey="1"
      type="card"
      size={"middle"}
      items={items}
      className={css.MasterTab}
    />
  );
};
//
export default MasterTab;
