import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import Axios from "axios";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

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
      const response = await Axios.post(`${props.api_url}/notes`, JSON.stringify(noteToSend), {
      headers: {
        "Content-Type": "application/json"
      }
    });
      console.log("Response:", response);
  
      // Reset the form fields after successful submission
      setNewNote({
        title: "",
        content: ""
      });
    } catch (error) {
      console.log("Error:", error);
    }
  }


  return (
    <div>
      <form className="create-note" onSubmit={(e) => e.preventDefault()}>
        {isExpanded ? <input name="title" placeholder="Title" onChange={handleChange} value={newNote.title} /> : null}
        <textarea name="content" placeholder="Take a note..." onClick={handleExpand} rows= {isExpanded ? "3": "1"} onChange={handleChange} value={newNote.content} />
        <Zoom in={isExpanded? true: false}>
          <Fab onClick={handleClick} style={{ position: 'absolute', bottom: '10px', right: '20px' }}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
      {props.notesLength > 0 && <div className="deleteAllButton">
        <Button variant="outlined" color="secondary" startIcon={<DeleteIcon />} onClick={() => {
            props.onDeleteAll()
        }}>
          Delete All
        </Button>
      </div>}
    </div>
  )
};

export default CreateArea;
