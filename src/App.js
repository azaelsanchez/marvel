import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'; 
import Favorites from './components/Favorites'; 
import CharacterDetails from './components/CharacterDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/character/:characterId" element={<CharacterDetails />} />
    </Routes>
  );
}

export default App;