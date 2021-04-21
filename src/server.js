const app = require("./app");
const { PORT, DATABASE_URL, SSL } = require("./config");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
  ssl: SSL,
});

app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
