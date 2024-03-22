const express = require("express");
const server = express();
const dadosHerois = require("./data/herois.json");
const fs = require("fs");
const cors = require("cors");

server.use(cors()); // permite que o servidor seja acessado por outros domínios,

server.use(express.json());

// Middleware para tratamento de erros
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Erro interno do servidor!");
});

server.listen(3000, () => {
  console.log(`Se funcionou, não mexe!`);
});

server.post("/herois", (req, res) => {
  const novoHeroi = req.body;
  let foto = "../assets/" + novoHeroi.foto;
  novoHeroi.foto = foto;

  if (
    !novoHeroi.id ||
    !novoHeroi.nome ||
    !novoHeroi.habilidade1 ||
    !novoHeroi.habilidade2 ||
    !novoHeroi.habilidade3 ||
    !novoHeroi.foto ||
    !novoHeroi.resumo
  ) {
    return res
      .status(400)
      .json({ mensagem: "Dados incompletos, tente novamente" });
  } else {
    dadosHerois.herois.push(novoHeroi);
    salvarDados(dadosHerois);
    return res
      .status(201)
      .json({ mensagem: "Novo usuario cadastrado com sucesso!" });
  }
});

server.get("/herois", (req, res) => {
  return res.json(dadosHerois.herois);
});

server.put("/herois/:id", (req, res) => {
  const heroisId = parseInt(req.params.id);

  const atualizarHerois = req.body;

  const idHerois = dadosHerois.herois.findIndex((u) => u.id === heroisId);

  if (idHerois === -1) {
    return res.status(404).json({ mensagem: "Herói não encontrado :/" });
  } else {

    dadosHerois.herois[idHerois].habilidade1 =
      atualizarHerois.habilidade1 || dadosHerois.herois[idHerois].habilidade1;

    dadosHerois.herois[idHerois].habilidade2 =
      atualizarHerois.habilidade2 || dadosHerois.herois[idHerois].habilidade2;

    dadosHerois.herois[idHerois].habilidade3 =
      atualizarHerois.habilidade3 || dadosHerois.herois[idHerois].habilidade3;

    salvarDados(dadosHerois);

    return res.json({ mensagem: "Herói atualizado com sucesso!" });
  }
});

server.delete("/herois/:id", (req, res) => {
  const heroisId = req.params.id;

  dadosHerois.herois = dadosHerois.herois.filter((u) => u.id !== heroisId);

  salvarDados(dadosHerois);

  return res.status(200).json({ mensagem: "Herói excluído com sucesso" });
});

function salvarDados() {
  fs.writeFileSync(
    __dirname + "/data/herois.json",
    JSON.stringify(dadosHerois, null, 2)
  );
}
