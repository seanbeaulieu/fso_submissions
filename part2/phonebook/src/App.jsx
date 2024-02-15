import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/phones'
import Person from './components/Person'
import Notification from './components/Notification'

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

const Error = ({ message }) => {
  const notiStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notiStyle}>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterNames] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      const person = persons.find(person => person.name === newName)
      // console.log(person)
      
      confirm(`${newName} is already added to phonebook, replace the old name with a new one?`)

      // console.log('before put')
      personService
        .addPersonPut(personObject, person.id)
        .then(returnPerson => {
          setPersons(persons.map(person => person.id === returnPerson.id ? returnPerson : person))
          setNewName('')
          setNewNumber('')

          setSuccessMessage(
            `Added ${personObject.name}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of '${person.name}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }

    else if (persons.some(person => person.number === newNumber)) {
      const person = persons.find(person => person.number === newNumber)
      person_id = person.id
      alert(`${newNumber} is already added to phonebook`)
      }

    else {
      personService
      .addPerson(personObject)
      .then(returnPerson => {
        setPersons(persons.concat(returnPerson))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(
          `Added ${personObject.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
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
      .catch(error => {
        setErrorMessage(
          `Information of '${person.name}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

  }

  const filteredNames = persons.some(person => person.name === newName)
                        ? persons
                        : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={successMessage} />
      <Error message={errorMessage} />

      <SearchFilter filterName={filterName} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      
      <AddPersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons filteredNames={filteredNames} deletePersonWeb={deletePersonWeb} />

    </div>
  )
}

export default App