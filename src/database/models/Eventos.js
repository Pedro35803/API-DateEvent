const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const init = async () => {
    const query = `
      CREATE TABLE eventos (
        id SERIAL PRIMARY KEY,
        evento VARCHAR(255) NOT NULL,
        tipo VARCHAR(255) DEFAULT 'Evento Comum',
        ocorrencia VARCHAR(255) DEFAULT 'Fixa'
      );`;
  
    await sequelize.query(query);
}
  
init();