import React, { useState } from 'react'
import BlogInfo from './BlogInfo'
import ShortBlogInfo from './ShortBlogInfo'


const Blog = ({ blog, handleRemoval, handleLikes, user }) => {

    const [show, setShow] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    if(show === true){
        return(
            <div style={blogStyle}>
                <div onClick={() => setShow(!show)}>
                    <BlogInfo
                        blog={blog}
                        handleLikes={handleLikes}
                        handleRemoval={handleRemoval}
                        user={user} />
                </div>
            </div>
        )
    }else{
        return(
            <div style={blogStyle}>
                <div onClick={() => setShow(!show)}>
                    <ShortBlogInfo blog={blog}/>
                </div>
            </div>
        )
    }
}


export default Blog

