const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Notes } = require("@mui/icons-material");
// require('dotenv').config();
var cors = require('cors')

const app = express();

const corsOptions = {
  origin: "http://localhost:3001",
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  credentials: true
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/notesDB")

const noteSchema = new mongoose.Schema({
    title: String,
  content: String
})

const Note = mongoose.model("Note", noteSchema)

app.get("/", function(req, res) {
  res.send("Hello World!")
})

app.route("/notes")

/////////////////Requests targeting all NOtes////////////////

.get(async function(req, res) {
        const notes = await Note.find({});
        res.send(notes);
})

.post(function(req,res) {

    const newNote = new Note({
        title : req.body.title,
        content : req.body.content
    })
    newNote.save()
    res.send("document saved successfully")
})

.delete(async function(req, res) {
    await Note.deleteMany({})
    res.send("Successfully deleted all items")
});

/////////////////Requests targeting a specific Note////////////////

app.route("/notes/:noteTitle")

.get(async function(req, res) {
    const foundNote = await Note.findOne({title: req.params.noteTitle})
    if(foundNote) {
        res.send(foundNote)
    } else {
        res.send("No notes matching that title was found.")
    }
})

.put(async function(req, res) {
    await Note.updateOne(
        { title: req.params.noteTitle },
        { title: req.body.title, content: req.body.content },
        {overwrite: true}
    );
    res.send("Successfully updated note")

})

.patch(async function(req, res) {
    await Note.updateOne(
        { title: req.params.noteTitle },
        { $set: req.body }
    );
    res.send("Successfully updated note")
})

.delete(async function(req, res) {
    await Note.deleteOne({title: req.params.noteTitle})
    res.send("Successfully deleted note")
})


app.listen(3000, function () {
    console.log("Server started on port 3000");
  });