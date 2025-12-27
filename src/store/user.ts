import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string;
  email?: string;
  name?: string;
  systemRole?: string;
  
  };


type AuthState = {
  user: User | null;
  token: string | null;

  login: (token: string, user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      login: (token, user) => {
        set({
          token,
          user,
        });
      },

      logout: () => {
        set({
          token: null,
          user: null,
        });
      },

      
    }),
    {
      name: "auth-storage",
      // optional: keep only what you need
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);
