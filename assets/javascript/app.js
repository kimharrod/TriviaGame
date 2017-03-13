$(document).ready(function(){
	

	// Set variables for the game

	var apiResults = {};
	var questionIndex = 0;
	var questionIndices = [];
	var correctAnswerSlot = 0;
	var correctScore = 0;
	var wrongScore = 0;
	var totalScore = 0;
	var correctAnswer = "";
	var incorrectAnswers = [];
	var currentQuestion = "";
	

	// Set a click event for the answers

	$(".answer").bind("click", isCorrect);

	// Set a click event for the play again button

	$("#playagainbutton").click(playAgain);



	// The URL to make the necessary API call

    var queryURL = "https://opentdb.com/api.php?amount=40&category=22&difficulty=easy&type=multiple";


	// Perform an AJAX call to gather the question data from the API
	 $.ajax({
        url: queryURL,
        async: false,
        cache: false,
        method: "GET"
      }).done(function(response) {
	 
	 	  
    //Console log the queryURL and the response
	console.log(queryURL);
    console.log(response);
    
    //Put the API results into an array

    apiResults = response.results;
  

 	});	//end AJAX call
    
    //Console the first question from the response data

    console.log("First question: " + apiResults[0].question);

    
    // Function to initialize variables and choose a new question

	function initGame () {
	
	// Function to check if the game is over, i.e. 10 questions have been answered

	totalScore = correctScore + wrongScore;
		if (totalScore === 10) {
			$("#timeClock").removeClass('ended').data('countdown').stop();
			$("#gameisOver").text("Game over!");
			$(".answer").unbind("click");
			return;

		} // end of if

	questionIndex = 0;
	correctAnswerSlot = "";
	correctAnswer = "";
	currentQuestion = "none";
	$("#winlossMessage").text("");

	// Initiates loop to determine if each new questions is unique to that 10-question game session. 	

	
	while (currentQuestion === "none") {
		
		// Generate a random number from the length of the API results array, which is used to select the trivia question from the array

		questionIndex = Math.floor(Math.random() * apiResults.length);
	 	

		// Check to see of the question number has already been selected
	 	if (questionIndices.indexOf(questionIndex) === -1) {

	 	//If it hasn't been selected, then put the question number into an array to track selected questions and retrieve the question at that index position	
 		questionIndices.push(questionIndex);
 		currentQuestion = apiResults[questionIndex].question;
 		console.log("Current question: " + currentQuestion);

	 	} //end if
	} // end while
	
	// Console log the question indices that have accumulated in the tracking array

	console.log("Question indices: " + questionIndices); 
	
				
    // Display the game question
    
 	$("#askQuestion").html(currentQuestion);


 	// Code to display the correct answer in a random position amongst the four available answer slots

	// Select a random div to display the correct answer, by generating a random number between 1 and 4

	correctAnswerSlot = Math.floor((Math.random() * 3) +1);
	console.log("Correct answer slot: " + correctAnswerSlot);

 	// Retrieve the correct answer from the question object

 	correctAnswer = apiResults[questionIndex].correct_answer;
	console.log("Correct answer: " + correctAnswer);

	// Place the correct answer in the random div
	
	$("#" + "slot" + correctAnswerSlot).html(correctAnswer);

	// Retrieve the incorrect answers from the question object array

	incorrectAnswers = apiResults[questionIndex].incorrect_answers;
	console.log("Incorrect answers: " + incorrectAnswers);

	// Place the incorrect answers into the remaining answer slots

	var n = 0;

	// Loop through the div id slot numbers

	for (var i = 1; i < 5; i++) {

		// Skipping over the correct answer slot

		if (i != correctAnswerSlot) {

			// Insert the correct answers in the remaining slots

			$("#" + "slot" + i).html(incorrectAnswers[n]);
			n++;

		} // end if
	} // end for loop


	} // end InitGame function


	// Function to determine if correct answer is clicked

	function isCorrect () {

	// Determine the slot number clicked on from the id attribute

	var clickedSlot = $(this).attr("id");

	// Strip the initial characters from the id attribute, leaving only slot number. Typecast the string into a number.

	clickedSlot = Number(clickedSlot.slice(4));
	console.log("Clicked slot: " + clickedSlot);
	
	// If the clicked slot contains the correct answer, then display a success message and update the correct and incorrect displayed answer score

	if (clickedSlot === correctAnswerSlot) {

		$("#winlossMessage").text("You got it!");
		correctScore++;
		$("#winlossCounter").html("Correct: " + correctScore + "&nbsp;&nbsp;Incorrect: " + wrongScore);

		
		// We stop the timer when a correct answer is clicked

		$("#timeClock").removeClass('ended').data('countdown').stop();

		// We wait three seconds, and then ask the next question and restart the timer

		setTimeout(function() {
			$("#timeClock").removeClass('ended').data('countdown').update(+(new Date) + 10000).start();
			initGame ();
		}, 3000);		

	} else {
		
		youLost ();
	
	} // end success and failure if-else
	

	} // end isCorrect function


	// Function that displays a failure message on wrong answer or timeout and update the correct and incorrect displayed answer score

	function youLost () {

		$("#winlossMessage").text("Sorry, the answer was : " + correctAnswer);
		wrongScore++;
		$("#winlossCounter").html("Correct: " + correctScore + "&nbsp;&nbsp;Incorrect: " + wrongScore);
			
		//We stop the timer when an incorrect answer is clicked

		$("#timeClock").removeClass('ended').data('countdown').stop();
		

		//We wait three seconds, and then ask the next question and restart the timer

		setTimeout(function() {
			$("#timeClock").removeClass('ended').data('countdown').update(+(new Date) + 10000).start();
			initGame ();
		}, 3000);

		} // end youLost function


		// Function to fade out wrong answers

		// function fadeWrong () {
		// 	$("#" + "slot" + "n").fadeTo(2000, 0.1);

		// }

		// Function to play again by clicking play again button

		function playAgain () {
			correctScore = 0;
			wrongScore = 0;
			$("#winlossMessage").text("");
			$("#gameisOver").text("");
			$("#winlossCounter").html("Correct: " + correctScore + "&nbsp;&nbsp;Incorrect: " + wrongScore);
			
			// Wait two seconds, and then restart the timer when first question displays
			setTimeout(function() {
				$("#timeClock").removeClass('ended').data('countdown').update(+(new Date) + 10000).start();
				$(".answer").bind("click", isCorrect);
				initGame();
			}, 2000);

		} // end play again function


		//  Creates and initializes a countdown timer. The timer counts down 10 seconds per question.

		setTimeout(function() {
		$(function() {  

        $("#timeClock").countdown({
	          date: +(new Date) + 10000,
	          render: function(data) {
	            $(this.el).text(this.leadingZeros(data.sec, 2) + " sec");
	          },
	          onEnd: function() {
	          
	          // When time clock runs down to zero, call the youLost function, which displays the failure message and update the correct and incorrect displayed answer score	
	          youLost();

	          }
	          });     
      	  }); // end of countdown timer function

		}, 2000);
	 

initGame ();


});
