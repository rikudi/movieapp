// LoginManager.jsx
import { useState } from 'react'
import LoginModal from './login'
import {useLogin} from '../contexts/LoginContext'
import movieService from '../services/movieService'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const LoginManager = () => {
  const { isLoginModalOpen, closeModal, handleLogin, setIsLoggedIn } = useLogin()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [loginSuccessful, setLoginSuccessful] = useState(false)


  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  //handle login function and alerts after submit
  const submitLogin = async (username, password) => {
    try {
      const response = await movieService.login(username, password)
      setLoginSuccessful(true)
      setSnackbarMessage('Login successful!')
      //get token and store it to localStorage
      handleLogin(response.token)
      setIsLoggedIn(true)
      setTimeout(() => {
        closeModal()
      }, 6000)
    } catch (error) {
      console.log(error)
      const errorMessage = error.response?.data?.error || 'Login failed' //get error message from server
      setSnackbarMessage(errorMessage)
      setLoginSuccessful(false)
    }
    setSnackbarOpen(true)
  }

  const submitRegister = async (username, name, password) => {
    try {
      const response = await movieService.register(username, name, password)
      console.log(response)
      setLoginSuccessful(true)
      setSnackbarMessage('Registration succeeded, please login')

    } catch (error) {
      console.log(error)
      const errorMessage = error.response?.data?.error || 'Registration failed' //get error message from server
      setSnackbarMessage(errorMessage)
      setLoginSuccessful(false)
    }
    setSnackbarOpen(true)
  }
  

  return (
    <>
      <LoginModal 
        open={isLoginModalOpen} 
        onClose={closeModal} 
        onLogin={submitLogin}
        onRegister={submitRegister} 
      />
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity={loginSuccessful ? 'success' : 'error'} elevation={6} variant="filled">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  )
}

export default LoginManager