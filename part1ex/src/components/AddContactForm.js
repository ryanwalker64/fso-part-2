import React from "react";

const AddContactForm = (props) => {
    return (
    <>
        <h2>Add a contact</h2>
        <form onSubmit={props.handleNewContact}>
            <div>name: <input value={props.name} onChange={(e) => {props.nameChange(e.target.value)}}/></div>
            <div>number: <input value={props.number} onChange={(e) => {props.numberChange(e.target.value)}} /></div>
            <div><button type="submit" >add</button> </div>
        </form>
    </>
     )
}

export default AddContactForm