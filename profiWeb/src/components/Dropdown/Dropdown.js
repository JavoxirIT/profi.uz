import { useEffect, useState } from "react";
import { Dropdown, Space, Switch, Typography } from "antd";
import { RiEarthFill } from "react-icons/ri";
import { Segmented } from "antd";
import css from "../../styles/NotificationIconBlock.module.css";
import { uz } from "../language/uz";
import { ru } from "../language/ru";

import useLang from "store/languageStore";

const DropDown = () => {
  const lang = useLang((state) => state.lang);

  const addLanguage = useLang((state) => state.addLanguage);
  const removeLanguage = useLang((state) => state.removeLanguage);
  const [myLang, setLang] = useState();

  useEffect(() => {
    setLang(lang);
  }, [lang]);

  const items = [
    {
      key: "1",
      label: (
        <Segmented
          options={["uz", "ru"]}
          value={myLang}
          onChange={(e) =>
            e === "uz"
              ? addLanguage({ state: uz })
              : removeLanguage({ state: ru })
          }
        />
      ),
    },
    {
      key: "2",
      label: "",
    },
    {
      key: "3",
      label: "",
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomLeft"
    >
      <RiEarthFill
        className={css.NotificationIconBlockIcon}
        title="dropdown"
        aria-label="dropdown"
      />
    </Dropdown>
  );
};
export default DropDown;
