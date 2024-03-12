import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import logoMarvel from '../img/logoMarvel.jpg';
import corazon from '../img/corazon.png';
import { useNavigate } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext.jsx';


function CharacterDetails() {
    const navigate = useNavigate();
    const { characterId } = useParams();
    const { favorites, setFavorites } = useContext(FavoritesContext);
    const [characterDetails, setCharacterDetails] = useState(null);
    const [comics, setComics] = useState([]);

    useEffect(() => {
        axios.get(`https://gateway.marvel.com:443/v1/public/characters/${characterId}?ts=1&limit=50&apikey=49f5db225b8af4ab82d3d36a9661ce16&hash=ced2cfb56e66e5e7bb74a615c11beedc`)
            .then(res => {
                setCharacterDetails(res.data.data.results[0]);
            })
            .catch(error => console.log(error));

        axios.get(`https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?ts=1&limit=50&apikey=49f5db225b8af4ab82d3d36a9661ce16&hash=ced2cfb56e66e5e7bb74a615c11beedc`)
            .then(res => {
                setComics(res.data.data.results);
            })
            .catch(error => console.log(error));
    }, [characterId]);

    if (!characterDetails) return <p>Cargando...</p>;


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
            <div className="character-page">
                <main className="character-content">
                    <div className="character-header">
                        <div className="character-image-container">
                            <img src={`${characterDetails.thumbnail.path}.${characterDetails.thumbnail.extension}`} alt={characterDetails.name} className="character-image" />
                        </div>
                        <div className="character-info-container">
                            <div className="character-name-and-heart">
                                <h1>{characterDetails.name}</h1>
                                <button onClick={() => toggleFavorite(characterDetails)} className={`heart-button-details ${favorites.some(fav => fav.id === characterDetails.id) ? 'is-favorite' : ''}`}>
                                    <img src={corazon} alt="Añadir a favoritos" className="icono-corazon-details" />
                                </button>
                            </div>
                            <div className="character-description-container">
                                <p className="character-description">{characterDetails.description || 'Descripción no disponible.'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="comics-section">
                        <h2>Cómics</h2>
                        <div className="carousel-container">
                            {comics.map((comic, index) => {
                                const onsaleDateObj = comic.dates.find(dateObj => dateObj.type === 'onsaleDate');
                                const onsaleDate = new Date(onsaleDateObj.date).getFullYear();
                                return (
                                    <div key={index}>
                                        <img src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt={comic.title} className="carousel-image" />
                                        <div>
                                            <p>{comic.title}</p>
                                            <p>{onsaleDate}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CharacterDetails;