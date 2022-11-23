$(document).ready(function () {
	var article = $('.faq .article'); //모든 li들..(질문답변들...)
	
  $('.faq .article .trigger').click(function(e){   //각각의 질문을 클릭하면
      e.preventDefault();

	var myArticle = $(this).parents('.article');  //클릭한 해당 메뉴에 li(리스트) 
	
	if(myArticle.hasClass('hide')){   //클릭한 해당 리스트가 닫혀있냐??
	    article.find('.a').slideUp(100); // 모든 리스트의 답변을 닫아라
        article.removeClass('show').addClass('hide'); //모든 리스트의 클래스 hide로 바꾼다
	    
		myArticle.removeClass('hide').addClass('show');  // 클래스를 show로 바꾼다
	    myArticle.find('.a').slideDown(100);  //해당 리스트의 답변을 열어라~~~
	 } else {  //클릭한 해당 리스트가 열려있냐?? (show)
	   myArticle.removeClass('show').addClass('hide');  //클래스 hide로 바꾼다
	   myArticle.find('.a').slideUp(100);   //해당 리스트의 답변을 닫아라~~~
	}  
  });      
  
  //모두여닫기
  $('.all').toggle(function(e){
	    e.preventDefault(); 
		article.find('.a').slideDown(100);
		article.removeClass('hide').addClass('show');
		//$(this).text('모두닫기');
		$(this).html('<span class="hidden">모두닫기</span><i class="fas fa-chevron-circle-up"></i>');
	},function(e){ 
		e.preventDefault();
		article.find('.a').slideUp(100);
		article.removeClass('show').addClass('hide');
		//$(this).text('모두열기');
		$(this).html('<span class="hidden">모두열기</span><i class="fas fa-chevron-circle-down"></i>');
	});

}); 



$(document).ready(function(){
    //객체배열(json)
    var memo = [
          {title:'레일솔루션', price:'철도 영업업무는 국내 및 해외 수요처 철도차량을 수주하기 위한 활동을 수행합니다. ', sub1:'입찰용 사업수행 등 일정계획 수립 능력 및 수요처와의 업무협의와 문제점 해결을 위한 협상력이 요구됩니다. '},
          {title:'디펜스솔루션', price:'방산 영업 업무는 육군, 군수사, 방사청, 국과연 등과 영업활동을 통해 새로운 사업 및 사업모델을 구상하며 효율적인 협상을 통해 이익을 극대화하고, 미래 무기체계 개발사업 및 양산사업을 수주하는 업무를 수행합니다. ', sub1:'입찰용 사업수행 등 일정계획 수립 능력 및 수요처와의 업무협의와 문제점 해결을 위한 협상력이 요구됩니다.', sub2:'제품설명2-2'},
          {title:'에코플랜트', price:'플랜트 영업업무는 향후 회사에서 수행 할 각종 공사를 국내/외 고객사로부터 수주하는 업무를 수행합니다. ', sub1:'신규 플랜트사업의 수주를 위해서는 고객의 요구에 부합하는 기술력과 가격경쟁력을 확보하여 경쟁업체와의 우위를 선점해야 합니다.'},
          {title:'경영지원', price:'인사업무(HR)는 인사/교육/노무 분야로 구분됩니다. 인사업무는 회사의 비전을 근간으로 효율적인 인사제도를 기획/운영하고 있습니다.', sub1:'인사업무(HR)는 임직원의 다양한 의견을 수용할 수 있는 폭넓은 사고와 포용력을 갖춰야 합니다. 조직 내 원활한 커뮤니케이션 채널을 구축하고 조직과 인력운영에 필요한 방향을 제시함으로써 사업목표 달성에 기여하는 사업파트너 역할을 수행합니다. '}
        ];
    var ind = 0;  
    var txt ='';
  
    function popchange(){
      $('.pop .popup img').attr('src','./images/content3/big'+(ind+1)+'.jpg');
        txt ='';
        txt+= '<dl>';
        txt+= '<dt>부서 : '+memo[ind].title+'</dt>';
        txt+= '<dd><span>주요업무</span> : '+memo[ind].price+'</dd>';
        txt+= '<dd><span>직무요건</span> : '+memo[ind].sub1+'</dd>';
        txt+= '</dl>';
        $('.pop .popup .txt').html(txt);
    }
  
  
    $('.pop .pop_menu a').click(function(e){
        e.preventDefault();
        
        ind = $(this).index('.pop .pop_menu a');  // 0 1 2 3
  
        $('.pop_btn').fadeIn('slow');
        $('.pop .modal_box').fadeIn('fast');
        $('.pop .popup').fadeIn('slow');
  
        popchange();
  
    });
  
    $('.close_btn,.pop .modal_box').click(function(e){
        e.preventDefault();
        $('.pop .modal_box').fadeOut('fast');
        $('.pop .popup').fadeOut('fast');
        $('.pop_btn').fadeOut('fast');
    });
  
    
    $('.pop_btn a').click(function(e){
         e.preventDefault();
  
         $('.pop .popup').hide().fadeIn('slow'); 
        
        if($(this).hasClass('pre')){ // 3 2 1 0 3 2 1 0
            if(ind==0)ind=memo.length;
            ind--;
            popchange();
        }else if($(this).hasClass('next')){ //0 1 2 3 0 1 2 3
            if(ind==memo.length-1)ind=-1;
            ind++;
            popchange();
        }
  
    });
  });
  