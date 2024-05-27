import React,{useState, useEffect} from "react"
import Header from "./Header"
import Footer from "./Footer"
import Note from "./Note"
import CreateArea from "./CreateArea"
import Axios from "axios";


function App() {
  const [notes, setNotes] = useState([])

  function addNote(note) {
    setNotes((prevNote) => {
      return [...prevNote, note ]
    })
  }

  async function deleteNote(title, id) {
    // console.log(url);
    Axios.delete("http://localhost:5000/notes/" + title)
    .then(response => {
      console.log(`Deleted post with title ${title}`);
    })
    .catch(error => {
      console.error(error);
    });
    setNotes((prevNote) => {
      return prevNote.filter((note, index) => {
        return index !== id
      })
    })
  }

  function handleDeleteAll() {
    Axios.delete("http://localhost:5000/notes/")
    .then(response => {
      console.log("All notes deleted");
    })
    .catch(error => {
      console.error(error);
    });
    setNotes([])
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.get("http://localhost:5000/notes");
      setNotes(response.data);  
    };
    fetchData();
  }, []);

    return (
      <div>
        <Header />
        <CreateArea onAdd={addNote} onDeleteAll={handleDeleteAll} notesLength={notes.length}/>
        {notes.map((entry, index) => {
          return (<Note 
            key={index} id= {index} title={entry.title} content={entry.content} onDelete= {deleteNote}
          />)
        })}
        <Footer />
      </div>
    );
  }
  export default App;

// Path: keeper-fe/src/Components/CreateArea.jsx
// made this change