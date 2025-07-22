import { useAuthStore } from "./stores/authStore";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function getHeaders(token) {
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
}

// --- AUTH JWT ---
export async function loginJWT({ email, password }) {
  const res = await fetch(`${API_URL}/api/token/`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login inválido');
  return res.json(); // { access, refresh }
}

export async function refreshToken(refresh) {
  const res = await fetch(`${API_URL}/api/token/refresh/`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ refresh })
  });
  if (!res.ok) throw new Error('Erro ao renovar token');
  return res.json(); // { access }
}

export async function register({ username, email, password }) {
  const res = await fetch(`${API_URL}/api/register/`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ username, email, password })
  });
  if (!res.ok) throw new Error('Erro ao registrar');
  return res.json();
}

// --- Função utilitária para requisições autenticadas com refresh automático ---
export async function authApiFetch(url, options = {}, getState, setState) {
  let { access, refresh, isAuthenticated } = getState();
  let headers = getHeaders(access);
  let res = await fetch(url, { ...options, headers });
  if (res.status === 401 && refresh && isAuthenticated) {
    // Tentar refresh
    try {
      const data = await refreshToken(refresh);
      setState({ access: data.access });
      headers = getHeaders(data.access);
      res = await fetch(url, { ...options, headers });
    } catch {
      setState({ access: null, refresh: null, isAuthenticated: false, user: null });
      throw new Error('Sessão expirada. Faça login novamente.');
    }
  }
  if (!res.ok) throw new Error('Erro na requisição');
  return res.json();
}

// --- PROJETOS ---
export async function getProjects(token, getState, setState) {
  return authApiFetch(`${API_URL}/api/projects/`, {}, getState, setState);
}
export async function addProject(data, token, getState, setState) {
  return authApiFetch(`${API_URL}/api/projects/add/`, { method: 'POST', body: JSON.stringify(data) }, getState, setState);
}
export async function editProject(id, data, token, getState, setState) {
  return authApiFetch(`${API_URL}/api/projects/${id}/edit/`, { method: 'PUT', body: JSON.stringify(data) }, getState, setState);
}
export async function deleteProject(id, token, getState, setState) {
  return authApiFetch(`${API_URL}/api/projects/${id}/delete/`, { method: 'DELETE' }, getState, setState);
}

// --- TAREFAS ---
export async function getTasks(projectId, token, getState, setState) {
  return authApiFetch(`${API_URL}/api/projects/${projectId}/tasks/`, {}, getState, setState);
}
export async function addTask(projectId, data, token, getState, setState) {
  return authApiFetch(`${API_URL}/api/projects/${projectId}/tasks/add/`, { method: 'POST', body: JSON.stringify(data) }, getState, setState);
}
export async function editTask(taskId, data, token, getState, setState) {
  return authApiFetch(`${API_URL}/api/tasks/${taskId}/edit/`, { method: 'PUT', body: JSON.stringify(data) }, getState, setState);
}
export async function deleteTask(taskId, token, getState, setState) {
  return authApiFetch(`${API_URL}/api/tasks/${taskId}/delete/`, { method: 'DELETE' }, getState, setState);
}

// --- PLANNING POKER SESSIONS ---
export async function startSession(data, token, getState, setState) {
  return authApiFetch(`${API_URL}/api/planning-sessions/start/`, { method: 'POST', body: JSON.stringify(data) }, getState, setState);
}
export async function deleteSession(sessionId, token, getState, setState) {
  return authApiFetch(`${API_URL}/api/planning-sessions/${sessionId}/delete/`, { method: 'DELETE' }, getState, setState);
}

// --- VOTOS ---
export async function voteTask(data, token, getState, setState) {
  return authApiFetch(`${API_URL}/api/planning-sessions/vote/`, { method: 'POST', body: JSON.stringify(data) }, getState, setState);
}

// --- FINALIZAR ESTIMATIVA ---
export async function finalizeTaskEstimate(data, token, getState, setState) {
  return authApiFetch(`${API_URL}/api/planning-sessions/finalize/`, { method: 'POST', body: JSON.stringify(data) }, getState, setState);
}

// --- USUÁRIOS ---
export async function getUsers(token, getState, setState) {
  return authApiFetch(`${API_URL}/api/users/`, {}, getState, setState);
}
export async function addUser(data, token, getState, setState) {
  return authApiFetch(`${API_URL}/api/users/add/`, { method: 'POST', body: JSON.stringify(data) }, getState, setState);
}
export async function editUser(id, data, token, getState, setState) {
  return authApiFetch(`${API_URL}/api/users/${id}/edit/`, { method: 'PUT', body: JSON.stringify(data) }, getState, setState);
}
export async function deleteUser(id, token, getState, setState) {
  return authApiFetch(`${API_URL}/api/users/${id}/delete/`, { method: 'DELETE' }, getState, setState);
}

// --- VOTOS SESSÃO ---
export async function getVotes(sessionId, token, getState, setState) {
  return authApiFetch(`${API_URL}/api/planning-sessions/${sessionId}/votes/`, {}, getState, setState);
} 