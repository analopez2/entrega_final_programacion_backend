import { carritosService } from '../services/index.js';
import { transporter } from '../clients/NodeMailer.js';

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
    //send email
    let message = `<html>
                    <head>
                    <style>
                    table, td, th {
                      border: 1px solid black;
                    }
                    table {
                      border-collapse: collapse;
                      width: 100%;
                    }
                    td {
                      text-align: center;
                    }
                    </style>
                    </head>
                    <body>
                      <h1> Hola ${first_name.toUpperCase()} has finalizado tu compra </h1>
                        <p> Estos son los datos de la misma </p>
                        <div> 
                          <p>Nº de compra: ${orden.numero_orden}</p>
                          <table border:1px>
                            <tr border:1px>
                              <th border:1px>Producto</th>
                              <th border:1px>Importe Unitario</th>
                              <th border:1px>Cantidad</th>
                            </tr border:1px>
                            ${productosOrden} 
                          </table border:1px> 
                        </div>
                        <p> Total de la orden: ${totalOrden} </p>
                        <p> La misma se enviará a ${direccion}</p>
                        <p> ¡Muchas gracias por tu compra!</p>
                    </body>
                  </html>`;

    let result = await transporter.sendMail({
      from: 'Compras',
      to: email,
      subject: 'Compra Finalizada',
      html: message,
    });

    if (result) {
      carritosService.vaciarCarrito(carrito);
    }

    return await this.dao.save(orden);
  };
}
