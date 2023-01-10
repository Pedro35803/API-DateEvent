const sequelize = require('../sequelize');

const init = async () => {
    const query = `
      CREATE TABLE data_fixa (
        id_evento INTEGER REFERENCES eventos(id),
        dia INTEGER NOT NULL,
        mes INTEGER NOT NULL,
        PRIMARY KEY (id_evento, dia, mes)
      );`;
  
    await sequelize.query(query);
}
  
init();