
const getCredentials = function() {
    console.log("getCredentials() called. UPDATE.")
    
    let username = document.getElementById("usernameBox").value
    let password = document.getElementById("passwordBox").value

    let credentials = {username: username, password: password};

    console.log(credentials)

    return credentials
}

