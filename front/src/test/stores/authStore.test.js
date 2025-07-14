import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useAuthStore } from '../../stores/authStore'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

describe('Auth Store', () => {
  beforeEach(() => {
    // Reset store state
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
  })

  it('should have initial state', () => {
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should login successfully', async () => {
    const { login } = useAuthStore.getState()
    
    const result = await login('test@example.com', 'password123')
    
    expect(result.success).toBe(true)
    
    const state = useAuthStore.getState()
    expect(state.isAuthenticated).toBe(true)
    expect(state.user).toEqual({
      id: 1,
      name: 'Usuário Teste',
      email: 'test@example.com',
      role: 'admin'
    })
    expect(state.isLoading).toBe(false)
  })

  it('should logout successfully', () => {
    // First login
    useAuthStore.setState({
      user: { id: 1, name: 'Test User' },
      isAuthenticated: true,
    })
    
    const { logout } = useAuthStore.getState()
    logout()
    
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should clear error', () => {
    useAuthStore.setState({ error: 'Some error' })
    
    const { clearError } = useAuthStore.getState()
    clearError()
    
    const state = useAuthStore.getState()
    expect(state.error).toBeNull()
  })
}) 