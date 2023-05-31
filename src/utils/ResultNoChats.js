import { Button, Result } from 'antd';
const ResultNoChats = ({t, name}) => (
	<Result
		// status="warning"
		title={!name ? t.chatniTanlang : name}
	/>
);
export default ResultNoChats;