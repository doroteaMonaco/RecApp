import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryButtons from './components/CategoryButtons';
import RecipeCard from './components/RecipeCard';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Controlla se c'è un utente loggato nel localStorage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Errore nel parsing dei dati utente:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Chiamata al backend per logout (opzionale)
      await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }

    // Rimuovi dati dal localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);

    // Redirect alla home
    navigate('/');
  };
  // Dati di esempio per le ricette
  const sampleRecipes = [
    {
      id: 1,
      title: "Pollo alle Erbe con Verdure Grigliate",
      description: "Un piatto completo e bilanciato, ricco di proteine e verdure fresche. Perfetto per chi segue una dieta fitness.",
      image: "/api/placeholder/300/200",
      calories: 320,
      prepTime: 25,
      difficulty: "easy",
      rating: 4.8,
      likes: 156,
      isLiked: false,
      tags: ["Proteico", "Low Carb", "Pranzo"],
      author: {
        name: "Marco Fitness",
        avatar: "/api/placeholder/32/32"
      }
    },
    {
      id: 2,
      title: "Bowl di Quinoa con Avocado e Salmone",
      description: "Una ciotola nutriente e colorata, perfetta per un pranzo sano e saziante. Ricca di omega-3 e fibre.",
      image: "/api/placeholder/300/200",
      calories: 420,
      prepTime: 15,
      difficulty: "easy",
      rating: 4.9,
      likes: 203,
      isLiked: true,
      tags: ["Salmone", "Quinoa", "Healthy"],
      author: {
        name: "Sara Wellness",
        avatar: "/api/placeholder/32/32"
      }
    },
    {
      id: 3,
      title: "Pancakes Proteici ai Mirtilli",
      description: "Colazione golosa e nutriente, senza sensi di colpa. Ricchi di proteine e antiossidanti naturali.",
      image: "/api/placeholder/300/200",
      calories: 280,
      prepTime: 10,
      difficulty: "easy",
      rating: 4.7,
      likes: 89,
      isLiked: false,
      tags: ["Colazione", "Proteico", "Dolce"],
      author: {
        name: "Chef Healthy",
        avatar: "/api/placeholder/32/32"
      }
    },
    {
      id: 4,
      title: "Insalata di Lenticchie e Feta",
      description: "Un'insalata ricca e saziante, perfetta per vegetariani. Combinazione perfetta di proteine vegetali e sapori mediterranei.",
      image: "/api/placeholder/300/200",
      calories: 350,
      prepTime: 20,
      difficulty: "medium",
      rating: 4.6,
      likes: 134,
      isLiked: true,
      tags: ["Vegetariano", "Legumi", "Cena"],
      author: {
        name: "Anna Verde",
        avatar: "/api/placeholder/32/32"
      }
    },
    {
      id: 5,
      title: "Smoothie Bowl Tropicale",
      description: "Una colazione fresca e vitaminica, ricca di frutta tropicale e superfood. Energia pura per iniziare la giornata.",
      image: "/api/placeholder/300/200",
      calories: 220,
      prepTime: 5,
      difficulty: "easy",
      rating: 4.9,
      likes: 298,
      isLiked: false,
      tags: ["Colazione", "Frutta", "Vegan"],
      author: {
        name: "Tropical Chef",
        avatar: "/api/placeholder/32/32"
      }
    },
    {
      id: 6,
      title: "Salmone al Vapore con Broccoli",
      description: "Piatto leggero e ricco di nutrienti, cottura al vapore per preservare tutte le proprietà degli alimenti.",
      image: "/api/placeholder/300/200",
      calories: 290,
      prepTime: 18,
      difficulty: "medium",
      rating: 4.5,
      likes: 167,
      isLiked: true,
      tags: ["Pesce", "Low Carb", "Cena"],
      author: {
        name: "Chef Marina",
        avatar: "/api/placeholder/32/32"
      }
    }
  ];

  return (
    <>
      <Hero />
      
      {user && (
        <section className="welcome-section">
          <div className="container">
            <div className="welcome-content">
              <h2 className="welcome-message">Benvenuto, {user.name || user.username}!</h2>
              <p className="welcome-subtitle">
                Bentornato nella nostra community di ricette fit. Scopri nuove ricette o condividi le tue creazioni.
              </p>
            </div>
          </div>
        </section>
      )}
      
      <CategoryButtons />
      
      <section className="featured-recipes">
        <div className="container">
          <h2 className="section-title">Ricette in Evidenza</h2>
          <p className="section-subtitle">
            Scopri le ricette più amate dalla nostra community di food lovers
          </p>
          
          <div className="recipes-grid">
            {sampleRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          
          <div className="load-more-container">
            <button className="btn-load-more">
              Carica altre ricette
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

const FavoritesPage = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Le Tue Ricette Preferite</h1>
        <p className="page-description">
          Qui troverai tutte le ricette che hai salvato nei preferiti. 
          Crea la tua collezione personale di ricette fit e accedi rapidamente 
          ai tuoi piatti preferiti per una vita sana e gustosa.
        </p>
      </div>
    </div>
  );
};

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Salva il token nel localStorage
      localStorage.setItem('token', token);

      // Decodifica il token per ottenere le informazioni dell'utente
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userData = {
          id: payload.userId,
          email: payload.email,
          name: payload.name || payload.email.split('@')[0] // Fallback se name non è presente
        };
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
        console.error('Errore nel parsing del token:', error);
      }

      // Redirect alla home page
      navigate('/');
    } else {
      // Se non c'è token, redirect al login
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Completando l'autenticazione...</h1>
        <p className="page-description">
          Stiamo completando il processo di login. Verrai reindirizzato a breve.
        </p>
      </div>
    </div>
  );
};

const NewRecipePage = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Crea Nuova Ricetta</h1>
        <p className="page-description">
          Condividi la tua ricetta fit con la community! 
          Aiuta altri appassionati di cucina sana a scoprire nuovi sapori 
          e a raggiungere i loro obiettivi di benessere attraverso il cibo.
        </p>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/new-recipe" element={<NewRecipePage />} />
      </Routes>
    </div>
  );
};

export default App;
