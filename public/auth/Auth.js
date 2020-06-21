class Auth{
    authEmailPass(email, password){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(result => {
            if(result.user){
                alert(`Bienvenido: ${result.user.displayName}`)
                estudiante.innerHTML = `${result.user.displayName}`
            }else{
                firebase.auth().signOut()
                alert('El correo o password no son validos')
            }
        })
        .catch(error => {
            alert(`no se puedo iniciar sesión error: ${error}`)
        })
    }
    crearCuentaEmailPass(email, password, nombres, apellidos){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            result.user.updateProfile({
                displayName: `${nombres} ${apellidos}`
            })
        })
        .then(() => {
            alert('Tu cuenta fue creada exitosamente.')
            firebase.auth().signOut()
        })
        .catch(error => {
            console.log(error.code, error.message)
        })
    }
}
