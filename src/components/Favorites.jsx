import '../App.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logoMarvel from '../img/logoMarvel.jpg';
import corazon from '../img/corazon.png';
import SearchBar from './SearchBar.jsx';
import { FavoritesContext } from '../context/FavoritesContext.jsx';

function Favorites() {
  const navigate = useNavigate();
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar los favoritos basados en el término de búsqueda
  const filteredFavorites = favorites.filter(per =>
    per.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (search) => {
    setSearchTerm(search);
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
      <h1 style={{ textAlign: 'left', marginLeft: '20px' }}>FAVORITES</h1>
      <SearchBar onSearch={handleSearch} />
      <p className="search-container">{filteredFavorites.length} resultados</p>
      <div className="row row-cols-1 row-cols-md-6 g-4">
        {filteredFavorites.map(per => (
          <div className="col mt-2" key={per.id}>
            <div className="card" style={{ width: '15rem', height: '15rem', position: 'relative', overflow: 'hidden' }}>
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

export default Favorites;