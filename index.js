const express = require("express");
const morgan = require("morgan");
const request = require("request");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");


const { requireAuth } = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const contestRoutes = require("./routes/contestRoutes");
const blogRoutes = require("./routes/blogRoutes");
const allContestRoutes = require('./routes/allContestRoutes');

require('dotenv').config();

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use(express.json());
const dbURL = process.env.DB_URL;

mongoose
	.connect(dbURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then((result) => app.listen(process.env.PORT || 8000))
	.catch((err) => console.log(err));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

const title = "CF-contest";

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
	})
);
app.use(flash());
app.use((req, res, next) => {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg = req.flash("error_msg");
	res.locals.error = req.flash("error");
	next();
});

app.use("/",authRoutes);

app.get("/home", requireAuth, (req, res) => {
	res.render("home",{title});
});
app.use("/contest",requireAuth,contestRoutes);
app.use('/allContest',requireAuth,allContestRoutes);
app.use('/blogs',requireAuth,blogRoutes);



// app.get("/problem", requireAuth, (req, res) => {
// 	request(url, function (error, response, body) {
// 		if (error) {
// 			console.log(error);
// 			res.send(error);
// 		} else {
// 			res.render("question", { body, url, title });
// 		}
// 	});
// });
