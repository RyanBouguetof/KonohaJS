const express = require('express');
const mongoose = require('mongoose');
const jutsuRoutes = require('./routes/jutsuRoutes'); // Assurez-vous que le chemin est correct

const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017/ninja_library';

async function connectToMongo() {
  try {
    await mongoose.connect(url);
    console.log("Connecté à MongoDB avec Mongoose");
  } catch (err) {
    console.error("Erreur lors de la connexion à MongoDB avec Mongoose :", err);
    process.exit(1);
  }
}

// Middleware
app.use(express.json());

// Routes
app.use('/jutsu', jutsuRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API Ninja Library !');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

connectToMongo();