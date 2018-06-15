var topics = ['Game of Thrones', 'Westworld', 'Adventure Time', 'The Walking Dead', 'Louie', 'Bleach', 'Parks and Recreation', 'Bobs Burger', 'Naruto', 'Spongebob Squarepants'];
var currentGif; var pausedGif; var animatedGif; var stillGif;


function createButtons(){
	$('#showButtons').empty();
	for(var i = 0; i < topics.length; i++){
		var showBtn = $('<button>').text(topics[i]).addClass('showBtn').attr({'data-name': topics[i]});
		$('#showButtons').append(showBtn);
	}

	
	$('.showBtn').on('click', function(){
		$('.display').empty();

		var thisShow = $(this).data('name');
		var giphyURL = "http://api.giphy.com/v1/gifs/search?q=tv+show+" + thisShow + "&limit=10&api_key=dc6zaTOxFJmzC";
		$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				
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

$(document).on('mouseover','.playOnHover', function(){
    $(this).attr('src', $(this).data('animated'));
});
$(document).on('mouseleave','.playOnHover', function(){
    $(this).attr('src', $(this).data('paused'));
});


$('#addShow').on('click', function(){
var newShow = $('#newShowInput').val().trim();
topics.push(newShow);
createButtons();
return false;
});

createButtons();
