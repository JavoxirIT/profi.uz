import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { Typography, Card, Tag, Rate } from "antd";

const { Text, Title } = Typography;

function Master({ id, image, location, name, type }) {
  return (
    <Card
      style={{
        marginBottom: 15,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={image} alt="avatar" width={40} height={40} />
          <div style={{ paddingLeft: 10 }}>
            <Text style={{ fontSize: 12 }}>{type[0].type}</Text>
            <br />
            <Title level={5}>
              <Link href="/index/[id]" as={`/index/${id}`}>
                {name}
              </Link>
            </Title>
          </div>
        </div>
        <Rate count={1} character={<AiFillHeart aria-labelledby="like" />} />
      </div>
      <div>
        <p style={{ marginBottom: 10 }}>
          <HiOutlineLocationMarker />
          <Text style={{ paddingLeft: 10 }}>{location}</Text>
        </p>
        {type.map((i) => (
          <Tag key={i.id}>{i.type}</Tag>
        ))}
      </div>
    </Card>
  );
}

export default Master;
