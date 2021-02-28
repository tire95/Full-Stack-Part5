import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, handleUsernameChange, handlePasswordChange, username, password }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input
          type='text'
          value={username}
          name='Username'
          id='usernameInput'
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        Password:
        <input
          type='password'
          value={password}
          name='Password'
          id='passwordInput'
          onChange={handlePasswordChange}
        />
      </div>
      <button type='submit' id='loginButton'>Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm