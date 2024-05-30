const datePersian = new persianDate();
let localStor = () => localStorage.getItem("lounges") !== null ? JSON.parse(localStorage.getItem("lounges")) : []

let form = document.querySelector(".form"),
    namefull = form.querySelector("#name"),
    route = form.querySelector("#route"),
    capacity = form.querySelector("#capacity"),
    submit = form.querySelector("#submit")

function founditem(key, value){
    let result = localStor().filter(item => {
        return item.name === value
    })
    return result.length !== 0
}
const eventNow = event => {
    event.preventDefault()
    if(namefull.value === "" || capacity.value === "" || route.value === "")
        alertplus("", "وارد کردن تمامی ورودی ها اجباری است.", "error")
    else if (founditem("name", namefull.value))
        alertplus("", "این نام قبلا وارد شده است.", "error")
    else if (!parseInt(capacity.value)) 
        alertplus("", "ظرفیت وارد شده معتبر نیست!", "error")
    else {
        localStorNew = localStor()
        let eventNow = {
            name: namefull.value,
            capacity: parseInt(capacity.value),
            total: parseInt(capacity.value),
            route: route.value,
        }
        localStorNew.push(eventNow)
        localStorage.setItem("lounges", JSON.stringify(localStorNew))
        alertplus("", "با موفقیت ثبت گردید!")
        setListEvent()
    }
}
submit.addEventListener("click", eventNow)