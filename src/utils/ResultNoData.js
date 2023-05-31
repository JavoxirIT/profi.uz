import { Button, Result } from 'antd';
const ResultNoData = ({t}) => (
	<Result
		status="warning"
		title={t.malumotYuq || name}
		// extra={
		// 	<Button type="primary" key="console">
		// 		Go Console
		// 	</Button>
		// }
	/>
);
export default ResultNoData;