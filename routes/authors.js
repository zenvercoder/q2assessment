var express = require('express');
var router = express.Router();
var databaseConnection = require("../database_connection");

router.get('/:id', function (req, res, next) {
    databaseConnection("author").select("*", "author.id AS author_id")
        .leftOuterJoin("book_author", "author.id", "author_id")
        .leftOuterJoin("book", "book_id", "book.id")
        .where("author.id", req.params.id)
        .then(function (authors) {
            var authors = mapBooksToAuthors(authors);
            console.log(authors[0]);
            res.render("authors/get_author", {layout: "authors_layout", authors: authors[0]});
        });
});

router.get('/', function (req, res, next) {
    databaseConnection("author")
        .select("*", "author.id AS author_id")
        .leftOuterJoin("book_author", "author.id", "author_id")
        .leftOuterJoin("book", "book_id", "book.id")
        .then(function (records) {
            console.log(records);
            var authors = mapBooksToAuthors(records);
            res.render("authors/list_authors", {layout: "authors_layout", authors: authors});
        });
});

router.get('/new', function (req, res, next) {
    res.render("authors/add_author");
});

router.post('/', function (req, res, next) {
    req.checkBody("first_name", "Title is empty or too long").notEmpty().isLength({max: 255});
    req.checkBody("last_name", "Genre is empty or too long").notEmpty().isLength({max: 255});
    req.checkBody("biography", "Description is empty or too long").notEmpty().isLength({max: 2000});
    req.checkBody("portrait_url", "not a URL").isURL(req.body.portrait_url);

    var errors = req.validationErrors();

    if (errors) {
        res.render("error", {errors: errors});
    } else {
        databaseConnection("author").insert({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            biography: req.body.biography,
            portrait_url: req.body.portrait_url
        }).then(function (authors) {
            res.redirect("/authors");
        });
    }
});

router.get('/delete/:id', function (req, res, next) {
    databaseConnection("author")
        .select("*", "author.id AS author_id")
        .leftOuterJoin("book_author", "author.id", "author_id")
        .leftOuterJoin("book", "book_id", "book.id")
        .where("id", req.params.id)
        .then(function (authors) {
            res.render("authors/delete_author", {layout: "authors_layout", author: authors[0]});
        });
});

router.delete("/:id", function (req, res, next) {
    console.log("got to delete");
    databaseConnection("author").del().where("id", req.params.id)
        .then(function () {
            res.redirect("/authors");
        });
});

router.get("/edit/:id", function (req, res, next) {
    Promise.all([
        databaseConnection("author")
            .select("*", "author.id AS author_id")
            .leftOuterJoin("book_author", "author.id", "author_id")
            .leftOuterJoin("book", "book_id", "book.id")
            .where("author.id", req.params.id),
        databaseConnection("book").select()
    ]).then(function (results) {
        var authors = mapBooksToAuthors(results[0]);
        res.render("authors/edit_author", {layout: "authors_layout", author: authors[0], books: resuls[1]});
    });
});

router.put('/:id', function (req, res, next) {
    req.checkBody("first_name", "First is empty or too long").notEmpty().isLength({max: 255});
    req.checkBody("last_name", "Last Name is empty or too long").notEmpty().isLength({max: 255});
    req.checkBody("biography", "Biography is empty or too long").notEmpty().isLength({max: 2000});
    req.checkBody("portrait_url", "not a URL").isURL(req.body.portrait_url);

    var errors = req.validationErrors();

    if (errors) {
        res.render("error", {errors: errors});
    } else {
        databaseConnection("author").update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            biography: req.body.biography,
            portrait_url: req.body.portrait_url
        }).where("id", req.params.id)
            .then(function () {
                res.redirect("/authors");
            });
    }
});

router.post("/:author_id/books", function (req, res, next) {
    databaseConnection("book_author").insert({
        book_id: parseInt(req.body.book_id),
        author_id: parseInt(req.params.authos_id)
    }).then(function () {
        res.redirect("/authors");
    });

});


module.exports = router;
