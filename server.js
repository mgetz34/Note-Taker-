const express = require('express');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const data = require('./db/db.json');
// const util = require('util');
const path = require('path');
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//sets index.html to http://localhost:3001 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//sets notes.html to http://localhost:3001/notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//http://localhost:3001/api/notes
//accesses ds.db.json
app.get("/api/notes", (req, res) => {
    res.json(data);
})

app.post("/api/notes", (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(newNote);

        const notesArr = [...data, newNote]
        // Convert the data to a string so we can save it
        const noteString = JSON.stringify(newNote);

        fs.appendFile("./db/db.json", noteString, function (err) {
            if (err) throw err;
            console.log("Saved!");
            notesArr.push(newNote);
        });
        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note');
    };
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);