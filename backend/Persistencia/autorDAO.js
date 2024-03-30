import Autor from "../Modelo/autor.js"; // Certifique-se de que o caminho do arquivo está correto.
import conectar from "./conexao.js";

export default class AutorDAO {
    async gravar(autor) {
        if (autor instanceof Autor) {
            const sql = "INSERT INTO autor(aut_genero) VALUES(?)";
            const parametros = [autor.genero];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            autor.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(autor) {
        if (autor instanceof Autor) {
            const sql = "UPDATE autor SET aut_genero = ? WHERE aut_codigo = ?";
            const parametros = [autor.genero, autor.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(autor) {
        if (autor instanceof Autor) {
            const sql = "DELETE FROM autor WHERE aut_codigo = ?";
            const parametros = [autor.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];

        if (!isNaN(parseInt(parametroConsulta))) {
            // Consultar pelo código do autor
            sql = 'SELECT * FROM autor WHERE aut_codigo = ? ORDER BY aut_genero';
            parametros = [parametroConsulta];
        } else {
            // Consultar pelo genero do autor
            if (!parametroConsulta) {
                parametroConsulta = '';
            }
            sql = "SELECT * FROM autor WHERE aut_genero LIKE ?";
            parametros = ['%' + parametroConsulta + '%'];
        }

        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaAutores = [];
        for (const registro of registros) {
            const autor = new Autor(registro.aut_codigo, registro.aut_genero);
            listaAutores.push(autor);
        }
        return listaAutores;
    }
}
