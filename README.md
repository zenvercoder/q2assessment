# Galvanize Reads

Galvanize Reads is a book catalog service that stores a list of recommended technology books. It allows you to:

* List books and authors

* Add books and authors

* Modify books and authors

* Remove books and authors

## Development

* Clone this repo and run `npm start`

* Set up a local PostGreSQL database

*Configure a `.env` file - use the `.env.example` file as a guideline

* `npm install` dependencies

* run `knex migrate:latest` to setup database

* Run `knex seed:run` to add sample data

* Run `npm start` to see it running correctly

## Production

* Set `DATABASE_URL` to your remote connection string

* Run `knex migrate:latest --env production` to setup database

* Run `knex seed:run --env production` to add sample data

## Heroku

* Went to heroku, created an app from there. 

* `heroku login` (enter email + password)

* `git init` (or if git already initted skip to:)

* `heroku git:remote -a appName`
 
* git add + commit

* `git push heroku master`

* for existing git repository, simply `heroku git:remote -a appName`


* To provision a hobby-basic plan database: `heroku addons:create heroku-postgresql:hobby-basic`

* Remember that to use a connection string with Heroku and Knex, you need to add `?ssl=true` to the end of the provided string:

* for DATABASE_URL=postgres://Database:User@Host (You can find it in database > connection settings > URL > Show

* for the above step, you can also do `heroku config -s | grep HEROKU_POSTGRESQL` (result = heroku-postgresql (postgresql-animated-29238)  hobby-dev  free)

* [Provisioning the add on](https://devcenter.heroku.com/articles/heroku-postgresql#provisioning-the-add-on)

* could not get this part working: "test to see if this branch works when deployed before we merge by running `git push heroku read-books:master`" (it was b/c I wasn't on a branch)

* `git push heroku master`

* [deploying on heroku](https://devcenter.heroku.com/articles/git#deploying-code)

* If we have no new things to set up on Heroku, all we have to do to deploy is add, commit, merge, and push. heroku wasn't working `heroku logs` couldn't find express-validator. added and committed it. will it work?? IT WORKED!!! omg, feelin like a debuggi-ninja

* got delete route working on localhost. now it's broken on heroku. deleting "heroku postgress page from .env. Will this work... 

## SCSS

* So every time I try to add SCSS, newFile.css.map shows up and also when I run, the styles totally break. 

* Commented out the @imports within the file, looked in .css file to find error message. none. in developer console: cannot get style.css. Had forgotten to re-seed data

## Validation

* `npm install --save express-validator`

* so I guess there IS a space after the w in the regex

##Notes to self

* Check the DOM to see if the element is even there

* “Namespace the file”
 
* Mixins: A mixin lets you make groups of CSS declarations that you want to reuse throughout your site

* for error "cannot find module lodash/first" do `npm install lodash --save`

* DELETE action on a form, we need to use a node library called `method-override`. Install it with `npm install --save method-override`

* in book_author table seeding, book.id was not defined b/c select wasn't working b/c .select("id").where("title", bookTitle) wasn't finding the books from the table because the book seed data was different (I had removed quotes and apostrophes b/c I didn't want to deal w regex. interestinnnnngggg)

* mapAuthorsToBooks wasn't working because mappedBooks was empty. Because if the record was not seen, it would take the author from the current record but not do anything with it. mappedBooks[bookId] = currentRecord fixed it

* I really like this part: (it takes an unordered list, forces them to sit inline and puts a comma and a space after every li except the last

`li {
      display: inline;
      &:not(:last-child):after{
        content: ", "
  }`
  
* Get a single book list authors didn't work at first b/c I didn't do an inner join and currrentRecord.id was undefined

* At this time, can't delete a book that wasn't added via seed file b/c no author id. So, will need to fix mapAuthorsToBooks function for add/edit book. Perhaps after working more with the authors side
 
##Read it in english
* `express --hbs --css sass --git` to initialize a new express project with handlebars, SASS, and a basic .gitignore

* `npm install` to install all the dependencies

* `nodemon bin/www` to start a server that will auto-refresh on changes

* `heroku addons | grep -i POSTGRES` to see if your application already has a database provisioned and what plan it is.


# credits 
[walkthrough](https://docs.google.com/document/d/1xqfe0KyJx_WavYXzn2Gdq807ur3PAAFkiwHSuseFgZA/edit#)
[heroku](https://q2-reads.herokuapp.com/)



