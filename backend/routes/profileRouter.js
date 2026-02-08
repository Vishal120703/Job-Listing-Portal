const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/authMiddleware")
const profileController = require("../Controllers/ProfileControllers")
const upload = require("../middlewares/multer.Middleware") 


router.get("/profile",authMiddleware.verifyToken,profileController.getProfile);
router.post("/profile",upload.single("image"),profileController.postProfileDetails)

module.exports = router