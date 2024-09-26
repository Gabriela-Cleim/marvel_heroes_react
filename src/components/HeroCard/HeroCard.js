import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroCard.css';

const HeroCard = ({ hero }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/hero/${hero.id}`);
  };

  return (
    <div className="hero-card" onClick={handleCardClick}>
      <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} alt={hero.name} className="hero-img" />
      <div className="card-header">
        <h3>{hero.name}</h3>
        <span className="favorite-icon">♡</span>
      </div>
      <p>{hero.description ? hero.description : 'Descrição não disponível.'}</p>
    </div>
  );
};

export default HeroCard;
