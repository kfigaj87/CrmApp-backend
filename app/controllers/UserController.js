const User = require("../models/User");

function addUser(data, cb) {
  let newUser = new User(data);

  newUser.save(function (err, user) {
    if (err) {
      cb(err);
    } else {
      cb(null, user);
    }
  });
}

function loginUser(data, cb) {
  User.findOne({ username: data.username }).exec(function (err, user) {
    if (err) {
      cb(err);
      return;
    }

    if (!user) {
      cb(null, user);
      return;
    }
  });
}

module.exports = {
  add: addUser,
  login: loginUser,
};
