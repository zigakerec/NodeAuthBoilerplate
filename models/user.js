const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

// define the model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, maxlength: 150 }
});

userSchema.pre('save', function(next) {
  const user = this;
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  next();

});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
}

// create the model class
const ModelClass = mongoose.model('user', userSchema);

// export the mdoel
module.exports = ModelClass;
