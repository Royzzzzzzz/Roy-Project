//객체배열(json)
let card = [];

function artistPrint(i){
        $.ajax({
                method: 'get',
                url: './js/sub3.json',
                dataType: 'json',
                success: function(data){
                        person= data.person;
                    
                        let txt = '<img src="'+person[i].path+'" alt="">';
                        txt += '<p>'+person[i].name+'</p>';
                        txt += '<dl>';
                        txt += '<dt>담당업무</dt>';
                        txt += '<dd>'+person[i].position+'</dd>';
                        txt += '</dl>';
                        txt += '<dl>';
                        txt += '<dt>선임일</dt>';
                        txt += '<dd>'+person[i].day+'</dd>';
                        txt += '</dl>';
                        txt += '<dl>';
                        txt += '<dt>임기</dt>';
                        txt += '<dd>'+person[i].since+'</dd>';
                        txt += '</dl>';
                        txt += '<dl>';
                        txt += '<dt>주요경력</dt>';
                        txt += '<dd>'+person[i].career+'</dd>';
                        txt += '</dl>';
                        

                        $('.popup_card .popup_int').html(txt).hide().stop().fadeIn('slow');
                }
        })
}

$('.more_btn2').click(function(e){
        e.preventDefault();
        let popUpInd = $(this).index('.more_btn2');  // 0 1 2 3
        
        $('.modal_box2').fadeIn('fast');
        $('.popup_card').fadeIn('fast');

        artistPrint(popUpInd);
});

$('.popUpCloseBtn, .modal_box2').click(function(e){
        e.preventDefault();
        $('.modal_box2').hide();
        $('.popup_card').hide();
});
