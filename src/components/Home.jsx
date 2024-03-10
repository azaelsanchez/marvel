import '../App.css';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logoMarvel from '../img/logoMarvel.jpg';
import corazon from '../img/corazon.png';
import SearchBar from './SearchBar.jsx';
import { FavoritesContext } from '../context/FavoritesContext.jsx';

function Home() {
  const navigate = useNavigate();
  const [heroes, setHeroes] = useState([]);
  const { favorites, setFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    axios.get('https://gateway.marvel.com:443/v1/public/characters?ts=1&limit=50&apikey=49f5db225b8af4ab82d3d36a9661ce16&hash=ced2cfb56e66e5e7bb74a615c11beedc')
      .then(res => {
        setHeroes(res.data.data.results);
      })
      .catch(error => console.log(error));
  }, []);

  const handleSearch = (search) => {
    const url = search === ''
      ? 'https://gateway.marvel.com:443/v1/public/characters?ts=1&limit=50&apikey=49f5db225b8af4ab82d3d36a9661ce16&hash=ced2cfb56e66e5e7bb74a615c11beedc'
      : `https://gateway.marvel.com:443/v1/public/characters?ts=1&nameStartsWith=${search}&apikey=49f5db225b8af4ab82d3d36a9661ce16&hash=ced2cfb56e66e5e7bb74a615c11beedc`;
    axios.get(url)
      .then(res => {
        setHeroes(res.data.data.results);
      })
      .catch(error => console.log(error));
  };

  const toggleFavorite = (per) => {
    const updatedFavorites = favorites.some(fav => fav.id === per.id)
      ? favorites.filter(fav => fav.id !== per.id)
      : [...favorites, per];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logoMarvel} alt="Logo de MARVEL" className="logo" onClick={() => navigate('/')} />
        <button className="favorites-button" onClick={() => navigate('/favorites')}>
          <img src={corazon} alt="Favoritos" className="icono-corazon-header" />
          <span className="favorites-count">{favorites.length}</span>
        </button>
      </header>
      <SearchBar onSearch={handleSearch} />
      <p className="search-container">{heroes.length} resultados</p>
      <div className="row row-cols-1 row-cols-md-6 g-4">
        {heroes.map(per => (
          <div className="col mt-2" key={per.id}>
            <div className="card" onClick={() => navigate(`/character/${per.id}`)} style={{ width: '15rem', height: '15rem', position: 'relative', overflow: 'hidden' }}>
              <img src={`${per.thumbnail.path}.${per.thumbnail.extension}`} alt="Imagen de heroe" className="card-img-top" />
              <div className="card-body">
                <p className="card-text">{per.name}</p>
                <button onClick={() => toggleFavorite(per)} className={`heart-button ${favorites.some(fav => fav.id === per.id) ? 'is-favorite' : ''}`}>
                  <img src={corazon} alt="Corazón" className="icono-corazon" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;