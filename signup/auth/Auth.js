class Auth{
    authEmailPass(email, password){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(result => {
            if(result.user.emailVerified){

            }else{

            }
        })
    }
    crearCuentaEmailPass(email, password, nombres, apellidos){
        firebase.auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            result.user.updateProfile({
                displayName: nombres
            })
        })
        .catch(error => {
            console.log(error.code, error.message)
        })
    }
}