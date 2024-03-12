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
    const [allHeroes, setAllHeroes] = useState([]); 
    const { favorites, setFavorites } = useContext(FavoritesContext);

    useEffect(() => {
        axios.get('https://gateway.marvel.com:443/v1/public/characters?ts=1&limit=50&apikey=49f5db225b8af4ab82d3d36a9661ce16&hash=ced2cfb56e66e5e7bb74a615c11beedc')
            .then(res => {
                setHeroes(res.data.data.results);
                setAllHeroes(res.data.data.results); 
            })
            .catch(error => console.log(error));
    }, []);

    const handleSearch = (search) => {
        if (search === '') {
            setHeroes(allHeroes); 
        } else {
            const searchUrl = `https://gateway.marvel.com:443/v1/public/characters?ts=1&nameStartsWith=${search}&apikey=49f5db225b8af4ab82d3d36a9661ce16&hash=ced2cfb56e66e5e7bb74a615c11beedc`;
            axios.get(searchUrl)
                .then(res => {
                    setHeroes(res.data.data.results); 
                })
                .catch(error => console.log(error));
        }
    };

    const toggleFavorite = (per) => {
        const updatedFavorites = favorites.some(fav => fav.id === per.id)
            ? favorites.filter(fav => fav.id !== per.id)
            : [...favorites, per];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };
console.log(heroes);
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
            <p className="search-container"><b>{heroes.length} RESULTS</b></p>
            <div className="my-row">
                {heroes.map(per => (
                    <div className="my-col" key={per.id}>
                        <div className="card" onClick={() => navigate(`/character/${per.id}`)} style={{ width: '13rem', height: '15rem', position: 'relative', overflow: 'hidden', border:'none', borderRadius: '1px'}}>
                        <img src={`${per.thumbnail.path}.${per.thumbnail.extension}`} alt="Imagen de heroe" className="card-img-top" style={{ height: '80%', objectFit: 'cover' }} />
                            <div className="card-body2">
                                <p className="card-text">{per.name}</p>
                                <button onClick={(e) => {
                                    e.stopPropagation(); 
                                    toggleFavorite(per);
                                }} className={`heart-button ${favorites.some(fav => fav.id === per.id) ? 'is-favorite' : ''}`}>
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