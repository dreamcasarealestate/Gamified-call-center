import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string; // or number if your backend uses number
  name: string;
  designation: string;
  isTrainingCompleted: boolean;
  email?: string; // optional but handy
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (token: string, user: User) => void;
  logout: () => void;
  initializeAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (token, user) => {
        set({
          token,
          user,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },

      initializeAuth: () => {
        const { token, user } = get();
        if (token && user) set({ isAuthenticated: true });
      },
    }),
    {
      name: "auth-storage",
      // optional: keep only what you need
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
