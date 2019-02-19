const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

const Person = require('./models/person')

morgan.token('content', function getContent(req) {
    return JSON.stringify(req.body)
})

app.use(bodyParser.json())

app.use(morgan(':method :url :content :status :res[content-length] - :response-time ms'))

app.use(express.static('build'))

app.use(cors())

/*
let people = [
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
*/

const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}


app.get('/people', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/api/people', (req, res) => {
    Person
        .find({}, {__v: 0})
        .then(people => {
            res.json(people.map(formatPerson))
        })
})

app.get('/info', (req, res) => {
    Person.countDocuments({}, (err, count) => {
        res.send(`
        <p>Puhelinluettelossa on ${count} yhteystietoa</p>
        <p>${Date()}</p>
        `)
    })
})

app.get('/api/people/:id', (req, res) => {
    Person
        .findById(req.params.id)
        .then(person => {
            if(person) {
                res.json(formatPerson(person))
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformated id'})
        })
})

app.delete('/api/people/:id', (req, res) => {
    const id = Number(req.params.id)
    person = people.filter(person => person.id !== id)
  
    res.status(204).end()
  })

app.post('/api/people', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({error: 'name or number missing/invalid'})
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then(savedNote => {
            res.json(formatPerson(savedNote))
            console.log(`Lisätään henkilö ${person.name} numero ${person.number} luetteloon`)            
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
