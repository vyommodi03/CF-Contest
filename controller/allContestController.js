const fetch = require("node-fetch");
const date = require("date-and-time");
const User = require("../models/user");

const title = "CF-contest";

const getAllContest = async (req, res) => {
	const user = await User.findById(res.locals.id);

	const allContest = user.allContest;
	if (!(res.locals.currContest.time === undefined)) {
		allContest.pop();
	}
	const pattern = date.compile("ddd, MMM DD YYYY");
	allContest.forEach((element) => {

		let eleDate = new Date(element.Questions.time);
		eleDate = eleDate.getTime() + (eleDate.getTimezoneOffset() * 60000);
		eleDate = new Date(eleDate + (3600000*+5.5));

		element.Questions.date =
			date.format(eleDate, pattern) +
			", " +
			eleDate.toLocaleTimeString("en-US");
	});
	res.render("allContest", { allContest,title });
}


const getContest = async (req, res) => {

	const userProblemHandle = `https://codeforces.com/api/user.status?handle=${res.locals.CFuser.handle}`;
	var userProblem = await fetch(userProblemHandle);

	userProblem = await userProblem.json();
	userProblem = userProblem.result;

	userProblem = userProblem.filter((probObj) => {
		return probObj.verdict == "OK";
	});

	const user = await User.findById(res.locals.id);
	const contest = user.allContest[req.params.id];

	const Q1verdict = userProblem.filter((ele)=>{

		return ele.problem.name === contest.Questions.QuestionA.name && ele.problem.rating === contest.Questions.QuestionA.rating;
	});
	const Q2verdict = userProblem.filter((ele)=>{

		return ele.problem.name === contest.Questions.QuestionB.name && ele.problem.rating === contest.Questions.QuestionB.rating;
	});
	const Q3verdict = userProblem.filter((ele)=>{

		return ele.problem.name === contest.Questions.QuestionB.name && ele.problem.rating === contest.Questions.QuestionB.rating;
	});

	if(Q1verdict.length>0)
	{
		contest.Questions.QuestionA.correct = true;	
	}
	else{
		contest.Questions.QuestionA.correct = false;	

	}

	if(Q2verdict.length>0)
	{
		contest.Questions.QuestionB.correct = true;	
	}
	else{
		contest.Questions.QuestionB.correct = false;	

	}if(Q3verdict.length>0)
	{
		contest.Questions.QuestionC.correct = true;	
	}
	else{
		contest.Questions.QuestionC.correct = false;	

	}
	
	const pattern = date.compile("ddd, MMM DD YYYY");
	let contestDate = new Date(contest.Questions.time);
	contestDate = contestDate.getTime() + (contestDate.getTimezoneOffset() * 60000);
	contestDate = new Date(contestDate + (3600000*+5.5));

	contest.id = parseInt(req.params.id)+1;
	contest.Questions.date =
		date.format(contestDate, pattern) +
		", " +
		contestDate.toLocaleTimeString("en-US");
	res.render('pastContest' ,{ contest ,title});
}

module.exports = {
    getAllContest,
    getContest
}