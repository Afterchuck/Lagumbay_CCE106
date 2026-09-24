const BASE_URL = 'https://dummyjson.com';

export async function loginUser(username, password) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, expiresInMins: 30 }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Login failed. Check your username and password.');
  }
  return data;
}

export async function getCurrentUser(token) {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Could not load your protected profile.');
  }
  return data;
}
