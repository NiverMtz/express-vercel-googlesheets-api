const express = require("express");
const router = express.Router();
const { generarPDF } = require("../middleware/pdfGenerator");

router.post("/", async (req, res) => {
  try {
    const pdfBase64 = await generarPDF(req.body);
    res.json({ pdfBase64 });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al generar el PDF");
  }
});

module.exports = router;
