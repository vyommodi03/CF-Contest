const { Router } = require("express");
const allContestController = require("../controller/allContestController");
const router = Router();

router.get('/',allContestController.getAllContest);
router.get('/:id',allContestController.getContest);

module.exports = router;