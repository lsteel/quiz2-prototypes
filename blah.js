'use strict';

var bcrypt = require('bcrypt');
var assert = require('assert');

var users = [];

function User(username, password) {
  var userExists = User.find(username);
  assert(!userExists, 'This Username is already taken');
  this.username = username;

  var salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(password, salt);
  users.push(this);
}

User.prototype.authenticate = function(password){
  return bcrypt.compareSync(password, this.password);
};

User.find = function(username){
  return users.find(function(user){return user.username === username;}) || null;
};

User.authenticate = function(username, password){
  var user = User.find(username);
  if(!user){ return false;}
  if(user.authenticate(password)){return user;}
  return false;
};

module.exports = User;
