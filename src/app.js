import express from 'express';
import { config } from './config/config.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import __dirname from './utils.js';
import sessionRouter from './routes/sessions.router.js';
import { MongoDb } from './db/mongoDb/mongodb.js';
import productsRouter from './routes/products.router.js';
import carritossRouter from './routes/carritos.router.js';
import ordenesRouter from './routes/ordenes.router.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import flash from 'connect-flash';

const app = express();
const PORT = config.PORT || 8080;

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'secret-Session-0.0.1-entregable-final',
    store: MongoStore.create({
      mongoUrl: config.URL_MONGO_DB,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 100,
    }),
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(flash());
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'API Entregable Final CoderHouse',
      description: 'Documentación del entregable',
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use('/api/productos', productsRouter);
app.use('/api/carrito', carritossRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/ordenes', ordenesRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const connection = MongoDb.init();
