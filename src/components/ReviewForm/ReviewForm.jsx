import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAgreement, submitReview, clearReview } from '../../store/actions/reviewActions';
import { isAllowed } from '../../utils/auth';
import './ReviewForm.css';

const ReviewForm = () => {
  const dispatch = useDispatch();
  
  const { agreementAccepted, reviews, submitSuccess } = useSelector((state) => state.review);
  const { user, isAuthenticated: isUserAuthenticated } = useSelector((state) => state.auth);
  
  const canSubmitReview = !isUserAuthenticated || isAllowed(user, ['can_submit_review']);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
  });

  React.useEffect(() => {
    if (isUserAuthenticated && user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [isUserAuthenticated, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAgreementChange = (e) => {
    dispatch(setAgreement(e.target.checked));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!canSubmitReview) {
      alert('У вас нет прав для отправки отзывов. Пожалуйста, войдите в систему.');
      return;
    }
    
    if (!agreementAccepted) {
      alert('Пожалуйста, примите пользовательское соглашение');
      return;
    }
    
    const reviewData = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleString('ru-RU'),
      userId: isUserAuthenticated ? user.email : 'anonymous',
      isVerified: isUserAuthenticated,
    };
    
    dispatch(submitReview(reviewData));
    
    if (isUserAuthenticated) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        rating: 5,
        comment: '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        rating: 5,
        comment: '',
      });
    }
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.comment.trim() && agreementAccepted;

  return (
    <div className="review-form-page">
      <h2>Оставить отзыв</h2>
      
      {isUserAuthenticated && user && (
        <div className="user-info-banner">
          <span className="user-avatar"></span>
          <span className="user-details">
            Вы вошли как <strong>{user.name}</strong> ({user.email})
            {user.isVerified && <span className="verified-badge">Проверенный пользователь</span>}
          </span>
        </div>
      )}
      
      {!canSubmitReview && isUserAuthenticated && (
        <div className="permission-warning">
          У вашей учётной записи нет прав для отправки отзывов.
          Обратитесь к администратору.
        </div>
      )}
      
      <div className="review-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Ваше имя *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Введите ваше имя"
              required
              disabled={isUserAuthenticated}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Введите ваш email"
              required
              disabled={isUserAuthenticated}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="rating">Оценка</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '12px', borderRadius: '5px', border: '1px solid #ddd' }}
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'звезда' : num < 5 ? 'звезды' : 'звёзд'}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="comment">Ваш отзыв *</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              placeholder="Расскажите о вашем опыте работы с нами"
              required
            />
          </div>
          
          <div className="agreement-section">
            <label className="agreement-checkbox">
              <input
                type="checkbox"
                checked={agreementAccepted}
                onChange={handleAgreementChange}
              />
              <span className="agreement-text">
                Я принимаю{' '}
                <a href="/agreement" target="_blank" rel="noopener noreferrer">
                  пользовательское соглашение
                </a>{' '}
                и даю согласие на обработку персональных данных
              </span>
            </label>
          </div>
          
          <button
            type="submit"
            className="submit-button"
            disabled={!isFormValid || !canSubmitReview}
          >
            {!isUserAuthenticated ? 'Войдите для отправки отзыва' : 'Отправить отзыв'}
          </button>
        </form>
        
        {submitSuccess && (
          <div className="success-message">
            <p>Спасибо! Ваш отзыв успешно отправлен.</p>
            <p className="success-subtext">
              {user?.isVerified ? 'Ваш отзыв будет опубликован после модерации.' : 'Отзыв появится после проверки.'}
            </p>
            <button
              onClick={() => dispatch(clearReview())}
              style={{
                marginTop: '10px',
                padding: '8px 20px',
                backgroundColor: '#2ecc71',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Отправить ещё один отзыв
            </button>
          </div>
        )}
      </div>
      
      {reviews.length > 0 && (
        <div className="reviews-list">
          <h3>Последние отзывы ({reviews.length})</h3>
          {reviews.slice(-5).reverse().map((review) => (
            <div key={review.id} className={`review-item ${review.isVerified ? 'verified-review' : ''}`}>
              <div className="review-header">
                <h4>
                  {review.name} - {review.rating}{' '}
                  {review.rating === 1 ? 'звезда' : review.rating < 5 ? 'звезды' : 'звёзд'}
                  {review.isVerified && <span className="verified-icon"></span>}
                </h4>
                {review.isVerified && <span className="verified-label">Проверенный отзыв</span>}
              </div>
              <p>{review.comment}</p>
              <div className="review-date">{review.date}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewForm;