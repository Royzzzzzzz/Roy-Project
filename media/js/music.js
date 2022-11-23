$(document).ready(function(){
    
    // html5 코드
    // <a href="#" class="music_btn"></a>
    // <audio id="music" loop>
    //     <source src="./images/music.mp3">
    // </audio>

    let mode = 0;
    var music;
    music = document.getElementById('music')
    
    
    // 0 일때 음악정지
    
    $('.music_btn').click(function(e){
        
        console.log(mode);
        e.preventDefault();
        if(mode==0){ //음악재생
            $('.music_btn').addClass('play');
            play();
            mode = 1;
        }else if(mode==1){
            $('.music_btn').removeClass('play');
            pause();
            mode = 0;
        }

    });

    function play(){
        music.play();
    }
    function pause(){
        music.pause();
    }
});