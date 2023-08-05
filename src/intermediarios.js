const bancodedados = require('./bancodedados');

function admin(req, res, next) {
    if (bancodedados.banco.senha === req.query.senha_banco) {
        next();
    }else{
        if (req.query.senha_banco) return res.status(403).json({mensagem: 'o usuário não tem permissão de acessar o recurso solicitado'});
    }
}

module.exports = {
    admin
}