// DOM variables
let start = document.getElementById("start-button");
let highScores = document.getElementById("highscores");
let seconds = document.getElementById("seconds");
let quizHeader = document.getElementById("quiz-header");

let questions = [{
    title: "What is something we're likely to use if we want to iterate through an object/array?",
    choices: ["if/else statement", "parseInt()", "event listener", "for loop" ],
    answer: "for loop"
}, {
    title: "Elements within an array are enclosed within_____",
    choices: ["curly brackets", "square brackets", "quotation marks", "parentheses"],
    answer: "square brackets"
}];

// Load event listener
start.addEventListener("click" , startQuiz);

function startQuiz(){
    quizHeader.textContent = questions[0].title;
    quizHeader.nextElementSibling.remove();
}