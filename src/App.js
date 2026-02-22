import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Contacts from './components/Contacts/Contacts';
import Services from './components/Services/Services';
import Dialogs from './components/Dialogs/Dialogs';
import DialogPage from './components/Dialogs/DialogPage';
import ReviewForm from './components/ReviewForm/ReviewForm';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Unauthorized from './components/Auth/Unauthorized';
import AdminPanel from './components/Admin/AdminPanel';

function ScrollToTop() {
  const location = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

function App() {
  const aboutProps = {
    title: "О нас",
    description: "Мы - команда профессионалов, предоставляющая качественные услуги в сфере информационных технологий. Наша миссия - помогать клиентам достигать их целей с помощью современных технологических решений."
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
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
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
            <Route
              path="/dialogs"
              element={<Dialogs />}
            />
            <Route
              path="/dialogs/:id"
              element={<DialogPage />}
            />
            <Route
              path="/reviews"
              element={<ReviewForm />}
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/unauthorized"
              element={<Unauthorized />}
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;