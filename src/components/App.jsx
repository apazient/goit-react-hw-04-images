import { useState } from 'react';
import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './SearchBar/SearchBar';

export function App() {
  const [query, setQuery] = useState();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <SearchBar onSubmit={setQuery}></SearchBar>
      <ImageGallery query={query}></ImageGallery>
    </div>
  );
}
