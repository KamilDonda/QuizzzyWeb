<h1 align="center">Quizzzy</h1>

[<h3 align="center">Demo</h3>](https://quizzzyapp.000webhostapp.com/)

## About the project
*Quizzzy* is a simple mobile web application. This is a quiz game. The user can choose a category and level of difficulty. Then 10 questions are displayed sequentially. There are four answers to each question. The response time is 20 seconds. After this time, if no answer has been chosen, the correct answer is marked. Finally, the result is displayed and saved in a JSON file.

The application was written using HTML, JS, CSS. Quizzes are from the [Open Trivia Database](https://opentdb.com/). After selecting the category and difficulty level, a query is generated and then a list of quizzes is downloaded in JSON format. After the quiz is completed, the result is sent to the [backend.php](https://github.com/KamilDonda/QuizzzyMWA/blob/main/Quizzzy/backend.php) file which overwrites the [data.json](https://github.com/KamilDonda/QuizzzyMWA/blob/main/Quizzzy/data.json) file. When the application is loaded, a query is sent to the backend.php file to retrieve the list of results.

## Usage

To be able to solve quizzes, you just need to download the project, unzip it, and then run index.html with your browser. However, you will not be able to access the results then.

For the application to work fully, you need to download and install [PHP](https://www.php.net/downloads) and add an environment variable.

To run the application on localhost, enter the command in cmd: ```php -S localhost:4000```. Of course, you can choose a different port.
This way the application will run on your computer.

To make the application available to anyone on your local network, you need to enter your computer's local IP address instead of "localhost".
To check your local IP, enter the command in cmd: ```ipconfig```.
Then: ```php -S {your:ip}:4000```, E.g. ```php -S 192.168.0.5:4000```.

Then, whether you chose the option with localhost or with your IP, in your browser enter the path dependent to the [index.html](https://github.com/KamilDonda/QuizzzyMWA/blob/main/Quizzzy/index.html) file.

If you launched the PHP server in ```C:\Users\username``` and unzipped the project on the desktop, the application address in the browser will be: on localhost: ```http://localhost:4000/Desktop/QuizzzyMWA-main/Quizzzy/index.html``` or on local IP: ```http://192.168.0.5:4000/Desktop/QuizzzyMWA-main/Quizzzy/index.html```

## Screenshots

<p>
  <h3 align="center">Title screen</h3>
  <p align="center">
    <img src="https://github.com/KamilDonda/QuizzzyMWA/blob/main/readme-images/title.jpg" width="250" alt="Title screen"/>
    <img src="https://github.com/KamilDonda/QuizzzyMWA/blob/main/readme-images/title-landscape.jpg" width="542" alt="Title screen - landscape"/>
  </p>
</p>

<p>
  <h3 align="center">Selecting a category</h3>
  <p align="center">
    <img src="https://github.com/KamilDonda/QuizzzyMWA/blob/main/readme-images/categories.jpg" width="250" alt="Categories"/>
    <img src="https://github.com/KamilDonda/QuizzzyMWA/blob/main/readme-images/categories-landscape.jpg" width="542" alt="Categories - landscape"/>
  </p>
</p>

<p>
  <h3 align="center">Selecting a level of difficulty</h3>
  <p align="center">
    <img src="https://github.com/KamilDonda/QuizzzyMWA/blob/main/readme-images/difficulty.jpg" width="250" alt="Level of difficulty"/>
    <img src="https://github.com/KamilDonda/QuizzzyMWA/blob/main/readme-images/difficulty-landscape.jpg" width="542" alt="Level of difficulty - landscape"/>
  </p>
</p>

<p>
  <h3 align="center">Question and answers</h3>
  <p align="center">
    <img src="https://github.com/KamilDonda/QuizzzyMWA/blob/main/readme-images/questions.jpg" width="250" alt="Question and answers"/>
    <img src="https://github.com/KamilDonda/QuizzzyMWA/blob/main/readme-images/questions-landscape.jpg" width="542" alt="Question and answers - landscape"/>
  </p>
</p>

<p>
  <h3 align="center">Selecting a answer</h3>
  <p align="center">
    <img src="https://github.com/KamilDonda/QuizzzyMWA/blob/main/readme-images/selected-question.jpg" width="250" alt="Selecting a answer"/>
    <img src="https://github.com/KamilDonda/QuizzzyMWA/blob/main/readme-images/selected-question-landscape.jpg" width="542" alt="Selecting a answer - landscape"/>
  </p>
</p>

<p>
  <h3 align="center">Result</h3>
  <p align="center">
    <img src="https://github.com/KamilDonda/QuizzzyMWA/blob/main/readme-images/result.jpg" width="250" alt="Result"/>
    <img src="https://github.com/KamilDonda/QuizzzyMWA/blob/main/readme-images/result-landscape.jpg" width="542" alt="Result - landscape"/>
  </p>
</p>

<p>
  <h3 align="center">Results</h3>
  <p align="center">
    <img src="https://github.com/KamilDonda/QuizzzyMWA/blob/main/readme-images/results.jpg" width="250" alt="Results"/>
  </p>
</p>

## License
This project is licensed under [MIT license](https://opensource.org/licenses/MIT).
