import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../App.css'
import {SMovieCard} from './movieCard'

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
    return(
        <div className='search-container'>
            {results.map(result => (
               <SMovieCard key={result.id} movie={result} />
            ))}
        </div>
    )
}
  