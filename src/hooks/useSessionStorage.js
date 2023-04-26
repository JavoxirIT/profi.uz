import { useState, useEffect } from "react";

export default function useSessionStorage(initiavlValue, key) {
  const storage =
    typeof window !== "undefined" ? sessionStorage.getItem(key) : null;

  function getValue() {
    if (storage) {
      return JSON.parse(storage);
    }
    return initiavlValue;
  }

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
