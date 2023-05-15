import { extractStyle } from "@ant-design/static-style-extract";
import fs from "fs";
import withTheme from "../theme";

const outputPath = "./public/antd.min.css";

const css = extractStyle(withTheme);

fs.writeFileSync(outputPath, css);
