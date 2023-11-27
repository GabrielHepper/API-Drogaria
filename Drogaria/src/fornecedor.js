const express = require('express');
const fornecedor = express(); 
const dados = require('./data/dados.json');
const fs = require('fs');
fornecedor.use(express.json());
fornecedor.listen(3002, () => {
    console.log('Fornecedor está funcionando!');
});

fornecedor.post('/fornecedores', (req, res) => {
    const novoFornecedor = req.body;

    if (!novoFornecedor.id || !novoFornecedor.nome || !novoFornecedor.endereco || !novoFornecedor.telefone) {
        return res.status(400).json({ mensagem: 'Dados incompletos, tente novamente' });
    } else {
        dados.Fornecedor.push(novoFornecedor);
        salvarDados(dados);
        return res.status(201).json({ mensagem: 'Novo fornecedor cadastrado com sucesso.' });
    }
});

fornecedor.get('/fornecedores', (req, res) => {
    return res.json(dados.Fornecedor);
});

fornecedor.put('/fornecedores/:id', (req, res) => {
    const fornecedorID = parseInt(req.params.id);
    const atualizarFornecedor = req.body;
    const idFornecedor = dados.Fornecedor.findIndex((f) => f.id === fornecedorID);

    if (idFornecedor === -1) {
        return res.status(404).json({ mensagem: 'Fornecedor não encontrado :/' });
    } else {
        dados.Fornecedor[idFornecedor].nome = atualizarFornecedor.nome || dados.Fornecedor[idFornecedor].nome;
        dados.Fornecedor[idFornecedor].endereco = atualizarFornecedor.endereco || dados.Fornecedor[idFornecedor].endereco;
        dados.Fornecedor[idFornecedor].telefone = atualizarFornecedor.telefone || dados.Fornecedor[idFornecedor].telefone;

        salvarDados(dados);

        return res.json({ mensagem: 'Fornecedor atualizado com sucesso.' });
    }
});

fornecedor.delete('/fornecedores/:id', (req, res) => {
    const fornecedorID = parseInt(req.params.id);
    dados.Fornecedor = dados.Fornecedor.filter((f) => f.id !== fornecedorID);
    salvarDados(dados);
    return res.status(200).json({ mensagem: 'Fornecedor excluído com sucesso!' });
});

function salvarDados(dados) {
    fs.writeFileSync(__dirname + '/../data/dados.json', JSON.stringify(dados, null, 2));
}