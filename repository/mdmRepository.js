import oracledb from "oracledb";
import data from "../db/db.js";
import { bancoQualidade } from "../db/db.js";
import { qualidadeHml } from "../db/db.js";

async function recupDataPac() {
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
      console.error("Erro ao Consultar Hospitais", error);
    }
  }
}

async function populaBipPac() {
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

async function geraInvalidoPac() {
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
    console.error("Erro ao Gerar Invalido", error);
  }
}

async function geraBupPac() {
  const { username, password, connectstring } = bancoQualidade;
  try {
    // Cria conexão
    const connection = await oracledb.getConnection({
      user: username,
      password: password,
      connectString: connectstring,
    });
    // Query
    await connection.execute(query); // BUP_PES
    await connection.execute(query); // BUP_PES_CTT_ELET
    await connection.execute(query); // BUP_PES_END
    await connection.execute(query); // BUP_PES_INFO_BCO
    await connection.execute(query); // BUP_PES_TEL
    await connection.execute(query); // BUP_PES_DOC_PAD
    // Fecha conexão
    await connection.close();
  } catch (error) {
    console.error("Erro ao Popular BUP", error);
  }
}

async function reproStatusPac() {
  const { username, password, connectstring } = bancoQualidade;
  try {
    // Cria conexão
    const connection = await oracledb.getConnection({
      user: username,
      password: password,
      connectString: connectstring,
    });
    // Query
    await connection.execute(query); // REPROSTATUS
    // Fecha conexão
    await connection.close();
  } catch (error) {
    console.error("Erro ao Popular BUP", error);
  }
}

async function testConexao() {
  const { username, password, connectstring } = qualidadeHml;
  try {
    console.log("Inciando conexão...");
    const connection = await oracledb.getConnection({
      user: username,
      password: password,
      connectString: connectstring,
    });
    console.log("Conectado!");
    await connection.close();
    console.log("Conexão fechada com sucesso!");
  } catch (error) {
    console.error("Erro ao Testar Conexão!");
  }
}

export default {
  recupDataPac,
  populaBipPac,
  geraInvalidoPac,
  geraBupPac,
  reproStatusPac,
  testConexao,
};
