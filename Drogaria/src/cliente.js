const express = require('express');
const cliente = express();
const dados = require('./data/dados.json');
const fs = require('fs');
cliente.use(express.json());
cliente.listen(3001, () => {
    console.log('Servidor está funcionando!');
});

cliente.post('/clientes', (req, res) => {
    const novoCliente = req.body;

    if (!novoCliente.id || !novoCliente.nome || !novoCliente.endereco || !novoCliente.email || !novoCliente.telefone) {
        return res.status(400).json({ mensagem: 'Dados incompletos, tente novamente' });
    } else {
        dados.Cliente.push(novoCliente);
        salvarDados(dados);
        return res.status(201).json({ mensagem: 'Novo cliente cadastrado com sucesso.' });
    }
});

cliente.get('/clientes', (req, res) => {
    return res.json(dados.Cliente);
});

cliente.put('/clientes/:id', (req, res) => {
    const clienteID = parseInt(req.params.id);
    const atualizarCliente = req.body;
    const idCliente = dados.Cliente.findIndex((c) => c.id === clienteID);

    if (idCliente === -1) {
        return res.status(404).json({ mensagem: 'Cliente não encontrado :/' });
    } else {
        dados.Cliente[idCliente].nome = atualizarCliente.nome || dados.Cliente[idCliente].nome;
        dados.Cliente[idCliente].endereco = atualizarCliente.endereco || dados.Cliente[idCliente].endereco;
        dados.Cliente[idCliente].email = atualizarCliente.email || dados.Cliente[idCliente].email;
        dados.Cliente[idCliente].telefone = atualizarCliente.telefone || dados.Cliente[idCliente].telefone;

        salvarDados(dados);

        return res.json({ mensagem: 'Cliente atualizado com sucesso.' });
    }
});

cliente.delete('/clientes/:id', (req, res) => {
    const clienteID = parseInt(req.params.id);
    dados.Cliente = dados.Cliente.filter((c) => c.id !== clienteID);
    salvarDados(dados);
    return res.status(200).json({ mensagem: 'Cliente excluído com sucesso!' });
});

function salvarDados(dados) {
    fs.writeFileSync(__dirname + '/../data/dados.json', JSON.stringify(dados, null, 2));
}