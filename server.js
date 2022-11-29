const express = require('express');
const fs = require('fs');
// const uuid = require('./helpers/uuid')
const data = require('./db/db.json');
const path = require('path');
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//sets index.html http://localhost:3001 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//sets notes.html http://localhost:3001/notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.json(data);
})

app.post("/api/notes", (req, res) => {
    noteData = req.body
})

fs.appendFile(".db/db.json", JSON.stringify(noteData), function (err) {
    const err = "File cannot be read"
    if (err) throw err;
    console.log("Saved!");
})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);