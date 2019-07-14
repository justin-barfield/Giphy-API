// Giphy API key:
// TZuN5wWmbWU0ZjT6YzH5k5292AUhCHjO


// Create generic array of variables
// Write each variable as a button that calls an ajax query
// Get each variable to correctly pull from Giphy
// 
// Create an input and button on page to create new variables
// Each variable will make a new button and will pull with that term
// 

var log = console.log
    
var topics = [
    'Cats',
    'Dogs',
    'Happy',
    'Rainbow',
    'Coding',
    'Dark Souls',
    'Kingdom Hearts',
    'Anime',
    'RoosterTeeth',
    'Halo',

];

function writeTopics() {
    $.each(topics, function(index, value){
        $('#button-area').append('<button class="topics btn btn-info">' +value+ '</button>')
    })
}
writeTopics()

var giphyURL = 'https://api.giphy.com/v1/gifs/random?';
var giphyApiKey = 'api_key=TZuN5wWmbWU0ZjT6YzH5k5292AUhCHjO';
var giphyParameters = '&rating=pg&lang=en'

// Prevents enter on whole page
$(document).on("keydown", "form", function(event) { 
    return event.key != "Enter";
});

$('#submit').on('click', function() {
    var enteredTopic = $('#add-topic').val();
    topics.push(enteredTopic);
    $('#button-area').append('<button class="topics btn btn-info">' +enteredTopic+ '</button>');
    $('#add-topic').val('');
})

var stillGif;
var animatedGif;

$(document).on('click', '.topics', function(value, stillGif, animatedGif) {
    var selectedTopic = $(this).text();
    log(selectedTopic)
    var giphyTag = ('&tag=' + selectedTopic);
    var queryURL = giphyURL+giphyApiKey+giphyTag+giphyParameters;
    $('#giphy-area').css({
        display: 'block'
    })
    console.log(queryURL);
    console.log(giphyTag);
            
    
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .then(function(response) {
            var results = response.data;
            var rating = results.rating;

            stillGif = results.images.fixed_height_still.url
            animatedGif = results.images.fixed_height.url

            console.log(results);
            console.log(response);
            
            var giphyArea = $('#giphy-area');
            var giphyDiv = $('<div>');
            var giphyImage = $('<img>');
            var giphyParagraph = $('<p>');

            giphyArea.prepend(giphyDiv.append(giphyImage.attr({
                class: 'gif',
                src: stillGif,
                'data-still': stillGif,
                'data-animate': animatedGif,
                'data-state': 'still',
                alt: selectedTopic,
            })).addClass('giphys'))
        })
})

$(document).on('click', '.gif', function() {

    log(this)
    var getDataState = $(this).data('state');
    var getAnimateURL = $(this).data('animate');
    var getStillURL = $(this).data('still');


    var animateDataState = $(this).attr({
        src: animatedGif,
        'data-state': 'animate',
    });
    var stillDataState = $(this).attr({
        src: stillGif,
        'data-state': 'still',
    })

    if(getDataState === 'still'){
        $(this).attr({
            src: getAnimateURL,
        }).data('state', 'animate')
    } else if (getDataState === 'animate') {
        $(this).attr({
            src: getStillURL,
        }).data('state', 'still')
    }
})