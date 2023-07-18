import express from "express";

const router = express.Router();

router.all("/recupData");
router.all("/populaBip");
router.all("/geraInvalido");

export default router;
