const express = require("express");
const bodyParser = require("body-parser");

const client = require("./connection");
const app = express();

app.use(bodyParser.json());

app.listen(3100, () => {
  console.log("server is running");
});

client.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("connected");
  }
});

app.get("/books", (req, res) => {
  client.query(`Select * from books`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
});

app.post("/books", (req, res) => {
  const { title, description, author } = req.body;
  client.query(
    `insert into books(title, description, author) values('${title}', '${description}', '${author}')`,
    (err, result) => {
      if (!err) {
        res.send("Insert Success");
      } else {
        res.send(err.message);
      }
    }
  );
});

app.put("/books/:id", (req, res) => {
  const { title, description, author } = req.body;
  client.query(
    `update books set title = '${title}', description = '${description}', author = '${author}' where id ='${req.params.id}'`,
    (err, result) => {
      if (!err) {
        res.send("Update success");
      } else {
        res.send(err.message);
      }
    }
  );
});

app.delete("/books/:id", (req, res) => {
  client.query(
    `delete from books where id = ${req.params.id}`,
    (err, result) => {
      if (!err) {
        res.send("Delete Success");
      } else {
        res.send(err.message);
      }
    }
  );
});
