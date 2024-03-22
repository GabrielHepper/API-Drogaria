import * as leitor from "readline-sync"
import banco from "./db"

class Livro {
    titulo: string;
    autor: string;
    anoPublicacao: number;
    quantidadeDisponivel: number;
    paginas: number;

    constructor(titulo: string, autor: string, anoPublicacao: number, quantidadeDisponivel: number, paginas: number){
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this. quantidadeDisponivel = quantidadeDisponivel;
        this.paginas = paginas;
    }
}


class Usuario {
    nome: string;
    email: string;

    constructor(nome: string, email: string){
        this.nome = nome;
        this.email = email;
    }
}

export class SistemaBiblioteca {
    usuarios: Array<Usuario>;
    livros: Array<Livro>;

    constructor(){
        this.usuarios = [];
        this.livros = [];
    }

    cadastrarLivros(): void {
        let titulo:                 string = leitor.question("Informe o título: ")
        let autor:                  string = leitor.question("Informe o leitor: ")
        let anoPublicacao:          number = leitor.question("Informe o ano de publicação: ")
        let quantidadeDisponivel:   number = leitor.question("Informe a quantidade disponível: ")
        let paginas:                number = leitor.question("Informe o numero de paginas: ")


        let livro: Livro = new Livro(titulo, autor, anoPublicacao, quantidadeDisponivel, paginas)

        this.criarLivroBanco(livro);
    }

    async criarLivroBanco(livro: Livro): Promise<void> {
        try {
            await executeDatabaseQuery(`
                INSERT INTO Livros (titulo, autor, anoPulicacao, quantidadeDisponivel, paginas) VALUES (?, ?, ?, ?, ?);
            `, [livro.titulo, livro.autor, livro.anoPublicacao, livro.quantidadeDisponivel, livro.paginas])
            console.log(`\n Livro: ${livro.titulo} cadastrado com sucesso`)
        } catch(e) {
            console.log("Erro:", e)
        }
    }

    cadastrarUsuarios(): void {
        let nome: string = leitor.question("Informe o nome do usuário: ")
        let email: string = leitor.question("Informe o email do usuário: ")

        let usuario: Usuario = new Usuario(nome, email)

        this.criarUsuarioBanco(usuario)
    }

    async criarUsuarioBanco(usuario: Usuario): Promise<void> { 
        try {
            executeDatabaseQuery(`
            INSERT INTO Usuarios (nome, email) VALUES (?, ?);
            `, [usuario.nome, usuario.email])
            console.log(`\n Usuário: ${usuario.nome} cadastrado com sucesso`)
        } catch (e) {
            console.log("Erro:", e)
        }
    }

    
}



async function executeDatabaseQuery(query: string, params: any[]): Promise<any> {
    try {
        const result = await banco.execute(query, params)
        return result
    } catch (e) {
        console.log("Erro:", e)
    }
}