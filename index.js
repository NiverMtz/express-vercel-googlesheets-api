const express = require("express");
const cors = require("cors");
const attachAuthClient = require("./src/middleware/googleAuth");
const corsConfig = require("./src/config/corsConfig");
const routes = require("./src/routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors(corsConfig));
app.use(attachAuthClient);

app.use("/api", routes);

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
