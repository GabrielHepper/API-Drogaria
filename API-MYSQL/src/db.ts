var mariadb = require("mariadb")

const banco = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'senac',
    port: '3306',
    database: 'biblioteca',
    waitForConnection: true,
    connectionLimit: 10
})

export default banco;

banco.execute(`
    CREATE DATABASE IF NOT EXISTS Biblioteca
`)

banco.execute(`
    CREATE TABLE livros
    id_livro INT AUTO_INCREMENT PRIMARY_KEY,
    titulo VARCHAR(50) NOT NULL,
    autor VARCHAR(50) NOT NULL,
    anoPublicacao INT NOT NULL
    quantidadeDisponivel INT NOT NULL,
    paginas INT NOT NULL;

`)

banco.execute(`
    CREATE TABLE usuarios
    id_usuario INR AUTO_INCREMENT PRIMARY_KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
`)

banco.execute(`
    id_biblioteca INT AUTO_INCREMENT PRIMARY_KEY,
    id_usuario INT NOT NULL,
    id_livro INT NOT NUL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_livro) REFERENCES livros(id_livro) ON DELETE CASCADE,
`) 