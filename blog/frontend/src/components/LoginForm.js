import React from 'react'
import PropTypes from 'prop-types'




const LoginForm = ({ username, password, handleSubmit }) => {

    return(
        <form onSubmit={handleSubmit}>
            <h1>log in to application</h1>
            <div>
                username <input
                    {...username}
                />
            </div>
            <div>
                password <input
                    {...password}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}


LoginForm.propTypes = {
    username: PropTypes.func.isRequired,
    password: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
}

export default LoginForm