import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
  AUTH_SET_PKCE_STATE,
} from '../reducers/authReducer';
import { 
  saveUserToStorage, 
  removeUserFromStorage,
  generateCodeVerifier,
  generateCodeChallenge,
} from '../../utils/auth';

export const loginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const loginSuccess = (user) => {
  saveUserToStorage(user);
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginFailure = (error) => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
});

export const logout = () => {
  removeUserFromStorage();
  return {
    type: AUTH_LOGOUT,
  };
};

export const setPkceState = (state) => ({
  type: AUTH_SET_PKCE_STATE,
  payload: state,
});

export const login = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      let roles = ['user'];
      let rights = ['can_view_articles', 'can_submit_review'];
      
      if (email.includes('admin')) {
        roles = ['admin', 'user'];
        rights = [
          'can_view_articles', 
          'can_submit_review', 
          'can_manage_reviews', 
          'can_manage_users'
        ];
      }
      
      const user = {
        name: email.split('@')[0],
        email: email,
        roles: roles,
        rights: rights,
        token: 'mock-jwt-token-' + Date.now(),
      };
      
      dispatch(loginSuccess(user));
      return { success: true, user };
    } else {
      throw new Error('Неверный email или пароль');
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
    return { success: false, error: error.message };
  }
};

export const initiatePkceFlow = (clientId, redirectUri) => async (dispatch) => {
  try {
    const codeVerifier = generateCodeVerifier();
    
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    
    localStorage.setItem('code_verifier', codeVerifier);
    
    const state = Math.random().toString(36).substring(7);
    localStorage.setItem('pkce_state', state);
    
    dispatch(setPkceState({ state, codeChallenge }));
    
    const authUrl = `https://auth.example.com/authorize?` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=code&` +
      `code_challenge=${codeChallenge}&` +
      `code_challenge_method=S256&` +
      `state=${state}`;
    
    return { authUrl };
  } catch (error) {
    dispatch(loginFailure(error.message));
    return { error: error.message };
  }
};

export const exchangeCodeForToken = (code, redirectUri) => async (dispatch) => {
  dispatch(loginRequest());
  
  try {
    const codeVerifier = localStorage.getItem('code_verifier');
    const savedState = localStorage.getItem('pkce_state');

    if (!codeVerifier) {
      throw new Error('Code verifier не найден. Пожалуйста, начните авторизацию заново.');
    }
    
    if (!savedState) {
      throw new Error('State не найден. Возможна CSRF-атака.');
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = {
      name: 'OAuth User',
      email: 'oauth@example.com',
      roles: ['user'],
      rights: ['can_view_articles', 'can_submit_review'],
      token: 'oauth-token-' + Date.now(),
    };
    
    dispatch(loginSuccess(user));

    localStorage.removeItem('code_verifier');
    localStorage.removeItem('pkce_state');
    
    return { success: true, user };
  } catch (error) {
    dispatch(loginFailure(error.message));
    return { success: false, error: error.message };
  }
};

export const updateUser = (userData) => (dispatch) => {
  const currentUser = JSON.parse(localStorage.getItem('user')) || {};
  const updatedUser = { ...currentUser, ...userData };
  
  saveUserToStorage(updatedUser);
  
  dispatch({
    type: AUTH_LOGIN_SUCCESS,
    payload: updatedUser,
  });
  
  return { success: true };
};


export const checkAuthSession = () => (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (user && user.token) {
    dispatch(loginSuccess(user));
    return { authenticated: true };
  }
  
  return { authenticated: false };
};