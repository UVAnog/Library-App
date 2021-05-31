const axios = require("axios");
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./firebase.js");

app.use(express.json());
app.use(cors());
app.use(require("body-parser").json());

app.get("/books/", (req, res) => {
  const title = req.query.title;
  axios
    .get("https://www.googleapis.com/books/v1/volumes", {
      params: {
        q: title,
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        res.json({
          status: 400,
          message: "Request failed",
        });
      } else
        res.json({
          status: 200,
          message: "Successful search",
          data: response.data,
        });
    })
    .catch((err) => {
      res.json({
        status: 400,
        message: "Request failed",
      });
    });
});

app.get("/books/get/", (req, res) => {
  db.collection("books")
    .get()
    .then((querySnapshot) => {
      let all = [];
      querySnapshot.forEach((doc) => {
        all.push({ doc: doc.id, ...doc.data() });
      });
      res.json(all);
    });
});

// app.get("books/get/", async (req, res) => {
//   const snapshot = await db.collection("books").get();

//   const books = [];

//   snapshot.forEach((doc) => {
//     books.push({ ...doc.data(), id: doc.id });
//   });
//   res.send(books);
// });

// add library
app.post("/books/add/", (req, res) => {
  db.collection("books").add({
    ...req.body.data,
  });
  res.sendStatus(200);
});

app.delete("/books/delete/", (req, res) => {
  db.collection("books")
    .doc(req.query.doc)
    .delete()
    .then((resp) => {
      res.sendStatus(200);
    });
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
