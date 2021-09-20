# CF-Contest

In CF-Contest, you can give a contest of Codeforces unsolved question. 


## Usage

* First, you have to register yourself on the website with a unique username and password. In this, you have to provide a Codeforces handle. 

* After that, you can log in with that username and password. 

* You can give a contest by clicking on Enter Contest button.
 
* In Contest there will be three questions in increasing level of difficulty.
  1) 1st Question rating:- 900 - 1200
  2) 2nd Question rating:- 1300 - 1500
  3) 3rd question rating:- 1600 - 1900

   You have to submit a solution on the codeforces website. You have 1 hour 30 minutes to solve this question.
* After the contest end, you access that contest in the Contests section.

 ### Note
 * You can move, login-logout during the contest. The timer does not stop. 

## Technologies

[Node.js](https://nodejs.org/en/download/), MongoDB and express are used for the development.

HTML and CSS taken from [here](https://codepen.io/alliwagner/pen/jmsdf)



## Installation
You first need to download node.js from [here](https://nodejs.org/en/download/)

then run the following command on terminal 
```bash
git clone https://github.com/vyommodi03/CF-Contest.git
cd CF-Contest
npm install
```
now you have to set the environment variable in the .env file. You can refer .env_sample file for reference.

```bash
DB_URL= #Mongodb Database URL 
SESSION_SECRET = #secret key for session
AUTH_KEY = # JWT secret key for authentication
PORT = #port number
```


#### Run
```
node index.js
```

