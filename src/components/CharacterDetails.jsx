import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CharacterDetails() {
  const { characterId } = useParams();
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

  return (
    <div>
      <h1>{characterDetails.name}</h1>
      <img src={`${characterDetails.thumbnail.path}.${characterDetails.thumbnail.extension}`} alt={characterDetails.name} />
      <h2>Cómics</h2>
      <ul>
        {comics.map(comic => <li key={comic.id}>{comic.title}</li>)}
      </ul>
    </div>
  );
}

export default CharacterDetails;