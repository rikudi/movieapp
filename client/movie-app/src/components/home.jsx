// Home.jsx
import React from 'react'
import MovieCarousel from './movieCarousel'
import {SearchBar, SearchResults} from './search'

const Home = ({ movies, searchTerm, onSearchChange, onSearch, searchResult }) => {
  return (
    <>
      <MovieCarousel movies={movies} />
      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={onSearchChange} 
        onSearch={onSearch} 
      />
      <SearchResults results={searchResult} />
    </>
  )
}
  
export default Home