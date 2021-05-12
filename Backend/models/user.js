const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
  firstName:  { type: String},
  lastName:  { type: String},
  email: { type: String},
  password: { type: String},
  birthdate: { type: Date},
  faculty: { type: String},
  createDate:{ type:Date, default: Date.now }
},{
  collection: 'users'
});

schema.methods.encryptPassword = async function(password) {
  const salt = await bcrypt.genSalt(5);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
 }

schema.methods.checkPassword = async function(password) {
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
}

const user = mongoose.model('User', schema);

module.exports = user;