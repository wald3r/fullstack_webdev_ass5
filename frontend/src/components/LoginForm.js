import React from 'react'
import PropTypes from 'prop-types'


const LoginForm = ({ username, password, handleUsernameChange, handlePasswordChange, handleSubmit }) => (
    <form onSubmit={handleSubmit}>
        <h1>log in to application</h1>
        <div>
            username <input
                value={username}
                onChange={handleUsernameChange}
            />
        </div>
        <div>
            password <input
                value={password}
                type="Password"
                name="Password"
                onChange={handlePasswordChange}
            />
        </div>
        <button type="submit">login</button>
    </form>
)


LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm