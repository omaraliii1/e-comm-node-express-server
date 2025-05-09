const { isAuth } = require("../utils/isAuth");
const router = require("express").Router();
const { notAuth, auth } = require("../controllers/public.controller");

router.get("/private/:id", isAuth, auth);
router.get("/public", notAuth);

module.exports = router;
