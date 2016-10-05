var express = require('express');
var router = express.Router();
var databaseConnection = require("../database_connection");


function mapAuthorsToBooks(records) {
    var mappedBooks = records.reduce(function(mappedBooks, currentRecord){
        currentRecord = reassignBookIdToId(currentRecord);
        var bookId = currentRecord.id;

        var author = extractAuthorFromRecord(currentRecord);
        currentRecord = deleteAuthorFromRecord(currentRecord);

        if(!mappedBooks.hasOwnProperty(bookId)){
            currentRecord.authors = [author];
            mappedBooks[bookId] = currentRecord;
        } else {
            mappedBooks[bookId].authors.push(author);
        }

        return mappedBooks;

    }, {});

    var books = [];
    for(var bookId in mappedBooks){
        books.push(mappedBooks[bookId]);
    }
    return books;
}

function reassignBookIdToId(record){
    record.id = record.book_id;
    delete record.book_id;
    return record;
}


function extractAuthorFromRecord(record){
    return {
        id: record.author_id,
        first_name: record.first_name,
        last_name: record.last_name,
        biography: record.biography,
        portrait_url: record.portrait_url
    };
}

function deleteAuthorFromRecord(record){
    var properties = [
        "author_id", "first_name", "last_name", "biography", "portrait_url"
    ];

    for(var i = 0, length = properties.length; i < length; i++){
        delete record[properties[i]];
    }

    return record;
}

router.get('/', function (req, res, next) {
    databaseConnection("book")
        .select()
        .innerJoin("book_author", "book.id", "book_id")
        .innerJoin("author", "author_id", "author.id")
        .then(function (records) {
            var books = mapAuthorsToBooks(records);
            console.log(books);
            res.render("books/list_books", {books: books});
        });
});

router.get('/new', function (req, res, next) {
    res.render("books/add_book");
});

router.post('/', function (req, res, next) {
    // req.checkBody("title", "Title is empty or too long").notEmpty().isLength({max: 255});
    // req.checkBody("genre", "Genre is empty or too long").notEmpty().isLength({max: 255});
    // req.checkBody("description", "Description is empty or too long").notEmpty().isLength({max: 2000});
    // req.checkBody("cover_image_url", "not a URL").isURL(req.body.cover_image_url);
    //
    // var errors = req.validationErrors();
    //
    // if (errors) {
    //     res.render("error", {errors: errors});
    // } else {
    databaseConnection("book").insert({
        title: req.body.title,
        genre: req.body.genre,
        description: req.body.description,
        cover_url: req.body.cover_image_url
    }).then(function (books) {
        res.redirect("/books");
    });
    // }
});

router.get('/:id', function (req, res, next) {
    databaseConnection("book").select().where("id", req.params.id)
        .then(function (books) {
            res.render("books/get_book", {books: books[0]});
        });
});

router.get('/delete/:id', function (req, res, next) {
    databaseConnection("book").select().where("id", req.params.id)
        .then(function (books) {
            res.render("books/delete_book", {book: books[0]});
        });
});

router.delete("/:id", function (req, res, next) {
    console.log("got to delete");
    databaseConnection("book").del().where("id", req.params.id)
        .then(function () {
            res.redirect("/books");
        });
});

router.get("/edit/:id", function (req, res, next) {
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
