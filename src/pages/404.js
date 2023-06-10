import {Button, Result} from "antd";
import PageWrapperAuthorization from "components/PageWrapperAuthorization";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect} from "react";

const ErrorPage = ({t}) => {
	const router = useRouter();
	const handleBack = (e) => {
		e.preventDefault();
		router.back();
	};
	useEffect(() => {
		router.prefetch("/");
	}, [router]);
	return (
		<PageWrapperAuthorization title={"error 404"}>
			<Result
				status="404"
				title="404"
				subTitle={<p style={{color: "#001529"}}  >{t.subTitle}</p>}
				extra={
					<>
						<Button type="primary">
							<a onClick={handleBack}>{t.back}</a>
						</Button>
						<Link href="/">{t.linkHome}</Link>
					</>
				}
			/>
		</PageWrapperAuthorization>
	);
};
export default ErrorPage;
// Извините, страница, которую вы посетили, не существует.
