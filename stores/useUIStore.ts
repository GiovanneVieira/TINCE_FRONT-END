import { create } from "zustand";

type UIState = {
  isCarteirinhaOpen: boolean;
  openCarteirinha: () => void;
  closeCarteirinha: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  isCarteirinhaOpen: false,
  openCarteirinha: () => set({ isCarteirinhaOpen: true }),
  closeCarteirinha: () => set({ isCarteirinhaOpen: false }),
}));
