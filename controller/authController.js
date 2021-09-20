const User = require("../models/user");
const jwt = require("jsonwebtoken");

const maxAge = 2 * 24 * 60 * 60;
const title = "CF-contest";

const createToken = (id) => {
	return jwt.sign({ id }, process.env.AUTH_KEY, {
		expiresIn: maxAge,
	});
};

const handleErrors = (err) => {
	let errors = {
		username: "",
		CFhandle: "",
		password: "",
	};

	//duplicate error code

	if (err.message.includes("users validation failed")) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}
	if (err.code == 11000) {
		errors.username = "This username is already registered.";
	}
	if (err.message === 'Incorrect Codeforces Handle') {
		errors.CFhandle = "Incorrect Codeforces Handle";
	}

	if(err.message === 'Incorrect Password')
	{
		errors.password = 'Incorrect Password';
	}
	if(err.message === 'Incorrect Username')
	{
		errors.username = 'Incorrect Username';
	}
	return errors;
};

const getLogin = (req, res) => {
	res.cookie("jwt", "", { maxAge: 1 });
	res.render("index", { title });
}

const postLogin = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.login(username, password);
		const token = createToken(user._id);
		res.cookie("jwt", token, {
			httpOnly: true,
			maxAge: maxAge * 1000,
		});
		res.status(200).json({ user: user._id });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({errors});
	}
}

const getSignup  = (req, res) => {
	res.render("signup",{title});
}

const postSignup = async (req, res) => {
	const { username, CFhandle, password } = req.body;
	try {
		const CFuser = await User.ConfigCFHandle(CFhandle);
		const currContest ={};
		const user = await User.create({ username, CFhandle, password , CFuser,currContest });
		const token = createToken(user._id);
		res.cookie("jwt", token, {
			httpOnly: true,
			maxAge: maxAge * 1000,
		});
		res.status(201).json({ user: user._id });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
}

module.exports = {
    getLogin,
    postLogin,
    getSignup,
    postSignup
}