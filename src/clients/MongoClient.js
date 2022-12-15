import mongoose from 'mongoose';
import { config } from '../config/config.js';

export default class MongoClient {
  constructor() {
    this.connection = mongoose.connect(
      config.URL_MONGO_DB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) throw new Error('Error en la coneccion a la MongoDb: ' + err);
        console.log('MongoDb conectada');
      },
    );
  }

  static getInstance = () => {
    if (!this.instance) {
      this.instance = new MongoClient();
    } else {
      return this.instance;
    }
  };
}
