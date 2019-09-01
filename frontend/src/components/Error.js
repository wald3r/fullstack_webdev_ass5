import React from 'react'



const Error = ({ message }) => {

    const notificationStyle = {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 25,
        backgroundColor: 'gainsboro',
        border: '1px solid red',
        padding: '35px',
        fontWeight: 'bold'
    }

    if(message === ''){
        return null
    }
    else{
        return (
            <div style={notificationStyle}>
                {message}
            </div>
        )
    }
}




export default Error