const User = require("../models/User");

const createUser = (req, res) => {
  const { name } = req.body;

  const user = new User({
    name: name, 
  });

  user.save((err, savedUser) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(savedUser);
    }
  });
};

const getUser = (req, res) => {
  const userId = req.params.userID; 

  User.findById(userId, (err, user) => { 
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!user) {
      res.status(404).json({ message: "😞Awwwn User not found" }); 
    } else {
      res.status(200).json(user);
    }
  });
};

const updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userID },
    {
      $set: {
        name: req.body.name,
      },
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(updatedUser);
      }
    }
  );
};

const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.userID })
    .then(() => res.json({ message: "User has been deleted successfully!🗑️" }))
    .catch((err) => res.status(500).json({ error: err.message }));
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
