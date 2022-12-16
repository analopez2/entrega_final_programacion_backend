import { carritosService } from '../services/index.js';
import { transporter } from '../clients/NodeMailer.js';
import mailCompra from '../helpers/order.email.js';

export default class OrdenesService {
  constructor(dao) {
    this.dao = dao;
  }

  finalizarOrden = async (first_name, email, direccion, carrito) => {
    const carritoOrden = await carritosService.getCarritoById(carrito);
    if (!carritoOrden) throw { status: 404, error: 'Carrito no encontrado' };
    if (carritoOrden.productos.length == 0) throw { status: 400, error: 'El carrito debe tener productos para que se pueda comprar' };

    let cantOrdenes = await this.dao.getAll();

    let orden = {
      items: carritoOrden.productos,
      numero_orden: cantOrdenes.length++,
      email: email,
      direccion: direccion,
      timestamp: Date.now(),
    };

    let productosOrden = '';
    let totalOrden = 0;
    carritoOrden.productos.forEach((p) => {
      productosOrden += `<tr border:1px>
                          <td border:1px>${p.producto.nombre}</td>
                          <td border:1px>${p.producto.precio}</td>
                          <td border:1px>${p.cantidad}</td>
                         </tr border:1px>`;
      totalOrden += p.producto.precio * p.cantidad;
    });

    let result = await transporter.sendMail({
      from: 'Compras',
      to: email,
      subject: 'Compra Finalizada',
      html: mailCompra.orderMessage(first_name.toUpperCase(), orden.numero_orden, productosOrden, totalOrden, direccion),
    });

    if (result) {
      carritosService.vaciarCarrito(carrito);
    }

    return await this.dao.save(orden);
  };
}
