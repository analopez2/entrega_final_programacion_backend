export const login = (req, res, next) => {
  if (!req.session.user)
    return res.send({
      error: 'Error',
      descripcion: `Debe estar logueado`,
    });
  next();
};
