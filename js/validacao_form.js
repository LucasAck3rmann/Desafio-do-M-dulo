// Define estilos de erro para o input
const setErrorStyles = (input) =>
  (input.style.borderBottom = "1px solid #ff0000");

// Remove estilos de erro do input
const removeErrorStyles = (input) =>
  (input.style.borderBottom = "1px solid #ffffff");

//validar o formulário
const validateForm = () => {
  let isValid = true;
  document.querySelectorAll("input, select").forEach((input) => {
    // Verifica
    if (!input.checkValidity()) {
      setErrorStyles(input);
      isValid = false;
    }
  });
  //campo de telefone
  const phoneInput = document.getElementById("tutor-phone");
  if (phoneInput.value.replace(/\D/g, "").length < 11) {
    setErrorStyles(phoneInput);
    isValid = false;
  }
  return isValid;
};

//submit
document.querySelector("form").addEventListener("submit", (e) => {
  if (!validateForm()) e.preventDefault();
});

document.querySelectorAll("input, select").forEach((input) => {
  input.addEventListener("input", () => {
    if (input.checkValidity()) removeErrorStyles(input);
  });
  input.addEventListener("invalid", (e) => {
    e.preventDefault();
    setErrorStyles(input);
  });
});

//nome do tutor
document.getElementById("tutor-name").addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[0-9]/g, "");
});

//telefone do tutor
document.getElementById("tutor-phone").addEventListener("input", (e) => {
  const x = e.target.value
    .replace(/\D/g, "")
    .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
  e.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ""}`;
});

//data de agendamento
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("appointment-date").setAttribute("min", today);
});

// nome do animal
document.getElementById("animal-name").addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[0-9]/g, "");
});

//idade do animal
document.getElementById("animal-age").setAttribute("max", 100);

//armazena dados
const storeFormData = () => {
  const formData = {
    tutorName: document.getElementById("tutor-name").value,
    tutorPhone: document.getElementById("tutor-phone").value,
    tutorAddress: document.getElementById("tutor-address").value,
    appointmentDate: document.getElementById("appointment-date").value,
    animalName: document.getElementById("animal-name").value,
    animalAge: document.getElementById("animal-age").value,
    animalSize: document.getElementById("animal-size").value,
  };
  let allFormData = JSON.parse(localStorage.getItem("allFormData")) || [];
  allFormData.push(formData);
  localStorage.setItem("allFormData", JSON.stringify(allFormData));
};

//submit
document.querySelector("form").addEventListener("submit", (e) => {
  if (!validateForm()) {
    e.preventDefault();
  } else {
    storeFormData();
    window.location.href = "/gerenciamento.html";
  }
});
