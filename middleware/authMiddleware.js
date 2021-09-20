const jwt = require("jsonwebtoken");
const User = require("../models/user");
const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	// Check json web token exist or Not
	if (token) {
		jwt.verify(token, process.env.AUTH_KEY, async (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.redirect("/");
			} else {
				let user = await User.findById(decodedToken.id);
				if (!user) {
					res.redirect("/");
				}
				else{
					res.locals.currContest = user.currContest;

					if (
						!(user.currContest.time === undefined) &&
						Date.now() - user.currContest.time >= 90 * 60 * 1000
					) {
						user = await User.findByIdAndUpdate(decodedToken.id, {
							currContest: {},
						});
						res.locals.currContest = user.currContest;
					}
					res.locals.CFuser = user.CFuser;
					res.locals.id = user.id;
					next();
	
				}
			}
		});
	} else {
		res.redirect("/");
	}
};

module.exports = { requireAuth };
