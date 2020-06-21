class Evaluaciones{
    constructor(){
        this.db = firebase.firestore()
    }
    crearEvaluacion(uid, nombres, respuestasCorrectas, respuestasIncorrectas, intentos){
        return this.db.collection('Evaluaciones').add({
            uid,
            nombres,
            respuestasCorrectas,
            respuestasIncorrectas,
            intentos
        })
        .then(refDoc => {
            console.log(`Id de la Evaluación: ${refDoc.id}`)
        })
        .catch(error => {
            console.log(`Error registrando la Evaluación ${error}`)
        })
    }
}