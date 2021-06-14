const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = []

    blogs.forEach(function(blog) {
        likes.push(blog.likes)
    })
    
    return likes.reduce((a,b) => a + b, 0)
}

const favoriteBlog = (blogs) => {

    if (blogs.length === 0) {
        return "no blogs found"
    }

    const likes = []

    blogs.forEach(function(blog) {
        likes.push(blog.likes)
    })

    const maxIdx = likes.indexOf(Math.max(...likes))

    const blog = {
        title: blogs[maxIdx].title,
        author: blogs[maxIdx].author,
        likes: blogs[maxIdx].likes
    }

    return blog
}

const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        return 'no blogs found'
    }

    const count = lodash.countBy(blogs, blog => blog.author) 
    const authors = Object.entries(count)

    var index = 0
    var maxIndex = 0
    var maxValue = 0

    for (i = 0; i < authors.length; i++) {
        if (authors[i][1] > maxValue) {
            maxValue = authors[i][1]
            maxIndex = index
        }
        index = index + 1
    }

    const ret = {
        author: authors[maxIndex][0],
        blogs: authors[maxIndex][1]
    }

    return ret
}

const mostLikes = (blogs) => {

    if (blogs.length === 0) {
        return 'no blogs found'
    }

    const likes = blogs.map(blog => [blog.author, blog.likes])

    var authors = {}

    for (i = 0; i < likes.length; i++) {
        if (authors[`${likes[i][0]}`] === undefined ) {
            authors[`${likes[i][0]}`] = likes[i][1]
        } else {
            authors[`${likes[i][0]}`] += likes[i][1]
        }
    }

    const authorList = Object.entries(authors) 

    var index = 0
    var maxIndex = 0
    var maxValue = 0

    for (i = 0; i < authorList.length; i++) {
        if (authorList[i][1] > maxValue) {
            maxValue = authorList[i][1]
            maxIndex = index
        }
        index = index + 1
    }

    const ret = {
        author: authorList[maxIndex][0],
        likes: authorList[maxIndex][1]
    }

    return ret
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}