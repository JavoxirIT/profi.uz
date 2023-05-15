import {Button, Layout} from 'antd';
import {MdOutlineEmail} from "react-icons/md"


function DrawerModal({children, visible, setVisible}){
	return (
			<div
				className={visible ? "drower-open-modal actives" : "drower-open-modal"}
				onClick={() => setVisible(false)}
			>

				<Layout
					className={
						visible ? "drower-modal-content activ" : "drower-modal-content"
					}
					onClick={(e) => e.stopPropagation()}
				>
					<div className={"ant-pro-setting-drawer-handle"}>
						<Button type="primary"   onClick={() =>  visible === false ?  setVisible(true): setVisible(false)} icon={<MdOutlineEmail/>}  className={"ant-pro-setting-drawer-button"}/>
					</div>
					{children}
				</Layout>
			</div>
	);
};
export default DrawerModal;


