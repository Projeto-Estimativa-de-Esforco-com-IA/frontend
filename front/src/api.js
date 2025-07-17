// Utilitário de API para integração com o backend Django
// Altere a URL base conforme necessário
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/';

function getUrl(path) {
  return API_BASE + path;
}

function getAuthHeaders() {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiGet(path) {
  const res = await fetch(getUrl(path), {
    credentials: 'include',
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPost(path, data) {
  const res = await fetch(getUrl(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function loginJWT({ username, password }) {
  const res = await fetch(getUrl('login/'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function signup({ username, email, password, first_name, last_name }) {
  const res = await fetch(getUrl('signup/'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password, first_name, last_name }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function changePassword({ old_password, new_password }) {
  const res = await fetch(getUrl('change-password/'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ old_password, new_password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateProfile(data) {
  const res = await fetch(getUrl('update-profile/'), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Projetos
export function getProjects() {
  return apiGet('projects/');
}
export function addProject(data) {
  return apiPost('projects/add/', data);
}
export function editProject(id, data) {
  return apiPost(`projects/${id}/edit/`, data);
}
export function deleteProject(id) {
  return apiPost(`projects/${id}/delete/`, {});
}

// Tarefas
export function getTasks(projectId) {
  return apiGet(`projects/${projectId}/tasks/`);
}
export function addTask(projectId, data) {
  return apiPost(`projects/${projectId}/tasks/add/`, data);
}
export function editTask(taskId, data) {
  return apiPost(`tasks/${taskId}/edit/`, data);
}
export function deleteTask(taskId) {
  return apiPost(`tasks/${taskId}/delete/`, {});
}

// Planning Poker
export function startSession(data) {
  return apiPost('planning-sessions/start/', data);
}
export function deleteSession(sessionId) {
  return apiPost(`planning-sessions/${sessionId}/delete/`, {});
}
export function voteTask(data) {
  return apiPost('planning-sessions/vote/', data);
}
export function finalizeTaskEstimate(data) {
  return apiPost('planning-sessions/finalize/', data);
}

// Usuários
export function getUsers() {
  return apiGet('users/');
}
export function addUser(data) {
  return apiPost('users/add/', data);
}
export function editUser(id, data) {
  return apiPost(`users/${id}/edit/`, data);
}
export function deleteUser(id) {
  return apiPost(`users/${id}/delete/`, {});
} 