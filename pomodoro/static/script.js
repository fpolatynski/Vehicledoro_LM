
function decrease_counter(){
    let seconds = localStorage.getItem("learn") * 60 - 1;
    let min = Math.floor((seconds) / 60)
    let sec = seconds % 60
    let counter = document.querySelector("#counter")
    counter.innerHTML = `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    const decrease = setInterval(() => {
        seconds --;
        min = Math.floor((seconds) / 60)
        sec = seconds % 60
        if(seconds === 0) {
            clearInterval(decrease)
        }
        counter.innerHTML = `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    },1000);


}

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('learn')) {
        localStorage.setItem('learn', '24');
    }
    document.querySelector("#start").onclick = decrease_counter;
})