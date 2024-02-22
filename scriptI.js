let preguntas = [];
let misRespuestas = Array.from8[{legth:10}];

document.addEventListener("DOMContentLoaded", function(){
  let token =sessionStorage.getItem("token");
     if (token) {
      console.log("token encontrado: ", token)
     } else {
      generarToken()
     }

});

function desordenar() {
  return Math.random() - 0,5
  };

const generarToken = () => {
  fetch("https://opentdb.com/api_token.php?command-request")

}