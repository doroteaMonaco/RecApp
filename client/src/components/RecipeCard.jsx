import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const handleCardClick = () => {
    // TODO: Implementare navigazione alla pagina della ricetta
    console.log('Navigazione a ricetta:', recipe.id);
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    // TODO: Implementare funzionalità like/unlike
    console.log('Toggle like per ricetta:', recipe.id);
  };

  return (
    <div className="recipe-card" onClick={handleCardClick}>
      <div className="recipe-image">
        <img 
          src={recipe.image || '/api/placeholder/300/200'} 
          alt={recipe.title}
          loading="lazy"
        />
        <button 
          className={`heart-btn ${recipe.isLiked ? 'liked' : ''}`}
          onClick={handleHeartClick}
          aria-label="Aggiungi ai preferiti"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
              fill={recipe.isLiked ? '#ff4500' : 'none'}
              stroke={recipe.isLiked ? '#ff4500' : 'white'}
              strokeWidth="2"
            />
          </svg>
        </button>
        
        {recipe.difficulty && (
          <div className={`difficulty-badge ${recipe.difficulty.toLowerCase()}`}>
            {recipe.difficulty === 'easy' && 'Facile'}
            {recipe.difficulty === 'medium' && 'Medio'}
            {recipe.difficulty === 'hard' && 'Difficile'}
          </div>
        )}
      </div>
      
      <div className="recipe-content">
        <div className="recipe-header">
          <h3 className="recipe-title">{recipe.title}</h3>
          <div className="recipe-stats">
            {recipe.calories && (
              <span className="calories">
                🔥 {recipe.calories} kcal
              </span>
            )}
            {recipe.prepTime && (
              <span className="prep-time">
                ⏱️ {recipe.prepTime} min
              </span>
            )}
          </div>
        </div>
        
        {recipe.description && (
          <p className="recipe-description">{recipe.description}</p>
        )}
        
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="recipe-tags">
            {recipe.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
            {recipe.tags.length > 3 && (
              <span className="tag-more">+{recipe.tags.length - 3}</span>
            )}
          </div>
        )}
        
        <div className="recipe-footer">
          <div className="author-info">
            <img 
              src={recipe.author?.avatar || '/api/placeholder/32/32'} 
              alt={recipe.author?.name}
              className="author-avatar"
            />
            <span className="author-name">{recipe.author?.name || 'Chef RecApp'}</span>
          </div>
          
          <div className="recipe-ratings">
            <div className="rating">
              ⭐ {recipe.rating ? recipe.rating.toFixed(1) : '5.0'}
            </div>
            <div className="likes">
              ❤️ {recipe.likes || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
