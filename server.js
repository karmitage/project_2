
require("dotenv").config();
console.log(process.env);
var express = require("express");
var exphbs = require("express-handlebars");
var db = require("./models");
var app = express();

//Socket.io set up

var http = require('http').Server(app);
var io = require('socket.io')(http);


var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

io.on('connection', function (socket) {
  console.log('a user connected on socket: ' + socket.id);

  //function to handle chat messages from clients
  socket.on('chat message', function (msg) {
    //first, emit the message
    io.emit('chat message', msg);
    //then save it to the db....
  });
  socket.on('disconnect', function () {
    console.log('user disconnected from socket ' + socket.id);

  });
});

// Starting the server, syncing our models ------------------------------------/
//db.sequelize.sync(syncOptions).then(function () {
http.listen(PORT, function () {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});
//});

module.exports = app;
