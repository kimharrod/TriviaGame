$(document).ready(function(){

	var questionIndex = "";
	var gameQuestions = [];

	// Function to display a trivia question once a player lands on the game page.
	// Build the URL we need to query to database (get the info we want from the API).

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
 

 	});	
     
      



});
