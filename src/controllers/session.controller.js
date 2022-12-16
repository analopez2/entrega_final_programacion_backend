import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

function generateToken(user) {
  const token = jwt.sign({ data: user }, config.PRIVATE_KEY, { expiresIn: '1h' });
  return token;
}

const registerUser = async (req, res) => {
  let token = generateToken(req.user);
  res.send({ status: 'success', payload: { id: req.user._id, token: token } });
};

const registerFail = async (req, res) => {
  let error = req.flash('errorRegister');
  if (error) {
    res.status(400).send({ status: 'error', error: error });
  } else {
    res.status(500).send({ status: 'error', error: 'Registro Fallido' });
  }
};

const loginUser = async (req, res) => {
  let token = generateToken(req.user);
  let decodedToken = jwt.verify(token, config.PRIVATE_KEY);

  req.session.user = { ...decodedToken };

  res.status(200).send({ status: 'success', user: req.session.user.data });
};

const loginFail = async (req, res) => {
  let error = req.flash('errorLogin');
  if (error) {
    res.status(400).send({ status: 'error', error: error });
  } else {
    res.status(500).send({ status: 'error', error: 'Login Fallido' });
  }
};

const logoutUser = async (req, res) => {
  const nombre = req.session?.user?.data.first_name;
  req.session.destroy((err) => {
    if (err) return res.status(500).send('error');
    res.send({ status: 'success', payload: `Hasta luego ${nombre.toUpperCase()}!` });
  });
};

export default {
  registerUser,
  registerFail,
  loginUser,
  loginFail,
  logoutUser,
};
