'use strict';

// We wait for the Document Object Model to be loaded.
document.addEventListener( 'DOMContentLoaded', function() {
    console.info( 'The document is loaded and the file is linked to the index.html file.');
});

var key = "nQGhQm8MtOQ4mTrszAnbt0NbFBZbZbYWmIJRgPxU";

// var date = "2017-12-1";

var today = new Date();
var todayFormat = today.toISOString().substring(0, 10);
var todayDay = todayFormat.substring(8,10);
var todayMonth = todayFormat.substring(5,7);
var todayYear = todayFormat.substring(0,4);
var prevDayGlobal = todayDay;
var prevMonthGlobal = todayMonth;
var prevYearGlobal = todayYear;

$('#prev').on('click', function(){
    var prevDay = prevDayGlobal - 1;
    var prevMonth = prevMonthGlobal;
    var prevYear = prevYearGlobal;

    if(prevDay == 0){
        prevMonth = prevMonthGlobal - 1;
        prevDay = 30;
    }
    if (prevMonth == 0){
        prevYear = prevYearGlobal - 1;
        prevMonth = 12;
    }
    url = "https://api.nasa.gov/planetary/apod?api_key="+key+"&date="+prevYear+"-"+prevMonth+"-"+prevDay;
    $.ajax({
        url: url,
        success: function(result){
            if("copyright" in result) {
                $("#copyright").text("Image Credits: " + result.copyright);
            }
            else {
                $("#copyright").text("Image Credits: " + "Public Domain");
            }

            $("#apod__img__id").css("display", "none");
            $("#apod__vid__id").css("display", "none");
            $(".video__container").css("display", "none");
            $(".container").css("display", "none");

            if(result.media_type == "video") {
                $("#apod__vid__id").css("display", "block");
                $(".video__container").css("display", "block");
                $("#apod__vid__id").attr("src", result.url);
                $(".video__container").css("height", "600px");
                $('.video__container').addClass('is-visible');
            }
            else {
                $("#apod__img__id").css("display", "block");
                $(".container").css("display", "block");
                $(".video__container").css("height", "0");
                $("#apod__img__id").attr("src", result.url);
                $('.container').addClass('is-visible');
            }

            console.info(JSON.stringify(result, null, 4));
            $("#apod__explaination").text(result.explanation);
            $("#apod__title").text(result.title);
            $("#apod__title__mainpage").text(result.title);
            $("#apod__date").text(result.date);

            if(result.date == todayFormat){
                $("#next").css("display", "none");
            }
            else{
                $("#next").css("display", "inline-block");
            }
            // setTimeout(loader,3000);

        }
    });
    prevDayGlobal = prevDay;
    prevMonthGlobal = prevMonth;
    prevYearGlobal = prevYear;
});

$('#next').on('click', function(){
    var nextDay = prevDayGlobal + 1;
    var nextMonth = prevMonthGlobal;
    var nextYear = prevYearGlobal;


    if(nextDay == 31){
        nextMonth = prevMonthGlobal + 1;
        nextDay= 1;
    }
    if (nextMonth == 12 && nextDay == 30){
        nextYear = prevYearGlobal + 1;
        nextMonth = 1;
    }
    url = "https://api.nasa.gov/planetary/apod?api_key="+key+"&date="+nextYear+"-"+nextMonth+"-"+nextDay;
    $.ajax({
        url: url,
        success: function(result){
            if("copyright" in result) {
                $("#copyright").text("Image Credits: " + result.copyright);
            }
            else {
                $("#copyright").text("Image Credits: " + "Public Domain");
            }

            $("#apod__img__id").css("display", "none");
            $("#apod__vid__id").css("display", "none");
            $(".video__container").css("display", "none");
            $(".container").css("display", "none");

            if(result.media_type == "video") {
                $("#apod__vid__id").css("display", "block");
                $(".video__container").css("display", "block");
                $("#apod__vid__id").attr("src", result.url);
                $(".video__container").css("height", "600px");
                $('.video__container').addClass('is-visible');
            }
            else {
                $("#apod__img__id").css("display", "block");
                $(".container").css("display", "block");
                $(".video__container").css("height", "0");
                $("#apod__img__id").attr("src", result.url);
                $('.container').addClass('is-visible');
            }

            console.info(JSON.stringify(result, null, 4));
            $("#apod__explaination").text(result.explanation);
            $("#apod__title").text(result.title);
            $("#apod__title__mainpage").text(result.title);
            $("#apod__date").text(result.date);

            if(result.date == todayFormat){
                $("#next").css("display", "none");
            }
            else{
                $("#next").css("display", "inline-block");
            }
            // setTimeout(loader,3000);

        }
    });
    prevDayGlobal = nextDay;
    prevMonthGlobal = nextMonth;
    prevYearGlobal = nextYear;
});

var url = "https://api.nasa.gov/planetary/apod?api_key="+key+"&date="+todayYear+"-"+todayMonth+"-"+todayDay;

// var params = {
//     container: document.getElementById('lottie'),
//     renderer: 'svg',
//     loop: true,
//     autoplay: true,
//     path: 'data.json'
// };
//
// var anim;
//
// anim = lottie.loadAnimation(params);

$.ajax({
    url: url,
    success: function(result){
        if("copyright" in result) {
            $("#copyright").text("Image Credits: " + result.copyright);
        }
        else {
            $("#copyright").text("Image Credits: " + "Public Domain");
        }

        $("#apod__vid__id").css("display", "none");
        $("#apod__img__id").css("display", "none");
        $(".container").css("display", "none");
        $(".video__container").css("display", "none");


        if(result.media_type == "video") {
            $(".video__container").css("display", "block");
            $("#apod__vid__id").css("display", "block");
            $("#apod__vid__id").attr("src", result.url);
            $(".video__container").css("height", "600px");
            $('.video__container').addClass('is-visible');
        }
        else {
            $(".container").css("display", "block");
            $("#apod__img__id").css("display", "block");
            $("#apod__img__id").attr("src", result.url);
            $('.container').addClass('is-visible');
        }

        // console.info(JSON.stringify(result, null, 4));
        $("#apod__explaination").text(result.explanation);
        $("#apod__title").text(result.title);
        $("#apod__title__mainpage").text(result.title);
        $("#apod__date").text(result.date);

        if(result.date == todayFormat){
            $("#next").css("display", "none");
        }

        // setTimeout(loader,3000);

    }
});

jQuery(document).ready(function($){
    //open popup
    $('#apod__img__id').on('click', function(event){
        event.preventDefault();
        $('.cd-popup').addClass('is-visible');
    });

    //close popup
    $('.cd-popup').on('click', function(event){
        if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button
    $(document).keyup(function(event){
        if(event.which=='27'){
            $('.cd-popup').removeClass('is-visible');
        }
    });
});

function loader() {
    $("#lottie").css("display", "none");
}




