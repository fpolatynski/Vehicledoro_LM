async function decrease_counter(level, state, data){
    let LEARN = data["learn"];
    let BREAK = data["short"];
    let LONG_BREAK = data["long"];
    let start = new Audio("/static/audio/stop.mp3");
    let stop = new Audio("/static/audio/stop.mp3");
    let seconds = localStorage.getItem("learn") - 1;
    let min = Math.floor((seconds) / 60)
    let sec = seconds % 60
    let counter = document.querySelector("#counter")
    counter.innerHTML = `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    const decrease = setInterval(async () => {
        seconds --;
        min = Math.floor((seconds) / 60)
        sec = seconds % 60
        if(seconds === 0) {
            if (state === 0) {
                await stop.play();
                level ++;
                if (level % 4 === 0) {
                    document.querySelector("#vehicle_image").src = `/static/${await get_vehicle(98)}`;
                    seconds = LONG_BREAK;
                    state = 2;
                } else {
                    document.querySelector("#vehicle_image").src = `/static/${await get_vehicle(99)}`;
                    seconds = BREAK;
                    state = 1;
                }
            } else {
                document.querySelector("#vehicle_image").src = `/static/${await get_vehicle(level)}`;
                await start.play()
                seconds = LEARN;
                state = 0;
            }
            // search settings for time for current state
        }
        counter.innerHTML = `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    },1000);
    let b = document.querySelector("#start")

    //Ability to pause
    b.innerHTML = "Pause";
    b.onclick = () => {
        localStorage.setItem("learn", seconds.toString())
        clearInterval(decrease);
        b.onclick = () => {
            decrease_counter(level, state);
        };
        b.innerHTML = "Continue";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    main().then()
})

async function main(){
    let level = 0;
    /*
    0 - learning
    1 - short break
    2 - long break
     */
    let state = 0;

    // Get settings from database
    let response = await fetch("get_settings")
    let data = await response.json()
    localStorage.setItem('learn', data["learn"]);
    document.querySelector("#start").onclick = async () => {
        document.querySelector("#vehicle_image").src = `/static/${await get_vehicle(level)}`
        decrease_counter(0, 0, data).then();
    }
}

async function get_vehicle(number){
    let image_link = "images/question.png";
    const response = await fetch(`get_vehicle?vnum=${number}`);
    const data = await response.json();
    image_link = data["image"];
    return image_link;
}
