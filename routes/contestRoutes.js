const { Router } = require("express");
const contestController = require("../controller/contestController");
const router = Router();

router.get('/',contestController.getContest);

module.exports=router;


