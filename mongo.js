const mongoose = require('mongoose')

const url = 'mongodb://tammint:JimiMongo3012@ds123465.mlab.com:23465/puhelinluettelo-db'
mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String,
    id: Number
})

console.log(process.argv.length)

if(process.argv.length < 3) {
    console.log('puhelinluettelo:')
    Person
    .find({})
    .then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else {
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
    })
    
    person
        .save()
        .then(response => {
            console.log(`Lisätään henkilö ${person.name} numero ${person.number} luetteloon`)
            mongoose.connection.close()
        })
}

/*
const person = new Person({
    name: 'test person',
    number: '000-00000',
    id: 00000
})

person
    .save()
    .then(response => {
        console.log('person saved!')
        mongoose.connection.close()
    })
    */