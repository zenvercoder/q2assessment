exports.up = function (knex, Promise) {
    return knex.schema.createTable('author',
        function (authorTable) {
            authorTable.increments('id');
            authorTable.text('first_name');
            authorTable.text('last_name');
            authorTable.text('biography');
            authorTable.text('portrait_url');
        }).then(function () {
        return knex.schema.createTable('book_author',
            function (authorBookTable) {
                authorBookTable.increments('id');
                authorBookTable.integer('book_id').references('id').inTable("book").onDelete("CASCADE");
                authorBookTable.integer('author_id').references('id').inTable("author").onDelete("CASCADE");
            });
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('book_author')
        .then(function(){
            return knex.schema.dropTable("author");
        });
};
