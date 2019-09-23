import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import { useUsername, usePassword } from './hooks'

const App = () => {
    const { resetusername, ...username } = useUsername('username')
    const { resetpasswd, ...password } = usePassword('password')
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [notification, setNotification] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
            getBlogs()
            setTitle('')
            setAuthor('')
            setUrl('')
        }
    }, [])


    const getBlogs = async () => {
        const allBlogs = await blogService.getAll()
        console.log(allBlogs)
        setBlogs(allBlogs.sort((a,b) =>  b.likes-a.likes ))
    }

    const handleLogout = () => {
        try{
            setUser(null)
            window.localStorage.removeItem('loggedBlogappUser')
            setNotification('Logout successfully')
            setTimeout(() => { setNotification('')}, 5000)
        }catch(exception){
            setError('Logout failed!')
            setTimeout(() => { setError('')}, 5000)
        }
    }

    const handleLogin = async event => {
        event.preventDefault()
        console.log('loggin in with', username, password)
        try{
            const newUser = await loginService.login({ username: username.value, password: password.value })
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(newUser))

            setNotification('Login successfull')
            setTimeout(() => { setNotification('')}, 5000)

            await getBlogs()
            setUser(newUser)

            blogService.setToken(newUser.token)
            resetusername()
            resetpasswd()

        }catch(exception){
            setError('Login failed!')
            setTimeout(() => { setError('')}, 5000)
            resetusername()
            resetpasswd()
        }

    }

    const handleAddBlog = async event => {
        event.preventDefault()
        console.log('adding blog', title, author, url)

        const newBlog = {
            title: title,
            author: author,
            url: url,
        }
        const response = await blogService.create(newBlog)
        setBlogs(blogs.concat(response))
        setNotification(`a new blog ${title} by ${author} added`)
        setTimeout(() => { setNotification('')}, 5000)
        setAuthor('')
        setTitle('')
        setUrl('')
        window.location.reload()

    }

    const handleLikes = async (blog) => {
        blog.likes += 1
        await blogService.update(blog)
        const someBlogs = blogs.filter(otherBlogs => otherBlogs.id !== blog.id)
        const allBlogs = someBlogs.concat(blog)
        const sortedBlogs = allBlogs.sort((a,b) =>  b.likes-a.likes )
        setBlogs(sortedBlogs)
        setNotification(`you liked blog ${blog.title} from author ${blog.author}`)
        setTimeout(() => { setNotification('')}, 5000)
    }


    const handleRemoval = async (blog) => {
        const result = window.confirm(`Do you really want to delete blog ${blog.title}?`)
        if(result){
            const response = await blogService.remove(blog)
            console.log(response)
            const otherBlogs = blogs.filter(otherBlogs => otherBlogs.id !== blog.id)
            setBlogs(otherBlogs)
            setNotification(`blog ${blog.title} by ${blog.author} got deleted`)
            setTimeout(() => { setNotification('')}, 5000)
        }
    }

    if(user === null){
        return(
            <div>
                <Notification message={notification}/>
                <Error message={error}/>
                <LoginForm
                    username={username}
                    password={password}
                    handleSubmit={handleLogin}
                />
            </div>
        )
    }else{
        return(
            <div>
                <Notification message={notification} />
                <Error message={error}/>

                <div>
                    {user.username} is logged in
                    <button onClick={handleLogout}>logout</button>
                </div>
                <div>
                    <Togglable buttonLabel='new Blog'>
                        <AddBlogForm
                            author={author}
                            title={title}
                            url={url}
                            handleAuthorChange={({ target }) => setAuthor(target.value)}
                            handleTitleChange={({ target }) => setTitle(target.value)}
                            handleUrlChange={({ target }) => setUrl(target.value)}
                            handleAddBlog={handleAddBlog}
                        />
                    </Togglable>
                </div>
                <ul>
                    {blogs.map(blog =>
                        <Blog
                            key={blog.id}
                            blog={blog}
                            handleRemoval={() => handleRemoval(blog)}
                            handleLikes={() => handleLikes(blog)}
                            user={user} /> )}
                </ul>
            </div>
        )
    }
}


export default App