// DOM variables
let start = document.getElementById("start-button");
let highScores = document.getElementById("highscores");
let seconds = document.getElementById("seconds");
let quizHeader = document.getElementById("quiz-header");
let quizContent = document.getElementById("quiz-content");
let incorrectAlert = document.getElementById("incorrect-alert");
let correctAlert = document.getElementById("correct-alert");
let score = 0;
let namesArray = [];
let scoresArray = [];
let secondsLeft = 75;

start.addEventListener("click" , startQuiz);

document.getElementById("highscores").addEventListener("click" , function(e){
    showHighScore();
    e.preventDefault();
})

function startQuiz(){
    // Removing start button and initial text
    quizHeader.nextElementSibling.remove();
    document.getElementById("start-button").remove();

    // Beginning to ask the user questions
    questionLoop(0);

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
}

function questionLoop(n){
    quizHeader.textContent = questions[n].title;

    let rowDiv = document.createElement("div");
    let colDiv = document.createElement("div");

    colDiv.className = "col-md-9 col-lg-5 mx-auto";

    // Creating choice buttons
    let choice1 = document.createElement("button");
    let choice2 = document.createElement("button");
    let choice3 = document.createElement("button");
    let choice4 = document.createElement("button");

    choice1.className = "btn btn-dark btn-block choice-btn";
    choice2.className = "btn btn-dark btn-block choice-btn";
    choice3.className = "btn btn-dark btn-block choice-btn";
    choice4.className = "btn btn-dark btn-block choice-btn";

    choice1.textContent = questions[n].choices[0];
    choice2.textContent = questions[n].choices[1];
    choice3.textContent = questions[n].choices[2];
    choice4.textContent = questions[n].choices[3];

    // Appending created elements
    colDiv.appendChild(choice1);
    colDiv.appendChild(choice2);
    colDiv.appendChild(choice3);
    colDiv.appendChild(choice4);

    rowDiv.appendChild(colDiv);
    quizContent.appendChild(rowDiv);
    quizContent.addEventListener("click", getUserChoice);

    function getUserChoice(e){
        // If the user clicks a button with text content that's equal to the correct answer
        if (e.target.className.includes("choice-btn") && e.target.textContent === questions[n].answer) {
            n++;
            score = score + 100; //Adds 100 to users score
            correctAlert.removeAttribute("hidden"); //Shows "Correct!"" alert
            setTimeout(hideCorrectAlert, 500); //Hides "Correct!" alert after .5 seconds

            quizContent.removeEventListener("click", getUserChoice); //removes event listener
            if (n < questions.length){
                hideQuestion(); //Hides question
                questionLoop(n); //Goes to next question
            } else {
                score = score + secondsLeft; //Adds any remaining seconds to final score
                secondsLeft = 0;
                seconds.textContent = 0;
            }

        // If the user clicks a button with text content that's not equal to the correct answer
        } else if (e.target.className.includes("choice-btn") && e.target.textContent !== questions[n].answer) {
            n++;
            incorrectAlert.removeAttribute("hidden");
            setTimeout(hideIncorrectAlert, 500); //Hides "Incorrect" alert after .5 seconds

            quizContent.removeEventListener("click", getUserChoice); //removes event listener
            if (n < questions.length && secondsLeft > 5){
                secondsLeft = secondsLeft - 10;
                seconds.textContent = secondsLeft;
                hideQuestion(); //Hides question
                questionLoop(n); //Goes to next question
            } else if (n < questions.length && secondsLeft <= 5) {
                secondsLeft = 0;
                seconds.textContent = secondsLeft;
                hideQuestion(); //Hides question
                doneScreen();
            } else {
                if (score > 0){
                    score = score + secondsLeft
                }
                secondsLeft = 0;
                seconds.textContent = secondsLeft;
            }
        }
    }
}

function hideCorrectAlert(){ //Function to hide "Correct!" alert
    correctAlert.setAttribute("hidden", true);
}

function hideIncorrectAlert(){ //Function to hide "Incorrect" alert
    incorrectAlert.setAttribute("hidden", true);
}

function hideQuestion(){ //Function to hide question
    if (quizContent.lastElementChild.textContent != "All done!") {
        quizContent.lastElementChild.remove();
    }
}

function doneScreen(){ //Screen we go to after the quiz is complete
    quizHeader.textContent = "All done!";

    // Creating elements for done screen
    let doneText = document.createElement("p");
    let formInlineDiv = document.createElement("div");
    let nameInput = document.createElement("input");
    let submitButton = document.createElement("button");

    // Adding attributes and text content to created elements
    doneText.textContent = "Your final score is " + score;
    formInlineDiv.className = "form-inline justify-content-center";
    nameInput.className = "form-control mr-2";
    nameInput.id = "name-input";
    nameInput.setAttribute("placeholder", "Name");
    submitButton.className = "btn btn-dark";
    submitButton.textContent = "Submit";
    
    // Appending elements to page
    formInlineDiv.appendChild(nameInput);
    formInlineDiv.appendChild(submitButton);
    quizContent.appendChild(doneText);
    quizContent.appendChild(formInlineDiv);
    
    submitButton.addEventListener("click" , addToLS);
}

function addToLS(){ //Adds score to local storage
    let scoresLS = localStorage.getItem("All Scores");
    let namesLS = localStorage.getItem("All Names");

    if (scoresLS === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(localStorage.getItem("All Scores"));
    }

    if (namesLS === null) {
        namesArray = [];
    } else {
        namesArray = JSON.parse(localStorage.getItem("All Names"));
    }

    scoresArray.push(score); //Adding score to scoresArray
    namesArray.push(document.getElementById("name-input").value); //Adding name to namesArray

    localStorage.setItem("All Scores" , JSON.stringify(scoresArray)); //Setting scoresArray to Local Storage
    localStorage.setItem("All Names" , JSON.stringify(namesArray)); //Setting namesArray to Local Storage

    showHighScore();
}

function showHighScore(){ //Shows high score
    quizContent.innerHTML = ""; //Clears quiz content
    quizContent.appendChild(quizHeader);
    quizHeader.textContent = "High Score:"

    scoresArr = JSON.parse(localStorage.getItem("All Scores"));
    namesArr = JSON.parse(localStorage.getItem("All Names"));

    let maxOfScoresArr = Math.max(...scoresArr); //Gets maximum value of scoresArr
    let maxOfNamesArr = namesArr[scoresArr.indexOf(maxOfScoresArr)]; //Gets name of highest scorer

    highScoreList = document.createElement("ol");
    highScoreItem = document.createElement("li");
    let goBackLink = document.createElement("a");

    highScoreItem.textContent = "Highest score - " + maxOfNamesArr +  ": " + maxOfScoresArr;
    goBackLink.textContent = "Go back";
    goBackLink.className = "btn btn-dark";
    goBackLink.setAttribute("href", "index.html");

    highScoreList.appendChild(highScoreItem);
    quizContent.appendChild(highScoreList);
    quizContent.appendChild(goBackLink);
}