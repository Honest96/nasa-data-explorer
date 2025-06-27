const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/router");

require("dotenv").config(); //loads .env file

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); //enable CORS
app.use("/api", router);

const port = process.env.PORT || 5001;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
