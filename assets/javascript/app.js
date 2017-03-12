$(document).ready(function(){

	var questionIndex = "";
	var gameQuestions = [];
	var correctAnswerSlot = "";
	var correctAnswers = 0;
	var correctAnswer = "";
	var incorrectAnswers = 0;
	

	// The URL we need to query to database (get the info we want from the API):

    var queryURL = "https://opentdb.com/api.php?amount=40&category=22&difficulty=easy&type=multiple";


	// We then created an AJAX call
	 $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
	 
	 	  
    //Console log the queryURL and the response
	console.log(queryURL);
    console.log(response);
    
    //Set a variable to represent the API array data

    var apiResults = response.results;
    console.log(apiResults[0].question);

 	// Generate a random number between 0 and 49, which is used to select the trivia question


	questionIndex = Math.floor((Math.random() * 49) +1);
 	console.log(questionIndex);
 	var currentQuestion = apiResults[questionIndex].question;
 	console.log(currentQuestion);

	// If the question index hasn't already been chosen, then push it into a array used to track which question have already been chosen
			

	if (gameQuestions.indexOf(questionIndex) === -1) {
		gameQuestions.push(questionIndex);
	}
				

    // Display the game question and answers
    
 	$("#askQuestion").html(currentQuestion);


 	// Select a div to display the correct answer, by generating a random number between 1 and 4


	correctAnswerSlot = Math.floor((Math.random() * 3) +1);
	correctAnswer = apiResults[questionIndex].correct_answer;
	console.log(correctAnswer);
	$("#" + "slot" + correctAnswerSlot).html(correctAnswer);

	// Place the incorrect answers into the remaining answer slots

	var incorrectAnswers = apiResults[questionIndex].incorrect_answers;
	console.log(incorrectAnswers);

	var n = 0;
	for (var i = 1; i < 5; i++) {
		if (i != correctAnswerSlot) {
			$("#" + "slot" + i).html(incorrectAnswers[n]);
			n++;
		}

	}

	


 	});	
     
   
     	// Set the click event for the answers on the page

		$(".answer").click(isCorrect); 

		// Function to determine if correct answer is clicked

		function isCorrect () {

		// Determine the slot number clicked on from the id attribute

		var clickedSlot = $(this).attr("id");

		// Finally, strip the initial characters from the id attribute, leaving only slot number

		clickedSlot = clickedSlot.slice(4);
		console.log(clickedSlot);
		console.log(correctAnswerSlot);

		if (clickedSlot == correctAnswerSlot) {

			$("#winlossMessage").text("You got it!");
			correctAnswers++;
			$("#winlossCounter").html("Correct: " + correctAnswers + "&nbsp;&nbsp;Incorrect: " + incorrectAnswers);

		} else {

			$("#winlossMessage").text("Sorry, the answer was : " + correctAnswer);
			incorrectAnswers++;
			$("#winlossCounter").html("Correct: " + correctAnswers + "&nbsp;&nbsp;Incorrect: " + incorrectAnswers);
			
		}

		} // end isCorrect function

});
