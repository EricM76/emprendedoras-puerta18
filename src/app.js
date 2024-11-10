const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require('express-session');
const app = express();
const port = 3000;

const indexRouter = require("./routes/index.routes.js");
const entrepreneurshipRouter = require("./routes/entrepreneurship.routes");
const userRouter = require("./routes/user.routes.js");
const connectDB = require("./config/connectDB.js");

//configuración de los recursos estáticos
app.use(express.static(path.join(__dirname, "..", "public")));

//configuración para recibir datos de los formularios
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//configuración de sesión
app.use(session({
  secret : 'Mi secreto',
  resave: false,
  saveUninitialized: true,
}))

//conexión con mongodb
connectDB();

//configuración del motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", indexRouter);
app.use("/admin", indexRouter);
app.use("/admin/users", indexRouter);

app.use("/entrepreneurships", entrepreneurshipRouter);
app.use("/users", userRouter);

app.listen(port, () =>
  console.log("Servidor corriendo en http://localhost:" + port)
);
