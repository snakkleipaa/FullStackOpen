const blogsRouter = require('express').Router()
const { request } = require('express')
const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')
const jwt = require('jsonwebtoken')
require('dotenv').config()

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
        response.json(blog.toJSON())
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    if (!request.token || !user.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    else {

        const blog = await new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.json(savedBlog)
    }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const user = request.user

    if (!request.token || !user.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blogToRemove = await Blog.findById(request.params.id)

    if (user.id.toString() !== blogToRemove.user.toString() || !blogToRemove) {
        return response.status(403)
    }

    await blogToRemove.remove()
    response.status(204).end()

})

blogsRouter.put('/:id', async (request, response) => {

    const body = request.body

    const blog = {
      likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes: body.likes }, { new: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter

