import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
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
  const [isExpanded, setIsExpanded] = useState(false)

  function handleExpand() {
    setIsExpanded(true)
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded ? <input name="title" placeholder="Title" onChange={handleChange} value={newNote.title} /> : null}
        <textarea name="content" placeholder="Take a note..." onClick={handleExpand} rows= {isExpanded ? "3": "1"} onChange={handleChange} value={newNote.content} />
        <Zoom in={isExpanded? true: false}>
          <Fab onClick={(event) => {
            props.onAdd(newNote)
            setNewNote({
              title: "",
              content: ""
            })
            event.preventDefault()
          }
          }>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
