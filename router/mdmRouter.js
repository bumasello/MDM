import express from "express";
import mdmController from "../controller/mdmController.js";

const router = express.Router();

router.get("/populaBrzCor", mdmController.populaBrzCor);
router.get("/updateBrzCor", mdmController.updateBrzCor);
router.get("/populaPrtCor", mdmController.populaPrtCor);
router.get("/updatePrtCor", mdmController.updatePrtCor);
router.get("/geraInvalidoCor", mdmController.geraInvalidoCor);
router.get("/populaGldCor", mdmController.populaGldCor);
router.get("/reproStatus", mdmController.reproStatusCor);
router.get("/testConexao", mdmController.testConexao);
router.get("/meiaNoiteEvento", mdmController.meiaNoiteEvento);
export default router;
