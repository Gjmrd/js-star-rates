/* 5 STAR RATING SCRIPT  by @gjmrd */


/* put your color hex-codes in const below */

COLORS = {
	predicted: 'blue',
	hovered: '#ff9231',
	rated: 'orange',
};

/* 
function coloring stars

args
	rate: rating,
	starTarget: object that triggered listener,
	color: chosen color
 */
 
function colorStars(rate, starTarget, color){

	var stars = starTarget.closest("ul").getElementsByClassName('star');

	for (i = 0; i < stars.length; i++){
		if (i < rate)
			stars[i].childNodes[0].childNodes[1].style.fill = color;
		else 
			stars[i].childNodes[0].childNodes[1].style.fill = "none";
		
		stars[i].childNodes[0].childNodes[1].style.stroke = color;
	}
}


/* coloring stars on mouse moving */

$('.star').mouseover(function(event)
{
	var rate = event.currentTarget.getAttribute('data-star_id')

	colorStars(rate, event.target, COLORS.hovered);

});

$('.block-stars').mouseleave(function(event)
{
	var currentScore = event.currentTarget.getAttribute('data-stars');
	var isPredicted = event.currentTarget.closest(".block-stars").getAttribute('data-is_predicted');

	colorStars(currentScore, event.target, COLORS.rated)

});



/* coloring stars and sending rate request */

$('.star').click(function(event)
{
	event.preventDefault();

	var title_id = event.currentTarget.closest('.block-stars').getAttribute('data-title_id');
	var score = event.currentTarget.getAttribute('data-star_id');

	//console.log(score);
	//console.log(title_id);


	/* updating info about score in HTML */
	event.currentTarget.closest(".block-stars").setAttribute('data-stars', score); 
	event.currentTarget.closest(".block-stars").setAttribute('data-is_predicted', false);
	colorStars(score, event.target, COLORS.rated);
	/*
	$.ajax({
		type: 'POST',
		url:'UserRate/rate',
		data: {
			title_id: title_id,
			score: score,
		},
		success: function(callback){
		//callbackfunction
			event.currentTarget.closest("div").setAttribute('data-stars', score);
		},
	});
	*/
});


