const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers')


const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');

const sess = {
    secret: 'secret secret session shh',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 1000 * 60 * 10, // will check every 10 minutes
        expiration: 1000 * 60 * 30 // will expire after 30 minutes
    })
};

const app = express()
const PORT = process.env.PORT || 3001

app.use(session(sess));

const hbs = exphbs.create({helpers});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
})

app.use(routes);

// Allow session storage to be accessed by any page


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});