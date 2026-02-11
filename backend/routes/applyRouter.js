const express = require("express")
const router = express.Router()
const ApplyControllers = require("../Controllers/ApplyControllers")
const authMiddleware = require("../middlewares/authMiddleware")

router.post("/apply",authMiddleware.verifyToken,ApplyControllers.postJob);

module.exports = router;