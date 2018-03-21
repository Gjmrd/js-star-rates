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
    var starPathStyle;

    for (i = 0; i < stars.length; i++){
        starPathStyle = stars[i].querySelector("path").style;
        if (i < rate)
            starPathStyle.fill = color;
        else 
            starPathStyle.fill = "none";
        starPathStyle.stroke = color;
    }
}


/* coloring stars on mouse moving */

$('.star').mouseover(function(event)
{
    var rate = event.currentTarget.getAttribute('data-star_id');

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

    var blockStars = event.currentTarget.closest('.block-stars');
    var title_id = blockStars.getAttribute('data-title_id');
    var score = event.currentTarget.getAttribute('data-star_id');

    /* updating info about score in HTML */
   
    $.ajax({
        type: 'POST',
        url:'UserRate/rate',
        data: {
            title_id: title_id,
            score: score,
        },
        success: function(data){
        	if (data['code'] == "204"){
        			blockStars.setAttribute('data-stars', score); 
    		 		blockStars.setAttribute('data-is_predicted', false);
    		 		colorStars(score, event.target, COLORS.rated);
        		}
        	else 
        		console.log(data['code'] +' : '+data['message']);

        },
    });
    
});


