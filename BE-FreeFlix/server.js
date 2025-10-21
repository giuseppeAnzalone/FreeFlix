require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const Movie = require("./models/movies");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(userRoutes);

// API Routes
app.post("/movies", async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    cover: req.body.cover,
    poster: req.body.poster,
    year: req.body.year,
  });

  try {
    const newMovie = await movie.save();
    res
      .status(201)
      .json({ message: "Il film è stato aggiunto correttamente al DB" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Il film è stato cancellato dal DB" });
  } catch (err) {
    res.status(400), json({ message: err.message });
  }
});

app.put("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id);

    if (!movie) {
      res.status(404).json({ message: "Film non trovato" });
    } else {
      const { title, cover, year } = req.body;
      if (title && cover && year) {
        movie.title = title;
        movie.cover = cover;
        movie.year = year;
        await movie.save();

        res.status(201).json({ message: "Il film è stato modificato" });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(3002);
