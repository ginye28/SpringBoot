import { create } from "zustand";

export const useBottomModalStore = create((set) => ({
    isOpen: false,
    children: null,

    setOpen: (state) => {
        if (state) {
            set({ isOpen: true });
        } else {
            set({ 
                isOpen: false,
                children: null,
            });
        }
    },

    setChildren: (state) => {
        set({ children: state });
    }
}));