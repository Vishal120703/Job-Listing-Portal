const express = require ("express")
const router = express.Router();
const AuthControllers = require("../Controllers/AuthControllers")
const authMiddleware = require("../middlewares/authMiddleware")

router.get("/Signup",AuthControllers.getSignUsers)
router.post("/Signup",AuthControllers.postSignUsers)
router.post("/Login",AuthControllers.postLoginUsers)
router.get("/profile",authMiddleware.verifyToken,AuthControllers.getUserProfile)

module.exports = router;