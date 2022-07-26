import React from "react";

const Search = (props) => {
    return (
      <div>Search by: <input value={props.search}  onChange={props.searchChange}/></div>
    )
  }

export default Search