
var movies = ["Severus snape", "oprah", "Bug bunny","cats","charlie chaplin","it's friday!"];

//$("document").ready(function () {

function renderButton() {
    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();
    // Looping through the array of movies
    for (var i = 0; i < movies.length; i++) {
        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("movie-btn");
        a.addClass("glow-on-hover");
        a.addClass("btn btn-dark");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", movies[i].trim());
        // Providing the button's text with a value of the movie at index i
        a.text(movies[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(a);
    }
}// function renderbutton()

function displayMovieInfo() {
    $('#movies-view').empty();

    var movie = $(this).attr("data-name");
    var myApiKey = "n43wiRnZ4tINe7A8XKW8s6XjjNSsZK7P";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + myApiKey + "&limit=10&rating=G&lang=en&q=" + movie;
    console.log(queryURL);

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.data);
        for (var i = 0; i < response.data.length; i++) {

            // Creating a div to hold the movie
            var movieDiv = $("<div>");
            movieDiv.addClass('col-md-4 ');
            movieDiv.addClass('movie');

            // Retrieving the URL for the image
            var stillImage = response.data[i].images.fixed_height_still.url;
            var animatedImage = response.data[i].images.fixed_height.url;

            // Creating an element to hold the image
            var image = $("<img class='gif'>");
            image.attr("src", stillImage);
            image.attr("data-state", "still");
            image.attr("data-still", stillImage);
            image.attr("data-animated", animatedImage);

            // Appending the image
            movieDiv.append(image);

            // Putting the entire movie above the previous movies
            $("#movies-view").prepend(movieDiv);
        }
    });
}

// If the clicked image's state is still, update its src attribute to what its data-animate value is.
// Then, set the image's data-state to animate
// Else set src to the data-still value
function stillAnimate() {

    var state = $(this).attr("data-state");
    if (state === "still") {
        //console.log($(this));
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

//add a new button
function addNewButton() {
    event.preventDefault();
    var newMovie = $("#movie-input").val().trim();
    if (!newMovie) {
        alert("Type something..");
    }
    else {
        movies.push(newMovie);
        renderButton();
    }
}

renderButton();
$(document).on("click", ".movie-btn", displayMovieInfo);
$(document).on("click", ".gif", stillAnimate);
$(document).on("click", "#add-movie", addNewButton);
//}); //document.ready()