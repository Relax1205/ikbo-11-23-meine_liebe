import React from 'react';
import { useParams } from 'react-router-dom';
import './DialogPage.css';

const DialogPage = () => {
  const { id } = useParams();
  
  // Диалоги по теме IT-компании
  const dialogs = {
    '1': { 
      name: 'Алексей Петров', 
      position: 'Руководитель проекта',
      messages: [
        { text: 'Привет! Как продвигается разработка нового функционала?', sender: 'other' },
        { text: 'Добрый день! Сейчас работаем над интеграцией платежной системы.', sender: 'me' },
        { text: 'Отлично! Когда планируете завершить?', sender: 'other' },
        { text: 'Ожидаем завершить к концу недели. Тестирование начнём в понедельник.', sender: 'me' },
        { text: 'Хорошо, держите меня в курсе.', sender: 'other' }
      ] 
    },
    '2': { 
      name: 'Мария Иванова', 
      position: 'Клиент (ООО "ТехноСфера")',
      messages: [
        { text: 'Здравствуйте! Хотела бы уточнить по стоимости разработки сайта.', sender: 'other' },
        { text: 'Добрый день, Мария! Рады помочь. Для точного расчёта нам нужно узнать объём работ.', sender: 'me' },
        { text: 'Нужен корпоративный сайт с каталогом товаров и личным кабинетом.', sender: 'other' },
        { text: 'Понял. Ориентировочная стоимость составит от 120 000 ₽. Могу созвониться для детального обсуждения?', sender: 'me' },
        { text: 'Да, давайте в пятницу в 15:00.', sender: 'other' },
        { text: 'Отлично, отправлю приглашение в календарь.', sender: 'me' }
      ] 
    },
    '3': { 
      name: 'Дмитрий Соколов', 
      position: 'Frontend-разработчик',
      messages: [
        { text: 'Коллеги, у кого есть опыт с библиотекой React Query?', sender: 'other' },
        { text: 'Привет! Да, использовал в прошлом проекте. Чем помочь?', sender: 'me' },
        { text: 'Не могу настроить кэширование данных. Каждый раз идёт повторный запрос.', sender: 'other' },
        { text: 'Проверь параметр staleTime. Нужно установить его в миллисекундах.', sender: 'me' },
        { text: 'Ага, разобрался! Спасибо!', sender: 'other' },
        { text: 'Обращайся, если что!', sender: 'me' }
      ] 
    },
    '4': { 
      name: 'Елена Козлова', 
      position: 'Техническая поддержка',
      messages: [
        { text: 'Добрый день! К нам поступил запрос от клиента по поводу ошибки 500.', sender: 'other' },
        { text: 'Привет! Какой проект?', sender: 'me' },
        { text: 'Сайт "Магазин-онлайн". Ошибка возникает при оформлении заказа.', sender: 'other' },
        { text: 'Проверю логи. Похоже на проблему с базой данных.', sender: 'me' },
        { text: 'Да, там таймаут подключения. Нужно увеличить время ожидания.', sender: 'other' },
        { text: 'Исправлю конфигурацию и разверну обновление через 10 минут.', sender: 'me' },
        { text: 'Отлично, спасибо!', sender: 'other' }
      ] 
    },
    '5': { 
      name: 'Виктор Новиков', 
      position: 'Дизайнер UI/UX',
      messages: [
        { text: 'Привет! Скинул макеты для нового лендинга в Figma.', sender: 'other' },
        { text: 'Спасибо, Виктор! Посмотрел — выглядит отлично.', sender: 'me' },
        { text: 'Есть вопросы по адаптивной версии?', sender: 'other' },
        { text: 'Да, на мобильных экранах кнопка "Заказать" слишком маленькая.', sender: 'me' },
        { text: 'Исправлю, сделаю минимум 44х44 пикселя для удобства нажатия.', sender: 'other' },
        { text: 'Идеально, жду обновлённую версию.', sender: 'me' }
      ] 
    },
    '6': { 
      name: 'Анна Смирнова', 
      position: 'HR-менеджер',
      messages: [
        { text: 'Здравствуйте! Хотела обсудить кандидата на позицию Backend-разработчика.', sender: 'other' },
        { text: 'Добрый день, Анна! Да, я видел резюме. Впечатляет опыт с микросервисами.', sender: 'me' },
        { text: 'Приглашаю на техническое собеседование в среду в 14:00.', sender: 'other' },
        { text: 'Хорошо, подготовлю вопросы по архитектуре и базам данных.', sender: 'me' },
        { text: 'Отлично, ссылку Яндекс-телемоста отправлю за час до встречи.', sender: 'other' }
      ] 
    }
  };

  const dialog = dialogs[id] || { 
    name: 'Неизвестный контакт', 
    position: '',
    messages: [{ text: 'Диалог не найден', sender: 'system' }] 
  };

  return (
    <div className="dialog-page">
      <div className="dialog-header">
        <h2>{dialog.name}</h2>
        {dialog.position && <span className="dialog-position-badge">{dialog.position}</span>}
      </div>
      
      <div className="messages-container">
        {dialog.messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-text">{msg.text}</div>
            <div className="message-time">
              {index === 0 ? '10:15' : index === 1 ? '10:16' : index === 2 ? '10:18' : 
               index === 3 ? '10:19' : index === 4 ? '10:20' : index === 5 ? '10:22' : '10:23'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DialogPage;