import { useState, useEffect } from 'react'
import './App.css'
import movieService from './services/movieService'
import MovieCarousel from './components/movieCarousel'
import SearchBar from './components/search'
import Navbar from './components/navbar'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  const [movies, setMovies] = useState([])

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

  useEffect(() => {
    console.log('effect')
    fetchMovies()
  }, [])

  console.log('render ', movies.length, ' movies')
  return (
    <div className='body'>
      <Navbar />
      <MovieCarousel movies={movies} />
      <SearchBar />
    </div>

     
  )
}

export default App
