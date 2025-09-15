import React from 'react';
import './CategoryButtons.css';

const CategoryButtons = () => {
  const categories = [
    {
      id: 'proteiche',
      name: 'Proteiche',
      icon: '🥩',
      color: '#ff6b35',
      description: 'Ricette ricche di proteine'
    },
    {
      id: 'low-carb',
      name: 'Low Carb',
      icon: '🥬',
      color: '#4caf50',
      description: 'Basso contenuto di carboidrati'
    },
    {
      id: 'vegan',
      name: 'Vegan',
      icon: '🌱',
      color: '#66bb6a',
      description: 'Ricette 100% vegetali'
    },
    {
      id: 'colazione',
      name: 'Colazione',
      icon: '🥞',
      color: '#ffa726',
      description: 'Per iniziare la giornata'
    },
    {
      id: 'pranzo',
      name: 'Pranzo',
      icon: '🍽️',
      color: '#42a5f5',
      description: 'Piatti sostanziosi'
    },
    {
      id: 'cena',
      name: 'Cena',
      icon: '🌙',
      color: '#ab47bc',
      description: 'Cene leggere e gustose'
    },
    {
      id: 'snack',
      name: 'Snack',
      icon: '🍎',
      color: '#ef5350',
      description: 'Spuntini sani'
    },
    {
      id: 'dolci',
      name: 'Dolci Fit',
      icon: '🍰',
      color: '#8d6e63',
      description: 'Dolci salutari'
    }
  ];

  const handleCategoryClick = (categoryId) => {
    // TODO: Implementare navigazione alle ricette per categoria
    console.log('Categoria selezionata:', categoryId);
  };

  return (
    <section className="categories-section">
      <div className="container">
        <h2 className="categories-title">Esplora per Categoria</h2>
        <p className="categories-subtitle">
          Scopri ricette fit organizzate per tipologia e momento della giornata
        </p>
        
        <div className="categories-grid">
          {categories.map((category) => (
            <button
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryClick(category.id)}
              style={{
                '--category-color': category.color,
                '--category-color-light': category.color + '20'
              }}
            >
              <div className="category-icon">{category.icon}</div>
              <h3 className="category-name">{category.name}</h3>
              <p className="category-description">{category.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryButtons;
