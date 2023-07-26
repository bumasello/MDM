import express from "express";
import mdmController from "../controller/mdmController.js";

const router = express.Router();

router.get("/recupDataPac", mdmController.recupDataPac);
router.get("/populaBipPac", mdmController.populaBipPac);
router.get("/geraInvalido", mdmController.geraInvalidoPac);
router.get("/geraBup", mdmController.geraBupPac);
router.get("/reproStatus", mdmController.reproStatusPac);
router.get("/testConexao", mdmController.testConexao);

export default router;
