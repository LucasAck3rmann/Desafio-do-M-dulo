const setErrorStyles = (input) =>
  (input.style.borderBottom = "1px solid #ff0000");
const removeErrorStyles = (input) =>
  (input.style.borderBottom = "1px solid #ffffff");

const validateForm = () => {
  let isValid = true;
  document.querySelectorAll("input, select").forEach((input) => {
    if (!input.checkValidity()) {
      setErrorStyles(input);
      isValid = false;
    }
  });
  const phoneInput = document.getElementById("tutor-phone");
  if (phoneInput.value.replace(/\D/g, "").length < 11) {
    setErrorStyles(phoneInput);
    isValid = false;
  }
  return isValid;
};

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

document.getElementById("tutor-name").addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[0-9]/g, "");
});

document.getElementById("tutor-phone").addEventListener("input", (e) => {
  const x = e.target.value
    .replace(/\D/g, "")
    .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
  e.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ""}`;
});

document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("appointment-date").setAttribute("min", today);
});

document.getElementById("animal-name").addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[0-9]/g, "");
});

document.getElementById("animal-age").setAttribute("max", 100);
