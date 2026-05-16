import { create } from "zustand";
import type { User } from "@/types";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
};

const mockUser: User = {
  id: "u_1",
  name: "Gustavo Gutierres Champam",
  firstName: "Gustavo",
  course: "Engenharia de Computação",
  cpf: "517.386.958-59",
  ra: "223645",
  validity: "03/2027",
  avatarUrl: null,
};

export const useAuthStore = create<AuthState>((set) => ({
  user: mockUser,
  isAuthenticated: true,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
