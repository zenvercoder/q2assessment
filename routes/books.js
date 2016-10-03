var express = require('express');
var router = express.Router();
var databaseConnection = require("../database_connection");

/* GET users listing. */
router.get('/', function(req, res, next) {
  databaseConnection("book").select().then(function(books){
    res.render("list_books", {books});
  });
});

module.exports = router;
