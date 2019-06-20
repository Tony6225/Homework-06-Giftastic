let categories = [
    "Spagett",
    "Rick Flair",
    "Nicholas Cage",
    "Carlton Banks",
    "Macho Man"];

function renderButtons() {

    $(".button-display").empty();

    for (let i = 0; i < categories.length; i++) {
        let a = $("<button>");
        a.addClass("clicker btn btn-primary");
        a.attr("data-name", categories[i]);
        a.text(categories[i]);
        $(".button-display").append(a);
        console.log('cat array =' + categories + '-');
    }
}

renderButtons();

$("body").on("click", '#add-cat', function (event) {
    event.preventDefault();
    let cat = $("#cat-input").val().trim();
    if (cat == '') {
        alert('Please insert a category!')
    }
    else {
        categories.push(cat);
        console.log('cat array =' + categories + '-');
        $("#cat-input").val('')
        renderButtons();
    }
});

$("body").on("click", '.clicker', function () {
    let cat = $(this).attr("data-name");
    console.log("data-name -" + cat + "-");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        cat + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log("query -" + queryURL + "-");

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .done(function (response) {
            let results = response.data;
            console.log(response);
            $('#images').empty();

            for (let i = 0; i < results.length; i++) {
                let gifDiv = $("<div class='item'>");
                let rating = results[i].rating;
                let p = $('<p>')
                    .append('<span class="label label-lg label-info">Rating: <span class="badge">' + rating + '</span></span>');

                let catImage = $("<img class='img-thumbnail'>");
                let catUrl = results[i].images.fixed_height.url;
                let catStill = results[i].images.fixed_height_still.url;
                catImage.attr({
                    src: catStill,
                    'data-still': catStill,
                    'data-animate': catUrl,
                    'data-state': "still"
                });

                gifDiv.prepend(p);
                gifDiv.prepend(catImage);

                $("#images").prepend(gifDiv);
            };
        });
});

//Play or pause gif images
$("body").on("click", '.img-thumbnail', function () {
    let state = $(this).attr('data-state');

    if (state == 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    }
    else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
});