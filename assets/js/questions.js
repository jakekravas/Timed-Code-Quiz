// DOM variables
let start = document.getElementById("start-button");
let highScores = document.getElementById("highscores");
let seconds = document.getElementById("seconds");
let quizHeader = document.getElementById("quiz-header");
let quizContent = document.getElementById("quiz-content");
let choice = document.getElementById("choice-btn");
let scoreArr = [];
let x = 0;

let questions = [{
    title: "What is something we're likely to use if we want to iterate through an object/array?",
    choices: ["if/else statement", "parseInt()", "event listener", "for loop" ],
    answer: "for loop"
}, {
    title: "Elements within an array are enclosed within_____",
    choices: ["curly brackets", "square brackets", "quotation marks", "parentheses"],
    answer: "square brackets"
}, {
    title: "this is my third title",
    choices: ["aaaa", "bbbbb", "ccccc", "ddddd"],
    answer: "aaaa"
}];

// Load event listener
start.addEventListener("click" , startQuiz);

function showQuestion(n){

    // if (x >= questions.length) {
    //     console.log(scoreArr);
    //     return scoreArr;
    // }

    quizHeader.textContent = questions[n].title;

    let rowDiv = document.createElement("div");
    let colDiv = document.createElement("div");
    colDiv.className = "col-md-9 col-lg-5 mx-auto";

    let choice1 = document.createElement("button");
    choice1.className = "btn btn-dark btn-block";
    choice1.id = "choice-btn";

    let choice2 = document.createElement("button");
    choice2.className = "btn btn-dark btn-block";
    choice2.id = "choice-btn";

    let choice3 = document.createElement("button");
    choice3.className = "btn btn-dark btn-block";
    choice3.id = "choice-btn";

    let choice4 = document.createElement("button");
    choice4.className = "btn btn-dark btn-block";
    choice4.id = "choice-btn";

    let choice = document.getElementById("choice-btn");

    choice1.textContent = questions[n].choices[0];
    choice2.textContent = questions[n].choices[1];
    choice3.textContent = questions[n].choices[2];
    choice4.textContent = questions[n].choices[3];

    colDiv.appendChild(choice1);
    colDiv.appendChild(choice2);
    colDiv.appendChild(choice3);
    colDiv.appendChild(choice4);

    rowDiv.appendChild(colDiv);

    quizContent.appendChild(rowDiv);

    quizContent.addEventListener("click", myFunction);

    function myFunction(e){

        if (e.target.id === "choice-btn" && e.target.textContent === questions[x].answer) {
            console.log("right");
            scoreArr.push(true);
            console.log(scoreArr);
            hideQuestion();
            x++;
            console.log(x);
            quizContent.removeEventListener("click", myFunction);
            if (x < questions.length){
                showQuestion(x);
            }

        } else if (e.target.id === "choice-btn" && e.target.textContent !== questions[x].answer) {
            console.log("wrong");
            scoreArr.push(false);
            console.log(scoreArr);
            hideQuestion();
            x++;
            console.log(x);
            quizContent.removeEventListener("click", myFunction);
            if (x < questions.length){
                showQuestion(x);
            }
        }

        e.preventDefault();
    }
}

function hideQuestion(){
    quizContent.lastElementChild.remove();
}


function startQuiz(){
    quizHeader.nextElementSibling.remove();
    document.getElementById("start-button").remove();

    showQuestion(0);
}