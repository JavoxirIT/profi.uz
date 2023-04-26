import { uz } from "./lang/uz";
import { ru } from "./lang/ru";
export default function language(req, res) {
  if (res.method === "GET") {
    res.status(200).json(uz);
  }
}
