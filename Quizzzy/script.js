// authors: Kamil Donda, Remigiusz Drobinski

window.onload = () => {
    setPages();
};

let currentPage = 0;
const pages = document.getElementsByClassName('page');
const titleButtons = document.getElementsByClassName('title-button');
const backButton = document.getElementsByClassName('back-button');

// Set the display of all to "none"
const displayOffPages = () => {
    for(let i = 0; i < pages.length; i++){
        pages[i].style.display = "none";
    }
}

// Set the display of all pages except the first one to "none"
const setPages = () => {
    displayOffPages();
    pages[0].style.display = "block";
}

// Click button in title screen
for (let i = 0; i < titleButtons.length; i++) {
  titleButtons[i].onclick = function () {
    pages[currentPage].style.display = "none";
    currentPage = i + 1;
    pages[currentPage].style.display = "block";
  };
}

// Click back button
for (let i = 0; i < backButton.length; i++) {
  if (i <= 4)
    backButton[i].onclick = function () {
      pages[currentPage].style.display = "none";
      currentPage = 0;
      pages[currentPage].style.display = "block";
    };
}

const Categories = [
    {id: null, name: "All"},
    {id: 9, name:"General Knowledge"},
    {id: 10, name: "Books"},
    {id: 11, name: "Film"},
    {id: 12, name: "Music"},
    {id: 13, name: "Musicals & Theatres"},
    {id: 14, name: "Television"},
    {id: 15, name: "Video Games"},
    {id: 16, name: "Board Games"},
    {id: 17, name: "Science & Nature"},
    {id: 18, name: "Computers"},
    {id: 19, name: "Mathematics"},
    {id: 20, name: "Mythology"},
    {id: 21, name: "Sports"},
    {id: 22, name: "Geography"},
    {id: 23, name: "History"},
    {id: 24, name: "Politics"},
    {id: 25, name: "Art"},
    {id: 26, name: "Celebrities"},
    {id: 27, name: "Animals"},
    {id: 28, name: "Vehicles"},
    {id: 29, name: "Comics"},
    {id: 30, name: "Gadgets"},
    {id: 31, name: "Anime & Manga"},
    {id: 32, name: "Cartoon & Animations"}
];

// const yourUrl = "https://opentdb.com/api.php?amount=10&type=multiple";
// function Get(yourUrl){
//     var Httpreq = new XMLHttpRequest(); // a new request
//     Httpreq.open("GET",yourUrl,false);
//     Httpreq.send(null);
//     return Httpreq.responseText;          
// }

// var json_obj = JSON.parse(Get(yourUrl));
// console.log(json_obj.results);