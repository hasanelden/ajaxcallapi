var jsonObject = [];

$(document).ready(function() {
    var object = localStorage.film;
    console.log(object)
    if (object != null) {
        var localmovies = JSON.parse(localStorage.film)

        $.each(localmovies, function(index, element) {


            jsonObject.push(element)




            var movie = PrepareElement(element);



            $(".sonarananlar").append(movie);



        });
    }
    $("#searchButton").on("click", function() {

        if (jsonObject.length > 9) {

            jsonObject.shift().remove()
        }


        var searchText = $("#searchText").val();


        $.ajax({
            url: "https://www.omdbapi.com/?apikey=63f944af&t=" + searchText,



            success: function(data) {


                if (searchText != false) {
                    jsonObject.push(data);

                    var movie = PrepareElement(data);

                    localStorage.setItem('film', JSON.stringify(jsonObject));




                    $(".Movies").append(movie)
                } else {
                    alert('Lütfen text alanını doldurunuz')
                }


            },

            error: function() {
                alert("Film aranırken bir hata ile karşılaşıldı")
            }
        });

    });

});


function PrepareElement(element) {

    var score = parseFloat(element.imdbRating) * 10;
    var indicatorClass = "red";
    if (score >= 50 && score <= 99) {
        indicatorClass = "yellow";
    } else if (score > 99) {
        indicatorClass = "green";
    }

    var movie = "<div class='filmContainer'>" +

        "<img src=" + element.Poster + "/>" +

        "<div class='filmContainer-info'>" +
        "<div class='content'>" +
        "<div class='title'><h3>" + element.Title + "</h3>  </div>" +
        // "<h4>Premier Date:" + data.Year + "</h4>" +
        "<span  class='imdb'>" + element.imdbRating + "</span>" +
        "</div>" +
        "<div class='indicator-container' style='background:#bba5a5'>" +
        "<div class='" + indicatorClass + "' style='height:20px;width:" + score + "%' />" +
        "</div></div>" +
        "<div class='deleteContent'><a class='deleteBtn' href='javascript:void(0)' onclick='deleteItem($(this))') > SİL </a></div>" +
        "</div>";

    return movie;
}

function deleteItem(element) {


    var title = element.parent().find("h3").text();
    var deletedItem = jsonObject.find(x => x.Title == title);
    jsonObject.splice($.inArray(deletedItem, jsonObject), 1);
    localStorage.setItem('film', JSON.stringify(jsonObject));

    var e = element.parent().parent();
    $(e).remove()

}