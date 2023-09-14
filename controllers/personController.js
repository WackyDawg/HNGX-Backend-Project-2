const { validationResult } = require("express-validator");
const Person = require("../models/personSchema");

const createPerson = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { name } = req.body;

    const personExists = await Person.findOne({ name });

    if (personExists) {
      return res.status(400).json({
        message: `Person with name "${name}" already exists`,
      });
    }

    const newPerson = new Person({ name });
    await newPerson.save();

    return res.status(201).json({
      message: "Person created successfully🎉",
      newPerson: newPerson,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getPerson = async (req, res) => {
  const userId = req.params.userID;

  try {
    const person = await Person.findById(userId);

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    return res.status(200).json({
      person: person,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updatePerson = async (req, res) => {
  const { name } = req.body;

  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { _id: req.params.userID },
      { name: name },
      { new: true }
    );

    if (!updatedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }

    return res.status(200).json({
      message: "Person updated successfully",
      updatedPerson: updatedPerson,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deletePerson = async (req, res) => {
  try {
    const deletedPerson = await Person.deleteOne({ _id: req.params.userID });

    if (deletedPerson.deletedCount === 0) {
      return res.status(404).json({ message: "Person not found" });
    }

    return res.status(200).json({ message: "Person deleted successfully🗑️" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createPerson,
  getPerson,
  updatePerson,
  deletePerson,
};
