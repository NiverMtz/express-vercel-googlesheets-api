const express = require("express");
const router = express.Router();
const newsRoutes = require("./news");
const aboutRoutes = require("./about");
const gddRoutes = require("./gdd");

router.use("/news", newsRoutes);
router.use("/about", aboutRoutes);
router.use("/gdd-generator", gddRoutes);

module.exports = router;
