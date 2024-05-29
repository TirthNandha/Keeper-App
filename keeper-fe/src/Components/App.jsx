import React,{useState, useEffect} from "react"
import Header from "./Header"
import Footer from "./Footer"
import Note from "./Note"
import CreateArea from "./CreateArea"
import Axios from "axios";


function App() {
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  function addNote(note) {
    setNotes((prevNote) => {
      return [...prevNote, note ]
    })
  }

  async function deleteNote(title, id) {
    // console.log(url);
    Axios.delete("https://keeper-app-api-my9t.onrender.com/notes/" + title)
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
    Axios.delete("https://keeper-app-api-my9t.onrender.com/notes/")
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
      const response = await Axios.get("https://keeper-app-api-my9t.onrender.com/notes");
      setNotes(response.data);  
      setIsLoading(false);
    };
    fetchData();
  }, []);

    return (
      <div>
        <Header />
        <CreateArea onAdd={addNote} onDeleteAll={handleDeleteAll} notesLength={notes.length}/>
        {isLoading?(
          <div className="spinner">
            <h1>Server is loading...</h1>
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </div>
        ):(
          <ul>
            {notes.map((entry, index) => {
            return (<Note 
              key={index} id= {index} title={entry.title} content={entry.content} onDelete= {deleteNote}
            />)
          })}
          </ul>
        )}
        
        <Footer />
      </div>
    );
  }
  export default App;

// Path: keeper-fe/src/Components/CreateArea.jsx
// made this change
