import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import css from "../../styles/TabCard.module.css";
const MasterTab = ({ t }) => {
  const [comm, setComm] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=1`)
      .then((response) => response.json())
      .then((json) => setComm(json));
  }, []);
  const information = comm.map((i) => {
    return {
      label: `${i.email}`,
      key: `${i.id}`,
      children: `${i.body}`,
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
