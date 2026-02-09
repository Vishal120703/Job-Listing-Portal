const express = require("express")
const router = express.Router()
const ProfileController = require("../Controllers/ProfileControllers")
const authMiddleware = require("../middlewares/authMiddleware")
const upload = require("../middlewares/multer.Middleware")

router.get("/profile",authMiddleware.verifyToken,ProfileController.getProfile)
router.put("/profile",authMiddleware.verifyToken,upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),ProfileController.putProfile)

module.exports = router;