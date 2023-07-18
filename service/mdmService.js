import mdmRepository from "../repository/mdmRepository.js";

async function recupData() {
  return await mdmRepository.recupData();
}

export default {
  recupData,
};
