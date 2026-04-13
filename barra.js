window.onload = function () {
  const password = document.getElementById("password");
  const password2 = document.getElementById("password2");
  const meter = document.getElementById("password-strength-meter");
  const text = document.getElementById("password-strength-text");

  const strengthText = {
    0: "Muy débil",
    1: "Débil",
    2: "Aceptable",
    3: "Buena",
    4: "Fuerte",
  };

  function checkPassword() {
    const val = password.value;
    const result = zxcvbn(val);

    meter.value = result.score;

    if (val !== "") {
      text.textContent = "Seguridad: " + strengthText[result.score];
    } else {
      text.textContent = "";
    }

    password2.disabled = val.length === 0;

    validarCoincidencia();
  }

  function validarCoincidencia() {
    const ok1 = password.parentElement.querySelector(".ok");
    const ok2 = password2.parentElement.querySelector(".ok");

    ok1.hidden = password.value.length === 0;

    ok2.hidden = !(
      password.value === password2.value && password2.value !== ""
    );
  }

  password2.addEventListener("input", validarCoincidencia);

  // 👇 MUY IMPORTANTE → hacer global la función
  window.checkPassword = checkPassword;
};
