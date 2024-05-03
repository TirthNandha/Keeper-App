import React,{useState} from "react"
import Header from "./Header"
import Footer from "./Footer"
import Note from "./Note"
import CreateArea from "./CreateArea"


 
function App() {
  const [notes, setNotes] = useState([])

  function addNote(note) {
    setNotes((prevNote) => {
      return [...prevNote, note ]
    })
  }

  function deleteNote(id) {
    setNotes((prevNote) => {
      return prevNote.filter((note, index) => {
        return index !== id
      })
    })
  }

    return (
      <div>
        <Header />
        <CreateArea onAdd={addNote}/>
        {console.log("before: ", notes)}
        {notes.map((entry, index) => {
          return (<Note 
            key={index} id= {index} title={entry.title} content={entry.content} onDelete= {deleteNote}
          />)
        })}
        {console.log("after: ",notes)}
        <Footer />
      </div>
    );
  }
  export default App;