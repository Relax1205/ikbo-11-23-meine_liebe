import React from 'react';
import './Main.css';

function Main({ welcomeText, buttonText, onButtonClick }) {
  return (
    <main className="main">
      <div className="main-content">
        <h2>{welcomeText}</h2>
        <p>Это главная страница приложения. Здесь вы можете найти всю необходимую информацию.</p>
        <button className="main-button" onClick={onButtonClick}>
          {buttonText}
        </button>
      </div>
    </main>
  );
}

export default Main;