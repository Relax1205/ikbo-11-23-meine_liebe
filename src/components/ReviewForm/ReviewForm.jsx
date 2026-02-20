import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAgreement, submitReview, clearReview } from '../../store/actions/reviewActions';
import './ReviewForm.css';

const ReviewForm = () => {
  const dispatch = useDispatch();
  const { agreementAccepted, reviews, submitSuccess } = useSelector((state) => state.review);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
  });

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
    
    if (!agreementAccepted) {
      alert('Пожалуйста, примите пользовательское соглашение');
      return;
    }

    const reviewData = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleString('ru-RU'),
    };

    dispatch(submitReview(reviewData));
    setFormData({
      name: '',
      email: '',
      rating: 5,
      comment: '',
    });
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.comment.trim() && agreementAccepted;

  return (
    <div className="review-form-page">
      <h2>Оставить отзыв</h2>
      
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
            disabled={!isFormValid}
          >
            Отправить отзыв
          </button>
        </form>

        {submitSuccess && (
          <div className="success-message">
            <p>✓ Спасибо! Ваш отзыв успешно отправлен.</p>
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
            <div key={review.id} className="review-item">
              <h4>
                {review.name} - {review.rating}{' '}
                {review.rating === 1 ? 'звезда' : review.rating < 5 ? 'звезды' : 'звёзд'}
              </h4>
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