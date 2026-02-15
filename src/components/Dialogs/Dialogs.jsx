import React from 'react';
import DialogItem from './DialogItem';
import './Dialogs.css';

const Dialogs = () => {
  const dialogsData = [
    { id: '1', name: 'Алексей Петров', position: 'Руководитель проекта', lastMessage: 'Как продвигается разработка?' },
    { id: '2', name: 'Мария Иванова', position: 'Клиент', lastMessage: 'Уточнить по стоимости сайта' },
    { id: '3', name: 'Дмитрий Соколов', position: 'Frontend-разработчик', lastMessage: 'Вопрос по React Query' },
    { id: '4', name: 'Елена Козлова', position: 'Техподдержка', lastMessage: 'Ошибка 500 на сайте' },
    { id: '5', name: 'Виктор Новиков', position: 'Дизайнер', lastMessage: 'Макеты лендинга в Figma' },
    { id: '6', name: 'Анна Смирнова', position: 'HR-менеджер', lastMessage: 'Собеседование разработчика' }
  ];

  return (
    <div className="dialogs-page">
      <h2>Мои диалоги</h2>
      <div className="dialogs-list">
        {dialogsData.map(dialog => (
          <DialogItem 
            key={dialog.id} 
            name={dialog.name} 
            position={dialog.position}
            lastMessage={dialog.lastMessage}
            id={dialog.id} 
          />
        ))}
      </div>
    </div>
  );
};

export default Dialogs;