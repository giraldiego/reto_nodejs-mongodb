const mongoose = require('mongoose');

const candidateSchema = mongoose.Schema({
  docType: String,
  docId: Number,
  firstName: String,
  lastName: String,
  address: String,
  email: String,
  phone: String,
  cellphone: String,
  url: String,
  description: String,
});

// Export model
module.exports = mongoose.model('Candidate', candidateSchema);
