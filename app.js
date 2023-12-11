const express = require("express");
const app = express();
const shopRoutes = require("./routes/shopping");
const ExpressError = require("./expressError");
// const path = require("path");

app.use(cors());
app.use(express.json());

app.use("/shop", shopRoutes);
// app.use(express.static("public"));

// app.use(express.static(path.join(__dirname, "public")));




// Keep the mount path as '/shop'

// app.use('/', (req,res)=>{
//   res.sendFile(__dirname + "/public/index.html");
// })

/** 404 handler */

app.use(function (req, res, next) {
  return new ExpressError("Not Found", 404);
});


// // Define a 404 handler
// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

module.exports = app;