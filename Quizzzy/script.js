// authors: Kamil Donda, Remigiusz Drobinski

window.onload = () => {
  setPages();
};

let currentPage = 0;
let currentCategory = null;
let currentDifficulty = null;
const pages = document.getElementsByClassName("page");
const titleButtons = document.getElementsByClassName("title-button");
const backButton = document.getElementsByClassName("back-button");
const categoryUL = document.getElementById("category-list");
const difficultyUL = document.getElementById("difficulty-list");

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

// Click button in title screen
for (let i = 0; i < titleButtons.length; i++) {
  titleButtons[i].onclick = function () {
    setTimeout(function () {
      pages[currentPage].style.display = "none";
      currentPage = i + 1;
      pages[currentPage].style.display = "block";
      openPage();
    }, 100);
  };
}

// Click back button
for (let i = 0; i < backButton.length; i++) {
  if (i < 3)
    backButton[i].onclick = function () {
      pages[currentPage].style.display = "none";
      currentPage = 0;
      pages[currentPage].style.display = "block";
    };
}

const openPage = () => {
  // Category page
  if (currentPage == 1) openPageCategory();
  //   if (currentPage == 2)
  //   if (currentPage == 3)
  if (currentPage == 4) openPageDifficulty();
};

{/*         CATEGORY         */}
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

// Open category page
const openPageCategory = () => {
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
        currentCategory = Categories[i].id;
        pages[currentPage].style.display = "none";
        currentPage = 4;
        pages[currentPage].style.display = "block";
        openPage();
      }, 100);
    }
  }
};

{/*         DIFFICULTY         */}
// List of difficulty
const Difficulties = ["Easy", "Medium", "Hard", "All"];

// Open difficulty page
const openPageDifficulty = () => {
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
    for (let i = 0; i < Difficulties.length; i++) {
        setTimeout(function () {
          currentDifficulty = e.target.outerText;
          pages[currentPage].style.display = "none";
          currentPage = 5;
          pages[currentPage].style.display = "block";
          openPage();
        }, 100);
      }
  };

// const yourUrl = "https://opentdb.com/api.php?amount=10&type=multiple";
// function Get(yourUrl){
//     var Httpreq = new XMLHttpRequest(); // a new request
//     Httpreq.open("GET",yourUrl,false);
//     Httpreq.send(null);
//     return Httpreq.responseText;
// }

// var json_obj = JSON.parse(Get(yourUrl));
// console.log(json_obj.results);
