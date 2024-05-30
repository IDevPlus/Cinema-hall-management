let user = localStorage.getItem("user") || false
if(user != false){
    let textOld = submit.innerHTML
    user = JSON.parse(user)
    submit.classList.remove("efr")
    submit.innerHTML = `<span class="loader"></span>`
    fetch(`https://limocloud.uno/api/v1/auth?id=${user.id}&auth=${user.auth}`).then(res => {
        return res.json()
    }).then(res => {
        if(res.status != 200){
            submit.classList.add("efr")
            submit.innerHTML = textOld
            localStorage.clear()
        } else {
            setTimeout(() => {
                location.href = "./dashboard"
            }, 3000)
        }
    })
}
function signIN(){
    // Level 1
    let email = document.querySelector("#email"),
    password = document.querySelector("#password"),
    submit = document.querySelector("#submit"),
    errorEmail = document.querySelector(".error.email"),
    errorPassword = document.querySelector(".error.password")
    const EmailRe = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    // Level 2
    email.addEventListener("keyup", (event) => {
    switch(event.key){
        case "Backspace":
            if(String(email.value).length === 1 || String(email.value).length === 0){
                errorEmail.innerHTML = "ایمیل اجباری است"
                break;
            }
        default:
            if(event.target.value.match(EmailRe) == null){
                errorEmail.innerHTML = "ایمیل معتبر نیست"
                break;
            }
            else if(event.target.value.match(EmailRe) != null){
                errorEmail.innerHTML = ""
                break;
            }
    }
    })
    password.addEventListener("keyup", (event) => {
    switch(event.key){
        case "Backspace":
            if(String(password.value).length === 1 || String(password.value).length === 0){
                errorPassword.innerHTML = "پسوورد اجباری است."
                break;
            }
        default:
            errorPassword.innerHTML = ""
            if(String(password.value).length < 3) {
                errorPassword.innerHTML = "پسوورد کوتاه است"
            }
            else if(String(password.value).length > 32) {
                errorPassword.innerHTML = "پسوورد بسیار بلند است"
            }
            break;
    }
    })
    submit.addEventListener("click", async (event) => {
    event.preventDefault()
    if(String(password.value).length < 3 || String(password.value).length > 32 || email.value.match(EmailRe) == null) 
    alertplus("", "متاسفم، مقادیر وارد شده درحال حاضر معتبر نشده اند.", "error")
    else {
        submit.classList.remove("efr")
        submit.innerHTML = `<span class="loader"></span>`
        req = fetch(`https://limocloud.uno/api/v1/users/signin?username=${email.value}&password=${password.value}`, {
            method:"POST"
        }).then((res) => {
            return res.json()
        }).then((res) => {
            submit.classList.add("efr")
            submit.innerHTML = "Sign In"
            if(res.status === 200){
                localStorage.setItem("user", JSON.stringify(res.user))
                alertplus("", "با موفقیت وارد شدید")
                setTimeout(() => {
                    location.href = "./dashboard"
                }, 2000)
            }
            else if(res.status === 429){
                alertplus("", "شما به علت درخواست زیاد مسدود شده اید", "error")
            }
            else {
                if(res.blocked != undefined){
                    alertplus("", "شما مسدود شده اید", "error")
                }
                else {
                    alertplus("", "پسوورد یا رمز عبور نادرست است", "error")
                }
            }
        })
    }
    })
}
function signUP(){
    // Level 1
    const SetEventText = (ele, errEle, name, IsMail = false) => {
        ele.addEventListener("keyup", event => {
            const EmailRe = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            lenEle = String(ele.value).length
            if(lenEle === 0){errEle.innerHTML = `The ${name} is required`}
            else if(lenEle < 3){errEle.innerHTML = `The ${name} is short`}
            else if(lenEle > 32){errEle.innerHTML = `The ${name} is long`}
            else if(IsMail && event.target.value.match(EmailRe) == null){errEle.innerHTML = `The value is not a valid email address`}
            else errEle.innerHTML = ''
        })
    }
    const ChechValidInput = (ele, errEle, name, IsMail = false) => {
        const EmailRe = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        lenEle = String(ele.value).length
        var ret = false
        if(lenEle === 0){errEle.innerHTML = `The ${name} is required`}
        else if(lenEle < 3){errEle.innerHTML = `The ${name} is short`}
        else if(lenEle > 32){errEle.innerHTML = `The ${name} is long`}
        else if(IsMail && String(ele.value).match(EmailRe) == null){errEle.innerHTML = `The value is not a valid email address`}
        else {errEle.innerHTML = ''; var ret = true}
        return ret
    }
    let fristname = document.querySelector("#fristname"),
        lastname = document.querySelector("#lastname"),
        email = document.querySelector("#email"),
        username = document.querySelector("#username"),
        password = document.querySelector("#password"),
        show = document.querySelector("#show"),
        hide = document.querySelector("#hide"),
        gender = {
            man: document.querySelector("#man"),
            woman: document.querySelector("#woman")
        }
    show.addEventListener("click", event => {
        show.classList.add("none")
        hide.classList.remove("none")
        password.setAttribute("type", "text")
    })
    hide.addEventListener("click", event => {
        hide.classList.add("none")
        show.classList.remove("none")
        password.setAttribute("type", "password")
    })
    // Level 2
    SetEventText(fristname, document.querySelector(".error.fristname"), "fristname")
    SetEventText(lastname, document.querySelector(".error.lastname"), "lastname")
    SetEventText(email, document.querySelector(".error.email"), "Email", true)
    SetEventText(password, document.querySelector(".error.password"), "password")
    SetEventText(username, document.querySelector(".error.username"), "username")
    // Level 3
    document.querySelector(".submit button").addEventListener("click", event => {
        event.preventDefault()
        if(ChechValidInput(fristname, document.querySelector(".error.fristname"), "fristname") || ChechValidInput(lastname, document.querySelector(".error.lastname"), "lastname") || ChechValidInput(email, document.querySelector(".error.email"), "Email", true) || ChechValidInput(password, document.querySelector(".error.password"), "password") || ChechValidInput(username, document.querySelector(".error.username"), "username")){
            submit.classList.remove("efr")
            submit.innerHTML = `<span class="loader"></span>`
            req = fetch(`https://limocloud.uno/api/v1/users/signup?username=${email.value}&password=${password.value}&fristname=${fristname.value}&lastname=${lastname.value}&email=${email.value}&gender=${document.querySelector("input[type='radio']:checked").id}`, {
                method:"POST"
            }).then((res) => {
                return res.json()
            }).then((res) => {
                switch(res.status){
                    case 400:
                        alertplus("", "Sorry, There is a user with submitted information", "error")
                        break;
                    case 201:
                        users = localStorage.getItem("users") !== null ? JSON.parse(localStorage.getItem("users")) : []
                        users.push(res.user)
                        localStorage.setItem("user", JSON.stringify(res.user))
                        localStorage.setItem("users", JSON.stringify(users))
                        alertplus("", "Registration was done successfully.")
                        setTimeout(() => {
                            location.href = "./dashboard"
                        }, 2000)
                        break;
                    default:
                        alertplus("", "There is a Problem", 'error')
                        break;
                }
                submit.classList.add("efr")
                submit.innerHTML = 'Sign Up'
            })
        }
        else alertplus("", "Sorry, looks like there are some errors detected, please try again.", "error")
    })
}