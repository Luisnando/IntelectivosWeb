function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#avatar')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function alertPhotoUrl(photo){
    alert(photo.src)
}

function testFields(){
    var nombre   = document.getElementById("input-nombre").value;
    var email    = document.getElementById("input-email").value;
    var pass     = document.getElementById("input-pass").value;
    var passConf = document.getElementById("input-passconf").value;
    var photoUrl = document.getElementById("avatar").src;

    if (nombre != "" && email != "" && pass != ""){
        if (email.includes("@")){
            if (pass == passConf){

                createAccount(nombre, email, pass, photoUrl);

            } else {
                alert("Las contraseñas no coinciden.")
            }
        } else {
            alert("El email introducido no es válido")
        }
    } else{
        alert("Hay campos vacíos.")
    }
}

function createAccount(name, email, pass, imgUrl) {
    firebase.auth().createUserWithEmailAndPassword(email, pass).then(function () {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
            photoUrl: imgUrl
        }).then(function(){

            alert(user.photoUrl);

            firebase.database().ref("/Usuarios/" + user.uid).set({
                "email": email,
                "name": name,
                "photoUri": user.photoUrl,
                "uid": user.uid
            });

            alert("¡Cuenta creada!");
        });
    });
}