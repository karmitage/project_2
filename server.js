
require("dotenv").config();
console.log(process.env);
var express = require("express");
var exphbs = require("express-handlebars");
var db = require("./models");
var app = express();

//Socket.io set up
const http = require('http').createServer(app);
var io = require("socket.io")(http);
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

io.on("connection", function (socket) {
  console.log('new connection: ' + socket.id)

  // Message Recieved
  socket.on('msg', (message) => {
    // Broadcast to everyone else (except the sender)
    socket.broadcast.emit('msg', {
      from: socket.id,
      message: message
    })
    // Send back the same message to the sender
    socket.emit('msg', {
      from: socket.id,
      message: message
    })

  })

  // Disconnected
  socket.on('disconnect', function () {
    console.log('disconnect: ' + socket.id)
    // io.emit('disconnect', socket.id)
  })

});

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
