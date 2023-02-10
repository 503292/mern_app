const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/link", require("./routes/link.route"));
app.use("/t", require("./routes/redirect.route"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = config.get("port");

async function start() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(config.get("mongoUrl"));
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT} ...`)
    );
  } catch (e) {
    console.log("Server message", e);
    process.exit(1);
  }
}

start();
