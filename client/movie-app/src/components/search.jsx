import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../App.css'

const SearchBar = () => {

  
    return (
        <div>
            <TextField
                placeholder="Search..."
                id='filled-basic'
                className='search-field'
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    </InputAdornment>
                ),
                }}
            />
        </div>
    );
  };
  
  export default SearchBar;
  