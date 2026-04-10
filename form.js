document.getElementById("nom").addEventListener("blur", validar);

function validarNom() {
  tratarError(this);

  let nom = this.value;
  if (nom.length === 0) {
  } else {
  }
  for (let index = 0; index < array.length; index++) {
    if (!isNaN(nom[index])) {
      tratarError(this, "No puede contener NUMEROS!");
    }
  }

}
function ocultarOk() {
    const error = this.parentElement.querySelector(".error");
    error.setAttribute("hidden", "");
    
}




