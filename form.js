window.onload = function () {
  const camposNombre = document.querySelectorAll(".nombreCompleto");
  for (let i = 0; i < camposNombre.length; i++) {
    const campo = camposNombre[i];
    campo.addEventListener("blur", validarNom);
  }
  const campsAmbImg = document.getElementsByClassName("ambImg");
  for (let i = 0; i < campsAmbImg.length; i++) {
    campsAmbImg[i].addEventListener("blur", ocultarOk);
  }
  document.formulario.data_naix.addEventListener("blur", validarDataNaixement);
  document.formulario.email.addEventListener("blur", validarEmail);
  document.formulario.telefon.addEventListener("blur", validarTelefon);
  document.formulario.dni.addEventListener("blur", validarDNI);
  document.formulario.usuari.addEventListener("blur", validarUsuari);
  document.formulario.password.addEventListener("input", fortalezaContraseña);
  document.formulario.password.addEventListener("blur", validarContraseña);
  document.formulario.password2.addEventListener("blur", validarContraseña2);
  document.formulario.observacions.addEventListener("blur",validarObservacions);
  document.formulario.observacions.addEventListener("blur", ocultarComptador);
  document.formulario.observacions.addEventListener("input",comptadorCaracteres);
  document.formulario.addEventListener("submit", enviar);
  document.formulario.addEventListener("reset", reset);

  var meter = document.getElementById("password-strength-meter");

  // ------------------------------METODOS-----------------------------------

  function enviar(e) {
    e.preventDefault();
    if (this.checkValidity()) {
       this.submit();
    };
  }
  function reset() {
    var camps = document.querySelectorAll("input, textarea");
    for (var i = 0; i < camps.length; i++) {
      camps[i].setCustomValidity("");
    }
    var imgs = document.querySelectorAll(".ok");
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].style.display = "none";
    }
    meter.value = 0;
    document.formulario.password2.disabled = true;
    document.getElementById("comptador").style.display = "none";
  }

  function validarNom() {
    tractaCorrecte(this);

    let nom = this.value;
    if (nom.length === 0) {
      tractaError(this, "El campo no puede estar vacío");
      return;
    }
    for (let i = 0; i < nom.length; i++) {
      if (!isNaN(nom[i])) {
        tractaError(this, "No puede contener NUMEROS!");
        ocultarOk(this);

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
    const patron = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!patron.test(email)) {
      tractaError(this, "Mail incorrecte");
      return;
    }
    mostrarOk(this);
  }
  function validarTelefon() {
    tractaCorrecte(this);
    const telefon = this.value;
    const patron = /^\d{9}$/;
    if (!patron.test(telefon)) {
      tractaError(this, "Telèfon incorrecte");
      return;
    }
    mostrarOk(this);
  }

  function validarDNI() {
    tractaCorrecte(this);
    const dni = this.value;
    const patron = /^\d{8}[a-zA-Z]$/;
    if (!patron.test(dni)) {
      tractaError(this, "DNI incorrecte");
      return;
    }
    const lletres = [
      "T",
      "R",
      "W",
      "A",
      "G",
      "M",
      "Y",
      "F",
      "P",
      "D",
      "X",
      "B",
      "N",
      "J",
      "Z",
      "S",
      "Q",
      "V",
      "H",
      "L",
      "C",
      "K",
      "E",
      "T",
    ];
    const i = parseInt(dni) % 23;
    if (dni[8] !== lletres[i]) {
      tractaError(this, "Lletra DNI incorrecta");
      return;
    }
    mostrarOk(this);
  }

  function validarUsuari() {
    ocultarOk(this);
    tractaCorrecte(this);
    if (this.value.length < 5) {
      tractaError(this, "longitud mínima 5 caràcters");
      return;
    }
    if (this.value.length > 12) {
      tractaError(this, "longitud màxima 12 caràcters");
      return;
    }
    mostrarOk(this);
  }

  function validarContraseña() {
    tractaCorrecte(this);
    ocultarOk(this);
    if (meter.value < 2) {
      tractaError(this, "Contrasenya incorrecta");
      return;
    }
    mostrarOk(this);
  }

  function fortalezaContraseña() {
    var result = zxcvbn(this.value);
    meter.value = result.score;
    habilitarPassword2(result.score);
  }

  function habilitarPassword2(score) {
    document.formulario.password2.disabled = score < 2;
    score = 0;
  }
  function validarContraseña2() {
    tractaCorrecte(this);
    ocultarOk(this);
    if (document.formulario.password.value !== this.value) {
      tractaError(this, "Les contrasenyes no coincideixen");
      return;
    }
    mostrarOk(this);
  }

  function validarObservacions() {
    tractaCorrecte(this);
    if (this.value.length > 120) {
      tractaError(this, "longitud màxima 120 caràcters");
      ocultarOk(this);
      return;
    }
    if (this.value.length > 0) mostrarOk(this);
  }

  function comptadorCaracteres() {
    const caracters = document.formulario.observacions.value.length;
    const comptador = document.getElementById("comptador");
    comptador.style.display = "block";
    comptador.innerHTML = caracters + "/120";
    comptador.style.color = caracters > 120 ? "red" : "white";
  }

  function ocultarComptador() {
    document.getElementById("comptador").style.display = "none";
  }

  function tractaCorrecte(objecte) {
    objecte.setCustomValidity("");
  }

  function tractaError(objecte, text) {
    objecte.setCustomValidity(text);
    objecte.reportValidity();
  }

  function mostrarOk(obj) {
    obj.nextElementSibling.style.display = "block";
  }

  function ocultarOk(obj) {
    obj.nextElementSibling.style.display = "none";
  }
};
