require("dotenv").config();
const { google } = require("googleapis");
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
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/generative-language",
  ],
});

const attachAuthClient = async (req, res, next) => {
  try {
    const authClient = await auth.getClient();
    req.googleAuthClient = authClient;
    next();
  } catch (error) {
    console.log("Error al autenticar: ", error);
    res.status(500).json({ message: "Error de autenticación" });
  }
};

module.exports = attachAuthClient;
