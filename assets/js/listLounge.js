let tlist = document.querySelector("tbody#tlistEvent")

function setListEvent() {
    tlist.innerHTML = ""
    Array.from(localStor('lounge')).forEach(item => {
        let ele = `
            <tr>
                <td>${item.name}</td>
                <td>${item.route}</td>
                <td>${item.capacity}</td>
                <td>${item.total}</td>
            </tr>
        `
        tlist.innerHTML += ele
    });
    document.getElementById("count-event").innerHTML = Array.from(localStor()).length
}
document.addEventListener("DOMContentLoaded", () => setListEvent())