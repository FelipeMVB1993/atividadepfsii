import express from 'express';
import cors from 'cors';
import rotaAutor from './Rotas/rotaAutor.js';
import rotaLivro from './Rotas/rotaLivro.js';
import rotaLogin from './Rotas/rotaLogin.js';
import rotaPedido from './Rotas/rotaPedido.js';
import dotenv from 'dotenv';
import session from 'express-session';
import rotaCliente from './Rotas/rotaCliente.js';
import { verificarAcesso } from './Seguranca/autenticacao.js';

const host='0.0.0.0';
const porta='3001';

dotenv.config();


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SEGREDO,
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 6
}))

app.use('/login',rotaLogin);
//verificarAcesso passa a ser middleware = camada do meio
app.use('/cliente',rotaCliente);
app.use('/autor',rotaAutor);
app.use('/livro',rotaLivro);
app.use('/pedido',rotaPedido);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
