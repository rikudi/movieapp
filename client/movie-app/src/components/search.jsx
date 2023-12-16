import { TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import '../App.css'
import {SMovieCard} from './movieCard'
import movieService from '../services/movieService'
import {useLogin} from '../contexts/LoginContext'

export const SearchBar = ({searchTerm, onSearchChange, onSearch}) => {
  return (
    <div>
      <TextField
        placeholder="Search..."
        id='filled-basic'
        className='search-field'
        value={searchTerm}
        onChange={onSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onSearch} >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}

export const SearchResults = ({results}) => {
  const { isLoggedIn } = useLogin()
    
  const handleAddToCollection = async (movie) => {
    console.log('adding movie to collection: ', movie)
    try {
      const response = await movieService.addMovie(movie)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  return(
    <div className='search-container'>
      {results.map(result => (
        <SMovieCard key={result.id} movie={result} onAddToCollection={handleAddToCollection} isLoggedIn={isLoggedIn} />
      ))}
    </div>
  )
}
  