const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const data = require('../db/db.json');

notes.get('/', (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, "./db/db.json");

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.error('Error in adding note');
    }
});

// notes.delete('/:id', (req, res) => {
//     const note = readFromFile("./db/db.json");
//     const newNotes = note.filter((remove) => remove.id !== req.params.id);
//     readAndAppend(newNotes, "./db/db.json");
// })

module.exports = notes;