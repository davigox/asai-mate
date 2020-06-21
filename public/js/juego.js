const btn_siguiente = document.getElementById('btn_siguiente')
const etiquetaNivel = document.getElementById('etiquetaNivel')
const punto = document.getElementById('punto')
const robot = document.getElementById('robot')
const btn_verificar = document.getElementById('btn_verificar')
const inputX = document.getElementById('inputX')
const inputY = document.getElementById('inputY')
const ULTIMO_NIVEL = 3
// firebase.initializeApp(firebaseConfig);
const data = {
    uid: "1",
    nombres: "david",
    respuestasCorrectas: 0,
    respuestasIncorrectas: 0,
    intentos: 0
}

class Juego {
    constructor() {
        this.inicializar()
        this.agregarEventoClick()

    }
    generarNumero(min, max) {
        return Math.floor(Math.random() * (max - min)) + min
    }
    inicializar() {
        // alert(`Bienvenido ${data.nombres}. ¿Estas listo para jugar?`)
        btn_siguiente.classList.add('hide')
        btn_verificar.classList.remove('hide')
        this.nivel = 1
        data.respuestasCorrectas = 0
        data.respuestasIncorrectas = 0
        data.intentos = 0
        etiquetaNivel.innerHTML = `Nivel: ${this.nivel}`;
        this.ejex = this.generarNumero(-9, 10)
        this.ejexAjustado = 11 + this.ejex
        this.ejey = this.generarNumero(-9, 10)
        this.ejeyAjustado = 11 - this.ejey;
        console.log("X: " + this.ejex, this.ejexAjustado);
        console.log("Y: " + this.ejey, this.ejeyAjustado);
        console.log(this.ejex, this.ejey);
        // punto.style.setProperty("grid-area", `${this.coordenadasPersonaX} / ${this.coordenadasPersonay} / span 1 / span 1 `);
        this.dibujarPuntos(punto, this.ejexAjustado, this.ejeyAjustado);
        this.dibujarRobot(robot, 11, 11)

    }
    agregarEventoClick() {
        btn_verificar.addEventListener('click', this.verificar.bind(this))
        btn_siguiente.addEventListener('click', this.siguienteNivel.bind(this))
    }
    verificar() {
        data.intentos += 1;
        const valorX = parseInt(inputX.value);
        const valorY = parseInt(inputY.value);
        this.dibujarRobot(robot, 11 + valorX, 11 - valorY)

        if(valorX === this.ejex && valorY === this.ejey){
            btn_siguiente.classList.remove('hide')
            btn_verificar.classList.add('hide')
            data.respuestasCorrectas += 1
            console.log(`Respuestas Correctas: ${data.respuestasCorrectas}`)
        }else{
            data.respuestasIncorrectas += 1
            console.log(`Respuestas Incorrectas: ${data.respuestasIncorrectas}`)
        }
    }
    dibujarRobot(elemento, ejex, ejey) {
        elemento.style.setProperty("grid-area", `${ejey} / ${ejex} / span 1 / span 1 `);
    }
    dibujarPuntos(elemento, ejex, ejey) {
        elemento.style.setProperty("grid-area", `${ejey} / ${ejex} / span 1 / span 1 `);
    }

    siguienteNivel() {
        if(this.nivel == ULTIMO_NIVEL){
            const evaluaciones = new Evaluaciones()
            var user = firebase.auth().currentUser;
            evaluaciones.crearEvaluacion(
                user.uid,
                user.displayName,
                data.respuestasCorrectas,
                data.respuestasIncorrectas,
                data.intentos
            )
            .then(resp => {
               alert('Tus rendimiento se guardo correctamente en la base de datos') 
               firebase.auth().signOut()
            })
            alert(`felcidades ganaste Intentos Correctos : ${data.respuestasCorrectas} Intentos Incorrectos: ${data.respuestasIncorrectas}`)
            
        }
        this.nivel += 1
        etiquetaNivel.innerHTML = `Nivel: ${this.nivel}`;
        this.reiniciarPunto()
        inputX.value=0
        inputY.value=0
        btn_siguiente.classList.add('hide')
        btn_verificar.classList.remove('hide')
    }
    reiniciarPunto() {
        this.ejex = this.generarNumero(-9, 10)
        this.ejexAjustado = 11 + this.ejex
        this.ejey = this.generarNumero(-9, 10)
        this.ejeyAjustado = 11 - this.ejey;
        this.dibujarPuntos(punto, this.ejexAjustado, this.ejeyAjustado);
        this.dibujarPuntos(robot, 11, 11)
    }

}

function empezarJuego() {
    let juego = new Juego()
}