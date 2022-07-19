
// Importando módulo express.
var express = require("express")

// Importando módulo body parser (Facilita acessar dados no body da requisição)
var bodyParser = require("body-parser")

// Importando conector Mysql
var mysql = require('mysql');

// Necessário para permitir que as requisições e respostas da API sejam da mesma URL.
var cors = require('cors')

// Conectando ao banco

var con = mysql.createConnection({
    host: "localhost",
    user: "dev",
    password: "dev",
    database: "authWebAppDb"
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

// Definindo porta em que a API irá ouvir.
const PORT = 3000

// Instanciando handler do express.
const app = express()

// Indica ao express que estou usando o plugin body-parser
app.use(bodyParser.json())
app.use(cors)

const ads = [
    {title: 'Hello, world (again)!'}
  ];

app.get('/', (req, res) => {
	res.send('{"Name": "Artur"}')
});

// Criando comportamento para método POST na rota /users.
// Dois parâmetros:
// 1 - Rota
// 2 - Função executada ao receber um requisição POST na rota.
//      Note que ela possui parâmetros request e response.
//      Trataremos a variável request como uma string com o conteúdo da requisição HTTP. 
//      O corpo da requisição terá atributos que devemos conhecer para acessá-los.
//      Na variável response, devolvemos uma string com o conteúdo de uma resposta HTTP.

app.post('/users', (request, response) => {
    
    let user = {
        fName: request.body.firstName,
        lName: request.body.lastName,
        username: request.body.username,
        email: request.body.email,
        password: request.body.password
    }
    
    sql = `SELECT * FROM users WHERE username="${user.username}"`
    // sql = `SELECT * FROM users WHERE username="Tutu"`
    
    let abort = false
    con.query(sql, function (err, result) {
        if (err) throw err;
        if (result != "") {
            console.log("This username was already taken. Aborting operation.")
            abort = true
        }
    });
    
    if (abort = true) {
        return response.json( { success: false } )
    }
    
    sql = `INSERT INTO users (firstName, lastName, username, email, password)\ 
    VALUES ("${user.fName}", "${user.lName}", "${user.username}", "${user.email}", "${user.password}");`
    
    console.log("Query: " + sql)
    
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`1 record inserted (User: ${user.username})`);
    });
    
    // Retornaremos o atributo success da resposta como "true", ao chegar no fim da função.
    return response.json( { success: true } )
})

// Botando app para escutar na porta 3000. Outro argumento é a função de Callback chamada quando
// a API estiver pronta.
app.listen(PORT, () =>
    console.log(`Auth-web-app API is running on: http://localhost:${PORT}.`)
)