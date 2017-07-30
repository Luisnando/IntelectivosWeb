firebase.auth().onAuthStateChanged(function (user) {
    if (user){
        console.log("Logeado como: " + user.displayName)
        window.location.href = "index.html";
    } else{
        console.log("Sin sesión iniciada.")
    }
});