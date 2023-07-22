import mdmService from "../service/mdmService.js";

async function recupDataPac(req, res, next) {
  try {
    let result = await mdmService.recupDataPac();
    req.body = result;
    res.send(req.body);
  } catch {
    next(err);
  }
}

async function populaBipPac(req, res, next) {
  try {
    // await mdm.mdmService.populaBip();
    res.send("BIP Populada!");
  } catch {
    next(err);
  }
}

async function geraInvalidoPac(req, res, next) {
  try {
    // await mdmService.geraInvalido();
    res.send("Invalidos Gerados!");
  } catch {
    next(err);
  }
}

async function geraBupPac(req, res, next) {
  try {
    // await mdmService.geraBup();
    res.send("BUP Populada!");
  } catch {
    next(err);
  }
}

async function reproStatusPac(req, res, next) {
  try {
    // await mdmService.reproStatus();
    res.send("Registros Reprocessados!");
  } catch {
    next(err);
  }
}

async function testConexao(req, res, next) {
  try {
    let teste = await mdmService.testConexao();
    req.body = teste;
    res.send(req.body);
  } catch {
    next(err);
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
