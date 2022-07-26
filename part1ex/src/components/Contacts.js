import React from "react";

const Contacts = (props) => {
    const contacts = props.contacts.map(contact => {return <div key={contact.id}>{contact.name} {contact.number}</div>})
    return (
      <div>
        <h2>Numbers</h2>
        {contacts}
      </div>
    )
  }

export default Contacts