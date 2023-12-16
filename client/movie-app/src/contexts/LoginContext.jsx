//handles opening and closing of login modal
import { createContext, useState, useContext, useEffect } from 'react'

const LoginContext = createContext({
  isLoginModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  handleLogout: () => {},
  handleLogin: () => {}
})

export const useLogin = () => useContext(LoginContext)

export const LoginProvider = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  //effect to see if user is logged in when app first renders
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      setIsLoggedIn(true)
      console.log('user logged in')
    }
  }, [])

  // Define login and logout handlers
  const handleLogin = (token) => {
    localStorage.setItem('token', token)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    alert('Signed out!')
    setIsLoggedIn(false)
  }

  const openModal = () => setIsLoginModalOpen(true)
  const closeModal = () => setIsLoginModalOpen(false)

  return (
    <LoginContext.Provider value={{ isLoginModalOpen, openModal, closeModal, isLoggedIn, setIsLoggedIn, handleLogout, handleLogin }}>
      {children}
    </LoginContext.Provider>
  )
}