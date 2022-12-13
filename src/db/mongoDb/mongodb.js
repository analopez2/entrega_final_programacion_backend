import MongoClient from '../../clients/MongoClient.js';

const MongoDb = {
  async init() {
    MongoClient.getInstance();
  },
};

export { MongoDb };
