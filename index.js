const express = require("express");
const { google } = require("googleapis");

const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

const credentials = {
  type: process.env.GOOGLE_TYPE,
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Ajustar el formato de la clave privada
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: process.env.GOOGLE_AUTH_URI,
  token_uri: process.env.GOOGLE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
};

// Configura el cliente de Google Sheets
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

// ID de tu hoja de cálculo
const spreadsheetId = process.env.SPREADSHEET_ID;

// Endpoint para obtener datos
app.get("/api/data", async (req, res) => {
  try {
    // Obtener todas las filas con datos (sin especificar un rango final)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Hoja1", // Solo el nombre de la hoja, sin rango específico
    });

    const rows = response.data.values;
    if (rows.length) {
      // Mapear los datos a un formato útil
      const data = rows
        .map((row) => ({
          id: row[0],
          title: row[1],
          description: row[2],
          type: row[3],
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

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
