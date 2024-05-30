let bxOpen = document.querySelector(".box-open"),
    closeBox = bxOpen.querySelector(".header svg")
    btnAdd = document.querySelector("#addEvent")
closeBox.addEventListener("click", () => {
    !bxOpen.classList.contains("close") && bxOpen.classList.add("close")
})
btnAdd.addEventListener("click", () => {
    bxOpen.classList.contains("close") && bxOpen.classList.remove("close")
})