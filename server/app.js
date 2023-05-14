require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./services/db");
const path = require("path");

// routers
const authRouter = require("./routes/auth");
const categoriesRouter = require("./routes/categories");
const regionsRouter = require("./routes/regions");
const uploadRouter = require("./routes/uploads");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "annonces-backend working" });
});

// routes // endpoints
app.use("/server/auth", authRouter);
app.use("/server/categories", categoriesRouter);
app.use("/server/regions", regionsRouter);
app.use("/server/upload", uploadRouter);

const PORT = process.env.PORT || 3001;
db.connect(function (err) {
  if (err) {
    console.log("error with connection");
    return;
  }

  app.listen(PORT, () => {
    console.log("DB connected");
    console.log(`server is listening or port ${PORT}`);
    console.log(app.get("env"));
  });
});
