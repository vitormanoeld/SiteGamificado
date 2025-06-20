const API_BASE_URL = "http://localhost:3000";
let currentVideo = null;
let gameState = "waiting";
let playerName = "";
let jogadorId = null;
let pontos = 0;
let vidas = 3;

const eloIcons = {
  bronze: "/assets/elos/bronze.webp",
  prata: "/assets/elos/prata.png",
  ouro: "/assets/elos/Ouro.png",
  platina: "/assets/elos/platina.webp",
  diamante: "/assets/elos/Diamante.png",
  ascendente: "/assets/elos/Ascendente.png",
  imortal: "/assets/elos/Imortal.png",
  radiant: "/assets/elos/Radiant.webp",
};

window.addEventListener("load", () => {
  gameState = "waiting";
  setupUserInput();
  setTimeout(testConnection, 1000);
});

function setupUserInput() {
  const userInput = document.getElementById("userName");
  const startBtn = document.getElementById("startBtn");

  if (!userInput || !startBtn) {
    console.error("Elementos userName ou startBtn não encontrados");
    return;
  }

  userInput.addEventListener("input", function () {
    const name = this.value.trim();
    if (name.length >= 2) {
      startBtn.classList.add("enabled");
      playerName = name;
    } else {
      startBtn.classList.remove("enabled");
      playerName = "";
    }
  });

  userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && playerName.length >= 2) {
      startGame();
    }
  });
}

function getDataHoraFormatada() {
  const now = new Date();
  const timeZoneOffset = now.getTimezoneOffset() * 60000;
  const localTime = new Date(now.getTime() - timeZoneOffset);
  return localTime.toISOString().slice(0, 19).replace("T", " ");
}

async function startGame() {
  const nameInput = document.getElementById("userName");
  playerName = nameInput.value.trim();

  const dataHoraEntrada = getDataHoraFormatada();

  try {
    const response = await fetch(`${API_BASE_URL}/api/salvar-nome`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: playerName,
        dataEntrada: dataHoraEntrada,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erro ao salvar nome");
    }

    jogadorId = data.id;

    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    pontos = 0;
    vidas = 3;
    atualizarDisplay();
    gameState = "playing";

    await loadNewVideo();
  } catch (err) {
    alert("Erro ao iniciar jogo: " + err.message);
    console.error(err);
  }
}

function atualizarDisplay() {
  const scoreDisplay = document.getElementById("scoreDisplay");
  const livesDisplay = document.getElementById("livesDisplay");

  if (scoreDisplay) scoreDisplay.textContent = pontos;

  if (livesDisplay) {
    let hearts = "";
    for (let i = 0; i < 3; i++) {
      hearts += i < vidas ? "❤️" : "🤍";
    }
    livesDisplay.textContent = hearts;
  }
}
async function loadElos() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/elos`);
    if (!response.ok) throw new Error(`Erro na API: ${response.status}`);

    const data = await response.json();
    const container = document.getElementById("elosContainer");
    if (!container) throw new Error("Container de elos não encontrado");

    container.innerHTML = "";

    data.elos.forEach((elo) => {
      const button = document.createElement("button");
      button.className = `elo-btn elo-${elo}`;
      button.onclick = () => checkAnswer(elo);

      const imgSrc = eloIcons[elo] || "/assets/elos/default.webp";
      button.innerHTML = `
                <div class="elo-icon">
                    <img src="${imgSrc}" alt="${elo}" onerror="this.style.display='none'">
                </div>
                <div class="elo-name">${elo}</div>
            `;

      container.appendChild(button);
    });
  } catch (error) {
    console.error("Erro ao carregar elos:", error);
  }
}

async function loadNewVideo() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/random-video`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Erro ao buscar vídeo");

    currentVideo = data;
    const videoElement = document.getElementById("gameVideo");
    videoElement.src = API_BASE_URL + data.video;

    gameState = "playing";

    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) nextBtn.classList.add("hidden");

    await loadElos();
  } catch (error) {
    console.error("Erro ao carregar vídeo:", error.message);
  }
}

async function checkAnswer(selectedElo) {
  if (!currentVideo || gameState !== "playing") return;

  const isCorrect = selectedElo === currentVideo.elo;

  if (isCorrect) {
    pontos++;
  } else {
    vidas--;
  }

  atualizarDisplay();
  gameState = "answered";

  await atualizarPontuacaoNoBanco();

  document.querySelectorAll(".elo-btn").forEach((btn) => {
    btn.disabled = true;
    const btnElo = btn.querySelector(".elo-name").textContent.toLowerCase();

    if (btnElo === selectedElo) {
      btn.classList.add(isCorrect ? "correct" : "incorrect");
    }

    if (btnElo === currentVideo.elo && !isCorrect) {
      btn.classList.add("correct");
    }
  });

  showResultIcon(isCorrect);

  if (vidas <= 0) {
    Swal.fire({
      title: "Game Over!",
      text: `Sua pontuação final foi ${pontos} pontos`,
      icon: "error",
      confirmButtonText: "Jogar Novamente",
      confirmButtonColor: "#ff4655",
      background: "rgba(15, 20, 25, 0.95)",
      color: "white",
      backdrop: "rgba(0,0,0,0.8)",
    }).then(() => {
      resetGame();
    });
    return;
  }
}

async function atualizarPontuacaoNoBanco() {
  if (!jogadorId) return;

  try {
    await fetch(`${API_BASE_URL}/api/atualizar-pontuacao`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jogadorId: jogadorId,
        pontuacao: pontos,
      }),
    });
  } catch (error) {
    console.error("Erro ao atualizar pontuação:", error);
  }
}

function showResultIcon(isCorrect) {
  const resultIconOverlay = document.getElementById("resultIconOverlay");
  const resultIcon = document.getElementById("resultIcon");
  const nextBtn = document.getElementById("nextBtn");

  if (!resultIconOverlay || !resultIcon) {
    if (nextBtn) nextBtn.classList.remove("hidden");
    return;
  }

  if (isCorrect) {
    resultIcon.textContent = "✓";
    resultIcon.className = "result-icon correct";
  } else {
    resultIcon.textContent = "✗";
    resultIcon.className = "result-icon incorrect";
  }

  resultIconOverlay.classList.remove("hidden");

  setTimeout(() => {
    resultIconOverlay.classList.add("hidden");
    if (nextBtn) nextBtn.classList.remove("hidden");
    if (gameState !== "gameover") {
      gameState = "playing";
    }
  }, 2000);
}

function nextVideo() {
  if (gameState === "gameover") return;
  resetButtons();
  loadNewVideo();
}

function resetButtons() {
  document.querySelectorAll(".elo-btn").forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove("correct", "incorrect");
  });
  const nextBtn = document.getElementById("nextBtn");
  if (nextBtn) nextBtn.classList.add("hidden");
}

function resetGame() {
  pontos = 0;
  vidas = 3;
  gameState = "waiting";
  currentVideo = null;

  const videoElement = document.getElementById("gameVideo");
  if (videoElement) {
    videoElement.pause();
    videoElement.src = "";
  }

  resetButtons();

  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("welcomeScreen").style.display = "block";

  const userInput = document.getElementById("userName");
  if (userInput) userInput.value = "";

  const startBtn = document.getElementById("startBtn");
  if (startBtn) startBtn.classList.remove("enabled");

  playerName = "";
  jogadorId = null;
  atualizarDisplay();
}

async function testConnection() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/test`);
    if (response.ok) {
      const data = await response.json();
      console.log("Conexão OK:", data);
      return true;
    } else {
      console.error("Servidor retornou erro:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Erro de conexão:", error.message);
    return false;
  }
}

window.addEventListener("error", (event) => {
  console.error("Erro global:", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Promise rejeitada:", event.reason);
  event.preventDefault();
});
