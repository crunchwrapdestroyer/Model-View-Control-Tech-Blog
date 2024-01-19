const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const cors = require('cors');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
// const profileRoutes = require('./routes/profileRoutes');
// const usersController = require('./controllers/api/usersController');
// const { getUsers } = require('./controllers/api/usersController');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 300000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };
const app = express();
const PORT = process.env.PORT || 3001;
require('dotenv').config();

const hbs = exphbs.create({ helpers });

// app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Use session middleware with the configured settings
app.use(session(sess));



// Parse incoming JSON requests
app.use(express.json());

// Parse incoming URL-encoded requests with extended mode
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use defined routes for the application
app.use(routes);

// Sync Sequelize models with the database and start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>
      console.log(`Now listening on http://localhost:${PORT}`)
    );
  });