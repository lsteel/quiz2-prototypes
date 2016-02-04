'use strict';

var bcrypt = require('bcrypt');
var assert = require('assert');

var users = [];

function User(username, password) {
  var usernameInUse = users.some(function(index){
    return index.username === username;
  });
  assert(!usernameInUse, 'This username already in use!');
  this.username = username;
  var salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(password, salt);
  users.push(this);
}

User.prototype.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
}

User.find = function(username) {
  return users.find(function(userOb) {return userOb.username === username;}) || null;
}

User.authenticate = function(username, password) {
  var login = User.find(username);
  if (!login) {
    return false;
  }
  else if (login.authenticate(password)) {
    return login;
  }
  else {
    return false;
  }
}

module.exports = User;
