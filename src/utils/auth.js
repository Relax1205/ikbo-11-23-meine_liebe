export const isAuthenticated = (user) => !!user;

export const isAllowed = (user, rights) => {
  if (!user || !user.rights) return false;
  return rights.some(right => user.rights.includes(right));
};

export const hasRole = (user, roles) => {
  if (!user || !user.roles) return false;
  return roles.some(role => user.roles.includes(role));
};

export const getUserFromStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const saveUserToStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('pkce_state');
  localStorage.removeItem('code_verifier');
};

export const generateCodeVerifier = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const generateCodeChallenge = async (verifier) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

export const RIGHTS_TRANSLATIONS = {
  'can_view_articles': 'Просмотр статей',
  'can_submit_review': 'Отправка отзывов',
  'can_manage_reviews': 'Управление отзывами',
  'can_manage_users': 'Управление пользователями',
};

export const getRightsInRussian = (rights) => {
  if (!Array.isArray(rights)) return [];
  return rights.map(right => RIGHTS_TRANSLATIONS[right] || right);
};

export const ROLES_TRANSLATIONS = {
  'admin': 'Администратор',
  'user': 'Пользователь',
  'moderator': 'Модератор',
};

export const getRolesInRussian = (roles) => {
  if (!Array.isArray(roles)) return [];
  return roles.map(role => ROLES_TRANSLATIONS[role] || role);
};