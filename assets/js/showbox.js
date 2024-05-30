const items = document.querySelector(".sidebar .item")

Array.from(items.children).forEach(element => {
    element.querySelector(".flex")?.addEventListener("click", (event) => {
        const parent = element
        let box = parent.querySelector(".box")
        let childsSize = 0
        Array.from(box.children).forEach(li => {
            childsSize += li.clientHeight;
        })
        box.hasAttribute("style") ? box.removeAttribute("style") : box.setAttribute("style", `height: calc(${childsSize}px + 0.25rem) !important;`)
    })
});
