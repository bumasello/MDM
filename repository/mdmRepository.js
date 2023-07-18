import oracledb from "oracledb";
import data from "../db/db.js";
import { bancoQualidade } from "../db/db.js";

async function recupData() {
  for (let combo in data) {
    const { username, password, connectstring } = data[combo];
    try {
      // Cria conexão
      const connection = await oracledb.getConnection({
        user: username,
        password: password,
        connectString: connectstring,
      });
      // Consulta
      await connection.execute(query);
      // Fecha conexão
      await connection.close();
    } catch (error) {
      console.error("Erro ao consultar hospitais", error);
    }
  }
}

async function populaBip() {
  const { username, password, connectstring } = bancoQualidade;
  try {
    const connection = await oracledb.getConnection({
      user: username,
      password: password,
      connectString: connectstring,
    });
  } catch (error) {
    console.error("Erro ao Popular BIP", error);
  }
}

export default {
  recupData,
  populaBip,
};
