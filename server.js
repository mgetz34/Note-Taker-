const express = require('express');
const fs = require('fs');
// const uuid = require('./helpers/uuid')

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//sets index.html as home page 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('', (req, res) => {

})

app.post('', (req, res) => {

})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);