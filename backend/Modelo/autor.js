import AutorDAO from "../Persistencia/autorDAO.js";

export default class Autor {
    #codigo;
    #genero;

    constructor(codigo=0, genero = '') {
        this.#codigo = codigo;
        this.#genero = genero;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get genero() {
        return this.#genero;
    }

    set genero(novoGenero) {
        this.#genero = novoGenero;
    }

    toJSON() {
        return {
            codigo:this.#codigo,
            genero:this.#genero
        }
    }

    async gravar() {
        const autDAO = new AutorDAO();
        await autDAO.gravar(this);
    }

    async excluir() {
        const autDAO = new AutorDAO();
        await autDAO.excluir(this);
    }

    async atualizar() {
        const autDAO = new AutorDAO();
        await autDAO.atualizar(this);
    }

    async consultar(parametro) {
        const autDAO = new AutorDAO();
        return await autDAO.consultar(parametro);
    }
}
