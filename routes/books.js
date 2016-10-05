var express = require('express');
var router = express.Router();
var databaseConnection = require("../database_connection");

router.get('/:id', function (req, res, next) {
    databaseConnection("book").select()
        .innerJoin("book_author", "book.id", "book_id")
        .innerJoin("author", "author_id", "author.id")
        .where("book.id", req.params.id)
        .then(function (books) {
            var books = mapAuthorsToBooks(books);
            console.log(books[0]);
            res.render("books/get_book", {layout: "books_layout", books: books[0]});
        });
});

router.get('/', function (req, res, next) {
    databaseConnection("book")
        .select()
        .innerJoin("book_author", "book.id", "book_id")
        .innerJoin("author", "author_id", "author.id")
        .then(function (records) {
            var books = mapAuthorsToBooks(records);
            res.render("books/list_books", {layout: "books_layout", books: books});
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
            res.render("books/delete_book", {layout: "books_layout", book: books[0]});
        });
});

router.post("/:book_id/authors", function (req, res, next) {
    console.log("post /:book_id/authors");
    databaseConnection("book_author").insert({
        book_id: parseInt(req.body.author_id),
        author_id: parseInt(req.params.book_id)
    }).then(function () {
        res.redirect("/books");
    });
});

router.delete("/:book_id/authors/:author_id", function (req, res, next) {
    console.log("delete /:book_id/authors/:author_id");
    databaseConnection("book_author").del()
        .where({
            book_id: parseInt(req.params.book_id),
            author_id: parseInt(req.params.author_id)
        }).then(function () {
        res.redirect("/books");
    });
});

router.get("/edit/:id", function (req, res, next) {
    databaseConnection("book").select().where("id", req.params.id)
        .then(function (books) {
            res.render("books/edit_book", {layout: "books_layout", book: books[0]});
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
