import { useState, useEffect } from "react";
import axios from "axios";
import AddContactForm from "./components/AddContactForm";
import Contacts from "./components/Contacts";
import Search from "./components/Search";


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNum, setNewPhoneNum] = useState('')
  const [search, setSearch] = useState('')
  const [searchPersons, setSearchPersons] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    const lowerCasedNames = persons.map(person => {
      return {
        ...person,
        name: person.name.toLowerCase(),
      }
    })
    const filterContacts = lowerCasedNames.filter(person => {
       return person.name.includes(search.toLowerCase())
       
    })
    setSearchPersons(filterContacts)
  }

  const handleNewNote = (e) => {
    e.preventDefault()
    if (findDuplicatePerson(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }  
    const newPhone = {
      name: newName,
      number: newPhoneNum,
      id: persons.length + 1
    }
    
    setPersons(persons.concat(newPhone))
    setNewName('')
    setNewPhoneNum('')
  }

  const findDuplicatePerson = (name) => {
    return persons.find((person) => {return person.name === name})
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Search 
        search={search}
        searchChange={handleSearch} 
      />

      <AddContactForm 
        name={newName} 
        nameChange={setNewName} 
        number={newPhoneNum}
        numberChange={setNewPhoneNum}
        handleNewContact={handleNewNote} 
      />

      
      {search === '' 
        ? <Contacts contacts={persons} />
        : <Contacts contacts={searchPersons} />}
      
    </div>
  )
}




export default App;

