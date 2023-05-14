import { Button, Result } from 'antd';
const ResultNoData = () => (
	<Result
		status="warning"
		title="Ma'lumot yoq."
		// extra={
		// 	<Button type="primary" key="console">
		// 		Go Console
		// 	</Button>
		// }
	/>
);
export default ResultNoData;