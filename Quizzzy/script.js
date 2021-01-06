// authors: Kamil Donda, Remigiusz Drobinski

window.onload = () => {
  setPages();
  prepopulateCategory();
  prepopulateDifficulty();
  createAnswerList();
};

//#region VARIABLES AND CONSTS
let currentPage = 0;
let selectedCategory = null;
let selectedDifficulty = null;

let quizList;
let category;
let question;
let answers;
let correctAnswer;
let index = 0;

let RESULT = 0;

const TIME = 2000;
let timeLeft = TIME;
let timer;

const json = new Object();

const pages = document.getElementsByClassName("page");
const titleButtons = document.getElementsByClassName("title-button");
const backButton = document.getElementsByClassName("back-button");
const categoryUL = document.getElementById("category-list");
const difficultyUL = document.getElementById("difficulty-list");
const categoryName = document.getElementById("category-name");
const questionIndex = document.getElementById("question-index");
const questionName = document.getElementById("question");
const refresh = document.getElementsByClassName("refresh");
const table = document.getElementById("result-table");
//#endregion

//#region PAGES
// Set the display of all to "none"
const displayOffPages = () => {
  for (let i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }
};

// Set the display of all pages except the first one to "none"
const setPages = () => {
  displayOffPages();
  pages[0].style.display = "block";
};
//#endregion

//#region BUTTONS
// Click button in title screen
for (let i = 0; i < titleButtons.length; i++) {
  titleButtons[i].onclick = function () {
    setTimeout(function () {
      pages[currentPage].style.display = "none";
      currentPage = i + 1;
      pages[currentPage].style.display = "block";

      if (currentPage === 2) clickResults();
    }, 100);
  };
}

// Click back button
for (let i = 0; i < backButton.length; i++) {
  backButton[i].onclick = function () {
    pages[currentPage].style.display = "none";
    if (i < 3) currentPage = 0;
    else if (i == 3) currentPage = 1;
    pages[currentPage].style.display = "block";
  };
}
//#endregion

//#region RESULTS
const clickResults = () => {
  get();
};

// Prepopulate results page
const prepopulateResults = (results) => {
  for (let i = 0; i < results.length; i++) {
    const tr = document.createElement("tr");

    const td_id = document.createElement("td");
    const td_date = document.createElement("td");
    const td_result = document.createElement("td");
    const td_category = document.createElement("td");
    const td_difficulty = document.createElement("td");

    const cat = Categories.find(n => n.id === results[i].category);

    td_id.appendChild(document.createTextNode(results[i].id));
    td_date.appendChild(document.createTextNode(results[i].date));
    td_result.appendChild(document.createTextNode(results[i].result));
    td_category.appendChild(document.createTextNode(cat.name));
    td_difficulty.appendChild(document.createTextNode(results[i].difficulty));

    tr.appendChild(td_id);
    tr.appendChild(td_date);
    tr.appendChild(td_result);
    tr.appendChild(td_category);
    tr.appendChild(td_difficulty);

    table.appendChild(tr);
  }
};
//#endregion

//#region CATEGORY
// List of categories
const Categories = [
  { id: null, name: "All" },
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Books" },
  { id: 11, name: "Film" },
  { id: 12, name: "Music" },
  { id: 13, name: "Musicals & Theatres" },
  { id: 14, name: "Television" },
  { id: 15, name: "Video Games" },
  { id: 16, name: "Board Games" },
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Computers" },
  { id: 19, name: "Mathematics" },
  { id: 20, name: "Mythology" },
  { id: 21, name: "Sports" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 24, name: "Politics" },
  { id: 25, name: "Art" },
  { id: 26, name: "Celebrities" },
  { id: 27, name: "Animals" },
  { id: 28, name: "Vehicles" },
  { id: 29, name: "Comics" },
  { id: 30, name: "Gadgets" },
  { id: 31, name: "Anime & Manga" },
  { id: 32, name: "Cartoon & Animations" },
];

// Prepopulate category page
const prepopulateCategory = () => {
  for (let i = 0; i < Categories.length; i++) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerHTML = Categories[i].name;
    button.onclick = clickCategory;
    button.setAttribute("class", "button");
    li.appendChild(button);
    categoryUL.appendChild(li);
  }
};

// Get id of category and open difficulty page
const clickCategory = (e) => {
  for (let i = 0; i < Categories.length; i++) {
    if (e.target.outerText === Categories[i].name) {
      setTimeout(function () {
        selectedCategory = Categories[i].id;
        pages[currentPage].style.display = "none";
        currentPage = 4;
        pages[currentPage].style.display = "block";
      }, 100);
    }
  }
};
//#endregion

//#region DIFFICULTY
// List of difficulty
const Difficulties = ["Easy", "Medium", "Hard", "All"];

// Prepopulate difficulty page
const prepopulateDifficulty = () => {
  for (let i = 0; i < Difficulties.length; i++) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerHTML = Difficulties[i];
    button.onclick = clickDifficulty;
    button.setAttribute("class", "button");
    li.appendChild(button);
    difficultyUL.appendChild(li);
  }
};

// Get id of category and open difficulty page
const clickDifficulty = (e) => {
  setTimeout(function () {
    selectedDifficulty = e.target.outerText;
    startQuizPage();
  }, 100);
};
//#endregion

//#region QUIZ
// Start page with quiz
const startQuizPage = () => {
  const URL = setCategoryAndDifficulty(selectedCategory, selectedDifficulty);
  const json = JSON.parse(Get(URL));
  quizList = json.results;

  pages[currentPage].style.display = "none";
  currentPage = 5;
  pages[currentPage].style.display = "block";

  setTimeout(function () {
    newQuiz();
  }, 500);
};

const newQuiz = () => {
  let currentQuiz = quizList[index];

  if(currentQuiz == null){
    goToErrorPage();
    return;
  }

  category = currentQuiz.category;
  question = currentQuiz.question;
  correctAnswer = decode(currentQuiz.correct_answer);

  answers = currentQuiz.incorrect_answers;
  answers.push(correctAnswer);
  answers = answers.sort(() => Math.random() - 0.5);

  categoryName.innerHTML = category;
  questionIndex.innerHTML = "Question " + (index + 1);
  questionName.innerHTML = question;

  // Set text with answer to buttons
  const answerList = document.getElementsByClassName("answerList");
  for (let i = 0; i < 4; i++) {
    answerList[i].innerHTML = answers[i];
    answerList[i].setAttribute("class", "button answerList");
    answerList[i].disabled = false;
  }

  timerStart();
};

// Create list of answers
const createAnswerList = () => {
  const ul = document.getElementById("answer-list");

  for (let i = 0; i < 4; i++) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.onclick = clickAnswer;
    button.setAttribute("class", "button answerList");
    button.setAttribute("id", "answer_" + i);
    li.appendChild(button);
    ul.appendChild(li);
  }
};

// Click Answer
const clickAnswer = (e) => {
  const clickedAnswer = e.target.outerText;
  const answerList = document.getElementsByClassName("answerList");

  // Disable buttons if they was clicked
  for (let i = 0; i < 4; i++) {
    answerList[i].disabled = true;
  }

  // Change color of selected answer to green (correct) or red (uncorrect)
  setTimeout(function () {
    timerStop();
    if (clickedAnswer == correctAnswer) {
      e.target.setAttribute("class", "button answerList correct-button");
      RESULT++;
    } else {
      e.target.setAttribute("class", "button answerList incorrect-button");
    }
    index++;
  }, 100);

  // Select right answer if uncorrect is selected
  setTimeout(function () {
    for (let i = 0; i < 4; i++) {
      if (answerList[i].innerHTML == correctAnswer)
        answerList[i].setAttribute("class", "button answerList correct-button");
    }
  }, 500);

  // Go to next quiz
  setTimeout(function () {
    if (index < 10) {
      newQuiz();
      timerReset();
    } else {
      goToResult();
    }
  }, 2300);
};

//#region timer
const timerStart = () => {
  timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer);
      timeIsUp();
    }
    document.getElementById("timer").value = TIME - timeLeft;
    timeLeft -= 1;
  }, 10);
};

const timerStop = () => {
  clearInterval(timer);
};

const timerReset = () => {
  document.getElementById("timer").value = 0;
  timeLeft = TIME;
};

const timeIsUp = () => {
  const answerList = document.getElementsByClassName("answerList");
  // Disable buttons if time is up
  for (let i = 0; i < 4; i++) {
    answerList[i].disabled = true;
  }

  for (let i = 0; i < 4; i++) {
    if (answerList[i].innerHTML == correctAnswer)
      answerList[i].setAttribute(
        "class",
        "button answerList time-is-up-button"
      );
  }
  setTimeout(function () {
    if (index < 9) {
      index++;
      newQuiz();
      timerReset();
    } else {
      goToResult();
    }
  }, 2000);
};
//#endregion
//#endregion

//#region RESULT
const goToResult = () => {
  pages[currentPage].style.display = "none";
  currentPage = 6;
  pages[currentPage].style.display = "block";

  index = 0;

  const result = document.getElementById("result");

  result.innerHTML = `${RESULT}/10`;

  send();
};

for (let i = 0; i < refresh.length; i++) {
  refresh[i].onclick = function () {
    const ref = document.getElementsByClassName("ref")[i];
    ref.classList.toggle("rotated");
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
  };
}
//#endregion

//#region ERROR
const goToErrorPage = () => {
  pages[currentPage].style.display = "none";
  currentPage = 7;
  pages[currentPage].style.display = "block";
};
//#endregion

//#region API
const setCategoryAndDifficulty = (category, difficulty) => {
  let URL;
  difficulty = difficulty.toLowerCase();

  if (category !== null) {
    if (difficulty === "all") {
      URL = `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`;
    } else {
      URL = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
    }
  } else {
    URL = "https://opentdb.com/api.php?amount=10&type=multiple";
  }
  return URL;
};

function Get(URL) {
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET", URL, false);
  Httpreq.send(null);
  return Httpreq.responseText;
}
//#endregion

const decode = (s) => {
  const text = document.createElement("textarea");
  text.innerHTML = s;
  return text.value;
};

//#region PHP
const createJSON = () => {
  json.date =  new Date().toLocaleDateString();
  json.category = selectedCategory;
  json.difficulty = selectedDifficulty;
  json.result = RESULT;

  const jsonString = JSON.stringify(json);
  return jsonString;
};

const send = () => {
  const request = new XMLHttpRequest();
  request.open("POST", "backend.php", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(createJSON());
};

const get = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "backend.php", true);
  request.onreadystatechange = function(){
      if(this.readyState === 4 && this.status === 200){
          const responseJSON = JSON.parse(this.responseText);
          prepopulateResults(responseJSON);
      }
  }
  request.send();
};

// const showResponse = (responseJSON) => {
//   console.log("Output", responseJSON);
// };
//#endregion