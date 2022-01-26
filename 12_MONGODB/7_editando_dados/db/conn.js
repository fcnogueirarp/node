const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017/testemongodb2';

const client = new MongoClient(uri);

function run() {
  try {
    client.connect();
    console.log('Conectado ao MongoDb');
  } catch (err) {
    console.log(err);
  }
}

run();

module.exports = client;
