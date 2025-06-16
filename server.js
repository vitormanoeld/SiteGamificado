const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do banco de dados
const dbConfig = {
  host: 'localhost',
  user: 'root', // substitua pelo seu usuário
  password: '', // substitua pela sua senha
  database: 'valorant_quiz' // substitua pelo nome do seu banco
};

// Perguntas extremamente difíceis do Valorant
const perguntas = [
  {
    id: 1,
    pergunta: "Qual é o dano exato da habilidade 'Poison Cloud' do Viper no nível máximo por segundo?",
    opcoes: ["15 HP", "20 HP", "25 HP", "30 HP"],
    resposta: 1 // 20 HP
  },
  {
    id: 2,
    pergunta: "Quantos pontos de ultimate são necessários para ativar a ultimate do Sova?",
    opcoes: ["6 pontos", "7 pontos", "8 pontos", "9 pontos"],
    resposta: 1 // 7 pontos
  },
  {
    id: 3,
    pergunta: "Qual é o tempo exato de duração da 'Resurrection' do Sage?",
    opcoes: ["3.0 segundos", "3.2 segundos", "3.5 segundos", "4.0 segundos"],
    resposta: 1 // 3.2 segundos
  },
  {
    id: 4,
    pergunta: "Qual é o custo em créditos da habilidade 'Updraft' do Jett?",
    opcoes: ["100 créditos", "150 créditos", "200 créditos", "250 créditos"],
    resposta: 2 // 200 créditos
  },
  {
    id: 5,
    pergunta: "Quantos metros de alcance tem a habilidade 'Leer' do Reyna?",
    opcoes: ["Infinito na linha de visão", "35 metros", "40 metros", "45 metros"],
    resposta: 0 // Infinito na linha de visão
  },
  {
    id: 6,
    pergunta: "Qual é o dano da Phantom no headshot com armadura pesada a longa distância?",
    opcoes: ["124 HP", "140 HP", "156 HP", "168 HP"],
    resposta: 2 // 156 HP
  },
  {
    id: 7,
    pergunta: "Quantas balas a Vandal possui no pente?",
    opcoes: ["25 balas", "30 balas", "35 balas", "40 balas"],
    resposta: 0 // 25 balas
  },
  {
    id: 8,
    pergunta: "Qual é o tempo de defuse da spike sem defuse kit?",
    opcoes: ["7.0 segundos", "7.5 segundos", "8.0 segundos", "8.5 segundos"],
    resposta: 0 // 7.0 segundos
  },
  {
    id: 9,
    pergunta: "Quantos orbs Omen pode armazenar da habilidade 'Shadow Step'?",
    opcoes: ["1 orb", "2 orbs", "3 orbs", "Infinitos"],
    resposta: 1 // 2 orbs
  },
  {
    id: 10,
    pergunta: "Qual é a velocidade de movimento durante a ultimate 'Empress' da Reyna?",
    opcoes: ["Normal", "10% mais rápida", "15% mais rápida", "25% mais rápida"],
    resposta: 2 // 15% mais rápida
  },
  {
    id: 11,
    pergunta: "Quantos HP de dano causa a habilidade 'Aftershock' do Breach?",
    opcoes: ["50 HP", "60 HP", "75 HP", "80 HP"],
    resposta: 1 // 60 HP
  },
  {
    id: 12,
    pergunta: "Qual é o alcance máximo da 'Owl Drone' do Sova?",
    opcoes: ["Infinito", "Limitado pelo mapa", "40 metros", "50 metros"],
    resposta: 1 // Limitado pelo mapa
  },
  {
    id: 13,
    pergunta: "Quantos segundos dura a habilidade 'Paranoia' do Omen?",
    opcoes: ["2.0 segundos", "2.25 segundos", "2.5 segundos", "3.0 segundos"],
    resposta: 1 // 2.25 segundos
  },
  {
    id: 14,
    pergunta: "Qual é a penalidade de precisão ao andar com a Operator?",
    opcoes: ["0%", "25%", "50%", "100%"],
    resposta: 3 // 100%
  },
  {
    id: 15,
    pergunta: "Quantos usos tem a habilidade 'Curveball' do Phoenix por round?",
    opcoes: ["1 uso", "2 usos", "3 usos", "Infinitos"],
    resposta: 1 // 2 usos
  },
  {
    id: 16,
    pergunta: "Qual é o tempo de cast da ultimate 'From the Shadows' do Omen?",
    opcoes: ["1.5 segundos", "2.0 segundos", "2.5 segundos", "3.0 segundos"],
    resposta: 0 // 1.5 segundos
  },
  {
    id: 17,
    pergunta: "Quantos HP tem um jogador com armadura leve?",
    opcoes: ["125 HP", "150 HP", "175 HP", "200 HP"],
    resposta: 0 // 125 HP
  },
  {
    id: 18,
    pergunta: "Qual é o dano da Judge no corpo a queima-roupa?",
    opcoes: ["17 HP por pellet", "20 HP por pellet", "22 HP por pellet", "26 HP por pellet"],
    resposta: 2 // 22 HP por pellet
  },
  {
    id: 19,
    pergunta: "Quantos segundos o Cypher tem para recolher sua 'Trapwire' após ser ativada?",
    opcoes: ["2 segundos", "3 segundos", "4 segundos", "5 segundos"],
    resposta: 2 // 4 segundos
  },
  {
    id: 20,
    pergunta: "Qual é a velocidade de recarga da Spectre?",
    opcoes: ["2.25 segundos", "2.5 segundos", "2.75 segundos", "3.0 segundos"],
    resposta: 0 // 2.25 segundos
  }
];

// Rota para servir o HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// Rota para obter as perguntas
app.get('/api/perguntas', (req, res) => {
  // Embaralha as perguntas para cada sessão
  const perguntasEmbaralhadas = [...perguntas].sort(() => Math.random() - 0.5);
  res.json(perguntasEmbaralhadas);
});

// Rota para salvar resultado
app.post('/api/salvar-resultado', async (req, res) => {
  const { nome, pontuacao } = req.body;
  
  if (!nome || pontuacao === undefined) {
    return res.status(400).json({ error: 'Nome e pontuação são obrigatórios' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const query = 'INSERT INTO resultados_quiz (nome, pontuacao) VALUES (?, ?)';
    await connection.execute(query, [nome, pontuacao]);
    
    await connection.end();
    
    res.json({ success: true, message: 'Resultado salvo com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar resultado:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para obter ranking
app.get('/api/ranking', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const query = 'SELECT nome, pontuacao FROM resultados_quiz ORDER BY pontuacao DESC LIMIT 10';
    const [rows] = await connection.execute(query);
    
    await connection.end();
    
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar ranking:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log('Certifique-se de que o banco de dados MySQL está configurado!');
});

// Script SQL para criar a tabela (execute no seu MySQL):
/*
CREATE DATABASE IF NOT EXISTS valorant_quiz;
USE valorant_quiz;

CREATE TABLE IF NOT EXISTS resultados_quiz (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  pontuacao INT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/