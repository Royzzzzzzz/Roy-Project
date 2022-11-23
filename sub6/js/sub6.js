$('#content .type_text li:eq(1)').addClass('lihover'); 


    $('#content .type_text li').each(function (index) {  // index=0 1 2 3
        $(this).mouseover(function(e){  //각각의 탭메뉴를 마우스 오버하면... 
            e.preventDefault();   // <a> href="#" 값을 강제로 막는다 
    
            $('.type_text li').removeClass('lihover'); //모두 비활성화
  
            $(this).addClass('lihover'); // 클릭한 해당 탭메뉴만 활성화
          });
      });

      /* 탭 클릭 시 내용 노출 */
             
        $('.system_text li:eq(0)').fadeIn('slow');
        
        $('.system_btn li:eq(0) a').addClass('systemclick');
         
        $('.system_btn a').click(function(e){
              e.preventDefault();
              var ind = $(this).index('.system_btn a'); 
             
              $('.system_text li').hide();
              $('.system_text li:eq('+ind+')').fadeIn('slow');

              $('.system_btn li a').removeClass('systemclick');
              $(this).addClass('systemclick');
        });