import { useState } from "react";
import AddContactForm from "./components/AddContactForm";
import Contacts from "./components/Contacts";
import Search from "./components/Search";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNum, setNewPhoneNum] = useState('')
  const [search, setSearch] = useState('')
  const [searchPersons, setSearchPersons] = useState('')

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

