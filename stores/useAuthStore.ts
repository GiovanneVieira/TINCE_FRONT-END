import { create } from "zustand";
import type { User } from "@/types";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  authReady: boolean;
  setUser: (user: User | null) => void;
  setAuthReady: (ready: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  authReady: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setAuthReady: (ready) => set({ authReady: ready }),
  logout: () => set({ user: null, isAuthenticated: false, authReady: true }),
}));
