import { Tabs, Typography } from "antd";
import React from "react";
import css from "../../styles/TabCard.module.css";
import MasterWorkComment from "./MasterWorkComment";
import Image from "next/image";
import noImg from "../../img/noimage.png";

const { Text, Title, Paragraph } = Typography;
const urlImg = process.env.NEXT_PUBLIC_IMG_URL;
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
      children: (
        <div className={css.bajarilganIshlarBlock}>
          {data?.allworks.map((i, index) => (
            <>
              <div className={css.bajarilganIshlarBlockChild} key={i.id}>
                <div>
                  {" "}
                  <Title level={4}>{i.name}</Title>
                  <div>
                    <Text>{i.about}</Text>
                  </div>
                  <div>
                    <small>{i.time}</small>
                  </div>
                </div>
                <div>
                  {i.gallery !== null ? (
                    <Image
                      priority
                      src={urlImg + i.image}
                      width={200}
                      height={200}
                      alt="work"
                      className={css.bajarilganIshlarImage}
                    />
                  ) : (
                    <Image
                      priority
                      src={noImg}
                      width={200}
                      height={200}
                      alt="work"
                      className={css.bajarilganIshlarImage}
                    />
                  )}
                </div>
              </div>
              <hr />
            </>
          ))}
        </div>
      ),
    },
    {
      key: 3,
      label: "Fikrlar",
      children: <MasterWorkComment />,
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
