    // 헤더 스크롤 반응
    var smh=$('.visual').height();
    // gnb 스크롤 이벤트 체크
    $(window).on('scroll',function(){//스크롤의 거리가 발생하면
        var scroll = $(window).scrollTop();  //스크롤의 거리를 리턴하는 함수
        //console.log(scroll);
        
        if(scroll>100){//스크롤300까지 내리면
            $('#headerArea').addClass('on');
        } else {//스크롤 내리기 전 디폴트(마우스올리지않음)
            $('#headerArea').removeClass('on');
        };
    });

//네비게이션, GNB(top)
$(document).ready(function() {
    //스크롤 시 header 효과
    $(window).on('scroll',function(){     //스크롤 거리 발생
        var scroll = $(window).scrollTop();     //스크롤 거리 리턴 함수
        var smh=$('.visual').height();      //비주얼 이미지의 높이 리턴 960px
        
        if(scroll>smh-50){       //스크롤 거리 560
            $('#headerArea').addClass('sc');
            }else{       //스크롤 거리 0 
                $('#headerArea').removeClass('sc');
            }
        
    });
    
    /*네비게이션*/
    var op = false;  //네비가 열려있으면(true) , 닫혀있으면(false)
      
    $(".menu_open").click(function(e) { //메뉴버튼 클릭시
        e.preventDefault();
        
        
        var documentHeight =  $(document).height();
        $("#gnb").css('height',documentHeight); // 전체 body의 높이를 네비에 높이로 반환
        $(".menu_open span::after").css('background','#333');
        $(".menu_open span::before").css('background','#333');
       if(op==false){ //네비가 닫혀있는 상태에서 클릭했냐??
         $("#gnb").animate({right:0,opacity:1}, 'fast');
         $('#headerArea').addClass('mn_open');
    //스크롤 시 header 효과
    $(window).on('scroll',function(){     //스크롤 거리 발생
        var scroll = $(window).scrollTop();     //스크롤 거리 리턴 함수
        var smh=$('.visual').height();      //비주얼 이미지의 높이 리턴 960px
        
        if(scroll>smh-50){       //스크롤 거리 560
            $('#headerArea').addClass('sc');
            }else{       //스크롤 거리 0 
                $('#headerArea').removeClass('sc');
            }
        
    });

         op=true;
         $('.modal_box').fadeIn('slow');
       }else{ //네비가 열려있는 상태에서 클릭했냐??
         $("#gnb").animate({right:'-100%',opacity:0}, 'fast');
         $('#headerArea').removeClass('mn_open');
         op=false;
         $('.modal_box').fadeOut('fast');
        //  $('#headerArea').addClass('sc');

       }
    });
    
    
     //2depth 메뉴 교대로 열기 처리 
     var onoff=[false,false,false,false,false,false]; //각각의 메뉴가 닫혀있으면(false) / 열려있으면(true)
     var arrcount=onoff.length;  //메뉴의개수 6
     
     //console.log(arrcount);
     
     $('#gnb .depth1 h3 a').click(function(){  //1depth 메뉴를 각각 클릭하면
         var ind=$(this).parents('.depth1').index();  // 0~5
         
         //console.log(ind);
         
        if(onoff[ind]==false){
         //$('#gnb .depth1 ul').hide();
         $(this).parents('.depth1').find('ul').slideDown('slow');//클릭한 해당 메뉴의 2depth를 열여라
         $(this).parents('.depth1').siblings('li').find('ul').slideUp('fast'); //나머지 메뉴의 서브를 다 닫아라
         for(var i=0; i<arrcount; i++) {
            onoff[i]=false; //모든 메뉴의 상태를 false로...
         }
          onoff[ind]=true;  //자신의 상태만 true..
            
          $('.depth1 i').attr('class','fas fa-plus');   
          $(this).find('i').attr('class','fas fa-minus');   
             
        }else{  //클릭한 해당메뉴가 열려있느냐??
          $(this).parents('.depth1').find('ul').slideUp('fast'); // 자신의 서브메뉴만 닫아라
          onoff[ind]=false;   
            
          $(this).find('i').attr('class','fas fa-plus');     
        }
     });  
     
    

     // familysite open
            //$(document).on('toggle', '.family .open', function(e){ // ajax로 가져와서 처리 시
            $('.family .open').toggle(function(e){
                e.preventDefault();

                $('.family ul').stop().slideDown(200);
                $(this).addClass('on');
            
            }, function(e){
                e.preventDefault();

                $(this).removeClass('on');
                $('.family ul').stop().slideUp(200);
            });

    //상단 이동
    $('.topMove').hide();
    $(window).on('scroll',function(){   //스크롤 값의 변화가 생기면
         var scroll = $(window).scrollTop();    //스크롤의 거리
         if(scroll>300){    //500이상의 거리가 발생되면
             $('.topMove').fadeIn('slow');  //top노출
         }else{
             $('.topMove').fadeOut('fast'); //top미노출
         }
    });
    $('.topMove').click(function(e){    //아이콘 클릭 시 상단으로 스르륵 이동
        e.preventDefault();
        $("html,body").stop().animate({"scrollTop":0},1000); 
    });
});
 