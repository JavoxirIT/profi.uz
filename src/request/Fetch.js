import axios from "axios";
import {getCookie} from "utils/setCookie";

const url = process.env.NEXT_PUBLIC_API_URL;

export async function postFetch({path, method = "POST", value = ""}) {
	const config = {
		method: method,
		url: `${url + path}`,
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer" + " " + getCookie("access_token"),
		},
		data: value,
	};
	// console.log("postFetch:", config);
	return await axios(config)
	.then((res) => {
		return res;
	})
	.catch((error) => {
		return error;
	});
}
