const IS_ADMIN = true;

const isAdmin = (req, res, next) => {
  if (!IS_ADMIN) {
    return res.send({
      error: 403,
      descripcion: `ruta ${req.baseUrl} | method ${req.method} no autorizado`,
    });
  }
  next();
};

export { isAdmin };
