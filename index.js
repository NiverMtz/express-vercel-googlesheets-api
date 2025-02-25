const express = require("express");
const attachAuthClient = require("./src/middleware/googleAuth");

const routes = require("./src/routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(attachAuthClient);

app.use("/api", routes);

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
