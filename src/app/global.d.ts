import { MongoClient } from 'mongodb';

declare global {
  namespace NodeJS {
    interface Global {
      _mongoClientPromise?: Promise<MongoClient>;
    }
  }

  var _mongoClientPromise: Promise<MongoClient> | undefined; // Permitir su uso globalmente
}

export {};
