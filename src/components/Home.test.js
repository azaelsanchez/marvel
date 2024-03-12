import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';
import { FavoritesContext } from '../context/FavoritesContext';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Home Component', () => {

  it('renders correctly', () => {
    const { getByText } = render(
      <FavoritesContext.Provider value={{ favorites: [], setFavorites: jest.fn() }}>
        <Home />
      </FavoritesContext.Provider>
    );
    expect(getByText(/0 RESULTS/i)).toBeInTheDocument();
  });

  it('searches for heroes', async () => {
    const heroes = [{ id: 1, name: 'Spider-Man', thumbnail: { path: 'path/to/spiderman', extension: 'jpg' } }];
    axios.get.mockResolvedValueOnce({ data: { data: { results: heroes } } });

    const { getByText, getByPlaceholderText } = render(
      <FavoritesContext.Provider value={{ favorites: [], setFavorites: jest.fn() }}>
        <Home />
      </FavoritesContext.Provider>
    );

    fireEvent.change(getByPlaceholderText(/search/i), { target: { value: 'Spider-Man' } });
    fireEvent.click(getByText(/search/i));

    await waitFor(() => {
      expect(getByText('Spider-Man')).toBeInTheDocument();
    });
  });

  it('toggles favorite heroes', () => {
    const heroes = [{ id: 1, name: 'Spider-Man', thumbnail: { path: 'path/to/spiderman', extension: 'jpg' } }];
    const setFavorites = jest.fn();
    const favorites = [];

    const { getByAltText } = render(
      <FavoritesContext.Provider value={{ favorites, setFavorites }}>
        <Home />
      </FavoritesContext.Provider>
    );

    fireEvent.click(getByAltText(/corazón/i));
    expect(setFavorites).toHaveBeenCalledWith([...favorites, heroes[0]]);
  });

});