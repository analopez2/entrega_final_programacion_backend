const isAdmin = (req, res, next) => {
  let role = req.session.user.data.role;
  if (role != 'admin') {
    return res.status(403).send({
      status: 'Error',
      error: `ruta ${req.baseUrl} | method ${req.method} no autorizado`,
    });
  }
  next();
};

export { isAdmin };
