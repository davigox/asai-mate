const button_iniciar = document.getElementById('button_iniciar')
const button_crear = document.getElementById('button_crear')
const button_volver = document.getElementById('button_volver')
const button_cerrar = document.getElementById('button_cerrar')

const estudiante = document.getElementById('estudiante')

const index = document.getElementById('index')

const plano = document.getElementById('plano')
const pregunta = document.getElementById('pregunta')

const signin = document.getElementById('signin')
const signinEmail = document.getElementById('signinEmail')
const signinPassword = document.getElementById('signinPassword')
const signinButton = document.getElementById('signinButton')

const signup = document.getElementById('signup')
const signupEmail = document.getElementById('signupEmail')
const signupNombres = document.getElementById('signupNombres')
const signupApellidos = document.getElementById('signupApellidos')
const signupPassword = document.getElementById('signupPassword')
const signupButton = document.getElementById('signupButton')

firebase.initializeApp(firebaseConfig);
firebase.auth().signOut()

function mostrarIndex() {
    index.classList.remove('hide')
    signup.classList.add('hide')
    signin.classList.add('hide')
    plano.classList.add('hide')
    pregunta.classList.add('hide')
}
function mostrarSignin() {
    index.classList.add('hide')
    signup.classList.add('hide')
    signin.classList.remove('hide')
    plano.classList.add('hide')
    pregunta.classList.add('hide')
}
function mostrarSignup() {
    index.classList.add('hide')
    signup.classList.remove('hide')
    signin.classList.add('hide')
    plano.classList.add('hide')
    pregunta.classList.add('hide')
}
function mostrarJuego() {
    index.classList.add('hide')
    signup.classList.add('hide')
    signin.classList.add('hide')
    plano.classList.remove('hide')
    pregunta.classList.remove('hide')
}
function camposVacios() {
    const email = signupEmail.value.trim()
    const nombres = signupNombres.value.trim()
    const apellidos = signupApellidos.value.trim()
    const password = signupPassword.value.trim()
    if (email === "" || nombres === "" || apellidos === "" || password === "") {
        return true
    } else {
        return false
    }
}
button_cerrar.addEventListener('click', () => {
    firebase.auth().signOut()
    estudiante.innerHTML = `Sin Usuario`
    mostrarIndex()
})
button_volver.addEventListener('click', () => {

})

button_iniciar.addEventListener('click', () => {
    mostrarSignin()
})
button_crear.addEventListener('click', () => {
    mostrarSignup()
})

signinButton.addEventListener('click', () => {
    event.preventDefault()
    const email = signinEmail.value
    const password = signinPassword.value
    const auth = new Auth()
    auth.authEmailPass(email, password)
    empezarJuego()

})

signupButton.addEventListener('click', () => {
    event.preventDefault()
    if (camposVacios()) {
        return alert('Debes de llenar todos los campos')
    } else {
        const email = signupEmail.value.trim()
        const nombres = signupNombres.value.trim().toUpperCase()
        const apellidos = signupApellidos.value.trim().toUpperCase()
        const password = signupPassword.value.trim()
        const auth = new Auth()
        auth.crearCuentaEmailPass(email, password, nombres, apellidos)
    }
})

//listener auth()
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        button_cerrar.classList.remove('hide')
        mostrarJuego()
        console.log('Usuario logeado')
    } else {
        // No user is signed in.
        button_cerrar.classList.add('hide')
        console.log('sin usuario')
        mostrarIndex()
    }
});