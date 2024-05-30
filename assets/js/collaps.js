const collaps = document.querySelector(".collaps"),
    collapsSVG = collaps.querySelector("svg"),
    imgSmall = document.querySelector(".logo img.none"),
    imgMain = document.querySelector(".logo img:not(.none)"),
    sidebar = document.querySelector(".sidebar"),
    wrapper = document.querySelector(".wrapper"),
    titlesSlide = document.querySelectorAll(".sidebar .item .title, .sidebar .item .arrow"),
    vsgr = document.querySelectorAll(".vsgr"),
    other = document.querySelector(".other-vst")

function ModeCollaps() {
    titlesSlide.forEach(ele => {
        !ele.classList.contains("none") ? ele.classList.add("none") : ele.classList.remove("none")
    })
    vsgr.forEach(ele => {
        !ele.classList.contains("justify-center") ? ele.classList.add("justify-center", "w-[100%]") : ele.classList.remove("justify-center", "w-[100%]")
    })
    document.querySelectorAll(".sidebar .item ul.box").forEach(ele => {
        ele.hasAttribute("style") && ele.removeAttribute("style")
    })
}
document.querySelector(".collaps").addEventListener("click", event => {
    if(collapsSVG.classList.contains("rotate180")){
        setTimeout(() => {
            ModeCollaps()
            imgMain.classList.remove("none")
            imgSmall.classList.add("none")
            sidebar.classList.remove("w-min")
            wrapper.classList.add("wrapper-lock")
            imgMain.classList.remove("none")
            other.classList.add("w-[100%]")
            other.removeAttribute("style")
        }, 200)
        collapsSVG.classList.remove("rotate180")
    } else {
        setTimeout(() => {
            ModeCollaps()
            imgSmall.classList.remove("none")
            imgMain.classList.add("none")
            // wrapper.classList.add("wrapper-lock")
            other.setAttribute("style", "justify-content: center !important;")
            sidebar.classList.add("w-min")
        }, 200)
        collapsSVG.classList.add("rotate180")
    }
})