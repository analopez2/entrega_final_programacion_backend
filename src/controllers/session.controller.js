import jwt from 'jsonwebtoken';

const PRIVATE_KEY = 'llave-privada-token-JWT-00002020';

function generateToken(user) {
  const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: '1h' });
  return token;
}

const registerUser = async (req, res) => {
  let token = generateToken(req.user);
  res.send({ status: 'success', payload: { id: req.user._id, token: token } });
};

const registerFail = async (req, res) => {
  res.status(500).send({ status: 'error', error: 'Register failed' });
};

const loginUser = async (req, res) => {
  let token = generateToken(req.user);
  let decodedToken = jwt.verify(token, PRIVATE_KEY);

  req.session.user = { ...decodedToken };

  res.status(200).send({ status: 'success', user: req.session.user });
};

const loginFail = async (req, res) => {
  res.status(500).send({ status: 'error', error: 'Login failed' });
};

const logoutUser = async (req, res) => {
  const nombre = req.session?.user?.first_name;
  req.session.destroy((err) => {
    if (err) return res.status(500).send('error');
    res.send({ status: 'success', payload: nombre });
  });
};

export default {
  registerUser,
  registerFail,
  loginUser,
  loginFail,
  logoutUser,
};
