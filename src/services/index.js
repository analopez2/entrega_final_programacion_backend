import MongoDao from '../dao/mongo.dao.js';
import { ProductsSchema } from '../models/ProductsSchema.js';
import { UsersSchema } from '../models/UsersSchema.js';
import { CarritosSchema } from '../models/CarritosSchema.js';
import ProductsService from './products.service.js';
import UserService from './users.service.js';
import CarritosService from './carritos.service.js';

const productsDao = new MongoDao('productos', ProductsSchema);
const usersDao = new MongoDao('usuarios', UsersSchema);
const carritoDao = new MongoDao('carritos', CarritosSchema);

export const productsService = new ProductsService(productsDao);
export const usersService = new UserService(usersDao);
export const carritosService = new CarritosService(carritoDao);
