// DOM variables
let start = document.getElementById("start-button");
let highScores = document.getElementById("highscores");
let seconds = document.getElementById("seconds");
let quizHeader = document.getElementById("quiz-header");
let quizContent = document.getElementById("quiz-content");
let choice = document.getElementById("choice-btn");
let scoreArray = [];
let score = 0;
let secondsLeft = 75;

start.addEventListener("click" , startQuiz);

function showQuestion(n){

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
        if (e.target.id === "choice-btn" && e.target.textContent === questions[n].answer) {
            scoreArray.push(true);
            console.log(scoreArray);
            n++;
            console.log(n);
            score = score + 100;
            console.log("Score: " + score);
            quizContent.removeEventListener("click", myFunction);
            if (n < questions.length){
                hideQuestion();
                showQuestion(n);
            } else {
                score = score + secondsLeft;
                console.log("Score " + score);
                secondsLeft = 0;
                seconds.textContent = 0;
                // hideQuestion();
                // doneScreen()
            }

        } else if (e.target.id === "choice-btn" && e.target.textContent !== questions[n].answer) {
            scoreArray.push(false);
            console.log(scoreArray);
            n++;
            console.log(n);
            console.log("Score: " + score);
            quizContent.removeEventListener("click", myFunction);
            if (n < questions.length && secondsLeft > 5){
                secondsLeft = secondsLeft - 10;
                seconds.textContent = secondsLeft;
                hideQuestion();
                showQuestion(n);
            } else if (n < questions.length && secondsLeft <= 5) {
                secondsLeft = 0;
                seconds.textContent = secondsLeft;
                hideQuestion();
                doneScreen();
            } else {
                if (score > 0){
                    score = score + secondsLeft;
                }
                console.log("Score " + score);
                secondsLeft = 0;
                seconds.textContent = secondsLeft;
            }
        }
    }
}

function hideQuestion(){
    if (quizContent.lastElementChild.textContent != "All done!") {
        quizContent.lastElementChild.remove();
    }
}

function doneScreen(){
    quizHeader.textContent = "All done!";
    // Creating and appending p element
    let doneText = document.createElement("p");
    doneText.textContent = "Your final score is " + score;
    quizContent.appendChild(doneText);

    // Creating and appending name input
    let doneInput = document.createElement("input");
    quizContent.appendChild(doneInput);

}

function startQuiz(){

    seconds.textContent = 75;
    countDown = setInterval(timer, 1000);
    function timer(){
        secondsLeft--;
        seconds.textContent = secondsLeft;
        if (secondsLeft < 1) {
            seconds.textContent = 0;
            clearInterval(countDown);
            hideQuestion();
            doneScreen();
        }
    }

    quizHeader.nextElementSibling.remove();
    document.getElementById("start-button").remove();

    showQuestion(0);
}