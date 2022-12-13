import { productsService } from '../services/index.js';

const home = (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('home', { user: req.session.user });
};

const register = (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('register');
};

const login = (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('login');
};

const logout = (req, res) => {
  res.render('logout');
};

const productos = async (req, res) => {
  let products = await productsService.getProducts();
  res.render('products', { products });
};

export default {
  home,
  register,
  login,
  logout,
  productos,
};
