const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})


/*HTTP GET request to /api/blogs*/
/*return the correct amount of blog posts in JSON*/
describe('when there are initirally some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
})

describe('adding of a new blog', () => {

    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
    
        await user.save()
      })

    test('id property of new post is defined', async () => {
        const testBlog = new Blog({
            title:'do i have an id',
            author: 'testing',
            url: '123.com'
        })

        const savedBlog = await testBlog.save()
        expect(savedBlog.id).toBeDefined()
    })

    test('new valid blog can be added', async () => {

        const userLogin = {
            username: 'root',
            password: 'sekret'
        }

        usersAtStart = await helper.usersInDb()
        user = usersAtStart[0]

        const response = await api 
            .post('/api/login')
            .send(userLogin)

        const token = response.body.token

        const newBlog = {
            title: 'A whole new world',
            author: 'Aladdin',
            url: 'www.disneyworld.org',
            user: user.id
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain(
            'A whole new world'
        )
    })

    test('adding a blog fails with 401 if token missing', async () => {

        const userLogin = {
            username: 'root',
            password: 'sekret'
        }

        usersAtStart = await helper.usersInDb()
        user = usersAtStart[0]

        const response = await api 
            .post('/api/login')
            .send(userLogin)


        const newBlog = {
            title: 'A whole new world',
            author: 'Aladdin',
            url: 'www.disneyworld.org',
            user: user.id
        }

        await api
            .post('/api/blogs')
            .set('Authorization', ``)
            .send(newBlog)
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).not.toContain(
            'A whole new world'
        )
    })

    test('missing likes default to 0', async () => {
        const newBlog = new Blog({
            title: 'A whole new world',
            author: 'Aladdin',
            url: 'www.disneyworld.org'
        })

        expect(newBlog.likes).toEqual(0)
    })

    test('missing title leads to error', async () => {
        const newBlog = new Blog({
            author: "I did not write a title",
            url: "www.missingtitle.com"
        })

        const userLogin = {
            username: 'root',
            password: 'sekret'
        }

        const response = await api 
        .post('/api/login')
        .send(userLogin)

        const token = response.body.token

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)

    })

    test('missing url leads to error', async () => {
        const newBlog = new Blog({
            title: 'Oops no url',
            author: "I am a mess",
        })

        const userLogin = {
            username: 'root',
            password: 'sekret'
        }

        const response = await api 
        .post('/api/login')
        .send(userLogin)

        const token = response.body.token

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)

    })
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
  
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: "root",
        name: "Superuser",
        password: "salainen",
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('`username` to be unique')
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  
  })
  
  describe('adding invalid users', () => {
      test('username too short leads to error', async () => {

        usersAtStart = await helper.usersInDb()

        const shortUsername = new User({
            username: "fu",
            password: "validpassword"
        })

        await api
            .post(`/api/users`)
            .send(shortUsername)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
  
      test('password too short leads to error', async () => {

        usersAtStart = await helper.usersInDb()

        const shortPassword = new User({
            username: "validusername",
            password: "va"
        })

        await api
            .post(`/api/users`)
            .send(shortPassword)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
  
      test('password missing leads to error', async () => {

        usersAtStart = await helper.usersInDb()

        const noPassword = new User({
            username: "validusername"
        })

        await api
            .post(`/api/users`)
            .send(noPassword)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
  })

afterAll(() => {
    mongoose.connection.close()
})
