import React from "react";
import {Button, Result} from "antd";
import Link from "next/link";
import {useRouter} from "next/router";
import PageWrapperAuthorization from "../components/PageWrapperAuthorization";

const Error500 = ({t}) => {
	const router = useRouter();
	return (
		<PageWrapperAuthorization title={"error 500"}>
			<Result
				status="500"
				title="500"
				subTitle={<p style={{color: "#001529"}}>{t.subTitle500}</p>}
				extra={
					<>
						<Button type="primary" onClick={() => router.back()}>
							{t.back}
						</Button>
						<Link href={"/"}>{t.linkHome}</Link>
					</>
				}
			/>
		</PageWrapperAuthorization>
	);
};

export default Error500;
