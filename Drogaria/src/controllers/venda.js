const express = require('express');
const venda = express(); 
const dados = require('./data/dados.json');
const fs = require('fs');
venda.use(express.json());


venda.post('/vendas', (req, res) => {
    const novaVenda = req.body;

    if (!novaVenda.id || !novaVenda.data || !novaVenda.id_medicamento || !novaVenda.id_cliente) {
        return res.status(400).json({ mensagem: 'Dados incompletos, tente novamente' });
    } else {
        dados.Venda.push(novaVenda);
        salvarDados(dados);
        return res.status(201).json({ mensagem: 'Nova venda cadastrada com sucesso.' });
    }
});

venda.get('/vendas', (req, res) => {
    return res.json(dados.Venda);
});

venda.put('/vendas/:id', (req, res) => {
    const vendaID = parseInt(req.params.id);
    const atualizarVenda = req.body;
    const idVenda = dados.Venda.findIndex((v) => v.id === vendaID);

    if (idVenda === -1) {
        return res.status(404).json({ mensagem: 'Venda não encontrada :/' });
    } else {
        dados.Venda[idVenda].data = atualizarVenda.data || dados.Venda[idVenda].data;
        dados.Venda[idVenda].id_medicamento = atualizarVenda.id_medicamento || dados.Venda[idVenda].id_medicamento;
        dados.Venda[idVenda].id_cliente = atualizarVenda.id_cliente || dados.Venda[idVenda].id_cliente;

        salvarDados(dados);

        return res.json({ mensagem: 'Venda atualizada com sucesso.' });
    }
});

venda.delete('/vendas/:id', (req, res) => {
    const vendaID = parseInt(req.params.id);
    dados.Venda = dados.Venda.filter((v) => v.id !== vendaID);
    salvarDados(dados);
    return res.status(200).json({ mensagem: 'Venda excluída com sucesso!' });
});

function salvarDados(dados) {
    fs.writeFileSync(__dirname + '/../data/dados.json', JSON.stringify(dados, null, 2));
}