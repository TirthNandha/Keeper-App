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
        <CreateArea onAdd={addNote}/>
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

  