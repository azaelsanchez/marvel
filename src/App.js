import './App.css';
import axios from 'axios';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import logoMarvel from './img/logoMarvel.jpg'; 

import SearchBar from './components/SearchBar.jsx';

function App() {
  const navigate = useNavigate(); // Obtiene la función navigate

  const handleLogoClick = () => {
    navigate('/'); // Navega a la página de inicio
  };

  const [heroes, setHeroes] = useState([])

  useEffect(()=>{
    axios.get('https://gateway.marvel.com:443/v1/public/characters?ts=1&limit=50&apikey=49f5db225b8af4ab82d3d36a9661ce16&hash=ced2cfb56e66e5e7bb74a615c11beedc').then(res=>{
      setHeroes(res.data.data.results)
    }).catch(error=>console.log(error))
  },[])

  const handleSearch = (search) => {
    let url;
    if (search === '') {
      url = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&limit=50&apikey=49f5db225b8af4ab82d3d36a9661ce16&hash=ced2cfb56e66e5e7bb74a615c11beedc';
    } else {
      url = url = `https://gateway.marvel.com:443/v1/public/characters?ts=1&nameStartsWith=${search}&apikey=49f5db225b8af4ab82d3d36a9661ce16&hash=ced2cfb56e66e5e7bb74a615c11beedc`;
    }
    
    axios.get(url)
      .then(res => {
        setHeroes(res.data.data.results);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logoMarvel} alt="Logo de MARVEL" className="logo" onClick={handleLogoClick} />
      </header>
      <SearchBar onSearch={handleSearch} />
      <p className="search-container">{heroes.length} resultados</p>
      <div className="row row-cols-1 row-cols-md-6 g-4">
      { heroes.map(per=>(
        <div className="col mt-2" key={per.id}>
        <div className="card" style={{ width: '15rem', height: '15rem', position: 'relative', overflow: 'hidden' }}>
          <img src={`${per.thumbnail.path}.${per.thumbnail.extension}`} alt="Imagen de heroe" className="card-img-top" />
          <div className="card-body" >
            <p className="card-text" >{per.name}</p>
          </div>
          <div className="cutout" ></div>
        </div>
      </div>
      ))
      }
      </div>
    </div>
  );
}

export default App;