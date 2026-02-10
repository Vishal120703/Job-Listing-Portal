const express = require("express")
const router = express.Router();
const Controllers = require("../Controllers/JobsControllers")
const authMiddleware = require("../middlewares/authMiddleware")

router.post("/Jobs",authMiddleware.verifyToken,Controllers.postJobs);
router.get("/Jobs",Controllers.getJobs);
router.get("/Jobs/:id",Controllers.getJobDescription)
router.put("/jobs/:id",authMiddleware.verifyToken,Controllers.putJobDescription)
router.delete("/Jobs/:id",authMiddleware.verifyToken,Controllers.deleteJob)

module.exports = router