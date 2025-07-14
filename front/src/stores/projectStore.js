import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useProjectStore = create(
  persist(
    (set, get) => ({
      projects: [
        { id: 1, nome: "Sistema de Vendas", descricao: "Controle de vendas e estoque", categoria: "Comercial", createdAt: new Date().toISOString() },
        { id: 2, nome: "App Mobile", descricao: "Aplicativo para clientes", categoria: "Mobile", createdAt: new Date().toISOString() },
      ],
      isLoading: false,
      error: null,

      addProject: (project) => {
        const newProject = {
          ...project,
          id: Date.now(),
          createdAt: new Date().toISOString()
        }
        set(state => ({
          projects: [...state.projects, newProject]
        }))
      },

      updateProject: (id, updates) => {
        set(state => ({
          projects: state.projects.map(project =>
            project.id === id ? { ...project, ...updates } : project
          )
        }))
      },

      deleteProject: (id) => {
        set(state => ({
          projects: state.projects.filter(project => project.id !== id)
        }))
      },

      getProjectById: (id) => {
        return get().projects.find(project => project.id === id)
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'project-storage',
    }
  )
) 