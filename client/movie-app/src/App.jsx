import { useState, useEffect } from 'react'
import './App.css'
import movieService from './services/movieService'
import MovieCarousel from './components/movieCarousel'
import { SearchBar, SearchResults } from './components/search'
import Navbar from './components/navbar'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])

  //fetch movie data from server, update state
  const fetchMovies = () => {
    movieService.getAll()
    .then(response => {
      console.log(response.data)
      setMovies(response.data)
      console.log('movie data fetched from server')
    })
    .catch(error => {
      console.log('error fetching movies from server', error)
    })
  }
  //fetch movie data by searchTerm
  const searchRequest = async () => {
    try {
      console.log("searching movies by title: ", searchTerm)
      const response = await movieService.searchMovies(searchTerm)
      console.log("retrieved titles: ", response)
      setSearchResult(response)
    } catch(error) {
      console.error('Failed to fetch movies by search: ', error)
    }
  }

  useEffect(() => {
    console.log('effect')
    fetchMovies()
  }, [])

  //EVENT HANDLERS
  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value)
  }
  console.log('search: ', searchTerm)

  console.log('render ', movies.length, ' movies')
  return (
    <div className='body'>
      <Navbar />
      <MovieCarousel movies={movies} />
      <SearchBar 
      onSearchChange={handleSearchInput} onSearch={searchRequest} searchTerm={searchTerm} />
      <SearchResults results={searchResult} />
    </div>

     
  )
}

export default App
