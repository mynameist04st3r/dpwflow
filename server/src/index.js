require("dotenv").config();

const port = process.env.API_PORT;
const express = require("express");
const app = express();
const knex = require("knex")(require("../knexfile.js")["development"]);
const cors = require("cors");
const { hash, compare } = require("@uswriting/bcrypt");
const uuid = require("uuid");
const session = require("express-session");
const secretKey = uuid.v4();

if (!process.env.NODE_ENV) {
  console.error("Missing NODE_ENV");
  process.exit(1);
}

const requestsRoutes = require("./routes/requests");
const getRequestsRoutes = require("./routes/GetRequests");
const locationsRoutes = require("./routes/locations");
const usersRoutes = require("./routes/users");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 6000,
    },
  })
);

app.get("/", (req, res) => {
  res.send("Server operational");
});

app.use("/requests", requestsRoutes);
app.use("/locations", locationsRoutes);
app.use("/GetRequests", getRequestsRoutes);

app.listen(port, (req, res) => {
  console.log(`Your server is up at http://localhost:${port}/`);
});
