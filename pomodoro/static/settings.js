document.addEventListener('DOMContentLoaded', async () => {
    let response = await fetch("get_settings");
    let data = await response.json();
    document.querySelector("#learn").value = data["learn"];
    document.querySelector("#break").value = data["short"];
    document.querySelector("#long_break").value = data["long"];
});