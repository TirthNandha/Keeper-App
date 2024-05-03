import React,{useState} from "react";

function CreateArea(props) {
    const [newNote, setNewNote] = useState({
        title: "",
        content: ""
    })
    function handleChange(event) {
        const {name, value} = event.target
        setNewNote((prevNote) => {
            return {...prevNote, [name]: value}
        }   
        )
    }

  return (
    <div>
      <form>
        <input name="title" placeholder="Title" onChange={handleChange} value={newNote.title}/>
        <textarea name="content" placeholder="Take a note..." rows="3" onChange={handleChange} value={newNote.content}/>
        <button onClick={(event) => {
            props.onAdd(newNote)
            setNewNote({
        title: "",
        content: ""
    })
            event.preventDefault()
            }
        }>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
