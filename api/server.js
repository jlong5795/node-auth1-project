const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require("express-session");
const KnexStore = require("connect-session-knex")(session);

const apiRouter = require('./api-router.js');
const configureMiddleware = require('./configure-middleware.js');
const knex = require("../database/dbConfig.js");

const server = express();

const sessionConfig = {
    name: "monster",
    secret: "keep it secret, keep it safe!",
    resave: false,
    saveUninitialized: true, // related to GDPR compliance
    cookie: {
      maxAge: 1000 * 60 * 10,
      secure: false,
      httpOnly: true // true means JS cannot touch the cookie
    },
    // remember the 'new' keyword
    store: new KnexStore({
      knex,
      tablename: "sessions",
      createtable: true,
      sidfieldname: "sid",
      clearInterval: 1000 * 60 * 10
    })
  };

configureMiddleware(server);

server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));
server.use('/api', apiRouter);


server.get('/', (req, res) => {
    //console.log(req.session)
    res.json({ api: 'up' });
  });

module.exports = server;
