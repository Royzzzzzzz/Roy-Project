
$(document).ready(function() {

    var smh=$('.visual').height();  //비주얼 이미지의 높이를 리턴한다   900px
    var on_off=false;  //false(안오버)  true(오버)
    
        $('#headerArea').mouseenter(function(){
           // var scroll = $(window).scrollTop();
            $(this).css('background','#fff');
            $('.dropdownmenu li a').css('color','#333');
            $('.top_menu ul li a').css('color','#333'); 
            $('.top_menu i').css('color','#666'); 
            $('#headerArea h1 a').css('background','url(http://wlgns7368.cafe24.com/common/images/top_logo2.png) 0 50% no-repeat');
            on_off=true;
        });
    
       $('#headerArea').mouseleave(function(){
            var scroll = $(window).scrollTop();  //스크롤의 거리
            
            if(scroll<smh-400){
                $(this).css('background','none').css('border-bottom','none'); 
                $('.dropdownmenu li a').css('color','#fff');
                $('.top_menu ul li a').css('color','#eee');
                $('.top_menu i').css('color','#eee');  
                $('#headerArea h1 a').css('background','url(http://wlgns7368.cafe24.com/common/images/top_logo.png) 0 50% no-repeat');
            }else{
                $(this).css('background','#fff'); 
                $('.dropdownmenu li a').css('color','#333');
                $('#headerArea h1 a').css('background','url(http://wlgns7368.cafe24.com/common/images/top_logo2.png) 0 50% no-repeat');
            }
            
           on_off=false;    
       });
    
       $(window).on('scroll',function(){//스크롤의 거리가 발생하면
            var scroll = $(window).scrollTop();  //스크롤의 거리를 리턴하는 함수
            //console.log(scroll);
 
            if(scroll>smh-300){//스크롤300까지 내리면
                $('#headerArea').css('background','#fff').css('border-bottom','1px solid #ccc');
                $('.dropdownmenu li a').css('color','#333');
                $('.top_menu i').css('color','#666');
                $('#headerArea h1 a').css('background','url(http://wlgns7368.cafe24.com/common/images/top_logo2.png) 0 50% no-repeat');
                $('.top_menu ul li a').css('color','#333');
                $('.top_menu div a').css('color','#666');
            }else{//스크롤 내리기 전 디폴트(마우스올리지않음)
               if(on_off==false){
                    $('#headerArea').css('background','none').css('border-bottom','none');
                    $('.dropdownmenu li a').css('color','#fff');
                    $('.top_menu i').css('color','#eee');
                    $('#headerArea h1 a').css('background','url(http://wlgns7368.cafe24.com/common/images/top_logo.png) 0 50% no-repeat');
                    $('.top_menu ul li a').css('color','#f1f1f1');
                    $('.top_menu div a').css('color','#f1f1f1');
               }
            }; 
            
         });
 
   
     //2depth 열기/닫기
     $('ul.dropdownmenu').hover(
        function() { 
           $('ul.dropdownmenu li.menu ul').fadeIn('normal',function(){$(this).stop();}); //모든 서브를 다 열어라
           $('#headerArea').animate({height:350},'fast').clearQueue();
        },function() {
           $('ul.dropdownmenu li.menu ul').hide(); //모든 서브를 다 닫아라
           $('#headerArea').animate({height:90},'fast').clearQueue();
      });
     
      //1depth 효과
      $('ul.dropdownmenu li.menu').hover(
        function() { 
            $('.depth1',this).css('color','#0c4da2');
        },function() {
           $('.depth1',this).css('color','#333');
      });
      //2depth 효과
      $('.dropdownmenu ul li').hover(
        function() { 
            $('a',this).css('color','#fff');
        },function() {
           $('a',this).css('color','#333');
      });
      
 
      //tab 처리
      $('ul.dropdownmenu li.menu .depth1').on('focus', function () {        
         $('ul.dropdownmenu li.menu ul').slideDown('normal');
         $('#headerArea').animate({height:350},'fast').css('background','#fff').clearQueue();
         $('.dropdownmenu li a').css('color','#333'); 
         $('.top_menu ul li a').css('color','#333');
         $('#headerArea h1 a').css('background','url(http://wlgns7368.cafe24.com/common/images/top_logo2.png) 0 50% no-repeat');
      });
 
     $('ul.dropdownmenu li.m6 li:last').find('a').on('blur', function () {        
         $('ul.dropdownmenu li.menu ul').slideUp('fast');
         $('#headerArea').animate({height:90},'normal').clearQueue();
     });
 });
 
            $('.topMove').hide();
           
             $(window).on('scroll',function(){ //스크롤 값의 변화가 생기면
                  var scroll = $(window).scrollTop(); //스크롤의 거리
                 
                 
                  $('.text').text(Math.floor(scroll));

                  if(scroll>200){ //500이상의 거리가 발생되면
                      $('.topMove').fadeIn('slow');  //top보여라~~~~
                  }else{
                      $('.topMove').fadeOut('fast');//top안보여라~~~~
                  }
             });
           
              $('.topMove').click(function(e){
                 e.preventDefault();
                  //상단으로 스르륵 이동합니다.
                 $("html,body").stop().animate({"scrollTop":0},1000); //스크롤을 스무스하게 움직이는 코드
              });
              $(document).ready(function() {
                /*	
                 $('.family .arrow').click(function(){
                     $('.family .aList').fadeIn('slow');			  
                 });
             
                 $('.family .aList').mouseleave(function(){
                     $(this).fadeOut('fast');			  
                 });
               */
                 $('.family .arrow').toggle(function(){
                     $('.family .aList').fadeIn('slow');
                     $('.family .arrow i').css('transform','rotate(90deg)');
                     $(this).find('span').text('▲')
                 },function(){
                     $('.family .aList').fadeOut('fast');
                     $('.family .arrow i').css('transform','rotate(-90deg)');
                     $(this).find('span').text('▽')	
                 });
             
                 //tab키 처리
                   $('.family .arrow').on('focus', function () {        
                           $('.family .aList').fadeIn('slow');	
                    });
                    $('.family .aList li:last a').on('blur', function () {        
                           $('.family .aList').fadeOut('fast');
                    });
              
             });