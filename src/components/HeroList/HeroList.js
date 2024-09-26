import React, { useState, useEffect } from 'react';
import HeroCard from '../HeroCard/HeroCard';
import SearchBar from '../SearchBar/SearchBar';
import { fetchHeroes } from '../../services/HeroService';
import './HeroList.css';

const HeroList = () => {
  const [heroes, setHeroes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
    const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;

    const getHeroes = async () => {
      await fetchHeroes(publicKey, privateKey, searchTerm, page, setHeroes);
      if (searchTerm) {
        setHasSearched(true);
      }
    };

    getHeroes();
  }, [page, searchTerm]);

  const filteredHeroes = onlyFavorites ? heroes.filter(hero => hero.isFavorite) : heroes;

  return (
    <div className="app-container">
      <div className="title-search">
        <h1>EXPLORE O UNIVERSO E CRIE SUA EQUIPE</h1>
        <h2>Os melhores personagens já feitos em quadrinhos. Fique viciado em uma generosa porção de heróis e vilões!</h2>
      </div>
      <div className="container">
        <SearchBar onSearch={setSearchTerm} />
        <div className="filter-bar">
          {hasSearched && <p className="hero-count">Foram encontrados {filteredHeroes.length} heróis</p>}
          <div 
            className="favorite-toggle"
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            title="Somente favoritos"
          >
            ❤️ Somente Favoritos
          </div>
        </div>

        <div className="hero-grid">
          {filteredHeroes.map((hero) => <HeroCard key={hero.id} hero={hero} />)}
        </div>

        <div className="pagination">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="pagination-button"
          >
            &#9664;
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setPage(index + 1)}
              className={`pagination-number ${page === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="pagination-button"
          >
            &#9654;
          </button>
        </div>
      </div>

      <div className="footer">
        <div className="footer-left">Data provided by Marvel. © 2023 MARVEL</div>
        <div className="footer-right">Desenvolvido por Anna Luiza</div>
      </div>
    </div>
  );
};

export default HeroList;
