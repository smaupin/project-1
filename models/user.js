var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	salt = bcrypt.genSaltSync(10);

var UserSchema = new Schema({
	email: { type: String, required: true, unique: true },
	passwordDigest: { type: String, required: true},
});


UserSchema.statics.createSecure = function (email, password, callback) {
	var UserModel = this; 

	bcrypt.genSalt (function(err, salt){
		console.log('salt: ', salt);
		bcrypt.hash(password, salt, function(err, hash){
			console.log(hash);

			UserModel.create({ email: email, passwordDigest: hash }, callback);
		});
	});
};

// UserSchema.statics.authenticate = function (email, password, callback) {
// 	this.findOne({email:email}, function (err,user){
// 		console.log("user authenticate");

// 		if(!user) {
// 			console.log("No user with email: " + email);
// 		} else if (user.checkPassword(password)){
// 			callback(null, user);
// 		}

// 	});
// };


// UserSchema.methods.checkPassword = function(password){
// 	return bcrypt.compareSync(password, this.passwordDigest);
// };


var User = mongoose.model('User', UserSchema);

module.exports = User;





