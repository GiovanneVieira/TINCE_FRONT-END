import { create } from "zustand";
import type { User } from "@/types";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  authReady: boolean;
  authMode: 'remote' | 'mock';
  setUser: (user: User | null) => void;
  setAuthReady: (ready: boolean) => void;
  setAuthMode: (mode: 'remote' | 'mock') => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  authReady: false,
  authMode: 'remote',
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setAuthReady: (ready) => set({ authReady: ready }),
  setAuthMode: (mode) => set({ authMode: mode }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      authReady: true,
      authMode: 'remote',
    }),
}));
