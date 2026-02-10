import React from 'react';
import './Contacts.css';

function Contacts({ contacts }) {
  return (
    <div className="contacts-page">
      <h2>Контактная информация</h2>
      <div className="contacts-list">
        {contacts.map((contact, index) => (
          <div key={index} className="contact-item">
            <strong>{contact.type}:</strong> {contact.value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contacts;