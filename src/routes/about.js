const { google } = require("googleapis");
const sheets = google.sheets("v4");
const express = require("express");
const router = express.Router();

// get news
router.get("/", async (req, res) => {
  const { googleAuthClient } = req;
  try {
    const response = await sheets.spreadsheets.values.get({
      auth: googleAuthClient,
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Nosotros",
    });

    const rows = response.data.values;
    if (rows.length) {
      const data = rows
        .map((row) => ({
          id: row[0],
          name: row[1],
          description: row[2],
          rol: row[3],
          image: row[4],
          primary_link: row[5],
          secondary_link: row[6],
        }))
        .slice(1, rows.length);
      res.json(data);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.status(500).send("Error al obtener datos");
  }
});

module.exports = router;
