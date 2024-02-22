let preguntas = [];
let misRespuestas = Array.from({ length: 10 });

document.addEventListener("DOMContentLoaded", function(){
    let token = sessionStorage.getItem("token");
    if (!token) {
        generarToken();
    } else {
        console.log("token encontrado: ", token);
        obtenerPreguntas();
    }
});

function desordenar() {
    return Math.random() - 0.5;
}

const generarToken = () => {
    fetch("https://opentdb.com/api_token.php?command=request")
        .then(respuesta => respuesta.json())
        .then(datos => {
            if (datos.token) {
                sessionStorage.setItem("token", datos.token);
                obtenerPreguntas();
            }
        })
        .catch(error => {
            console.error("Hubo un error generado por el token: ", error);
        });
}

const obtenerPreguntas = () => {
    let token = sessionStorage.getItem("token");
    if (token) {
        const categoria = document.getElementById("select1").value;
        const dificultad = document.getElementById("select2").value;
        const tipo = document.getElementById("select3").value;

        if (categoria === "" || dificultad === "" || tipo === "") {
            alert("Debes seleccionar las opciones correspondientes para continuar");
            return;
        } else {
            let url = `https://opentdb.com/api.php?amount=10&category=${categoria}&difficulty=${dificultad}&type=${tipo}&token=${token}`;
            fetch(url)
                .then(respuesta => respuesta.json())
                .then(datos => {
                    if (datos.results.length > 0) {
                        datos.results.forEach(preguntaAPI => {
                            preguntas.push({
                                pregunta: preguntaAPI.question,
                                respuestaCorrecta: preguntaAPI.correct_answer,
                                respuestasIncorrectas: preguntaAPI.incorrect_answers
                            });
                        });

                        preguntas.forEach(pregunta => {
                            const preguntaHTML = document.createElement("div");
                            preguntaHTML.innerHTML = `
                                <h3>${pregunta.pregunta}</h3>
                                <ul>
                                    <li class="respuesta" onclick="checkPreguntas('${pregunta.respuestaCorrecta}')">${pregunta.respuestaCorrecta}</li>
                                    ${pregunta.respuestasIncorrectas.map(respuesta => `<li class="respuesta" onclick="checkPreguntas('${respuesta}')">${respuesta}</li>`).join("")}
                                </ul>
                            `;
                            document.getElementById("preguntas").appendChild(preguntaHTML);
                        });
                        document.getElementById("questionario").hidden = false;
                    } else {
                        document.getElementById("questionario").hidden = true;
                        alert("No hay trivia disponible con las características seleccionadas, por favor cambia los valores e inténtalo de nuevo");
                    }
                })
                .catch(error => console.error("Hubo un error generando las preguntas: ", error));
        }
    } else {
        generarToken();
    }
}

function checkPreguntas(respuestaSeleccionada) {
    console.log("Verificando respuesta seleccionada:", respuestaSeleccionada);
}