import MongoDao from '../dao/mongo.dao.js';
import { ProductsSchema } from '../models/ProductsSchema.js';
import { UsersSchema } from '../models/UsersSchema.js';
import { CarritosSchema } from '../models/CarritosSchema.js';
import { OrdenesSchema } from '../models/OrdenesSchema.js';
import ProductsService from './products.service.js';
import UserService from './users.service.js';
import CarritosService from './carritos.service.js';
import OrdenesService from './ordenes.service.js';

const productDao = new MongoDao('productos', ProductsSchema);
const usersDao = new MongoDao('usuarios', UsersSchema);
const carritoDao = new MongoDao('carritos', CarritosSchema);
const ordenDao = new MongoDao('ordenes', OrdenesSchema);

export const productsService = new ProductsService(productDao);
export const usersService = new UserService(usersDao);
export const carritosService = new CarritosService(carritoDao);
export const ordenesService = new OrdenesService(ordenDao);
