import TextField from "@material-ui/core/TextField"
import List from "./List";
import React, { useState } from 'react'

const Search = () => {
	const [inputText, setInputText] = useState("");
	let inputHandler = (e) => {
		//convert input text to lower case
		var lowerCase = e.target.value.toLowerCase();
		setInputText(lowerCase);
	};
  
	return (
		<div id='Search'>
			<h1>Search Orders</h1>
			<div className="search">
				<TextField
				id="outlined-basic"
				onChange={inputHandler}
				variant="outlined"
				fullWidth
				label="Search"
				/>
			</div>
			<List input={inputText} />
		</div>
	)
}

export default Search