const datePersian = new persianDate();
let localStor = (item = "events") => localStorage.getItem(item) !== null ? JSON.parse(localStorage.getItem(item)) : []
document.getElementById("date").value = `${datePersian.toLocale("fa").format("YYYY")}/${datePersian.toLocale("fa").format("MM")}/${datePersian.toLocale("fa").format("DD")}`

let form = document.querySelector(".form"),
    namefull = form.querySelector("#name"),
    date = form.querySelector("#date"),
    lounge = form.querySelector("#lounge"),
    type = form.querySelector("#type"),
    singer = form.querySelector("#singer"),
    submit = form.querySelector("#submit")

function founditem(key, value){
    let result = localStor().filter(item => {
        return item.name === value
    })
    return result.length !== 0
}
const eventNow = event => {
    event.preventDefault()
    if(namefull.value === "" || date.value === "")
        alertplus("", "وارد کردن تمامی ورودی ها اجباری است.", "error")
    else if (founditem("name", namefull.value))
        alertplus("", "این نام قبلا وارد شده است.", "error")
    else {
        localStorNew = localStor()
        let eventNow = {
            name: namefull.value,
            date: date.value,
            lounge: lounge.value,
            type: type.value,
            singer: singer.value
        }
        localStorNew.push(eventNow)
        localStorage.setItem("events", JSON.stringify(localStorNew))
        alertplus("", "با موفقیت ثبت گردید!")
        setListEvent()
    }
}
submit.addEventListener("click", eventNow)

function setListLoungeOptions(){
    let loungeList = Array.from(localStor("lounges"))
    if(loungeList.length !== 0){
        lounge.innerHTML = ""
        loungeList.forEach(arr => {
            lounge.innerHTML += `<option value="${arr.name}">${arr.name}</option>`
        })
    }
}
document.addEventListener("DOMContentLoaded", () => setListLoungeOptions())