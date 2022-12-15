const registerMessage = (name) => {
  return `<h1>Bienvenido ${name.toUpperCase()} </h1>
            <p>Tu usuario se ha creado de forma exitosa!</p>
            <p> ¡Gracias por elegirnos! </p>
            `;
};

export default {
  registerMessage,
};
