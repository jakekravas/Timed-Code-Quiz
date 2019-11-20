// DOM variables
let start = document.getElementById("start-button");
let highScores = document.getElementById("highscores");
let seconds = document.getElementById("seconds");
let quizHeader = document.getElementById("quiz-header");
let quizContent = document.getElementById("quiz-content");
let choice = document.getElementById("choice-btn");
let incorrectAlert = document.getElementById("incorrect-alert");
let correctAlert = document.getElementById("correct-alert");
let score = 0;
let secondsLeft = 75;

start.addEventListener("click" , startQuiz);

function questionLoop(n){

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

    quizContent.addEventListener("click", getUserChoice);

    function getUserChoice(e){
        // If the user clicks a button with text content that's equal to the correct answer
        if (e.target.id === "choice-btn" && e.target.textContent === questions[n].answer) {
            n++;
            score = score + 100;
            console.log("Score: " + score);
            correctAlert.removeAttribute("hidden");
            setTimeout(hideCorrectAlert, 500);

            quizContent.removeEventListener("click", getUserChoice); //removes event listener
            if (n < questions.length){
                hideQuestion();
                questionLoop(n);
            } else {
                score = score + secondsLeft;
                console.log("Score " + score);
                secondsLeft = 0;
                seconds.textContent = 0;
            }

        // If the user clicks a button with text content that's not equal to the correct answer
        } else if (e.target.id === "choice-btn" && e.target.textContent !== questions[n].answer) {
            n++;
            console.log("Score: " + score);
            incorrectAlert.removeAttribute("hidden");
            setTimeout(hideIncorrectAlert, 500);

            quizContent.removeEventListener("click", getUserChoice); //removes event listener
            if (n < questions.length && secondsLeft > 5){
                secondsLeft = secondsLeft - 10;
                seconds.textContent = secondsLeft;
                hideQuestion();
                questionLoop(n);
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

function hideCorrectAlert(){
    correctAlert.setAttribute("hidden", true);
}

function hideIncorrectAlert(){
    incorrectAlert.setAttribute("hidden", true);
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

    // Creating form inline div
    let formInlineDiv = document.createElement("div");
    formInlineDiv.className = "form-inline justify-content-center";
    quizContent.appendChild(formInlineDiv);

    // Creating and appending name input
    let nameInput = document.createElement("input");
    nameInput.setAttribute("placeholder", "Name");
    nameInput.className = "form-control mr-2";
    formInlineDiv.appendChild(nameInput);

    // Creating and appending submit button
    let submitButton = document.createElement("button");
    submitButton.className = "btn btn-dark";
    submitButton.textContent = "Submit";
    formInlineDiv.appendChild(submitButton);
}

function startQuiz(){
    // Removing initial text and start button
    quizHeader.nextElementSibling.remove();
    document.getElementById("start-button").remove();

    // Starting timer
    seconds.textContent = 75;
    countDown = setInterval(timer, 1000);
    function timer(){
        secondsLeft--;
        seconds.textContent = secondsLeft;
        if (secondsLeft < 1) {
            seconds.textContent = 0;
            clearInterval(countDown);

            // Hiding questions and showing done screen when time runs out
            hideQuestion();
            doneScreen();
        }
    }

    // Looping through questions
    questionLoop(0);
}