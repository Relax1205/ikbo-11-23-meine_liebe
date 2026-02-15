import React from 'react';
import { Link } from 'react-router-dom';
import './DialogItem.css';

const DialogItem = ({ name, position, lastMessage, id }) => {
  const path = `/dialogs/${id}`;
  
  return (
    <Link to={path} className="dialog-item">
      <div className="dialog-avatar">
        {name.charAt(0)}
      </div>
      <div className="dialog-info">
        <div className="dialog-header">
          <span className="dialog-name">{name}</span>
          <span className="dialog-position">{position}</span>
        </div>
        <div className="dialog-last-message">
          {lastMessage}
        </div>
      </div>
    </Link>
  );
};

export default DialogItem;