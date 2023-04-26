import { ru } from "components/language/ru";
import { uz } from "components/language/uz";
import { create } from "zustand";
import { persist } from "zustand/middleware";
const useLang = create(
  persist(
    (set, get) => ({
      lang: uz,
      addLanguage: (params) => {
        console.log(1);
        set((state) => ({
          lang: uz,
        }));
      },
      removeLanguage: ({ params }) => {
        console.log(2);
        set((state) => ({
          lang: ru,
        }));
      },
      clearCart: () => set({ totalqty: 0, total: 0, cartContent: [] }),
    }),
    { name: "lang" }
  )
);
export default useLang;
