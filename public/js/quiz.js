// ===========================================
// CONFIGURAÇÕES E VARIÁVEIS GLOBAIS
// ===========================================
const API_BASE_URL = 'http://localhost:3001';
let currentVideo = null;
let gameState = 'waiting'; // 'waiting', 'playing', 'answered', 'gameover'
let playerName = '';

let pontos = 0;
let vidas = 3;

const eloIcons = {
    bronze: '/assets/elos/bronze.webp',
    prata: '/assets/elos/prata.png',
    ouro: '/assets/elos/Ouro.png',
    platina: '/assets/elos/platina.webp',
    diamante: '/assets/elos/Diamante.png',
    ascendente: '/assets/elos/Ascendente.png',
    imortal: '/assets/elos/Imortal.png',
    radiant: '/assets/elos/Radiant.webp'
};

// ===========================================
// INICIALIZAÇÃO
// ===========================================
window.addEventListener('load', () => {
    console.log('Página carregada e pronta para uso');
    gameState = 'waiting';
    setupUserInput();
});

// ===========================================
// CONFIGURAÇÃO DE INPUT DO USUÁRIO
// ===========================================
function setupUserInput() {
    const userInput = document.getElementById('userName');
    const startBtn = document.getElementById('startBtn');

    if (!userInput || !startBtn) {
        console.error('Elementos userName ou startBtn não encontrados');
        return;
    }

    userInput.addEventListener('input', function() {
        const name = this.value.trim();
        if (name.length >= 2) {
            startBtn.classList.add('enabled');
            playerName = name;
        } else {
            startBtn.classList.remove('enabled');
            playerName = '';
        }
    });

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && playerName.length >= 2) {
            startGame();
        }
    });
}
function getDataLocalFormatada() {
  const now = new Date();
  const ano = now.getFullYear();
  const mes = String(now.getMonth() + 1).padStart(2, '0');
  const dia = String(now.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

const dataEntrada = getDataLocalFormatada();


// ===========================================
// INICIAR JOGO
// ===========================================
async function startGame() {
    const nameInput = document.getElementById('userName');
    playerName = nameInput.value.trim();

    if (playerName.length < 2) {
        alert('Digite um nome válido.');
        return;
    }


    try {
        const response = await fetch(`${API_BASE_URL}/api/salvar-nome`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: playerName, dataEntrada: dataEntrada })

        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erro ao salvar nome');
        }

        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'block';
        document.getElementById('playerGreeting').innerText = `Olá, ${playerName}! Boa sorte!`;

        pontos = 0;
        vidas = 3;
        atualizarDisplay();

        gameState = 'playing';

        await loadNewVideo();
    } catch (err) {
        alert('Erro ao iniciar jogo: ' + err.message);
        console.error(err);
    }
}

// ===========================================
// ATUALIZAR PONTUAÇÃO E VIDAS NO DISPLAY
// ===========================================
function atualizarDisplay() {
    const scoreDisplay = document.getElementById('scoreDisplay');
    const livesDisplay = document.getElementById('livesDisplay');

    if (scoreDisplay) scoreDisplay.textContent = pontos;
    if (livesDisplay) livesDisplay.textContent = vidas;
}

// ===========================================
// CARREGAR ELÓS E BOTÕES
// ===========================================
async function loadElos() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/elos`);
        if (!response.ok) throw new Error(`Erro na API: ${response.status}`);

        const data = await response.json();

        const container = document.getElementById('elosContainer');
        if (!container) throw new Error('Container de elos não encontrado');

        container.innerHTML = '';

        data.elos.forEach(elo => {
            const button = document.createElement('button');
            button.className = `elo-btn elo-${elo}`;
            button.onclick = () => checkAnswer(elo);

            const imgSrc = eloIcons[elo] || '/assets/elos/default.webp';
            button.innerHTML = `
                <div class="elo-icon">
                    <img src="${imgSrc}" alt="${elo}" onerror="this.style.display='none'">
                </div>
                <div class="elo-name">${elo}</div>
            `;

            container.appendChild(button);
        });
    } catch (error) {
        console.error('Erro ao carregar elos:', error);
    }
}

// ===========================================
// CARREGAR NOVO VÍDEO
// ===========================================
async function loadNewVideo() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/random-video`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Erro ao buscar vídeo');

        currentVideo = data;
        const videoElement = document.getElementById('gameVideo');
        videoElement.src = API_BASE_URL + data.video;
        videoElement.load();
        videoElement.play();

        gameState = 'playing';

        await loadElos();
    } catch (error) {
        console.error('Erro ao carregar vídeo:', error.message);
    }
}

// ===========================================
// CHECAR RESPOSTA DO JOGADOR
// ===========================================
async function checkAnswer(selectedElo) {
    if (!currentVideo || gameState !== 'playing') {
        console.log('Não é possível verificar resposta no estado atual');
        return;
    }

    const isCorrect = selectedElo === currentVideo.elo;

    if (isCorrect) {
        pontos++;
        console.log('Resposta correta! Pontos:', pontos);
    } else {
        vidas--;
        console.log('Resposta incorreta! Vidas restantes:', vidas);
    }

    atualizarDisplay();
    gameState = 'answered';

    // Desabilitar e destacar botões
    document.querySelectorAll('.elo-btn').forEach(btn => {
        btn.disabled = true;
        const btnElo = btn.querySelector('.elo-name').textContent.toLowerCase();

        if (btnElo === selectedElo) {
            btn.classList.add(isCorrect ? 'correct' : 'incorrect');
        }

        if (btnElo === currentVideo.elo && !isCorrect) {
            btn.classList.add('correct');
        }
    });

    showResultIcon(isCorrect);

    if (vidas <= 0) {
        await salvarPontuacao();
        alert(`Fim de jogo! Sua pontuação final foi ${pontos}.`);
        resetGame();
        return;
    }
}

// ===========================================
// EXIBIR ÍCONE DE RESULTADO
// ===========================================
function showResultIcon(isCorrect) {
    const resultIconOverlay = document.getElementById('resultIconOverlay');
    const resultIcon = document.getElementById('resultIcon');
    const nextBtn = document.getElementById('nextBtn');

    if (!resultIconOverlay || !resultIcon) {
        if (nextBtn) nextBtn.classList.remove('hidden');
        return;
    }

    if (isCorrect) {
        resultIcon.textContent = '✓';
        resultIcon.className = 'result-icon correct';
    } else {
        resultIcon.textContent = '✗';
        resultIcon.className = 'result-icon incorrect';
    }

    resultIconOverlay.classList.remove('hidden');

    setTimeout(() => {
        resultIconOverlay.classList.add('hidden');
        if (nextBtn) nextBtn.classList.remove('hidden');
        if (gameState !== 'gameover') {
            gameState = 'playing';
        }
    }, 2000);
}

// ===========================================
// BOTÃO PRÓXIMO VÍDEO
// ===========================================
function nextVideo() {
    if (gameState === 'gameover') return;
    resetButtons();
    loadNewVideo();
}

// ===========================================
// RESETAR BOTÕES DOS ELÓS
// ===========================================
function resetButtons() {
    document.querySelectorAll('.elo-btn').forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('correct', 'incorrect');
    });
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.classList.add('hidden');
}

// ===========================================
// SALVAR PONTUAÇÃO NO BANCO
// ===========================================
async function salvarPontuacao() {
    try {
        console.log(`Salvando pontuação: ${pontos} para ${playerName}`);

        const response = await fetch(`${API_BASE_URL}/api/salvar-pontuacao`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                nome: playerName, 
                pontuacao: pontos 
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro ao salvar pontuação:', errorText);
            return;
        }

        const data = await response.json();
        console.log('Pontuação salva com sucesso:', data);

    } catch (error) {
        console.error('Erro ao salvar pontuação:', error);
    }
}

// ===========================================
// RESETAR O JOGO E VOLTAR À TELA INICIAL
// ===========================================
function resetGame() {
    pontos = 0;
    vidas = 3;
    gameState = 'waiting';
    currentVideo = null;

    // Limpar vídeo
    const videoElement = document.getElementById('gameVideo');
    if (videoElement) {
        videoElement.pause();
        videoElement.src = '';
    }

    // Resetar inputs e botões
    resetButtons();

    // Mostrar tela inicial e esconder tela de jogo
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('welcomeScreen').style.display = 'block';

    // Limpar input do nome e desabilitar botão
    const userInput = document.getElementById('userName');
    if (userInput) userInput.value = '';

    const startBtn = document.getElementById('startBtn');
    if (startBtn) startBtn.classList.remove('enabled');

    playerName = '';

    // Atualizar displays de pontos e vidas
    atualizarDisplay();
}

// ===========================================
// TESTE DE CONEXÃO COM SERVIDOR
// ===========================================
async function testConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/test`);
        if (response.ok) {
            const data = await response.json();
            console.log('Conexão OK:', data);
            return true;
        } else {
            console.error('Servidor retornou erro:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Erro de conexão:', error.message);
        return false;
    }
}

window.addEventListener('load', () => {
    setTimeout(testConnection, 1000);
});

// ===========================================
// TRATAMENTO DE ERROS GLOBAIS
// ===========================================
window.addEventListener('error', (event) => {
    console.error('Erro global:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Promise rejeitada:', event.reason);
    event.preventDefault();
});
