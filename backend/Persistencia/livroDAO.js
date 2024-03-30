import Livro from "../Modelo/livro.js"; // Certifique-se de que o caminho do arquivo está correto.
import conectar from "./conexao.js";
import Autor from "../Modelo/autor.js";

export default class LivroDAO {

    async gravar(livro) {
        if (livro instanceof Livro) {
            const autorCodigo = livro.autor.codigo; // Acessando o valor do código do departamento
            const sql = "INSERT INTO livro(liv_nome, liv_precoCusto, liv_precoVenda, liv_dataCompra, liv_qtdEstoque, aut_codigo) VALUES (?, ?, ?, ?, ?, ?)";
            const parametros = [livro.nome, livro.precoCusto, livro.precoVenda, livro.dataCompra, livro.qtdEstoque, autorCodigo]; // Passando o código do departamento como um parâmetro separado
            const conexao = await conectar();
            try {
                const retorno = await conexao.execute(sql, parametros);
                livro.codigo = retorno[0].insertId;
                global.poolConexoes.releaseConnection(conexao);
                return true; // Indicando que a operação foi bem-sucedida
            } catch (erro) {
                console.error("Erro ao registrar o livro:", erro);
                return false; // Indicando que ocorreu um erro
            }
        }
        return false; // Indicando que o parâmetro passado não é uma instância válida de Livro
    }

    // async atualizar(livro) {
    //     if (livro instanceof Livro) {
    //         const sql = `UPDATE livro SET liv_nome = ?, liv_precoCusto = ?,
    //         liv_precoVenda = ?, liv_dataCompra = ?, liv_qtdEstoque = ?, aut_codigo = ?
    //         WHERE liv_codigo = ?`;
    //         const parametros = [
    //             livro.nome,
    //             livro.precoCusto,
    //             livro.precoVenda,
    //             livro.dataCompra,
    //             livro.qtdEstoque,
    //             livro.autor,
    //             livro.codigo,
    //         ];

    //         const conexao = await conectar();
    //         await conexao.execute(sql, parametros);
    //         global.poolConexoes.releaseConnection(conexao);
    //     }
    // }

    async atualizar(livro) {
        if (livro instanceof Livro) {
            const sql = `UPDATE livro SET liv_nome = ?, liv_precoCusto = ?,
            liv_precoVenda = ?, liv_dataCompra = ?, liv_qtdEstoque = ?, aut_codigo = ?
            WHERE liv_codigo = ?`;
            const parametros = [livro.nome, livro.precoCusto, livro.precoVenda,
            livro.dataCompra, livro.qtdEstoque, livro.autor.codigo, livro.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(livro) {
        if (livro instanceof Livro) {
            const sql = `DELETE FROM livro WHERE liv_codigo = ?`;
            const parametros = [livro.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo) {
            termo = "";
        }

        const conexao = await conectar();
        let listaLivros = [];

        // Consulta pelo código do Livro
        if (!isNaN(parseInt(termo))) {
            const sql = `
            SELECT 
                l.liv_codigo, l.liv_nome, l.liv_precoCusto,
                l.liv_precoVenda, l.liv_dataCompra, l.liv_qtdEstoque, l.aut_codigo,
                a.aut_codigo AS aut_codigo, a.aut_genero AS aut_genero
            FROM 
                livro l
                INNER JOIN autor a ON l.aut_codigo = a.aut_codigo
            WHERE 
                l.liv_codigo = ?
            ORDER BY 
                l.liv_nome
        `;

            const parametros = [termo];
            const [registros, campos] = await conexao.execute(sql, parametros);

            for (const registro of registros) {
                const autor = new Autor(registro.aut_codigo, registro.aut_genero);
                const livro = new Livro(
                    registro.liv_codigo,
                    registro.liv_nome,
                    registro.liv_precoCusto,
                    registro.liv_precoVenda,
                    registro.liv_dataCompra,
                    registro.liv_qtdEstoque,
                    autor
                );
                listaLivros.push(livro);
            }
        } else {
            // Consulta pelo nome do livro
            const sql = `
            SELECT 
                l.liv_codigo, l.liv_nome, l.liv_precoCusto,
                l.liv_precoVenda, l.liv_dataCompra, l.liv_qtdEstoque, l.aut_codigo,
                a.aut_codigo AS aut_codigo, a.aut_genero AS aut_genero
            FROM 
                livro l
                INNER JOIN autor a ON l.aut_codigo = a.aut_codigo
            WHERE 
                l.liv_nome LIKE ?
            ORDER BY 
                l.liv_nome
        `;

            const parametros = ["%" + termo + "%"];
            const [registros, campos] = await conexao.execute(sql, parametros);

            for (const registro of registros) {
                const autor = new Autor(registro.aut_codigo, registro.aut_genero);
                const livro = new Livro(
                    registro.liv_codigo,
                    registro.liv_nome,
                    registro.liv_precoCusto,
                    registro.liv_precoVenda,
                    registro.liv_dataCompra,
                    registro.liv_qtdEstoque,
                    autor
                );
                listaLivros.push(livro);
            }
        }

        return listaLivros;
    }

}
