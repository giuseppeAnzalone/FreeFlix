const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connessione con il DB stabilita");
  } catch (err) {
    console.log("Errore connesione DB", err);
  }
};

module.exports = connectDB;
