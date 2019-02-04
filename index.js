const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

morgan.token('content', function getContent(req) {
    return JSON.stringify(req.body)
})

app.use(bodyParser.json())

app.use(morgan(':method :url :content :status :res[content-length] - :response-time ms'))

app.use(express.static('build'))

app.use(cors())

let persons = [
    {
        name: 'Arto Hellas',
        number: '040-123456',
        id: 1
    },
    {
        name: 'Martti Tiennari',
        number: '040-123456',
        id: 2
    },
    {
        name: 'Arto Järvinen',
        number: '040-123456',
        id: 3
    },
    {
        name: 'Lea Kutvonen',
        number: '040-123456',
        id: 4
    }
]

app.get('/persons', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(`
        <p>Puhelinluettelossa on ${persons.length} yhteystietoa</p>
        <p>${Date()}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    person = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

const checkUniqueName = (name) => {
    for (let i = 0; i < persons.length; i++) {
        if(name === persons[i].name) {
            return false
        }
    }
    return true
}

app.post('/api/persons', (req, res) => {
    const person = req.body

    if (!person.name || !person.number) {
        return res.status(400).json({error: 'name or number missing/invalid'})
    }

    if (checkUniqueName(person.name) === false) {
        return res.status(400).json({error: 'name must be unique'})
    }

    person.id = Math.floor(Math.random() * Math.floor(999999999))
    console.log(person)

    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
