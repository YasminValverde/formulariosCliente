window.onload = function(){
  const camposNombre = document.querySelectorAll(".nombreCompleto");
  for (let i = 0; i < camposNombre.length; i++) {
    const campo = camposNombre[i];
    campo.addEventListener("blur", validarNom);
  }
const campsAmbImg = document.getElementsByClassName("ambImg");
  for (let i = 0; i < campsAmbImg.length; i++) {
    campsAmbImg[i],addEventListener("blur",ocultarOk);
    
  }
document.formulario.data_naix.addEventListener("blur", validarDataNaixement);
document.formulario.email.addEventListener("blur", validarEmail);



// ------------------------------METODOS-----------------------------------
function validarNom() {
  tractaCorrecte(this)

  let nom = this.value;
  if (nom.length === 0) {
    tractaError(this, "El campo no puede estar vacío");
    return;
  }
  for (let i = 0; i < nom.length; i++) {
    if (!isNaN(nom[i])) {
      tractaError(this, "No puede contener NUMEROS!");
      ocultarOk(this)

      return;
    }
  }
  mostrarOk(this);
}

function validarDataNaixement() {
  tractaCorrecte(this);
  const data = new Date(this.value);
  if (!this.value || isNaN(data) || data >= new Date()) {
    tractaError(this, "Data incorrecte");
    return;
  }
  mostrarOk(this);
}
function validarEmail() {
  tractaCorrecte(this);
  const email = this.value;
  const patron= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  if (!patron.test(email)) {
    tractaError(this, "Mail incorrecte");
    return;
  }
  mostrarOk(this);
}

function tractaCorrecte(objecte) {
  objecte.setCustomValidity("");
}

function tractaError(objecte, text) {
  objecte.setCustomValidity(text);
  objecte.reportValidity()
}

function mostrarOk(obj) {
  obj.nextElementSibling.style.display = "block";
}

function ocultarOk(obj) {
  obj.nextElementSibling.style.display = "none";
}
}