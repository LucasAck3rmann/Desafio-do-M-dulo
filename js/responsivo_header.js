// Seleciona os elementos do DOM
const nav = document.querySelector(".nav");
const btnMenu = document.querySelector(".btn-menu");
const menu = document.querySelector(".menu");

// Função para lidar com o clique no botão
function handleButtonClick(event) {
  if (event.type === "touchstart") event.preventDefault(); // Previne o comportamento padrão do toque
  event.stopPropagation(); // Impede a propagação do evento
  nav.classList.toggle("active"); // Alterna a classe 'active' no elemento nav
  handleClickOutside(menu, () => {
    nav.classList.remove("active"); // Remove a classe 'active' ao clicar fora
    setAria(); // Atualiza os atributos ARIA
  });
  setAria(); // Atualiza os atributos ARIA
}

// Função para lidar com cliques fora do elemento alvo
function handleClickOutside(targetElement, callback) {
  const html = document.documentElement;

  function handleHTMLClick(event) {
    if (!targetElement.contains(event.target)) {
      targetElement.removeAttribute("data-target");
      html.removeEventListener("click", handleHTMLClick);
      html.removeEventListener("touchstart", handleHTMLClick);
      callback(); // Executa o callback
    }
  }

  if (!targetElement.hasAttribute("data-target")) {
    html.addEventListener("click", handleHTMLClick);
    html.addEventListener("touchstart", handleHTMLClick);
    targetElement.setAttribute("data-target", "");
  }
}

// Função para atualizar os atributos ARIA
function setAria() {
  const isActive = nav.classList.contains("active");
  btnMenu.setAttribute("aria-expanded", isActive);
  btnMenu.setAttribute("aria-label", isActive ? "Fechar Menu" : "Abrir Menu");
}

// Adiciona os eventos de clique e toque ao botão do menu
btnMenu.addEventListener("click", handleButtonClick);
btnMenu.addEventListener("touchstart", handleButtonClick);
