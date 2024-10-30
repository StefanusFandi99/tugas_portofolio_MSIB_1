const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const path = require('path');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'contact_form_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL Database.');
});


app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    const sql = 'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error('Error saving message:', err);
            res.status(500).json({ message: 'Failed to save message' });
        } else {
            res.status(200).json({ message: 'Message received successfully' });
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(express.static(path.join(__dirname, 'asset')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'asset', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
