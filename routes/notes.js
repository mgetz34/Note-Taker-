const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

notes.get('/', (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
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

notes.delete('/', (req, res) => {
    
})

module.exports = notes;