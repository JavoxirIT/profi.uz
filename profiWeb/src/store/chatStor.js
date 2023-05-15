import {create} from "zustand";
import {persist} from "zustand/middleware";

const useMessage = create(
	(set) => ({
		message: [],
		id: 0,
		loading: true,
		fetchMessage: (data) => set((state) => {
			if (data.length !== 0) {
				return {
					message: data,
					loading: false
					// id: key
				}
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
