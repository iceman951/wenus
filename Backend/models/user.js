const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
  firstName:  { type: String, required: true, trim: true },
  lastName:  { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthdate: { type: Date, required: true },
  faculty: { type: String, required: true },
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