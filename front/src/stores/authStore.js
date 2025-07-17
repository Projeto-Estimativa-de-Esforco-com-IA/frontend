import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { loginJWT, signup } from '../api';

async function refreshTokenRequest(refresh) {
  const res = await fetch(import.meta.env.VITE_API_BASE_URL + 'token/refresh/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      accessToken: null,
      refreshToken: null,

      refreshAccessToken: async () => {
        const refresh = get().refreshToken || localStorage.getItem('refreshToken');
        if (!refresh) return;
        try {
          const data = await refreshTokenRequest(refresh);
          set({ accessToken: data.access });
          localStorage.setItem('accessToken', data.access);
        } catch (err) {
          set({ isAuthenticated: false, user: null, accessToken: null, refreshToken: null });
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      },

      login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const data = await loginJWT({ username, password });
          set({
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
            accessToken: data.access,
            refreshToken: data.refresh,
          });
          localStorage.setItem('accessToken', data.access);
          localStorage.setItem('refreshToken', data.refresh);
          return { success: true };
        } catch (error) {
          set({
            error: 'Credenciais inválidas',
            isLoading: false,
          });
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
          accessToken: null,
          refreshToken: null,
        });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
); 