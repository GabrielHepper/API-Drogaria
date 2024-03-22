document.addEventListener("DOMContentLoaded", function () {
  // função que carrega a lista de heróis ao entrar na página
  carregarListaHerois();

  // Adiciona um listener do formulário para adicionar heróis.
  document
    .getElementById("formHeroi")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      adicionarHeroi();
    });
});

function adicionarHeroi() {
  const id = document.getElementById("idHeroi").value;
  const nome = document.getElementById("nomeHeroi").value;
  const habilidade1 = document.getElementById("habilidade1").value;
  const habilidade2 = document.getElementById("habilidade2").value;
  const habilidade3 = document.getElementById("habilidade3").value;
  const foto = document.getElementById("foto").files[0].name;
  const resumo = document.getElementById("resumo").value;

  fetch("http://localhost:3000/herois", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      nome: nome,
      habilidade1: habilidade1,
      habilidade2: habilidade2,
      habilidade3: habilidade3,
      foto: foto,
      resumo: resumo,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Após adicionar o herói com sucesso, carrega imediatamente a lista.
      console.log("Herói adicionado com sucesso:", data);
      carregarListaHerois();
    })
    .catch((error) => console.error("Erro:", error));
}

function carregarListaHerois() {
  fetch("http://localhost:3000/herois")
    .then((response) => response.json())
    .then((data) => carregarHerois(data))
    .catch((error) => console.error("Erro:", error));
}

function carregarHerois(data) {
  const listaHerois = document.getElementById("listaHerois");
  listaHerois.innerHTML = "";

  data.forEach((heroi) => {
    const listItem = document.createElement("li");
    listItem.className = "list";

    let button = document.createElement("button");
    button.className = "buttonList";
    button.onclick = () => removerHeroi(heroi.id);
    button.textContent = "Remover";

    let atualizarButton = document.createElement("button");
    atualizarButton.className = "buttonList";
    atualizarButton.onclick = () => abrirAtualizar();
    atualizarButton.textContent = "Atualizar";

    listItem.innerHTML = `<img src=${heroi.foto}>`;
    listaHerois.appendChild(listItem);
    listaHerois.appendChild(button);
    listaHerois.appendChild(atualizarButton);
  });
}

function removerHeroi(heroiId) {
  fetch(`http://localhost:3000/herois/${heroiId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Herói removido com sucesso:", data);
      carregarListaHerois();
    })
    .catch((error) => console.error("Erro:", error));
}

function carregarDadosHerois() {}

function voltar() {
  let formAtualizar = document.getElementById("formDetalhesHerois");
  formAtualizar.style.display = "none";
}

function abrirAtualizar() {
  let formAtualizar = document.getElementById("formDetalhesHerois");
  formAtualizar.style.display = "block";
}
