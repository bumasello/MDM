import mdmService from "../service/mdmService.js";

async function populaBrzCor(req, res, next) {
  try {
    await mdmService.populaBrzCor();
    res.send("BRZ Populada!");
  } catch {
    next(err);
  }
}

async function populaPrtCor(req, res, next) {
  try {
    await mdmService.populaPrtCor();
    res.send("PRT Populada!");
  } catch {
    next(err);
  }
}

async function geraInvalidoCor(req, res, next) {
  try {
    // await mdmService.geraInvalido();
    res.send("Invalidos Gerados!");
  } catch {
    next(err);
  }
}

async function populaGldCor(req, res, next) {
  try {
    // await mdmService.populaGldCor();
    res.send("BUP Populada!");
  } catch {
    next(err);
  }
}

async function reproStatusCor(req, res, next) {
  try {
    // await mdmService.reproStatusCor();
    res.send("Registros Reprocessados!");
  } catch {
    next(err);
  }
}

async function testConexao(req, res, next) {
  try {
    await mdmService.testConexao();
    res.send("Teste Concluído!");
  } catch {
    next(err);
  }
}

async function meiaNoiteEvento(req, res, next) {
  try {
    await mdmService.populaBrzCor();
    await mdmService.populaPrtCor();
    res.send("Carga Completa!");
  } catch {
    next(err);
  }
}

export default {
  populaBrzCor,
  populaPrtCor,
  geraInvalidoCor,
  populaGldCor,
  reproStatusCor,
  testConexao,
  meiaNoiteEvento,
};
