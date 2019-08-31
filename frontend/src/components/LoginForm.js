import React from 'react'


const LoginForm = ({username, password, handleUsernameChange, handlePasswordChange, handleSubmit}) => (
        <form onSubmit={handleSubmit}> 
           <h1>log in to application</h1>
           <div>
                username <input value={username}
                                onChange={handleUsernameChange}
                         />
            </div>
            <div> 
                password <input value={password}
                                type="Password"
                                name="Password"
                                onChange={handlePasswordChange}
                         />
            </div>
                <button type="submit">login</button>
        </form>
    )


export default LoginForm