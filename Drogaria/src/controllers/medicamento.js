const express = require('express');
const medicamento = express();
const dados = require('./data/dados.json');
const fs = require("fs")
medicamento.use(express.json());




// Rota para salvar/inserir dados no JSON (equivalente ao "Create" do CRUD)
medicamento.post("/medicamentos", (req, res) => {
    // Obtendo os dados do corpo da requisição
    const novoMedicamento = req.body

    // Verificando se os dados necessários estão presentes
    if(!novoMedicamento.id || !novoMedicamento.nome_medicamento || !novoMedicamento.nome_fabricante || !novoMedicamento.preco ||
       !novoMedicamento.quantidade){
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        // Adicionando o novo usuário aos dados existentes
        dados.Medicamento.push(novoMedicamento)
        
        // Salvando os dados atualizados no arquivo JSON
        salvarDados(dados)
        
        // Respondendo com status 201 (Created) e uma mensagem
        return res.status(201).json({mensagem: "Novo medicamento cadastrado com sucesso."})
    }
})

// Rota para obter dados da API (equivalente ao "Read" do CRUD)
medicamento.get("/medicamentos", (req, res) => {
    // Respondendo com os dados dos usuários
    return res.json(dados.Medicamento)
})

// Rota para atualizar um usuário (equivalente ao "Update" do CRUD)
medicamento.put("/medicamentos/:id", (req, res) => {
    // Obtendo o ID do usuário da URL
    const MedicamentoID = parseInt(req.params.id)
    
    // Obtendo os dados a serem atualizados do corpo da requisição
    const atualizarMedicamento = req.body

    // Encontrando o índice do usuário no array de dados
    const idMedicamento = dados.users.findIndex(u => u.id === MedicamentoID)

    // Verificando se o usuário foi encontrado
    if(idUsuario === -1){
        return res.status(404).json({mensagem: "Usuário não encontrado :/"})
    } else {
        // Atualizando os dados do usuário com os novos valores, se fornecidos
        dados.Medicamento[idMedicamento].nome_medicamento = atualizarMedicamento.nome_medicamento || dados.Medicamento[idMedicamento].nome_medicamento
        dados.Medicamento[idMedicamento].nome_fabricante = atualizarMedicamento.nome_fabricante || dados.Medicamento[idMedicamento].nome_fabricante
        dados.Medicamento[idMedicamento].preco = atualizarMedicamento.preco || dados.Medicamento[idMedicamento].preco
        dados.Medicamento[idMedicamento].quantidade = atualizarMedicamento.quantidade || dados.Medicamento[idMedicamento].quantidade


        salvarDados(dados)

        return res.json({mensagem: "Medicamento atualizado com sucesso."})
    }
})


medicamento.delete("/medicamentos/:id", (req, res) => {
    const medicamentoID = parseInt(req.params.id)

    dados.Medicamento = dados.Medicamento.filter(u => u.id !== medicamentoID)

    salvarDados(dados)

    return res.status(200).json({mensagem: "Excluído com sucesso!"})

})

// Função para salvar dados no arquivo JSON
function salvarDados(){
    // Escrevendo os dados no arquivo dados.json com formatação para legibilidade (2 espaços de indentação)
    fs.writeFileSync(__dirname + "/data/dados.json", JSON.stringify(dados, null, 2))
}

