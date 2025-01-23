// Define estilos de erro para o input
const setErrorStyles = (input) =>
  (input.style.borderBottom = "1px solid #ff0000");

// Remove estilos de erro do input
const removeErrorStyles = (input) =>
  (input.style.borderBottom = "1px solid #ffffff");

// Função para validar o formulário
const validateForm = () => {
  let isValid = true;
  // Itera sobre todos os inputs e selects do formulário
  document.querySelectorAll("input, select").forEach((input) => {
    // Verifica se o input é válido
    if (!input.checkValidity()) {
      setErrorStyles(input); // Aplica estilo de erro se inválido
      isValid = false;
    }
  });
  // Validação específica para o campo de telefone
  const phoneInput = document.getElementById("tutor-phone");
  if (phoneInput.value.replace(/\D/g, "").length < 11) {
    setErrorStyles(phoneInput); // Aplica estilo de erro se inválido
    isValid = false;
  }
  return isValid; // Retorna se o formulário é válido ou não
};

// Adiciona evento de submit ao formulário
document.querySelector("form").addEventListener("submit", (e) => {
  if (!validateForm()) e.preventDefault(); // Impede o envio se o formulário for inválido
});

// Adiciona eventos de input e invalid para todos os inputs e selects
document.querySelectorAll("input, select").forEach((input) => {
  input.addEventListener("input", () => {
    if (input.checkValidity()) removeErrorStyles(input); // Remove estilo de erro se válido
  });
  input.addEventListener("invalid", (e) => {
    e.preventDefault();
    setErrorStyles(input); // Aplica estilo de erro se inválido
  });
});

// Remove números do campo de nome do tutor
document.getElementById("tutor-name").addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[0-9]/g, "");
});

// Formata o campo de telefone do tutor
document.getElementById("tutor-phone").addEventListener("input", (e) => {
  const x = e.target.value
    .replace(/\D/g, "")
    .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
  e.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ""}`;
});

// Define a data mínima para o campo de data de agendamento
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("appointment-date").setAttribute("min", today);
});

// Remove números do campo de nome do animal
document.getElementById("animal-name").addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[0-9]/g, "");
});

// Define o valor máximo para o campo de idade do animal
document.getElementById("animal-age").setAttribute("max", 100);
