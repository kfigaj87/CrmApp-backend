const User = require("../models/User");

function addUser(data, cb) {
  const newUser = new User(data);

  newUser.save((err, user) => {
    if (err) {
      cb(err);
    } else {
      cb(null, user);
    }
  });
}

function loginUser(data, cb) {
  User.findOne({ username: data.username }).exec((err, user) => {
    if (err) {
      cb(err);
    } else {
      if (!user) {
        cb(null, null);
      } else {
        user.comparePassword(data.password, (err, isMatch) => {
          if (err) {
            cb(err);
          } else if (!isMatch) {
            cb(null, null);
          } else {
            cb(null, user);
          }
        });
      }
    }
  });
}

module.exports = {
  addUser,
  loginUser,
};
