
async function decrease_counter(){
    let run_number = 0;
    let pause = false;
    let seconds = localStorage.getItem("learn") - 1;
    let min = Math.floor((seconds) / 60)
    let sec = seconds % 60
    let counter = document.querySelector("#counter")
    counter.innerHTML = `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    document.querySelector("#vehicle_image").src = `/static/${await get_vehicle(1)}`
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

async function get_vehicle(number){
    let image_link = "images/question.png";
    const response = await fetch(`get_vehicle?vnum=${number}`);
    const data = await response.json();
    image_link = data["image"];
    return image_link;
}
