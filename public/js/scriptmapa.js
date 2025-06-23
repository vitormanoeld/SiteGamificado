
const getAgentImage = (agentName) => {
  const name = agentName.toLowerCase().replace('/', '').replace(' ', '');
  const ids = {
    'jett': 'a3bfb853-43b2-7238-a4f1-ad90e9e46bcc',
    'phoenix': 'eb93336a-449b-9c1b-0a54-a891f7921d69',
    'breach': '5f8d3a7f-467b-97f3-062c-13acf203c006',
    'skye': '6f2a04ca-43e0-be17-7f36-b3908627744d',
    'omen': '8e253930-4c05-31dd-1b6c-968525494517',
    'sova': '320b2a48-4d9b-a075-30f1-1f93a9b638fa',
    'killjoy': '1e58de9c-4950-5125-93e9-a0aee9f98746',
    'kayo': '601dbbe7-43ce-be57-2a40-4abd24953621',
    'cypher': '117ed9e3-49f3-6512-3ccf-0cada7e3823b',
    'sage': '569fdd95-4d10-43ab-ca70-79becc718b46',
    'chamber': '22697a3d-45bf-8dd7-4fec-84a9e28c69d7',
    'raze': 'f94c3b30-42be-e959-889c-5aa313dba261',
    'brimstone': '9f0d8ba9-4140-b941-57d3-a7ad57c6b417',
    'viper': '707eab51-4836-f488-046a-cda6bf494859'
  };
  
  return ids[name] 
    ? `https://media.valorant-api.com/agents/${ids[name]}/displayicon.png`
    : `https://via.placeholder.com/150?text=${agentName}`;
};

const composicoes = {
  ascent: {
    rush: [
      { nome: "Jett" },
      { nome: "Phoenix" },
      { nome: "Breach" },
      { nome: "Skye" },
      { nome: "Omen" }
    ],
    media: [
      { nome: "Sova" },
      { nome: "Killjoy" },
      { nome: "Omen" },
      { nome: "Jett" },
      { nome: "KAY/O" }
    ],
    safe: [
      { nome: "Killjoy" },
      { nome: "Cypher" },
      { nome: "Sage" },
      { nome: "Omen" },
      { nome: "Chamber" }
    ]
  },
  bind: {
    rush: [
      { nome: "Raze" },
      { nome: "Breach" },
      { nome: "Skye" },
      { nome: "Phoenix" },
      { nome: "Brimstone" }
    ],
    media: [
      { nome: "Raze" },
      { nome: "Breach" },
      { nome: "Brimstone" },
      { nome: "Cypher" },
      { nome: "Skye" }
    ],
    safe: [
      { nome: "Cypher" },
      { nome: "Sage" },
      { nome: "Brimstone" },
      { nome: "Chamber" },
      { nome: "Killjoy" }
    ]
  },
  haven: {
    rush: [
      { nome: "Jett" },
      { nome: "Phoenix" },
      { nome: "Breach" },
      { nome: "Skye" },
      { nome: "Viper" }
    ],
    media: [
      { nome: "Sova" },
      { nome: "Cypher" },
      { nome: "Viper" },
      { nome: "Jett" },
      { nome: "Breach" }
    ],
    safe: [
      { nome: "Cypher" },
      { nome: "Killjoy" },
      { nome: "Sage" },
      { nome: "Viper" },
      { nome: "Chamber" }
    ]
  },
  split: {
    rush: [
      { nome: "Jett" },
      { nome: "Raze" },
      { nome: "Phoenix" },
      { nome: "Breach" },
      { nome: "Omen" }
    ],
    media: [
      { nome: "Sova" },
      { nome: "Cypher" },
      { nome: "Sage" },
      { nome: "Jett" },
      { nome: "Omen" }
    ],
    safe: [
      { nome: "Cypher" },
      { nome: "Killjoy" },
      { nome: "Sage" },
      { nome: "Chamber" },
      { nome: "Viper" }
    ]
  },
  icebox: {
    rush: [
      { nome: "Jett" },
      { nome: "Phoenix" },
      { nome: "Breach" },
      { nome: "Raze" },
      { nome: "Viper" }
    ],
    media: [
      { nome: "Sova" },
      { nome: "Sage" },
      { nome: "Viper" },
      { nome: "Jett" },
      { nome: "KAY/O" }
    ],
    safe: [
      { nome: "Killjoy" },
      { nome: "Cypher" },
      { nome: "Sage" },
      { nome: "Viper" },
      { nome: "Chamber" }
    ]
  },
  breeze: {
    rush: [
      { nome: "Jett" },
      { nome: "Phoenix" },
      { nome: "Breach" },
      { nome: "Skye" },
      { nome: "Viper" }
    ],
    media: [
      { nome: "Sova" },
      { nome: "Cypher" },
      { nome: "Viper" },
      { nome: "Jett" },
      { nome: "Chamber" }
    ],
    safe: [
      { nome: "Cypher" },
      { nome: "Killjoy" },
      { nome: "Sage" },
      { nome: "Viper" },
      { nome: "Chamber" }
    ]
  },
  fracture: {
    rush: [
      { nome: "Raze" },
      { nome: "Phoenix" },
      { nome: "Breach" },
      { nome: "Skye" },
      { nome: "Brimstone" }
    ],
    media: [
      { nome: "Sova" },
      { nome: "Cypher" },
      { nome: "Brimstone" },
      { nome: "Raze" },
      { nome: "KAY/O" }
    ],
    safe: [
      { nome: "Cypher" },
      { nome: "Killjoy" },
      { nome: "Sage" },
      { nome: "Brimstone" },
      { nome: "Chamber" }
    ]
  },
  pearl: {
    rush: [
      { nome: "Jett" },
      { nome: "Phoenix" },
      { nome: "Breach" },
      { nome: "Skye" },
      { nome: "Omen" }
    ],
    media: [
      { nome: "Sova" },
      { nome: "Cypher" },
      { nome: "Omen" },
      { nome: "Jett" },
      { nome: "KAY/O" }
    ],
    safe: [
      { nome: "Cypher" },
      { nome: "Killjoy" },
      { nome: "Sage" },
      { nome: "Omen" },
      { nome: "Chamber" }
    ]
  },
  lotus: {
    rush: [
      { nome: "Jett" },
      { nome: "Phoenix" },
      { nome: "Breach" },
      { nome: "Skye" },
      { nome: "Omen" }
    ],
    media: [
      { nome: "Sova" },
      { nome: "Cypher" },
      { nome: "Omen" },
      { nome: "Jett" },
      { nome: "Breach" }
    ],
    safe: [
      { nome: "Cypher" },
      { nome: "Killjoy" },
      { nome: "Sage" },
      { nome: "Omen" },
      { nome: "Viper" }
    ]
  },
  sunset: {
    rush: [
      { nome: "Jett" },
      { nome: "Phoenix" },
      { nome: "Breach" },
      { nome: "Raze" },
      { nome: "Omen" }
    ],
    media: [
      { nome: "Sova" },
      { nome: "Cypher" },
      { nome: "Omen" },
      { nome: "Jett" },
      { nome: "KAY/O" }
    ],
    safe: [
      { nome: "Cypher" },
      { nome: "Killjoy" },
      { nome: "Sage" },
      { nome: "Omen" },
      { nome: "Chamber" }
    ]
  },
  abyss: {
    rush: [
      { nome: "Jett" },
      { nome: "Phoenix" },
      { nome: "Breach" },
      { nome: "Raze" },
      { nome: "Omen" }
    ],
    media: [
      { nome: "Sova" },
      { nome: "Cypher" },
      { nome: "Omen" },
      { nome: "Jett" },
      { nome: "Breach" }
    ],
    safe: [
      { nome: "Cypher" },
      { nome: "Killjoy" },
      { nome: "Sage" },
      { nome: "Omen" },
      { nome: "Viper" }
    ]
  }
};

const mapas = {
  ascent: {
    nome: "ASCENT",
    local: "ITÁLIA",
    desc: "Um campo de batalha aberto para pequenas guerras de posição e desgaste, dividido por um meio que ambas as equipes podem disputar.",
    fundo: "/assets/ascent/ascentfundo.jpg",
    layout: "/assets/ascent/miniacent.webp",
  },
  bind: {
    nome: "BIND",
    local: "MARROCOS",
    desc: "Dois pontos. Sem meio. Muitas oportunidades para confrontos em pequena escala e jogos mentais com rotações.",
    fundo: "/assets/bind/Bind_Map.png",
    layout: "/assets/bind/layout-bind.webp",
  },
  haven: {
    nome: "HAVEN",
    local: "BUTÃO",
    desc: "Três pontos. Três rotas. Mais áreas para controlar. Oportunidades únicas de jogabilidade e um paraíso para controladores.",
    fundo: "/assets/haven/backgroundhaven.jpg",
    layout: "/assets/haven/Haven_minimap.webp",
  },
  split: {
    nome: "SPLIT",
    local: "JAPÃO",
    desc: "Um mapa dividido com um toque de verticalidade. Lute pelo controle do meio com diferentes alcances de combate.",
    fundo: "/assets/split/splitfundo.webp",
    layout: "/assets/split/Split_minimap.webp",
  },
  icebox: {
    nome: "ICEBOX",
    local: "RÚSSIA",
    desc: "Um sítio de escavação secreto da Kingdom tomado pelo Ártico. Ângulos fechados e tirolesas verticais tornam este um campo de batalha vertical.",
    fundo: "/assets/icebox/backgroundicebox.webp",
    layout: "/assets/icebox/Icebox_minimap.webp",
  },
  breeze: {
    nome: "BREEZE",
    local: "CARIBE",
    desc: "Aproveite as paisagens de ruínas históricas ou cavernas à beira-mar neste paraíso tropical com espaços abertos e longas linhas de visão.",
    fundo: "/assets/breeze/fundobreeze.jpg",
    layout: "/assets/breeze/Breeze_minimap.webp",
  },
  fracture: {
    nome: "FRACTURE",
    local: "DESERTO DE SANTA FÉ",
    desc: "Uma instalação de pesquisa ultrassecreta dividida por um experimento de radianita que falhou. Ataque pelos dois lados neste mapa dividido.",
    fundo: "/assets/fracture/fracturefundo.webp",
    layout: "/assets/fracture/Fracture_minimap.webp",
  },
  pearl: {
    nome: "PEARL",
    local: "PORTUGAL",
    desc: "Os atacantes avançam para o território dos defensores nesta cidade subaquática. Pearl é um mapa com rotas divididas e três caminhos.",
    fundo: "/assets/pearl/pearlfundo.jpg",
    layout: "/assets/pearl/Pearl_minimap.webp",
  },
  lotus: {
    nome: "LOTUS",
    local: "ÍNDIA",
    desc: "Um mapa com três pontos, portas giratórias e paredes destrutíveis. Domine esta instalação antiga construída para rituais misteriosos.",
    fundo: "/assets/lotus/lotusbackground.jpg",
    layout: "/assets/lotus/Lotus_minimap.webp",
  },
  sunset: {
    nome: "SUNSET",
    local: "LOS ANGELES",
    desc: "Navegue pelas ruas de LA neste mapa com dois pontos. Múltiplos caminhos oferecem diversas opções táticas.",
    fundo: "/assets/sunset/sunset.png",
    layout: "/assets/sunset/Sunset_minimap.webp",
  },
  abyss: {
    nome: "ABYSS",
    local: "LOCAL DESCONHECIDO",
    desc: "Explore os perigos de um campo de batalha suspenso. Abyss desafia os jogadores com plataformas abertas, sem bordas e rotações verticais únicas.",
    fundo: "/assets/abyss/abyss-fundo.jpg",
    layout: "/assets/abyss/layout-abyss.webp",
  },
};

let mapaAtual = 'ascent';

function obterElementosAudio() {
  return {
    hover: document.getElementById("hover-sound"),
    click: document.getElementById("select-sound"),
  };
}

function atualizarExibicaoMapa(mapa) {
  document.querySelector(".map-title").textContent = mapa.nome;
  document.querySelector(".map-subtitle").textContent = mapa.local;
  document.querySelector(".map-description p").textContent = mapa.desc;
  document.querySelector(
    ".map-background"
  ).style.backgroundImage = `url(${mapa.fundo})`;
  document.querySelector(
    ".map-layout"
  ).style.backgroundImage = `url(${mapa.layout})`;
}

function trocarMapa(id) {
  const mapa = mapas[id];
  if (!mapa) return;
  mapaAtual = id;
  atualizarExibicaoMapa(mapa);
}

function definirCartaoAtivo(cartaoAtivo) {
  const cartoesMapa = document.querySelectorAll(".map-card");
  cartoesMapa.forEach((cartao) => cartao.classList.remove("active"));
  cartaoAtivo.classList.add("active");
}

function manipularCliqueMapa(cartao, audio) {
  audio.click.play();
  definirCartaoAtivo(cartao);
  const idMapa = cartao.getAttribute("data-map");
  trocarMapa(idMapa);
}

function configurarCartoesMapa() {
  const cartoesMapa = document.querySelectorAll(".map-card");
  const audio = obterElementosAudio();

  cartoesMapa.forEach((cartao) => {
    cartao.addEventListener("mouseenter", () => audio.hover.play());
    cartao.addEventListener("click", () => manipularCliqueMapa(cartao, audio));
  });
}

function abrirModalComps() {
  const modal = document.getElementById('compsModal');
  const mapName = document.getElementById('modalMapName');
  mapName.textContent = `COMPOSIÇÕES PARA ${mapas[mapaAtual].nome}`;
  modal.style.display = 'block';
}

function fecharModalComps() {
  document.getElementById('compsModal').style.display = 'none';
}

function mostrarAgentes(tipoComp) {
  fecharModalComps();
  
  const modal = document.getElementById('agentsModal');
  const title = document.getElementById('compTitle');
  const container = document.getElementById('agentsContainer');
  
  title.textContent = `COMPOSIÇÃO ${tipoComp.toUpperCase()}`;
  

  container.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>Carregando agentes...</p>
    </div>
  `;
  
  modal.style.display = 'block';
  
  
  setTimeout(() => {
    const agentes = composicoes[mapaAtual][tipoComp];
    container.innerHTML = '';
    
    agentes.forEach(agente => {
      const agentCard = document.createElement('div');
      agentCard.className = 'agent-card';
      
      agentCard.innerHTML = `
        <div class="agent-image" style="background-image: url('${getAgentImage(agente.nome)}')"></div>
        <div class="agent-name">${agente.nome}</div>
      `;
      
      container.appendChild(agentCard);
    });
  }, 5000);
}

function fecharModalAgentes() {
  document.getElementById('agentsModal').style.display = 'none';
}


window.onclick = function(event) {
  const compsModal = document.getElementById('compsModal');
  const agentsModal = document.getElementById('agentsModal');
  
  if (event.target == compsModal) {
    compsModal.style.display = 'none';
  }
  if (event.target == agentsModal) {
    agentsModal.style.display = 'none';
  }
}

function inicializar() {
  configurarCartoesMapa();
  trocarMapa("ascent");

  const cartaoInicial = document.querySelector('.map-card[data-map="ascent"]');
  if (cartaoInicial) definirCartaoAtivo(cartaoInicial);
}

inicializar();