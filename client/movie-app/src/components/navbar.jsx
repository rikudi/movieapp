import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import { useLogin } from '../contexts/LoginContext'
import {Link} from 'react-router-dom'
import '../App.css'

const Navbar = () => {
  const { openModal, isLoggedIn, handleLogout } = useLogin()

  return (
    <AppBar position="static" className='navbar-container'>
      <Toolbar  className='navbar'>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" className="nav-link">MyMovie DB</Link>
        </Typography>
        {isLoggedIn && (
          <Typography>
            <Link to="/collection" className='nav-link'>My Collection</Link>
          </Typography>
        )}
        {!isLoggedIn ? (
          <Button onClick={openModal} color="inherit">Login</Button>
        ):
          <Button onClick={handleLogout} color="inherit">Sign out</Button>
        }
      </Toolbar>
    </AppBar>
  )
}
  
export default Navbar
  