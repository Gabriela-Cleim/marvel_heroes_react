import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import './HeroProfile.css';

const HeroProfile = () => {
  const { id } = useParams();
  const [hero, setHero] = useState(null);
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
    const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
    const ts = Date.now();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

    const fetchHeroDetails = async () => {
      const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=${publicKey}&ts=${ts}&hash=${hash}`);
      setHero(response.data.data.results[0]);
    };

    const fetchComics = async () => {
      const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${id}/comics?apikey=${publicKey}&ts=${ts}&hash=${hash}&limit=5`);
      setComics(response.data.data.results);
    };

    fetchHeroDetails();
    fetchComics();
  }, [id]);

  if (!hero) return <p>Loading...</p>;

  return (
    <div className="hero-profile">
      <div className="hero-banner">
        <h1 className="hero-title">DESCUBRA TODOS OS<br /> QUADRINHOS<br /> DESTE PERSONAGEM</h1>
      </div>
      <div className="hero-info">
        <img
          src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
          alt={hero.name}
          className="hero-avatar"
        />
        <div className="hero-details">
          <h2>{hero.name}</h2>
          <p>{hero.description || 'Descrição não disponível.'}</p>
        </div>
      </div>
      <div className="comics-list">
        {comics.map((comic) => (
          <div key={comic.id} className="comic-item">
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              className="comic-image"
            />
            <div className="comic-details">
              <h4>{comic.title}</h4>
              <p>{new Date(comic.dates[0].date).toLocaleDateString()} • {comic.pageCount} páginas</p>
              <p>{comic.description || 'Descrição não disponível.'}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="footer">
        <div className="footer-left">Data provided by Marvel. © 2023 MARVEL</div>
        <div className="footer-right">Desenvolvido por Anna Luiza</div>
      </div>
    </div>
  );
};

export default HeroProfile;
