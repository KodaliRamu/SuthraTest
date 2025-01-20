const express = require("express");
const userCtrl = require("../controller/user");
const isAuthenticated = require("../middlewares/isAuth");
const isAdmin = require("./admin");

const router = express.Router();

router.post("/api/users/signup", userCtrl.register);
router.post("/api/users/login", userCtrl.login);
router.get("/api/users/profile", isAuthenticated, userCtrl.profile);
router.use("/api/admin", isAdmin);
router.use("/api/add", isAdmin);
router.use("/api/update", isAdmin);
router.use("/api/delete", isAdmin);

module.exports = router;
