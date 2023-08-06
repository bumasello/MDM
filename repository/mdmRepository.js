import oracledb from "oracledb";
import query from "../querys/query.js";

async function populaBrzCor() {
  try {
    // Cria conexão
    const connection = await oracledb.getConnection({
      user: "SYSTEM",
      password: "brumas1027",
      connectString: "localhost:1521/xe",
    });
    console.log("Conectado");
    // Consulta
    console.log("Iniciando query");
    await connection.execute(query.q_log_controle_inicio("populaBrzCor"));
    console.log("Logado - Inicio");
    await connection.execute(query.q_populaBrzCorCursorDtl);
    console.log("Query finalizada...");
    await connection.execute(query.q_log_controle_fim("populaBrzCor"));
    console.log("Logado - Fim");
    await connection.close();
    console.log("Conexão fechada");
  } catch (error) {
    console.error("Erro ao Consultar Cores", error);
  }
}

async function updateBrzCor() {
  try {
    // Cria conexão
    const connection = await oracledb.getConnection({
      user: "SYSTEM",
      password: "brumas1027",
      connectString: "localhost:1521/xe",
    });
    console.log("Conectado");
    // Consulta
    console.log("Iniciando query");
    await connection.execute(query.q_log_controle_inicio("updateBrzCor"));
    console.log("Logado - Inicio");
    await connection.execute(query.q_updateBrzCorCursorDtl);
    console.log("Query finalizada...");
    await connection.execute(query.q_log_controle_fim("updateBrzCor"));
    console.log("Logado - Fim");
    await connection.close();
    console.log("Conexão fechada");
  } catch (error) {
    console.error("Erro ao Atualizar Cores", error);
  }
}

async function populaPrtCor() {
  try {
    // Cria conexão
    const connection = await oracledb.getConnection({
      user: "SYSTEM",
      password: "brumas1027",
      connectString: "localhost:1521/xe",
    });
    // Query
    console.log("Iniciando query");
    await connection.execute(query.q_log_controle_inicio("populaPrtCor"));
    console.log("Logado - Inicio");
    await connection.execute(query.q_populaPrtCor);
    console.log("Query finalizada...");
    await connection.execute(query.q_log_controle_fim("populaPrtCor"));
    console.log("Logado - Fim");
    // Fecha conexão
    await connection.close();
    console.log("Conexão fechada");
  } catch (error) {
    console.error("Erro ao Popular PRT", error);
  }
}

async function updatePrtCor() {
  try {
    // Cria conexão
    const connection = await oracledb.getConnection({
      user: "SYSTEM",
      password: "brumas1027",
      connectString: "localhost:1521/xe",
    });
    // Query
    console.log("Iniciando query");
    await connection.execute(query.q_log_controle_inicio("updatePrtCor"));
    console.log("Logado - Inicio");
    await connection.execute(query.q_updatePrtCor);
    console.log("Query finalizada...");
    await connection.execute(query.q_log_controle_fim("updatePrtCor"));
    console.log("Logado - Fim");
    // Fecha conexão
    await connection.close();
    console.log("Conexão fechada");
  } catch (error) {
    console.error("Erro ao Atualizar PRT", error);
  }
}

async function geraInvalidoCor() {
  try {
    // Cria conexão
    const connection = await oracledb.getConnection({
      user: "SYSTEM",
      password: "brumas1027",
      connectString: "localhost:1521/xe",
    });
    // Query
    console.log("Iniciando query");
    await connection.execute(query.q_log_controle_inicio("geraInvalidoCor"));
    console.log("Logado - Inicio");
    await connection.execute(query.q_geraInvalidoCor); // VERIFICAÇÃO NOME E CPF
    console.log("Query Finalizada...");
    await connection.execute(query.q_log_controle_fim("geraInvalidoCor"));
    console.log("Logado - Fim");
    // Fecha conexão
    await connection.close();
    console.log("Conexão fechada");
  } catch (error) {
    console.error("Erro ao Gerar Invalido", error);
  }
}

async function populaGldCor() {
  try {
    // Cria conexão
    const connection = await oracledb.getConnection({
      user: "SYSTEM",
      password: "brumas1027",
      connectString: "localhost:1521/xe",
    });
    // Query
    await connection.execute(query); // GLD_PES
    await connection.execute(query); // GLD_PES_END
    await connection.execute(query); // GLD_PES_INFO_BCO
    await connection.execute(query); // GLD_PES_TEL
    await connection.execute(query); // GLD_PES_DOC_PAD
    // Fecha conexão
    await connection.close();
  } catch (error) {
    console.error("Erro ao Popular GLD", error);
  }
}

async function reproStatusCor() {
  try {
    // Cria conexão
    const connection = await oracledb.getConnection({
      user: "SYSTEM",
      password: "brumas1027",
      connectString: "localhost:1521/xe",
    });
    // Query
    await connection.execute(query); // REPROSTATUS
    // Fecha conexão
    await connection.close();
  } catch (error) {
    console.error("Erro ao Reprocessar Cores", error);
  }
}

async function testConexao() {
  try {
    console.log("Inciando conexão...");
    const connection = await oracledb.getConnection({
      user: "system",
      password: "brumas1027",
      connectString: "localhost:1521/xe",
    });
    await connection.execute(query.q_log_controle_inicio("Teste"));
    await connection.execute(query.q_log_controle_fim("Fim do teste"));
    console.log("Conectado!");
    await connection.close();
    console.log("Conexão fechada com sucesso!");
  } catch (error) {
    console.error("Erro ao Testar Conexão!");
  }
}

export default {
  populaBrzCor,
  updateBrzCor,
  populaPrtCor,
  updatePrtCor,
  geraInvalidoCor,
  populaGldCor,
  reproStatusCor,
  testConexao,
};
