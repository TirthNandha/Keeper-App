import React,{useState, useEffect} from "react"
import Header from "./Header"
import Footer from "./Footer"
import Note from "./Note"
import CreateArea from "./CreateArea"
import Axios from "axios";


function App() {
  const [notes, setNotes] = useState([])
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  function addNote(note) {
    setNotes((prevNote) => {
      return [...prevNote, note ]
    })
  }

  async function deleteNote(title, id) {
    // console.log(url);
    Axios.delete(API_URL + "/notes/" + title)
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
    Axios.delete(API_URL + "/notes/")
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
      try {
        const response = await Axios.get(API_URL + "/notes");
        setNotes(response.data);  
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

    return (
      <div>
        <Header />
        <CreateArea onAdd={addNote} onDeleteAll={handleDeleteAll} api_url={API_URL} notesLength={notes.length}/>
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


// Path: src/Components/CreateArea.jsx
  