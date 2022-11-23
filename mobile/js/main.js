    var timeonoff; //자동기능 구현
    var imageCount = 3;  //이미지 개수 *** 
    var cnt = 1;  //이미지 순서 1 2 3 4 5 4 3 2 1 2 3 4 5 ...
    //var direct = 1;  //1씩 증가(+1)/감소(-1)
    var position = 0; //겔러리 무비의 left값 0 -1000 -2000 -3000 -4000
    var windowWidth = $( window ).width(); // 디바이스 가로값
    //var onoff = true; // true=>타이머 동작중 , false=>동작하지 않을때


    
    // 초기셋팅
    $('.visual .dock span:eq(0)').addClass('on');
    $('.gallery .slogan:eq(0)').addClass('active');
    //$('.visual .gallery').css({width:windowWidth*3});


    $(window).resize(function(){
        clearInterval(timeonoff); // 타이머 중지
        windowWidth = $( window ).width(); // 디바이스 가로값

        if(cnt == 0){ cnt = imageCount; } // 1 2 3 1 2 3

        position = -(cnt-1) * windowWidth;
        $('.gallery').css({left:position}); // 이미지 left값

        timeonoff= setInterval( moveg , 4000);
    });

    // 자동 슬라이드
    function moveg(){
        //windowWidth = $( window ).width(); // 디바이스 가로값
        //$('.visual .gallery').css({width:windowWidth*3});

        if(cnt == imageCount+1){ cnt=1; }
        if(cnt == imageCount){ cnt=0; }  //카운트 초기화
        cnt++;  //카운트 1씩 증가.. 5가되면 다시 초기화 0  1 2 3 4 5 1 2 3 4 5..

        position = -(cnt-1) * windowWidth;
        $('.gallery').stop().animate({left:position}, 'slow'); // 이미지 left값

        $('.gallery .slogan').removeClass('active');
        $('.gallery .slogan:eq('+ (cnt-1) +')').addClass('active');
        
        $('.visual .dock span').removeClass('on');// 버튼 off
        $('.visual .dock span:eq('+ (cnt-1) +')').addClass('on');// 나만 on

        $('.visual .cnt span:eq(0)').html('0'+cnt);

        if(cnt == imageCount){ cnt=0 };
    }
    timeonoff= setInterval( moveg , 4000); //4초마다 자동기능




    // var startX, endX;

    // $('.visual').on('touchstart mousedown',function(e){
    //     //e.preventDefault();

    //     clearInterval(timeonoff); // 타이머 중지
    //     startX = e.pageX || e.originalEvent.touches[0].pageX;
    // });
    
    // $('.visual').on('touchend mouseup',function(e){
    //     //e.preventDefault();

    //     endX = e.pageX || e.originalEvent.changedTouches[0].pageX;

    //     //y_size= Math.abs(startY - endY);
    //     //console.log(y_size);
        
    //     if(startX < endX) {
    //         if(cnt == 1){ cnt = imageCount+1; } // cnt = 6
    //         if(cnt == 0){ cnt = imageCount; } // cnt = 5
    //         cnt--; //카운트 감소
    //         //console.log('왼쪽에서 오른쪽으로 터치');

    //     }else if (startX > endX){
    //         if(cnt == imageCount+1){ cnt=1; }
    //         if(cnt == imageCount){ cnt=0; }  //카운트 초기화
    //         cnt++; //카운트 1씩증가
    //         //console.log('오른쪽에서 왼쪽으로 터치');
    //     } 

    //     position = -(cnt-1) * windowWidth; // 현재 cnt에 해당하는 left값
    //     $('.gallery').stop().animate({left:position}, 'slow');

    //     $('.gallery .slogan').removeClass('active');
    //     $('.gallery .slogan:eq('+ (cnt-1) +')').addClass('active');
    
    //     $('.visual .dock span').removeClass('on');// 버튼 off
    //     $('.visual .dock span:eq('+ (cnt-1) +')').addClass('on');// 나만 on

    //     $('.visual .cnt span:eq(0)').html('0'+cnt);

    //     timeonoff= setInterval( moveg , 4000);
    // });

    /*프로모션*/
    $(document).ready(function(){
    var swiper = new Swiper(".mySwiper1", {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    /*----popup----*/
    $('.promotion .swiper-slide a').click(function(e){
      e.preventDefault();
      // var txt ='';
      var ind = $(this).index('.promotion .swiper-slide a');  // 0 1 2 3
      var arr = ['<span>레일솔루션</span>대한민국의 대표철도 회사 홍보영상','<span>디펜스 솔루션</span>국방은 현대로템이 책임진다.디펜스 홍보영상','<span>에코 플랜트</span>당신의 미래가 편안해지도록 함께 하겠습니다']

      $('#content .modal_box2').fadeIn('fast');
      $('#content .popup').fadeIn('slow');

      $('#content .popup video').attr('src','./images/main/videoplay'+(ind+1)+'.mp4');
      $('#content .popup video').attr('poster','./images/main/promotion_ad0'+(ind+1)+'x2.png');
      $('#content .popup p').html(arr[ind]);
      $('#content .popup video').load();

      
    });

    $('.close_btn,#content .modal_box2').click(function(e){
      e.preventDefault();
      $('#content .popup video').attr('src','');
      $('#content .modal_box2').hide();
      $('#content .popup').hide();
    });

});
    

   