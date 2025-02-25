const express = require("express");
const router = express.Router();
const newsRoutes = require("./news");
const aboutRoutes = require("./about");

router.use("/news", newsRoutes);
router.use("/about", aboutRoutes);

module.exports = router;
