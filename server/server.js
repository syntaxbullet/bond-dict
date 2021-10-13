const express = require('express');
const app = express();
const db = require('better-sqlite3')('patterns.db', { verbose: console.log });

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
  const stmt = db.prepare('INSERT INTO patterns (pattern, color) VALUES (?, ?, ?)');
  const result = stmt.run(pattern.pattern, pattern.color);
  res.send(result);
});

app.listen(3000, () => {
  console.log('API running on port 3000!');
});