const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',    // ou IP do seu servidor
  user: 'usuario_valorant',
  password: 'vitor99.',
  database: 'banco_valorant'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err.message);
  } else {
    console.log('Conexão com MySQL realizada com sucesso!');
  }
  connection.end(); // fecha a conexão
});
