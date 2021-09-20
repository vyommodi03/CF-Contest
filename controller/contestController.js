const User = require("../models/user");
const fetch = require("node-fetch");

const title = "CF-contest";

const getContest = async (req, res) => {
	if (!(res.locals.currContest.time === undefined)) {
		res.locals.question = res.locals.currContest;
		res.render("contest",{title});
	} else {
		const userProblemHandle = `https://codeforces.com/api/user.status?handle=${res.locals.CFuser.handle}`;
		var userProblem = await fetch(userProblemHandle);

		userProblem = await userProblem.json();
		userProblem = userProblem.result;

		userProblem = userProblem.filter((probObj) => {
			return probObj.verdict == "OK";
		});

		userProblem = userProblem.map((prob) => {
			return prob.problem;
		});

		const allProblemsURL = "https://codeforces.com/api/problemset.problems";
		var allProblem = await fetch(allProblemsURL);

		allProblem = await allProblem.json();
		allProblem = allProblem.result.problems;

		const notSolvedByUser = allProblem.filter((prob) => {
			let tmp = userProblem.filter((ele) => {
				return ele.name === prob.name && ele.rating === prob.rating;
			});
			return tmp.length == 0;
		});

		const QuestionASet = notSolvedByUser.filter((ele) => {
			return ele.rating >= 900 && ele.rating <= 1200;
		});
		const QuestionBSet = notSolvedByUser.filter((ele) => {
			return ele.rating >= 1300 && ele.rating <= 1500;
		});
		const QuestionCSet = notSolvedByUser.filter((ele) => {
			return ele.rating >= 1600 && ele.rating <= 1900;
		});

		const QuestionA =
			QuestionASet[Math.floor(Math.random() * QuestionASet.length)];
		const QuestionB =
			QuestionBSet[Math.floor(Math.random() * QuestionBSet.length)];
		const QuestionC =
			QuestionCSet[Math.floor(Math.random() * QuestionCSet.length)];

		QuestionA.link = `https://codeforces.com/contest/${QuestionA.contestId}/problem/${QuestionA.index}`;
		QuestionB.link = `https://codeforces.com/contest/${QuestionB.contestId}/problem/${QuestionB.index}`;
		QuestionC.link = `https://codeforces.com/contest/${QuestionC.contestId}/problem/${QuestionC.index}`;

		const Questions = {
			time: Date.now(),
			QuestionA,
			QuestionB,
			QuestionC,
		};

		const tmp = await User.findByIdAndUpdate(res.locals.id, {
			currContest: Questions,
		});
		await User.findByIdAndUpdate(
			{ _id: res.locals.id },
			{ $push: { allContest: { Questions } } }
		);
		res.locals.question = Questions;
		res.render("contest",{title});
	}
}

module.exports ={
    getContest
}