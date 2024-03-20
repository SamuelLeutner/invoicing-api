require('dotenv').config();
const express = require('express');
const apiRouter = require('./Core/Http/Routes.js');
const { json } = require("express");
const app = express();

app.use(json());
app.use('/api', apiRouter);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.statusCode = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});
if (require.main === module) {
  app.listen({
    port: process.env.SERVER_PORT, host: process.env.SERVER_HOST
  }, (err) => {
    if (err) throw err;
    console.log(`Server running: ${process.env.SERVER_PORT} ✅`);
  });
}
module.exports = app;
