const words = Array.from(document.querySelectorAll(".word"));
const titleEl = document.getElementById("infoTitle");
const textEl = document.getElementById("infoText");
const gridEl = document.getElementById("imageGrid");

const data = {
  VANDAL: {
    desc: "A Vandal é uma rifle poderosa que causa dano constante em qualquer distância.",
    images: [
      "/assets/armas/vandal/Primordium_Vandal.webp",
      "/assets/armas/vandal/Reaver_Vandal.webp",
      "/assets/armas/vandal/Vandal_vingaca-gaia.webp",
    ],
  },
  PHANTOM: {
    desc: "A Phantom possui alta cadência de tiro e é eficaz em curta e média distância.",
    images: [
      "/assets/armas/phanton/phantom-primordium.webp",
      "/assets/armas/phanton/phanton-gaia.webp",
      "/assets/armas/phanton/phantom-skin.png",
    ],
  },
  OPERATOR: {
    desc: "O Operator é um rifle de precisão com alto dano, ideal para eliminar com um tiro só.",
    images: [
      "/assets/armas/operator/Araxys_Operator.webp",
      "/assets/armas/operator/Divergence_Operator.webp",
      "/assets/armas/operator/Mystbloom_Operator.webp",
    ],
  },
};

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
      "/assets/GERAL/valorant.mp4",
      "/assets/GERAL/valorant.mp4",
      "/assets/GERAL/valorant.mp4",
    ],
    PHANTOM: [
      "/assets/videos/phantom1.mp4",
      "/assets/videos/phantom2.mp4",
      "/assets/videos/phantom3.mp4",
    ],
    OPERATOR: [
      "/assets/videos/operator1.mp4",
      "/assets/videos/operator2.mp4",
      "/assets/videos/operator3.mp4",
    ],
  };
  video.src = videos[arma][idx];
  video.play();
}

function updateContent() {
  const current = words[0].getAttribute("data-name");
  titleEl.textContent = current;
  textEl.textContent = data[current].desc;
  if (current === "VANDAL") renderVandal();
  else if (current === "PHANTOM") renderPhantom();
  else if (current === "OPERATOR") renderOperator();
}
updateContent();

function trocarVideo(arma) {
  const video = document.getElementById("meuVideo");
  video.src = videos[arma];
  video.play();
}
window.onload = () => {
  document.getElementById("meuVideo").src = videos.VANDAL;
};
