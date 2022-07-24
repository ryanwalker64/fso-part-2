import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewNote = (e) => {
    e.preventDefault()
    const newPhone = {
      name: newName
    }
    console.log(newPhone)
    setPersons(persons.concat(newPhone))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewNote}>
        <div>
          name: <input value={newName} onChange={(e) => {setNewName(e.target.value)}}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => {
        return <div key={person.name}>{person.name}</div>
      })}
    </div>
  )
}


export default App;
