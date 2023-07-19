import mdmService from "../service/mdmService.js";

async function recupData(req, res, next) {
  try {
    await mdmService.recupData();
    res.send("Dados importados!");
  } catch {
    next(err);
  }
}

async function populaBip(req, res, next) {
  try {
    await mdm.mdmService.populaBip();
    res.send("BIP Populada!");
  } catch {
    next(err);
  }
}

async function geraInvalido(req, res, next) {
  try {
    await mdmService.geraInvalido();
    res.send("Invalidos Gerados!");
  } catch {
    next(err);
  }
}

export default {
  recupData,
  populaBip,
  geraInvalido,
};
