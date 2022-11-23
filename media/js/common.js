/* 모바일 헤더 */
    /*1024일때 모바일 네비로 변경*/
    var current = 0;
    $(window).resize(function () {
        var screenSize = $(window).width();
        if (screenSize > 1024) {
            $("#headerArea #gnb").show();
            current = 1;
        }
        if (current == 1 && screenSize <= 1024) {
            $("#headerArea #gnb").hide();
            current = 0;
        }
    });
    var op = false; //네비가 열려있으면(true) , 닫혀있으면(false)
    $('.menu_open').toggle(function () {
        $('#headerArea').addClass('mn_open');
        $('#headerArea #gnb').slideDown();
        $('.menu_open').addClass('mn_open');

    }, function () {
        $('#headerArea #gnb').slideUp();
        $('.menu_open').removeClass('mn_open');
        $('#headerArea').removeClass('mn_open');
    });


    $('.scrolldown').click(function(e){
        e.preventDefault();
        
        screenHeight = $(window).height();
        $('html,body').animate({'scrollTop':screenHeight}, 700);
    });



/* quick top */
$(document).on('click', '.quicktop', function(e){
    e.preventDefault();
    $('html,body').animate({'scrollTop':0});
});
