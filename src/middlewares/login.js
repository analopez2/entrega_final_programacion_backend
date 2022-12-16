const login = (req, res, next) => {
  if (!req.session.user)
    return res.status(403).send({
      status: 'Error',
      error: [`Debe estar logueado`],
    });
  next();
};

export { login };
