const sequelize = require('../sequelize');

const init = async () => {
    const query = `
      CREATE TABLE data_dinamica (
        id_evento INTEGER REFERENCES eventos(id),
        dia INTEGER NOT NULL,
        mes INTEGER NOT NULL,
        ano INTEGER NOT NULL,
        PRIMARY KEY (id_evento, dia, mes, ano)
      );`;
  
    await sequelize.query(query);
}
  
init();