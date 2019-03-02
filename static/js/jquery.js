
//SCROLL BACK TOP TOP BUTTON////

$(document).ready(function(){

    //Check to see if the window is top if not then display button
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.scrollToTop').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });

});

 /*TOOLTIP INFO CHARTS*/
    $(".fa-info-circle").mouseenter(function() {
        $(this).siblings().addClass("info-container-show");
        $(this).siblings().removeClass("info-container-hidden");

    });

    $(".fa-info-circle").mouseleave(function() {
        $(this).siblings().removeClass("info-container-show");
        $(this).siblings().addClass("info-container-hidden");
    });
    
   