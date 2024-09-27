const mongoose = require('mongoose');

const jutsuSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    unique: true
  },
  description: { 
    type: String, 
    required: true 
  },
  rank: { 
    type: String, 
    enum: ['D', 'C', 'B', 'A', 'S'], 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['Ninjutsu', 'Genjutsu', 'Taijutsu', 'Kekkei Genkai', 'Senjutsu'], 
    required: true 
  },
  chakraNature: [{ 
    type: String, 
    enum: ['Fire', 'Water', 'Earth', 'Wind', 'Lightning', 'Yin', 'Yang'] 
  }],
  handSeals: [String],
  chakraCost: { 
    type: Number, 
    min: 1 
  },
  creator: String,
  users: [String],
  firstAppearance: {
    manga: String,
    anime: String
  },
  isKekkeigenkai: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Middleware pour mettre à jour la date de modification
jutsuSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Jutsu = mongoose.model('Jutsu', jutsuSchema);

module.exports = Jutsu;