import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { loginJWT, refreshToken } from '../api'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      access: null,
      refresh: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      onSessionExpired: null, // callback global

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const res = await loginJWT({ email, password })
          set({
            user: { email },
            access: res.access,
            refresh: res.refresh,
            isAuthenticated: true,
            isLoading: false
          })
          return { success: true }
        } catch (error) {
          set({
            error: error.message || 'Credenciais inválidas',
            isLoading: false
          })
          return { success: false, error: error.message }
        }
      },

      logout: () => {
        set({
          user: null,
          access: null,
          refresh: null,
          isAuthenticated: false,
          error: null
        })
      },

      refreshAccessToken: async () => {
        const { refresh } = get()
        if (!refresh) return null
        try {
          const res = await refreshToken(refresh)
          set({ access: res.access })
          return res.access
        } catch {
          set({ access: null, isAuthenticated: false })
          if (get().onSessionExpired) get().onSessionExpired();
          return null
        }
      },

      setSessionExpiredCallback: (cb) => set({ onSessionExpired: cb }),

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        access: state.access,
        refresh: state.refresh,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
) 