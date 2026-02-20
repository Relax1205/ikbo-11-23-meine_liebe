import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
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
      </nav>
    </header>
  );
}

export default Header;