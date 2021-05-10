import React, { useState } from 'react'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({ addNameNumber, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addNameNumber}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ person }) => {
  return (
    <div>{person.name} {person.number} </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ names, setNames ] = useState(persons.map(person =>
    person.name))
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addNameNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const copy = [ ...names]

    if (copy.includes(personObject.name)) {
      window.alert(`${newName} is already added to phonebook`)
    }else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      copy.push(personObject.name)
      setNames(copy)
    }
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add new:</h2>
      <PersonForm 
        addNameNumber={addNameNumber} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <div>
      {personsToShow.map(person => 
        <Person key={person.name} person={person} />
      )}
      </div>
    </div>
  )
}

export default App