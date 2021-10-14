const express = require('express');
const app = express();
const db = require('better-sqlite3')('patterns.db', { verbose: console.log });
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/patterns', (req, res) => {
  res.send(db.prepare('SELECT * FROM patterns').all());
});
app.get('/patterns/:id', (req, res) => {
  res.send(db.prepare('SELECT * FROM patterns WHERE id = ?').get(req.params.id));
});
app.post('/patterns', (req, res) => {
  const pattern = req.body;
  const stmt = db.prepare('INSERT INTO patterns (pattern, color) VALUES (?, ?, ?, ?)');
  const result = stmt.run(pattern.pattern, pattern.color, pattern.meaning);
  res.send(result);
});

app.listen(5000, () => {
  console.log('API running on port 5000!');
});