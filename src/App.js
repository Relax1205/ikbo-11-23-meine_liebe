import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Contacts from './components/Contacts/Contacts';
import Services from './components/Services/Services';

function App() {
  const aboutProps = {
    title: "О нас",
    description: "Мы - команда профессионалов, предоставляющая качественные услуги в сфере информационных технологий. Наша миссия - помогать клиентам достигать их целей с помощью современных технологических решений.",
  };

  const contactsProps = {
    contacts: [
      { type: "Телефон", value: "+7 (***) ***-**-**" },
      { type: "Email", value: "info@meineliebe.ru" },
      { type: "Адрес", value: "г. Москва, ул. Угловая, д. 20" },
      { type: "Режим работы", value: "Пн-Пт: 9:00 - 18:00" }
    ]
  };

  const servicesProps = {
    services: [
      { 
        title: "Веб-разработка", 
        description: "Создание современных и адаптивных веб-сайтов", 
        price: "от 50 000 ₽" 
      },
      { 
        title: "Мобильные приложения", 
        description: "Разработка нативных и кроссплатформенных приложений", 
        price: "от 100 000 ₽" 
      },
      { 
        title: "Дизайн интерфейсов", 
        description: "Проектирование удобных и привлекательных интерфейсов", 
        price: "от 30 000 ₽" 
      },
      { 
        title: "Техническая поддержка", 
        description: "Обслуживание и поддержка ваших проектов", 
        price: "от 15 000 ₽/мес" 
      }
    ]
  };

  const handleButtonClick = () => {
    alert('Кнопка нажата! Добро пожаловать в Meine liebe!');
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              <Main 
                welcomeText="Добро пожаловать!" 
                buttonText="Начать" 
                onButtonClick={handleButtonClick}
              />
            } 
          />
          <Route 
            path="/about" 
            element={
              <About 
                title={aboutProps.title} 
                description={aboutProps.description} 
                imageUrl={aboutProps.imageUrl}
              />
            } 
          />
          <Route 
            path="/contacts" 
            element={<Contacts contacts={contactsProps.contacts} />} 
          />
          <Route 
            path="/services" 
            element={<Services services={servicesProps.services} />} 
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;