const express = require ("express")
const router = express.Router();
const AuthControllers = require("../Controllers/AuthControllers")

router.get("/Signup",AuthControllers.getSignUsers)
router.post("/Signup",AuthControllers.postSignUsers)
router.post("/Login",AuthControllers.postLoginUsers)

module.exports = router;