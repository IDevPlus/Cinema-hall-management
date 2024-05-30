let tlist = document.querySelector("tbody#tlistEvent")

function setListEvent() {
    tlist.innerHTML = ""
    Array.from(localStor()).forEach(item => {
        let ele = `
            <tr>
                <td>${item.name}</td>
                <td>${item.date}</td>
                <td>${item.lounge}</td>
                <td>${item.type}</td>
                <td>${item.singer}</td>
            </tr>
        `
        tlist.innerHTML += ele
    });
    document.getElementById("count-event").innerHTML = Array.from(localStor()).length
}
document.addEventListener("DOMContentLoaded", () => {
    setListEvent()
})