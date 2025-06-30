const words = Array.from(document.querySelectorAll(".word"));
const titleEl = document.getElementById("infoTitle");
const textEl = document.getElementById("infoText");
const gridEl = document.getElementById("imageGrid");

const data = {
  VANDAL: {
    desc: "A Vandal é uma rifle poderosa que causa dano constante em qualquer distância.",
    stats: {
      damage: 95,
      fireRate: 75,
      range: 85,
    },
    images: [
      "videos/imagens/primordium-skin.png",
      "videos/imagens/vandal-singularity.png",
      "videos/imagens/vandal-champ.png",
      "videos/imagens/vandal-divergence.png",
    ],
  },
  PHANTOM: {
    desc: "A Phantom possui alta cadência de tiro e é eficaz em curta e média distância.",
    stats: {
      damage: 80,
      fireRate: 90,
      range: 70,
    },
    images: [
      "videos/imagens/phantom-nocturnum.webp",
      "videos/imagens/phantom-champions.webp",
      "videos/imagens/skin-phantom-rosa.png",
    ],
  },
  OPERATOR: {
    desc: "O Operator é um rifle de precisão com alto dano, ideal para eliminar com um tiro só.",
    stats: {
      damage: 100,
      fireRate: 30,
      range: 95,
    },
    images: [
      "videos/imagens/Araxys_Operator.webp",
      "videos/imagens/op-div.png",
      "videos/imagens/Mystbloom_Operator.webp",
    ],
  },
};

// Vídeos padrão para cada aba
const defaultVideos = {
  VANDAL: "videos/video-primordium.mp4",
  PHANTOM: "videos/Phantom_nocturn.mp4",
  OPERATOR: "videos/op-araxys-vid.mp4",
};

function updateStats(weapon) {
  const stats = data[weapon].stats;

  // Atualizar barra de damage
  const damageBar = document.querySelector(".state-valorant-damage .stat-bar");
  if (damageBar) {
    damageBar.style.width = stats.damage + "%";
  }

  // Atualizar barra de fire rate
  const fireRateBar = document.querySelector(
    ".state-valorant-fire-rate .stat-bar"
  );
  if (fireRateBar) {
    fireRateBar.style.width = stats.fireRate + "%";
  }

  // Atualizar barra de range
  const rangeBar = document.querySelector(".state-valorant-range .stat-bar");
  if (rangeBar) {
    rangeBar.style.width = stats.range + "%";
  }
}

function rotateWords() {
  const first = words.shift();
  words.push(first);
  words.forEach((word) => (word.className = "word"));
  words[0].classList.add("front");
  words[1].classList.add("middle");
  words[2].classList.add("back");
  updateContent();
}

function renderVandal() {
  gridEl.innerHTML = "";
  data.VANDAL.images.forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;
    img.addEventListener("click", function () {
      gridEl.querySelectorAll("img").forEach((i) => {
        i.style.boxShadow = "";
        i.style.transform = "";
        i.style.zIndex = "";
        i.style.position = "";
      });
      this.style.boxShadow = "0 0 2px 1px rgb(255, 255, 255)";
      this.style.transform = "scale(1.17)";
      this.style.transition = "box-shadow 0.3s, transform 0.3s";
      iniciarVideoDeFundo("VANDAL", idx);
    });
    gridEl.appendChild(img);
  });
}

function renderPhantom() {
  gridEl.innerHTML = "";
  data.PHANTOM.images.forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;
    img.addEventListener("click", function () {
      gridEl.querySelectorAll("img").forEach((i) => {
        i.style.boxShadow = "";
        i.style.transform = "";
        i.style.zIndex = "";
        i.style.position = "";
      });
      this.style.boxShadow = "0 0 2px 1px rgb(255, 255, 255)";
      this.style.transform = "scale(1.17)";
      this.style.transition = "box-shadow 0.3s, transform 0.3s";
      iniciarVideoDeFundo("PHANTOM", idx);
    });
    gridEl.appendChild(img);
  });
}

function renderOperator() {
  gridEl.innerHTML = "";
  data.OPERATOR.images.forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;
    img.addEventListener("click", function () {
      gridEl.querySelectorAll("img").forEach((i) => {
        i.style.boxShadow = "";
        i.style.transform = "";
        i.style.zIndex = "";
        i.style.position = "";
      });
      this.style.boxShadow = "0 0 2px 1px rgb(255, 255, 255)";
      this.style.transform = "scale(1.17)";
      this.style.transition = "box-shadow 0.3s, transform 0.3s";
      iniciarVideoDeFundo("OPERATOR", idx);
    });
    gridEl.appendChild(img);
  });
}

function iniciarVideoDeFundo(arma, idx) {
  const video = document.getElementById("meuVideo");
  if (!video) return;
  const videos = {
    VANDAL: [
      "videos/video-primordium.mp4",
      "videos/video-singularity.mp4",
      "videos/video-champ.mp4",
      "videos/skin-divergence.mp4",
    ],
    PHANTOM: [
      "videos/phantom_nocturn.mp4",
      "videos/panthom-camp24.mp4",
      "videos/phantom-rosa.mp4",
    ],
    OPERATOR: [
      "videos/op-araxys-vid.mp4",
      "videos/op-div-vid.mp4",
      "videos/op-myst-vid.mp4",
    ],
  };
  video.src = videos[arma][idx];
  video.play();
}

function updateContent() {
  const current = words[0].getAttribute("data-name");
  titleEl.textContent = current;
  textEl.textContent = data[current].desc;

  updateStats(current);

  const video = document.getElementById("meuVideo");
  if (video && defaultVideos[current]) {
    video.src = defaultVideos[current];
    video.play().catch((e) => console.log("Erro ao reproduzir vídeo:", e));
  }

  if (current === "VANDAL") renderVandal();
  else if (current === "PHANTOM") renderPhantom();
  else if (current === "OPERATOR") renderOperator();
}

updateContent();

function trocarVideo(arma) {
  const video = document.getElementById("meuVideo");
  if (defaultVideos[arma]) {
    video.src = defaultVideos[arma];
    video.play().catch((e) => console.log("Erro ao reproduzir vídeo:", e));
  }
}

window.onload = () => {
  const video = document.getElementById("meuVideo");
  if (video) {
    video.src = defaultVideos.VANDAL;
    video.play().catch((e) => console.log("Erro ao reproduzir vídeo:", e));
  }
};
