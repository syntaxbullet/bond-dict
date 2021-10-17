import Express from "Express";
import cors from "cors";
import sqlite3 from "better-sqlite3";

const app: Express.Application = Express();
const db: sqlite3.Database = sqlite3("./patterns.db", { verbose: console.log });
const port: string | number = process.env.PORT || 5000;

app.use(cors());

interface Pattern {
  id: number;
  pattern: number[];
  meaning: string;
}
// GET /patterns - returns all patterns
app.get("/patterns", (req: Express.Request, res: Express.Response) => {
  const patterns: Pattern[] = db.prepare("SELECT * FROM patterns").all();
  res.send(patterns);
});
// GET /patterns/:id - returns a single pattern by id
app.get("/patterns/:id", (req: Express.Request, res: Express.Response) => {
  const pattern: Pattern = db
    .prepare("SELECT * FROM patterns WHERE id = ?")
    .get(req.params.id);
  res.send(pattern);
});
// POST /patterns - creates a new pattern
app.post("/patterns", (req: Express.Request, res: Express.Response) => {
  const pattern: Pattern = req.body;
  db.prepare("INSERT INTO patterns (pattern, meaning) VALUES (?, ?)").run(
    pattern.pattern,
    pattern.meaning
  );
  res.send(pattern);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
