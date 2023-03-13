import { useState } from 'react';
import { ImSearch } from 'react-icons/im';

import style from './SearchBar.module.css';

function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleQueryChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return;
    }
    onSubmit(query);

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
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default SearchBar;
