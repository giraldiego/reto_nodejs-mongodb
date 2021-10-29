const express = require('express');
const router = express.Router();

// Import the model for candidate
const Candidate = require('../models/candidate');

// CREATE
router.post('/', async (req, res) => {
  console.log('POST request received');
  // Build the new Candidate using body data

  const candidate = new Candidate({
    docType: req.body.docType,
    docId: req.body.docId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    email: req.body.email,
    cellphone: req.body.cellphone,
    url: req.body.url,
    description: req.body.description,
  });

  try {
    const newCandidate = await candidate.save();
    res.status(201).json(newCandidate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// RETRIEVE
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    console.log('All candidates retrieved from DB');
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE

// DELETE

// function validateCandidate(candidate) {
//   const schema = Joi.object({

//   });
// }

module.exports = router;
