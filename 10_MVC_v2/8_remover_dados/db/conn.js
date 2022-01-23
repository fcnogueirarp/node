const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodemvc2', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

try {
  sequelize.authenticate();
  console.log('Sequelize autenticado com sucesso');
} catch (e) {
  console.log(`Falha ao conectar sequelize ${e}`);
}
module.exports = sequelize;
