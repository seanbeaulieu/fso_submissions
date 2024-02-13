import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/phones'
import Person from './components/Person'

// search filter
const SearchFilter = (props) => {
  return (
      <form>
        <div>
          filter shown with <input
                              value={props.filterName}
                              onChange={props.handleFilterChange}
                              />
        </div>
      </form>
    )
  }


// adding new people

const AddPersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input
                value={props.newName}
                onChange={props.handleNameChange} />
      </div>
      <div>number: <input 
                      value={props.newNumber}
                      onChange={props.handleNumberChange}
                      />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

// render a persons details

const Persons = (props) => {
  return (
    <div>
      {props.filteredNames.map(person => 
        <Person 
          key={person.id}
          person={person}
          deletePerson={() => props.deletePersonWeb(person.id)}
        />
      )}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterNames] = useState('')

  // effectHook here

  const hook = () => {
    console.log('effect')
    personService
      .getAllPersons()
      .then(initialPersons => {
          setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => { 

    setFilterNames(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,

    }
    if (persons.some(person => person.name === newName)) {
        alert(`${newName} is already added to phonebook`)
      }
    else if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
      }

    else {
      personService
      .addPerson(personObject)
      .then(returnPerson => {
        setPersons(persons.concat(returnPerson))
        setNewName('')
        setNewNumber('')
      })
    }
    
  }

  const deletePersonWeb = id => {
    // event.preventDefault()
    const person = persons.find(n => n.id === id)
    // console.log(person)
    
    confirm('Delete ' + person.name + '?')

    personService
      .deletePerson(id)
      .then(returnPerson => {
        setPersons(persons.filter(person => person.id !== returnPerson.id))
        // console.log('here')
      })

  }

  const filteredNames = persons.some(person => person.name === newName)
                        ? persons
                        : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>

      <SearchFilter filterName={filterName} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      
      <AddPersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons filteredNames={filteredNames} deletePersonWeb={deletePersonWeb} />

    </div>
  )
}

export default App