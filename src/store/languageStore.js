import {ru} from "components/language/ru";
import {uz} from "components/language/uz";
import {create} from "zustand";
import {persist} from "zustand/middleware";

const useLang = create(
	persist(
		(set, get) => ({
			lang: uz,
			langName: "uz",
			addLanguage: (params) => {
				set((state) => ({
					lang: uz,
					langName: "uz"
				}));
			},
			removeLanguage: ({params}) => {
				set((state) => ({
					lang: ru,
					langName: "ru"
				}));
			},
			clearCart: () => set({totalqty: 0, total: 0, cartContent: []}),
		}),
		{name: "lang"}
	)
);
export default useLang;
