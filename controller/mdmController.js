import mdmService from

async function recupData(req, res, next){
    try {
        await mdmService.recupData();
        res.send("Dados importados!");
    } catch {
        next(err);
    }
}

export default {
    recupData
};
