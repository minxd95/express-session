const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const compression = require("compression");
const topicRouter = require("./routes/topic");
const indexRouter = require("./routes/index");

const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("connect-flash");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.use(
  session({
    // secure: true,
    // HttpOnly: true,
    secret: "uyf@$IO@dio@$@$HJIHOhshs@#2hSH",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);

app.use(flash());

const passport = require("./lib/passport")(app);
const authRouter = require("./routes/auth")(passport);

app.get("*", (req, res, next) => {
  fs.readdir("./data", function (error, filelist) {
    req.list = filelist;
    next();
  });
});

app.use("/topic", topicRouter);
app.use("/auth", authRouter);
app.use("/", indexRouter);

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
