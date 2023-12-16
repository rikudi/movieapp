import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import movieService from './services/movieService'
import {LoginProvider} from './contexts/LoginContext'
import LoginManager from './components/loginManager'
import Navbar from './components/navbar'
import Home from './components/home'
import Collection from './components/collection'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


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
      console.log('searching movies by title: ', searchTerm)
      const response = await movieService.searchMovies(searchTerm)
      console.log('retrieved titles: ', response)
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
      <Router>
        <LoginProvider>
          <Navbar />
          <LoginManager/>
          <Routes>
            <Route path="/" element={<Home movies={movies}
              searchTerm={searchTerm}
              onSearchChange={handleSearchInput}
              onSearch={searchRequest} searchResult={searchResult} />} />
            <Route path="/collection" element={<Collection />} />
          </Routes>
        </LoginProvider>
      </Router>
    </div>
  )
}

export default App
