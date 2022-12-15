import { ordenesService } from '../services/index.js';

const finalizarOrden = async (req, res) => {
  try {
    const { first_name, email, direccion, carrito } = req.session.user.data;
    const orden = await ordenesService.finalizarOrden(first_name, email, direccion, carrito);
    res.send(orden);
  } catch (error) {
    if (error.status) return res.status(error.status).send({ error: error });
    res.status(500).send({ status: 'error', error: error.message });
  }
};

export default {
  finalizarOrden,
};
