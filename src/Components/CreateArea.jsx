import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [newNote, setNewNote] = useState({
    title: "",
    content: ""
  })
  function handleChange(event) {
    const { name, value } = event.target
    setNewNote((prevNote) => {
      return { ...prevNote, [name]: value }
    }
    )
  }

  function handleExpand() {
    setIsExpanded(true)
  }

  async function handleClick(event) {
    event.preventDefault();
    try {
      const noteToSend = { title: newNote.title, content: newNote.content };
      props.onAdd(noteToSend);
  
      console.log("Sending request with newNote:", noteToSend);
      const response = await fetch(`http://localhost:3000/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(noteToSend),
      });
      const data = await response.json();
      console.log("Response:", data);
  
      // Reset the form fields after successful submission
      setNewNote({
        title: "",
        content: ""
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  
  
  


  return (
    <div>
      <form className="create-note">
        {isExpanded ? <input name="title" placeholder="Title" onChange={handleChange} value={newNote.title} /> : null}
        <textarea name="content" placeholder="Take a note..." onClick={handleExpand} rows= {isExpanded ? "3": "1"} onChange={handleChange} value={newNote.content} />
        <Zoom in={isExpanded? true: false}>
          <Fab onClick={handleClick}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
