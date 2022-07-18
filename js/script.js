
let users = []

const registerUser = function(name, pass) {
    users.push({name:name, pass:pass})
}

const homeRedirect = function() {
    location.replace("../html/index.html")
}

const createAccountRedirect = function() {
    console.log("createAccountRedirect() called.")
    location.replace("../html/createAccount.html")
}

const evaluateCredentials = function() {
    console.log("evaluateCredentials() called. UPDATE.")
    
    let username = document.getElementById("usernameBox").value
    let password = document.getElementById("passwordBox").value

    let credentials = {username: username, password: password};

    console.log(credentials)

    if (users.length == 0) {
        alert("No users registered. Nothing to do.")
        return 
    }

    console.log("Evaluating credentials.")

    // Check if user exists. If exists, check if password is correct.
    // Three cases
    // User exists, password correct -> authenticated.html
    // User exists, password incorrect -> Incorrect password box pops-up.
    // User dont exists -> User dont exists pop-up.

    let userExists = false
    let tmpPass = ""
    for (i = 0; i < users.length; i++) {
        if (users[i].name == username) {
            userExists = true
            tmpPass = users[i].pass
            break
        }
    }
    if (userExists == true) {
        if (password == tmpPass) {
            console.log("Authenticated.")
            location.replace("../html/authenticated.html")
        }
        else {
            console.log("Incorrect password.")
            alert("Incorrect password.")
        }
    }
    else {
        console.log("The provide user does not exists.")
        alert("The provide user does not exists.")
    }



    // for (i = 0; i < users.length; i++) {
    //     if (users[i].name == username) {
    //         console.log("User found")
    //         if (users[i].pass == password) {
    //             console.log("Authenticated.")
    //             location.replace("../html/authenticated.html")
    //         }
    //         else {
    //             console.log("Incorrect password.")
    //         }
    //     }
    //     else {
    //         console.log("The provide user does not exists.")
    //         alert("The provide user does not exists.")
    //     }
    // }

    return credentials
}

const debug = function() {
    console.log("Calling debug.")
    registerUser("Htutu87", "Cacau2022!")
    registerUser("Crta65", "Cacau2018#")
    registerUser("Mamaral", "Cacau2019%")
    registerUser("B3t40", "Cacau2020$")
 
    for (i = 0; i < users.length; i++) {
        console.log(users[i])
    }
}