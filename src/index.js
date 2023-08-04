const app = require('./servidor');
const rotas = require('./rotas');

app.use(rotas);

app.listen(3000);