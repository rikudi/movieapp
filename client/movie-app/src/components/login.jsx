import { Modal, Box, TextField, Button } from '@mui/material'
import {useState} from 'react'

const LoginModal = ({open, onClose, onLogin, onRegister}) => {
  const [isRegistering, setIsRegistering] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  //reset inputfields
  const resetInputs = () => {
    setUsername('')
    setPassword('')
    setName('')
  } 

  const handleSubmit = () => {
    if(isRegistering) {
      onRegister(username, name, password)
    }else{
      onLogin(username, password)
    }
    resetInputs()
  }
  const handleToggle = () => {
    setIsRegistering(!isRegistering)
    resetInputs()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box p={3} style={{ backgroundColor: 'white', margin: 'auto', outline: 'none' }}>
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
        {isRegistering && <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />}
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {isRegistering ? 'Register' : 'Login'}
        </Button>
        <Button onClick={handleToggle}>
          {isRegistering ? 'Switch to Login' : 'Switch to Register'}
        </Button>
      </Box>
    </Modal>
  )
}

export default LoginModal