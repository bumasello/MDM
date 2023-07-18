import mdmRepository from "../repository/mdmRepository.js";

async function recupData() {
  return await mdmRepository.recupData();
}

async function populaBip() {
  return await mdmRepository.populaBip();
}

async function geraInvalido() {
  return await mdmRepository.geraInvalido();
}

export default {
  recupData,
  populaBip,
  geraInvalido,
};
