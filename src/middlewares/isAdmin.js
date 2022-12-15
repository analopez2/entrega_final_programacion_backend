const isAdmin = (req, res, next) => {
  let role = req.session.user.data.role;
  if (role != 'admin') {
    return res.send({
      error: 403,
      descripcion: `ruta ${req.baseUrl} | method ${req.method} no autorizado`,
    });
  }
  next();
};

export { isAdmin };
