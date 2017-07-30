function iniciarSesion(){
    var email = document.getElementById("is-email").value;
    var pass = document.getElementById("is-pass").value;

    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
        alert(error.msg);
    });
}