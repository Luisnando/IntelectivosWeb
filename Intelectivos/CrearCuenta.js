var profilePhotoFile = null;

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#avatar')
                .attr('src', e.target.result);

            profilePhotoFile = input.files[0];
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function openFileExplorer(){
    document.getElementById("avatar_input").click();
}

function testFields(){
    var nombre   = document.getElementById("input-nombre").value;
    var correo    = document.getElementById("input-email").value;
    var pass     = document.getElementById("input-pass").value;
    var passConf = document.getElementById("input-passconf").value;

    if (nombre != "" && correo != "" && pass != ""){
        if (correo.includes("@")){
            if (pass != passConf) {
                alert("Las contraseñas no coinciden.")
            } else {

                if (profilePhotoFile != null) {

                    createAccount(nombre, correo, pass, profilePhotoFile);

                } else {
                    alert("Hubo un problema con el avatar. Intente cargándolo de nuevo o pruebe con otra imagen.");
                }
            }
        } else {
            alert("El email introducido no es válido")
        }
    } else{
        alert("Hay campos vacíos.")
    }
}

function createAccount(name, email, password, imgFile) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
        var user = firebase.auth().currentUser;
        var uid = user.uid

        var avatarRef = firebase.storage().ref("Usuarios/" + uid + "/avatar.jpg");
        avatarRef.put(imgFile).then(function (snapshot) {
            snapshot.ref.getDownloadURL().then(function (url) {

                user.updateProfile({
                    displayName: name,
                    photoURL: url
                }).then(function () {

                    firebase.database().ref("Usuarios/" + uid).set({
                        "email": email,
                        "name": name,
                        "photoUri": url,
                        "uid": uid
                    });
                });
            });
        });
    });
}