import { Dropdown, Space, Switch, Typography } from "antd";
import { RiEarthFill } from "react-icons/ri";
import { Segmented } from "antd";
import css from "../../styles/NotificationIconBlock.module.css";
import { useState } from "react";
import { uz } from "../language/uz";
import { ru } from "../language/ru";
const DropDown = () => {
  const [value, setValue] = useState(uz);
  const items = [
    {
      key: "1",
      label: (
        <Segmented
          options={["uz", "ru"]}
          value={value}
          onChange={(e) => setValue(e === "uz" ? ru : uz)}
        />
      ),
    },
    {
      key: "2",
      label: <Switch checkedChildren="uz" unCheckedChildren="ru" />,
    },
    {
      key: "3",
      label: "Item 3",
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomLeft"
    >
      <Typography.Link>
        <Space>
          <RiEarthFill
            className={css.NotificationIconBlockIcon}
            title="dropdown"
            aria-label="dropdown"
          />
        </Space>
      </Typography.Link>
    </Dropdown>
  );
};
export default DropDown;
