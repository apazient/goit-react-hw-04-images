import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import style from './SearchBar.module.css';
import React from 'react';

export const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      return;
    }
    onSearch(query);

    reset();
  };
  const reset = () => {
    setQuery('');
  };
  return (
    <header className={style.Searchbar}>
      <form className={style.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={style['SearchForm-button']}>
          <ImSearch style={{ marginRight: 8 }}></ImSearch>
        </button>
        <input
          className={style['SearchForm-input']}
          type="text"
          name="query"
          value={query}
          onChange={handleQueryChange}
          autoFocus
          autoComplete="off"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};
export default SearchBar;
