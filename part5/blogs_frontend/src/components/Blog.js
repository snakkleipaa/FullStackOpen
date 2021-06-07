import React, { useState } from 'react'

const UserInfo = (blog) => {
    if (blog.user !== undefined) {
        return (
            <div>
                {blog.user.name}
            </div>
        )
    }
}


const Blog = ({ blog, handleLike, handleRemove }) => {

    const [blogInfoView, setBlogInfoView] = useState(false)

    const toggleVisibility = () => {
        setBlogInfoView(!blogInfoView)
    }


    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    if (!blogInfoView) {
        return (
            <div style={blogStyle} className='blog'>
                <i>{blog.title}</i> by {blog.author}
                <button onClick={toggleVisibility} id='view-button'>{blogInfoView ? 'hide' : 'view'}</button>
            </div>

        )}
    return (
        <div style={blogStyle} className='additionalBlogInfo'>
            <div>
                <i>{blog.title}</i> by {blog.author}
                <button onClick={toggleVisibility} id='hide-button'>{blogInfoView ? 'hide' : 'view'}</button>
            </div>
            <div>
                {blog.url}
            </div>
            <div>
        likes: {blog.likes}
                <button onClick={handleLike}>like</button>
            </div>
            {UserInfo(blog)}
            <div>
                <button onClick={handleRemove}>remove</button>
            </div>
        </div>
    )
}

export default Blog