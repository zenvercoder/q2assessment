var express = require('express');
var router = express.Router();
var databaseConnection = require("../database_connection");

router.get('/:id', function (req, res, next) {
    databaseConnection("book").select().where("id", req.params.id)
        .then(function (books) {
        res.render("books/list_books", {"books": books});
    });
});

router.get('/', function (req, res, next) {
    databaseConnection("book").select().then(function (books) {
        res.render("books/list_books", {"books": books});
    });
});

router.get('/new', function (req, res, next) {
    res.render("books/add_book");
});

router.post('/', function (req, res, next) {
    req.checkBody("title", "Title is empty or too long").notEmpty().isLength({max: 255});
    req.checkBody("genre", "Genre is empty or too long").notEmpty().isLength({max: 255});
    req.checkBody("description", "Description is empty or too long").notEmpty().isLength({max: 2000});
    req.checkBody("cover_image_url", "not a URL").isURL(req.body.cover_image_url);

    var errors = req.validationErrors();

    if (errors) {
        res.render("error", {errors: errors});
    } else {
        databaseConnection("book").insert({
            title: req.body.title,
            genre: req.body.genre,
            description: req.body.description,
            cover_url: req.body.cover_image_url
        }).then(function (books) {
            res.redirect("/books");
        });
    }
});

router.get('/delete/:id', function (req, res, next) {
    databaseConnection("book").select().where("id", req.params.id)
        .then(function (books) {
        res.render("books/delete_book", {book: books[0]});
    });
});

router.delete("/:id", function(req, res, next) {
    console.log("got to delete");
    databaseConnection("book").del().where("id", req.params.id)
        .then(function () {
        res.redirect("/books");
    });
});

router.get("/edit/:id", function (req, res, next){
    databaseConnection("book").select().where("id", req.params.id)
        .then(function (books) {
            res.render("books/edit_book", {book: books[0]});
        });
});

router.put('/:id', function (req, res, next) {
    req.checkBody("title", "Title is empty or too long").notEmpty().isLength({max: 255});
    req.checkBody("genre", "Genre is empty or too long").notEmpty().isLength({max: 255});
    req.checkBody("description", "Description is empty or too long").notEmpty().isLength({max: 2000});
    req.checkBody("cover_image_url", "not a URL").isURL(req.body.cover_image_url);

    var errors = req.validationErrors();

    if (errors) {
        res.render("error", {errors: errors});
    } else {
        databaseConnection("book").update({
            title: req.body.title,
            genre: req.body.genre,
            description: req.body.description,
            cover_url: req.body.cover_image_url
        }).where("id", req.params.id)
            .then(function (books) {
            res.redirect("/books");
        });
    }
});


module.exports = router;
