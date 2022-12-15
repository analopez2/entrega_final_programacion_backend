export const config = {
  mongo: {
    USER: process.env.MONGO_USER,
    PWD: process.env.MONGO_PWD,
    DATABASE: process.env.MONGO_DATABASE,
  },
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  UrlMongoDB: process.env.UrlMongoDB || 'mongodb+srv://test:test1234@cluster0.iqc88.mongodb.net/prueba_proyecto_final?retryWrites=true&w=majority',
  PORT: process.env.PORT || 8080,
};
