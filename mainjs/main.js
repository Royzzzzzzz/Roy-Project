// JavaScript Document
// 뉴스 클론
var mediaCount = 5; // 총 갯수
    var mediaSize = 400; // 개당 사이즈
    var mediaPosition = -2000; // 첫값 기본셋팅
    var mediaWidth = mediaCount * mediaSize; //총갯수 * 개당사이즈

    // 총 5개일 때 첫값 -2100, 끝값 -2000
    // 총 10개 일 때는 첫값 -2000, 끝값 -4000
    
    $('.movebox ul').after($('.movebox ul').clone()).after(($('.movebox ul:first').clone())); //3개 복제
    $('.movebox').css('width', mediaWidth*3).css('left',-2000);

    $('.news_btn a').click(function(e){
        e.preventDefault();

        if($(this).is('.btnPrev')){
            
            if(mediaPosition == -4000){ // 끝값과 같으면
                $('.movebox').css('left',-2000); // 첫값으로
                mediaPosition = -2000; // 첫값으로
            };
            mediaPosition -= mediaSize;
            
            $('.movebox').stop().animate({left:mediaPosition}, 'fast', // 콜백함수 (마지막에 계산)
            function(){
                if(mediaPosition == -4000){
                    $('.movebox').css('left',-2000);
                    mediaPosition = -2000;
                };
            });


      } else if ($(this).is('.btnNext')){
          
          if(mediaPosition == -2000){ // 첫값과 같으면
              
              $('.movebox').css('left',-4000); // 끝값으로
              mediaPosition = -4000; // 끝값으로
              
          }
          mediaPosition += mediaSize;

          $('.movebox').stop().animate({left:mediaPosition}, 'fast', // 콜백함수 (마지막에 계산)
          function(){
              if(mediaPosition == -2000){
                  $('.movebox').css('left',-4000);
                  mediaPosition = -4000;
              };
          });


      } else if ($(this).is('.more')){ // more 링크
          var thisurl = $('.news_btn .more').attr('href');
          window.location = thisurl;            
      }

  });
// BUSINESS
// scroll transition
$(window).on('scroll',function(){ //스크롤 값의 변화가 생기면
    var mainScroll = $(window).scrollTop(); //스크롤의 거리
    // var mainScrollGap = $(window).height() / 2;
    var mainScrollGap = $(window).height() - 500;
    
    // BUSINESS
    var mainBusiness = $('.business').offset().top - mainScrollGap;
    if(mainScroll > mainBusiness){
        $('.business').addClass('active');
    } else if(mainScroll < mainBusiness - 500){
        $('.business').removeClass('active');
    };

    // 지속가능경영
    var mainSus = $('.sus').offset().top - mainScrollGap;
    if(mainScroll > mainSus){
        $('.sus').addClass('active');
    } else if(mainScroll < mainSus - 500){
        $('.sus').removeClass('active');
    };

    // 뉴스센터
    var mainMedia = $('.news').offset().top - mainScrollGap;
    if(mainScroll > mainMedia){
        $('.news').addClass('active');
    } else if(mainScroll < mainMedia - 500){
        $('.news').removeClass('active');
    };
    
    // 인재채용
    var mainRecruit = $('.recruit li').offset().top - mainScrollGap - 200;
    if(mainScroll > mainRecruit){
        $('.recruit li').addClass('active');
    } else if(mainScroll < mainRecruit - 500){
        $('.recruit li').removeClass('active');
    };

});