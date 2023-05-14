import {create} from "zustand";
import {persist} from "zustand/middleware";

const useMessage = create(
	(set) => ({
		message: [],
		id: 0,
		fetchMessage: (data) => set((state) => {
			// const key  = data[0]?.user_id
			return {
				message: data,
				// id: key
			}
		}),
		addMessage: (mess) => {
			set((state) => ({
				message: [...state.message, mess],
			}));
		},
		// clearCart: () => set({}),
		clearCart: () => set({}),
	}),
);
export default useMessage;
