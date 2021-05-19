require('dotenv').config()
const express = require('express')
const app = express()
const Person =require('./models/person')
const morgan = require('morgan')
const cors = require('cors')


app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('data', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.get('/info', (request, response) => {
    Person.count({}, function(err, count) {
        response.send(
            `<div>Phonebook has info for ${count} people<div>
            <div> ${Date()}`
        ) 
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})


app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json( {
            error: "name missing"
        })
    }
    if (!body.number) {
        return response.status(400).json( {
            error: "number missing"
        })
    }
    
    Person.exists({name: body.name}, function (err, doc) {
        if (err) {
            console.log(err)
        }else {
            if (doc) {
                return response.status(400).json( {
                    error: 'name must be unique'
                })
            } else {
                const person = new Person({
                    name: body.name,
                    number: body.number,
                })
            
                person.save().then(savedPerson => {
                    response.json(savedPerson)
                })
            }
        }
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, { number: body.number }, 
        function (err, docs) {
            if (err) {
                next(err)
            } else {
                response.json(person)
            }
        })
        
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})