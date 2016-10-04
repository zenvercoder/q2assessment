# Galvanize Reads

Galvanize Reads is a book catalog service that stores a list of recommended technology books. It allows you to:

* List books and authors

* Add books and authors

* Modify books and authors

* Remove books and authors

## Development

Clone this repo and run `npm start`

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

* [Provisioning the add on}(https://devcenter.heroku.com/articles/heroku-postgresql#provisioning-the-add-on)



##Notes to self

* “Namespace the file”
 
* Mixins: A mixin lets you make groups of CSS declarations that you want to reuse throughout your site

* for error "cannot find module lodash/first" do `npm install lodash --save`

* on p 18, {{#each this}} wont work, but {{#each books}} will
 
##Read it in english
* `express --hbs --css sass --git` to initialize a new express project with handlebars, SASS, and a basic .gitignore

* `npm install` to install all the dependencies

* `nodemon bin/www` to start a server that will auto-refresh on changes

* `heroku addons | grep -i POSTGRES` to see if your application already has a database provisioned and what plan it is.


# credits 
[walkthrough](https://docs.google.com/document/d/1xqfe0KyJx_WavYXzn2Gdq807ur3PAAFkiwHSuseFgZA/edit#)
[heroku](https://q2-reads.herokuapp.com/)



