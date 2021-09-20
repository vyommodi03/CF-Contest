const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Please Enter username"],
		unique: true,
	},
	CFhandle: {
		type: String,
		lowercase: true,
		required: [true, "Please Enter CFhandle"],
	},
	password: {
		type: String,
		required: [true, "Please Enter password"],
		minlength: [4, "Minimum Password Length is 4 Characters"],
	},
	CFuser: {
		type: Object,
		required: true,
	},
	currContest:{
		type : Object,
		default:{}
	},
	allContest :{
		type:Array,
		default:[]	
	}
});

userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.statics.ConfigCFHandle = async function (CFhandle) {
	const handle = `https://codeforces.com/api/user.info?handles=${CFhandle}`;
	const result = await fetch(handle);
	const data = await result.json();

	if (data.status == "OK") {
		return data.result[0];
	}
	throw Error("Incorrect Codeforces Handle");
};

userSchema.statics.login = async function (username, password) {
	const user = await this.findOne({ username });

	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error("Incorrect Password");
	}
	throw Error("Incorrect Username");
};
const User = mongoose.model("users", userSchema);

module.exports = User;
