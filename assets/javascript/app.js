var topics = ['Game of Thrones', 'Westworld', 'Adventure Time', 'The Walking Dead', 'Louie', 'Bleach', 'Parks and Recreation', 'Bobs Burger', 'Naruto', 'Spongebob Squarepants'];

var currentGif; 
var pausedGif; 
var animatedGif; 
var stillGif;


//something from GIPHY website
//var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=SElVB1p5fHk2EV8VzDk2IbOuXjrCRa3d&limit=5");
//xhr.done(function(data) { console.log("success got data", data); });


//this creates the buttons dynamically for the preset array that i have
function createButtons(){
	$('#showButtons').empty();
	for(var i = 0; i < topics.length; i++){
		var showBtn = $('<button>').text(topics[i]).addClass('showBtn').attr({'data-name': topics[i]});
		$('#showButtons').append(showBtn);
	}

	// this SHOULD display the gifs on a click but they don't do anything

	//this feels like where my problem should be???
	$('.showBtn').on('click', function(){
		$('.display').empty();

		var thisShow = $(this).data('name');
		var giphyURL = "https://api.giphy.com/v1/gifs/search?q=tv+show" + thisShow + "api_key=SElVB1p5fHk2EV8VzDk2IbOuXjrCRa3d&q=tv+shows&limit=10&offset=0&lang=en";
		$.ajax({url: giphyURL, 
			method: 'GET'}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				

				//if the rating is none then just say unrated
				if(thisRating == ''){
					thisRating = 'unrated';
				}
				var rating = $('<h3>').html('Rated: '+thisRating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}


//tried to make it animated if the mouse just hovered over the gif
$(document).on('mouseover','.playOnHover', function(){
    $(this).attr('src', $(this).data('animated'));
});
$(document).on('mouseleave','.playOnHover', function(){
    $(this).attr('src', $(this).data('paused'));
});



//add a new show 
$('#addShow').on('click', function(){
var newShow = $('#newShowInput').val().trim();
topics.push(newShow);
createButtons();
return false;
});

createButtons();
