import mdmRepository from "../repository/mdmRepository.js";

async function recupDataPac() {
  return await mdmRepository.recupDataPac();
}

async function populaBipPac() {
  return await mdmRepository.populaBip();
}

async function geraInvalidoPac() {
  return await mdmRepository.geraInvalido();
}

async function geraBupPac() {
  return await mdmRepository.geraBup();
}

async function reproStatusPac() {
  return await mdmRepository.reproStatus();
}

async function testConexao() {
  let teste = await mdmRepository.testConexao();
  return teste;
}

export default {
  recupDataPac,
  populaBipPac,
  geraInvalidoPac,
  geraBupPac,
  reproStatusPac,
  testConexao,
};
