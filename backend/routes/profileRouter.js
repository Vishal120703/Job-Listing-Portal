const express = require("express")
const router = express.Router()
const ProfileController = require("../Controllers/ProfileControllers")
const authMiddleware = require("../middlewares/authMiddleware")

router.get("/profile",authMiddleware.verifyToken,ProfileController.getProfile)
router.put("/profile",authMiddleware.verifyToken,ProfileController.putProfile)

module.exports = router;