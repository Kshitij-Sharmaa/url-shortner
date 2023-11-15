const express = require("express");
const app = express();
const { connection } = require("./connect");
const urlRoutes = require("./routes/url");

const PORT = 8000;
connection("mongodb://127.0.0.1:27017/url-shortner");
app.use(express.json());

app.use("/url", urlRoutes);

app.listen(PORT, () => console.log(`Server Start at ${PORT}`));
