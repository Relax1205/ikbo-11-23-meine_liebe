import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import LoginForm from '../Auth/LoginForm';
import './Header.css';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <header className="header">
        <img
          src="https://www.mirea.ru/upload/medialibrary/281/IIT_colour.jpg"
          alt="MIREA Logo"
          className="header-logo"
        />
        <h1 className="header-title">Meine liebe</h1>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Главная</Link>
          <Link to="/about" className="nav-link">О нас</Link>
          <Link to="/services" className="nav-link">Услуги</Link>
          <Link to="/reviews" className="nav-link">Отзывы</Link>
          <Link to="/dialogs" className="nav-link">Диалоги</Link>
          <Link to="/contacts" className="nav-link">Контакты</Link>
          
          {isAuthenticated && user?.roles?.includes('admin') && (
            <Link to="/admin" className="nav-link admin-link">Админ</Link>
          )}
          
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-name">{user.name}</span>
              <button onClick={handleLogout} className="logout-btn">Выйти</button>
            </div>
          ) : (
            <button 
              onClick={() => setShowLoginModal(true)} 
              className="login-btn"
            >
              Войти
            </button>
          )}
        </nav>
      </header>
      
      {showLoginModal && (
        <LoginForm onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
}

export default Header;