const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors()); 
app.use(express.json()); 
const USER_TEST = {
    id: 1,
    username: 'user@teste.com',
    role: 'aluno', 
    password: 'password123'
};

function criarToken(usuario) {
    return jwt.sign(
        { sub: usuario.id, role: usuario.role },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
}

function validarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (token == null) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Erro de validação do token:', err.message);
        return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
}

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === USER_TEST.username && password === USER_TEST.password) {
        const token = criarToken(USER_TEST);
        return res.status(200).json({ token: token });
    } else {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
});

app.get('/private', validarToken, (req, res) => {
    const { sub, role } = req.user;
    return res.status(200).json({
        message: 'Acesso concedido à rota privada!',
        userId: sub,
        userRole: role,
        data: 'Esta é uma mensagem secreta do servidor!'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor Backend rodando em http://localhost:${PORT}`);
    console.log(`Credenciais de teste: ${USER_TEST.username} / ${USER_TEST.password}`);
});