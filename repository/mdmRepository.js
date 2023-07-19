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
    // Cria conexão
    const connection = await oracledb.getConnection({
      user: username,
      password: password,
      connectString: connectstring,
    });
    // Query
    await connection.execute(query); // BIP_PES
    await connection.execute(query); // BIP_PES_CTT_ELET
    await connection.execute(query); // BIP_PES_END
    await connection.execute(query); // BIP_PES_INFO_BCO
    await connection.execute(query); // BIP_PES_TEL
    await connection.execute(query); // BIP_PES_DOC_PAD
    // Fecha conexão
    await connection.close();
  } catch (error) {
    console.error("Erro ao Popular BIP", error);
  }
}

async function geraInvalido() {
  const { username, password, connectstring } = bancoQualidade;
  try {
    // Cria conexão
    const connection = await oracledb.getConnection({
      user: username,
      password: password,
      connectString: connectstring,
    });
    // Query
    await connection.execute(query); // VERIFICAÇÃO NOME E CPF
    // Fecha conexão
    await connection.close();
  } catch (error) {
    console.error("Erro ao gerar Invalido", error);
  }
}

export default {
  recupData,
  populaBip,
  geraInvalido,
};
