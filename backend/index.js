const express = require("express");
require("dotenv").config();

//firebase
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require("./products-392e2-firebase-adminsdk-48fie-21f9eec1e6.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const app = express();
app.use(express.json());

const port = process.env.PORT;

// app.use("/api/products", require("./routes/product.routes.js"));

app.get("/", (req, res) => {
  db.collection("products")
    .get()
    .then((data) => {
      console.log(data.json());
      res.send("ok");
      return res.data;
    });
});
app.post("/", (req, res) => {
  const body = req.body;
  db.collection(`products`)
    .doc()
    .set(body)
    .then(() => {
      res.send("ok");
    })
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log("server running");
});
