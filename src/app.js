import express from 'express';
import { config } from './config/config.js';
import handlebars from 'express-handlebars';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import initializePassport from './config/passport.config.js';

import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import sessionRouter from './routes/sessions.router.js';
import { MongoDb } from './db/mongoDb/mongodb.js';
import productsRouter from './routes/products.router.js';
import carritossRouter from './routes/carritos.router.js';

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'secret-Session-0.0.1-entregable-final',
    store: MongoStore.create({
      mongoUrl: config.UrlMongoDB,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 100,
    }),
    resave: false,
    saveUninitialized: false,
  }),
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/productos', productsRouter);
app.use('/api/carrito', carritossRouter);
app.use('/api/sessions', sessionRouter);

app.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}`));
const connection = MongoDb.init();
