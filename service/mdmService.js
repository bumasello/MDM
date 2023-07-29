import mdmRepository from "../repository/mdmRepository.js";

async function populaBrzCor() {
  return await mdmRepository.populaBrzCor();
}

async function populaPrtCor() {
  return await mdmRepository.populaPrtCor();
}

async function geraInvalidoCor() {
  return await mdmRepository.geraInvalidoCor();
}

async function populaGldCor() {
  return await mdmRepository.populaGldCor();
}

async function reproStatusCor() {
  return await mdmRepository.reproStatusCor();
}

async function testConexao() {
  return await mdmRepository.testConexao();
}

export default {
  populaBrzCor,
  populaPrtCor,
  geraInvalidoCor,
  populaGldCor,
  reproStatusCor,
  testConexao,
};
