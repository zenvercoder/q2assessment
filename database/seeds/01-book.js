exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('book').del()
        .then(function () {
            return Promise.all([
                // Inserts seed entries
                knex('book').insert({
                    title: 'Python In A Nutshell',
                    genre: 'Python',
                    description: 'This book offers Python programmers one place to look when they need help remembering or deciphering the syntax of this open source language and its many powerful but scantily documented modules. This comprehensive reference guide makes it easy to look up the most frequently needed information--not just about the Python language itself, but also the most frequently used parts of the standard library and the most important third-party extensions',
                    cover_url: 'https://www.safaribooksonline.com/library/cover/0596100469/360h/'
                }),
                knex('book').insert({
                    title: 'Think Python',
                    genre: 'Python',
                    description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python',
                    cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
                }),
                knex('book').insert({
                    title: 'Learning React Native',
                    genre: 'JavaScript',
                    description: 'Get a practical introduction to React Native, the JavaScript framework for writing and deploying fully featured mobile apps that look and feel native. With this hands-on guide, you’ll learn how to build applications that target iOS, Android, and other mobile platforms instead of browsers. You’ll also discover how to access platform features such as the camera, user location, and local storage',
                    cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/learning_react_native.jpg'
                }),
                knex('book').insert({
                    title: 'You Do not Know JS: ES6 & Beyond',
                    genre: 'JavaScript',
                    description: 'No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the ""You Don’t Know JS"" series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the standard upon which JavaScript is built.',
                    cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/es6_and_beyond.jpg'
                }),
                knex('book').insert({
                    title: 'You Do not Know JS: Scope & Closures',
                    genre: 'JavaScript',
                    description: 'No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. This concise yet in-depth guide takes you inside scope and closures, two core concepts you need to know to become a more efficient and effective JavaScript programmer. You’ll learn how and why they work, and how an understanding of closures can be a powerful part of your development skillset',
                    cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/scope_and_closures.jpg'
                }),
                knex('book').insert({
                    title: 'You Do not Know JS: Async & Performance',
                    genre: 'JavaScript',
                    description: 'No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the ""You Don’t Know JS"" series, this concise yet in-depth guide focuses on new asynchronous features and performance techniques—including Promises, generators, and Web Workers—that let you create sophisticated single-page web applications and escape callback hell in the process',
                    cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/async_and_performance.jpg'
                })
            ]);
        });
        // .then(function(authorIds){
        //     var authorIds = authorIds.map(function(currentId){
        //         return currentId[0]; //each authorId is stored as a single-element array
        //     });
        //     var bookAuthors = [{
        //         bookTitle: "Python In A Nutshell",
        //         authorId: authorIds[0]
        //     },{
        //         bookTitle: "Python In A Nutshell",
        //         authorId: authorIds[1]
        //     },{
        //         bookTitle: "Python In A Nutshell",
        //         authorId: authorIds[2]
        //     },{
        //         bookTitle: "Think Python",
        //         authorId: authorIds[3]
        //     },{
        //         bookTitle: "Learning React Native",
        //         authorId: authorIds[4]
        //     },{
        //         bookTitle: "You Do not Know JS: ES6 & Beyond",
        //         authorId: authorIds[5]
        //     },{bookTitle: "You Do not Know JS: Scope & Closures",
        //         authorId: authorIds[5]
        //     }, {
        //         bookTitle: "You Do not Know JS: Async & Performance",
        //         authorId: authorIds[5]
        //     }];
        //
        //     return Promise.all(bookAuthors.map(function(currentBookAuthor){
        //         return getBookIdByTitle(currentBookAuthor.bookTitle, knex, Promise)
        //             .then(function (book) {
        //                 return insertBookAuthor(book.id, currentBookAuthor.authorId, knex, Promise);
        //             });
        //     }));
};
//
//
//
// function getBookIdByTitle(authorTitle, knex, Promise){
//     return new Promise(function(resolve, reject){
//         console.log("trying to get authorTitle " + authorTitle);
//         knex("author").select("id").where("title", authorTitle).first()
//             .then(function(author){
//                 console.log("author=" + author.id);
//                 resolve(author);
//             });
//     });
// }
//
// function insertBookAuthor(authorId, authorId, knex, Promise){
//     return new Promise(function(resolve, reject){
//         knex("author_author").insert({
//             author_id: parseInt(authorId),
//             author_id: parseInt(authorId)
//         }).then(function(){
//             resolve();
//         });
//     });
// }
//
// function mapBooksToAuthors(records) {
//     var mappedAuthors = records.reduce(function(mappedAuthors, currentRecord){
//         currentRecord = reassignAuthorIdToId(currentRecord);
//         var authorId = currentRecord.id
//
//         var book = extractBookFromRecord(currentRecord);
//         currentRecord = deleteBookFromRecord(currentRecord);
//
//         if(!mappedAuthors.hasOwnProperty(authorId)){
//             currentRecord.books = [book];
//         } else {
//             mappedAuthors[authorId].books.push(book);
//         }
//
//         return mappedAuthors;
//
//     }, {});
//
//     var authors = [];
//     for(var authorId in mappedAuthors){
//         authors.push(mappedAuthors[authorId]);
//     }
//     return authors;
// }
//
// function reassignAuthorIdToId(record){
//     record.id = record.author_id;
//     delete record.author_id;
//     return record;
// }
//
// function extractBookFromRecord(record){
//     return {
//         id: record.author_id,
//         title: record.title,
//         description: record.description,
//         cover_url: record.cover_image_url,
//         genre: record.genre
//     };
// }
//
// function deleteBookFromRecord(record) {
//     var properties = [
//         "book_id", "title", "genre", "description", "cover_url"
//     ];
//
//     for (var i = 0, length = properties.length; i < length; i++) {
//         delete record[properties[i]];
//     }
//
//     return record;
// }
//
