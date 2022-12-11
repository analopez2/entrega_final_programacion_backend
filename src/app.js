import express from 'express';
import { config } from './config/config.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import { MongoDb } from './db/mongoDb/mongodb.js';
import productsRouter from './routes/products.router.js';
import carritossRouter from './routes/carritos.router.js';

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use(
  session({
    secret: 'SecretTestClase',
    store: MongoStore.create({
      mongoUrl: config.UrlMongoDB,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 100,
    }),
    resave: false,
    saveUninitialized: false,
  }),
);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/productos', productsRouter);
app.use('/api/carrito', carritossRouter);

app.listen(8080, () => console.log('Listening'));
const connection = MongoDb.init();
