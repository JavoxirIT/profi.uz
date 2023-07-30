import {Empty} from "antd";

const EmptyData = ({t}) => (<Empty
		description={<span>{t.errorNoUser}</span>}
	/>);
export default EmptyData;
