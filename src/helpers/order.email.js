const orderMessage = (name, numero_orden, productosOrden, totalOrden, direccion) => {
  return `<html>
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
      <h1> Hola ${name} has finalizado tu compra </h1>
        <p> Estos son los datos de la misma </p>
        <div> 
          <p>Nº de compra: ${numero_orden}</p>
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
};

export default {
  orderMessage,
};
