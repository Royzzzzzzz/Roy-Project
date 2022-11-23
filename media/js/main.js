// =============== .trailers ===============
const slider = document.querySelector('.trailers_slider');
const sliderInner = document.querySelector('.trailers_slider ul');
const progressBar = document.querySelector('.progressbar_inner');

let sliderGrabbed = false;

sliderInner.addEventListener('mousedown', (e)=>{
    sliderGrabbed = true;
    sliderInner.style.cursor = 'grabbing';
});

sliderInner.addEventListener('mouseup', (e)=>{
    sliderGrabbed = false;
    sliderInner.style.cursor = 'grab';
});

sliderInner.addEventListener('mouseleave', (e)=>{
    sliderGrabbed = false;
    sliderInner.style.cursor = 'grab';
});

sliderInner.addEventListener('mousemove', (e)=>{
    if(sliderGrabbed){
        slider.scrollLeft -= e.movementX
    };
});

// Progress bar
slider.addEventListener('scroll', (e)=>{
    progressBar.style.width = `${getScrollPercentage()}%`;
});

function getScrollPercentage(){
    return ((slider.scrollLeft / (slider.scrollWidth - slider.clientWidth)) * 100);
};