import React from 'react';
import { useSelector } from 'react-redux';
import { hasRole, getRightsInRussian, getRolesInRussian } from '../../utils/auth';
import './AdminPanel.css';

const AdminPanel = () => {
  const { user } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.review);

  if (!hasRole(user, ['admin'])) {
    return <div className="access-denied">Доступ запрещён</div>;
  }

  const totalReviews = reviews.length;
  
  const positiveReviews = reviews.filter(r => Number(r.rating) >= 4).length;
  const negativeReviews = reviews.filter(r => Number(r.rating) <= 3).length;
  
  const positivePercent = totalReviews > 0 
    ? Math.round((positiveReviews / totalReviews) * 100) 
    : 0;

  return (
    <div className="admin-page">
      <h2>Панель администратора</h2>
      
      <div className="admin-info">
        <h3>Информация о пользователе</h3>
        <div className="info-card">
          <p><strong>Имя:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Роли:</strong> {getRolesInRussian(user.roles).join(', ')}</p>
          <p><strong>Права:</strong> {getRightsInRussian(user.rights).join(', ')}</p>
        </div>
      </div>
      
      <div className="admin-stats">
        <h3>Статистика отзывов</h3>
        
        <div className="stats-overview">
          <div className="stat-card total">
            <span className="stat-number">{totalReviews}</span>
            <span className="stat-label">Всего отзывов</span>
          </div>
          <div className="stat-card positive">
            <span className="stat-number">{positiveReviews}</span>
            <span className="stat-label">Положительные (4-5⭐)</span>
            <span className="stat-percent">{positivePercent}%</span>
          </div>
          <div className="stat-card negative">
            <span className="stat-number">{negativeReviews}</span>
            <span className="stat-label">Отрицательные (1-3⭐)</span>
            <span className="stat-percent">
              {totalReviews > 0 ? Math.round((negativeReviews / totalReviews) * 100) : 0}%
            </span>
          </div>
        </div>
        
        <div className="stars-breakdown">
          <h4>Распределение по оценкам</h4>
          <div className="stars-grid">
            {[5, 4, 3, 2, 1].map(stars => {
              const count = reviews.filter(r => Number(r.rating) === stars).length;
              const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              
              return (
                <div key={stars} className="star-row">
                  <span className="star-label">{'⭐'.repeat(stars)}</span>
                  <div className="star-bar-container">
                    <div 
                      className={`star-bar ${stars >= 4 ? 'positive' : stars === 3 ? 'neutral' : 'negative'}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="star-count">{count} ({Math.round(percent)}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="admin-reviews">
        <h3>Все отзывы</h3>
        {reviews.length > 0 ? (
          <div className="reviews-table-wrapper">
            <table className="reviews-table">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Имя</th>
                  <th>Email</th>
                  <th>Оценка</th>
                  <th>Дата</th>
                  <th>Комментарий</th>
                </tr>
              </thead>
              <tbody>
                {reviews.slice().reverse().map((review, index) => (
                  <tr key={review.id} className={Number(review.rating) <= 3 ? 'negative-review' : ''}>
                    <td>{index + 1}</td>
                    <td>{review.name}</td>
                    <td>{review.email}</td>
                    <td>
                      <span className={`rating-badge rating-${Number(review.rating)}`}>
                        {'⭐'.repeat(Number(review.rating))}
                      </span>
                    </td>
                    <td>{review.date}</td>
                    <td className="comment-cell">{review.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>Отзывов пока нет</p>
            <p className="empty-subtext">Пользователи ещё не оставили ни одного отзыва</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;