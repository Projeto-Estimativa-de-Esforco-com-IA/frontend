import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          // Simulação de login - substituir por API real
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const user = {
            id: 1,
            name: 'Usuário Teste',
            email,
            role: 'admin'
          }
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          })
          return { success: true }
        } catch (error) {
          set({ 
            error: 'Credenciais inválidas', 
            isLoading: false 
          })
          return { success: false, error: error.message }
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          error: null 
        })
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
) 