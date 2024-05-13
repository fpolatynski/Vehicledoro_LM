
function decrease_counter(){
    // TODO: Start session
    // TODO: Start Run
    // TODO: Get vehicle
    let run_number = 0;
    let pause = false;
    let seconds = localStorage.getItem("learn") - 1;
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
            // TODO: Start new run/pause or end session
        }
        counter.innerHTML = `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    },1000);
    let b = document.querySelector("#start")

    //Ability to pause
    b.innerHTML = "Pause";
    b.onclick = () => {
        localStorage.setItem("learn", seconds.toString())
        clearInterval(decrease);
        b.onclick = decrease_counter;
        b.innerHTML = "Continue";
    }


}

document.addEventListener('DOMContentLoaded', () => {
    localStorage.setItem('learn', '1500');
    document.querySelector("#start").onclick = decrease_counter;
})