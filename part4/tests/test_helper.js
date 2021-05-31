const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
    {
        title: "First Blog",
        author: "Harry Potter",
        url: "www.firstblog.org"
    },
    {
        title: "Second Blog",
        author: "Severus Snape",
        url: "www.secondblog.com"
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: "Byebye", authon: "Dumbledore", url: "willberemoved.com" })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}
