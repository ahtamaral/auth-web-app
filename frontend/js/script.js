
let users = []

const registerUser = function(fName, lName, username, email, pass) {
    users.push({fName: fName, lName: lName, username: username, email:email, pass:pass})
}

const homeRedirect = function() {
    location.replace("../html/index.html")
}

const createAccountRedirect = function() {
    console.log("createAccountRedirect() called.")
    location.replace("../html/createAccount.html")
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }

const createAccount = function() {

    console.log("createAccount() called.")
    let fName = document.getElementById("firstNameBox").value
    let lName = document.getElementById("lastNameBox").value
    let username = document.getElementById("usernameBox").value
    let email = document.getElementById("emailBox").value
    let pass = document.getElementById("passBox").value
    let confPass = document.getElementById("confirmPassBox").value

    if (fName.length == 0 ||
        lName.length == 0 ||
        username.length == 0 ||
        email.length == 0 ||
        pass.length == 0 || 
        confPass.length == 0)
    {
        alert("Error: All fields must be filled")
        console.log("Error creating account: All fields must be filled")
        return
    }

    if (fName.length < 3 || fName.length > 24) {
        console.log("Error creating account: The first name must be between 3 and 24 characters.")
        return
    }
    if (!/^[a-zA-Z]+$/.test(fName)) {
        console.log('Error creating account: first name contains special characters');
        return
    }
    if (lName.length < 3 || lName.length > 24) {
        console.log("Error creating account: The last name must be between 3 and 24 characters.")
        return
    }
    if (!/^[a-zA-Z]+$/.test(lName)) {
        console.log('Error creating account: last name contains special characters');
    }
    if (username.length < 6 || username.length > 24) {
        console.log("Error creating account: The username must be between 6 and 24 characters.")
        return
    }
    if (!validateEmail(email)) {
        console.log("Error creating account: Invalid e-mail.")
        return
    }
    if (pass.length < 6 || pass.length > 32) {
        console.log("Error creating account: The password must be between 6 and 32 characters.")
        return
    }
    if (pass != confPass) {
        console.log("Error creating account: The passwords don't match.")
        return
    }
    // AINDA DÁ PRA FAZER MAIS VALIDAÇÕES DE ENTRADA -> Checar caracteres chatos, limite superior para comprimento de nomes, etc.

    registerUser(fName, lName, username, email, pass) // Isso é carteado para ter um array em memória no momento.s

    

    location.replace("../html/accountCreated.html")

    console.log("Successfully created new user:")
    console.log(users[users.length-1])
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

    // for(let i = 0; i < users.length; i++) {
    //     users[i]
    // }

    // fetch("https://jsonplaceholder.typicode.com/users")
    // .then(response => {
    //     return response.json()
    // })
    // .then(users => {
    //     console.log(users)
    // })
    
    fetch("http://localhost:3000/users/new-user") // Fetch é o método que acessa a URL. Ele retorna uma promessa, podendo ser "resolve" ou "reject"
    .then( function(response) {        // Caso a promessa retornada seja "resolve", o método then é chamado.
            console.log("Success!")
        })
        .catch( function() {   // Caso a promessa retornada seja reject, o método catch é chamado.
            console.log("Failure :(")
        })
}