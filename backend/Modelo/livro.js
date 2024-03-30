import LivroDAO from "../Persistencia/livroDAO.js";

export default class Livro {
    #codigo;
    #nome;
    #precoCusto;
    #precoVenda;
    #dataCompra;
    #qtdEstoque;
    #autor;

    constructor(codigo = 0, nome = "", precoCusto = 0, precoVenda = 0, dataCompra = '', qtdEstoque = 0, autor = {}) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#precoCusto = precoCusto;
        this.#precoVenda = precoVenda;
        this.#dataCompra = dataCompra;
        this.#qtdEstoque = qtdEstoque;
        this.#autor = autor;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get precoCusto() {
        return this.#precoCusto;
    }

    set precoCusto(novoPrecoCusto) {
        this.#precoCusto = novoPrecoCusto;
    }

    get precoVenda() {
        return this.#precoVenda;
    }

    set precoVenda(novoPrecoVenda) {
        this.#precoVenda = novoPrecoVenda;
    }

    get dataCompra() {
        return this.#dataCompra;
    }

    set dataCompra(novaDataCompra) {
        this.#dataCompra = novaDataCompra;
    }

    get qtdEstoque() {
        return this.#qtdEstoque;
    }

    set qtdEstoque(novoEstoque) {
        this.#qtdEstoque = novoEstoque;
    }

    get autor() {
        return this.#autor;
    }

    set autor(novoAutor) {
        this.#autor = novoAutor;
    }

    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
            precoCusto: this.#precoCusto,
            precoVenda: this.#precoVenda,
            dataCompra: this.#dataCompra,
            qtdEstoque: this.#qtdEstoque,
            autor: this.#autor,
        }
    }

    async gravar() {
        const livroDAO = new LivroDAO();
        await livroDAO.gravar(this);
    }

    async excluir() {
        const livroDAO = new LivroDAO();
        await livroDAO.excluir(this);
    }

    async atualizar() {
        const livroDAO = new LivroDAO();
        await livroDAO.atualizar(this);
    }

    async consultar(termo) {
        const livroDAO = new LivroDAO();
        return await livroDAO.consultar(termo);
    }
}
