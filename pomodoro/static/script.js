
function decrease_counter(){
    let counter = document.querySelector("#counter")
    const start_date = new Date()
    const decrease = setInterval(() => {
        const d = new Date();
        let min = 24 + Math.ceil((start_date - d) / 60000)%60
        let sec = 59 + Math.ceil((start_date - d) / 1000)%60
        if(min===0 && sec===0){
            clearInterval(decrease)
        }
        String(min).padStart(2,'0')


        counter.innerHTML = `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    });


}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#start").onclick = decrease_counter
})