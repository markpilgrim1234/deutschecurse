const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve file statici dalla cartella /public
app.use(express.static(path.join(__dirname, 'public')));

// Connessione al database
const db = new sqlite3.Database('./grammar_rules.db');

// API endpoint
app.get('/api/grammar', (req, res) => {
  db.all('SELECT * FROM grammar_rules', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Avvio server
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
