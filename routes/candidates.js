// Import express to use its Router
const express = require('express');
const router = express.Router();

// Import the model for candidate
const Candidate = require('../models/candidate');

// CREATE
router.post('/', async (req, res) => {
  console.log('POST request received');
  console.log(req.body);
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
// Retrieve all
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    console.log('All candidates retrieved from DB');
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Retrieve by id
router.get('/:id', getCandidate, async (req, res) => {
  res.json(res.candidate);
});

// UPDATE
router.put('/:id', getCandidate, async (req, res) => {
  res.candidate.docType = req.body.docType;
  res.candidate.docId = req.body.docId;
  res.candidate.firstName = req.body.firstName;
  res.candidate.lastName = req.body.lastName;
  res.candidate.address = req.body.address;
  res.candidate.email = req.body.email;
  res.candidate.cellphone = req.body.cellphone;
  res.candidate.url = req.body.url;
  res.candidate.description = req.body.description;

  try {
    const updatedCandidate = await res.candidate.save();
    res.json(updatedCandidate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete('/:id', getCandidate, async (req, res) => {
  try {
    await res.candidate.remove();
    res.json({ message: 'Candidate deleted!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get a candidate using the id supplied in the url
async function getCandidate(req, res, next) {
  let candidate;
  try {
    candidate = await Candidate.findById(req.params.id);
    if (candidate === null) {
      return res.status(404).json({ message: 'Cannot find candidate :(' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  console.log(candidate);
  res.candidate = candidate;
  next();
}

module.exports = router;
