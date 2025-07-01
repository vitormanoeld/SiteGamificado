
let dadosAgentesCache = null;
let isChanging = false;

const agentes = {
  astra: {
    nome: "ASTRA", funcao: "// CONTROLADORA", cor: "#6f3dc3", corClara: "#9252de",
    descricao: "Astra, a Agente ganense, utiliza energias cósmicas para moldar o campo de batalha a seu bel-prazer. Com total domínio da sua forma astral e um talento estratégico nato, ela está sempre anos-luz à frente dos inimigos."
  },
  jett: {
    nome: "JETT", funcao: "// DUELISTA", cor: "#5ABFBD", corClara: "#7ED0CE",
    descricao: "Jett é uma duelista ágil e letal que veio diretamente da Coreia do Sul. Seu estilo de combate é baseado na mobilidade extrema, permitindo que ela entre e saia das lutas em um piscar de olhos."
  },
  phoenix: {
    nome: "PHOENIX", funcao: "// DUELISTA", cor: "#FD7C23", corClara: "#FF9A4A",
    descricao: "Originário do Reino Unido, o poder estelar de Phoenix brilha através de seu estilo de luta incendiário e sua personalidade estelar. Seja iluminando inimigos ou sendo revivido pelas próprias chamas."
  },
  sage: {
    nome: "SAGE", funcao: "// SENTINELA", cor: "#15E0D8", corClara: "#42E8E0",
    descricao: "Como uma verdadeira fortaleza chinesa, Sage traz segurança para si mesma e para sua equipe onde quer que vá. Capaz de reviver aliados caídos e criar barreiras através de terrenos hostis."
  },
  reyna: {
    nome: "REYNA", funcao: "// DUELISTA", cor: "#AB30CF", corClara: "#C257E6",
    descricao: "Criada no coração do México, Reyna domina combates individuais, destacando-se a cada abate que consegue. Sua capacidade só é limitada por sua própria habilidade crua."
  },
  killjoy: {
    nome: "KILLJOY", funcao: "// SENTINELA", cor: "#FEB931", corClara: "#FFCA58",
    descricao: "A gênia alemã Killjoy defende posições-chave no campo de batalha facilmente com seu arsenal de invenções. Se o dano de seus equipamentos não der cabo dos inimigos, os danos secundários de suas máquinas irão."
  },
  sova: {
    nome: "SOVA", funcao: "// INICIADOR", cor: "#4A90E2", corClara: "#6BA4F0",
    descricao: "Nascido na tundra russa, Sova rastreia, encontra e elimina inimigos com eficiência e precisão implacáveis. Seu arco personalizado e suas habilidades de reconhecimento inigualáveis fazem com que seja impossível se esconder dele."
  },
  breach: {
    nome: "BREACH", funcao: "// INICIADOR", cor: "#E87D3E", corClara: "#F0955D",
    descricao: "Breach, o homem-máquina sueco, dispara poderosos jatos cinéticos para abrir caminho através de território inimigo. O dano e a interrupção que ele causa garantem que nenhuma luta seja justa."
  },
  omen: {
    nome: "OMEN", funcao: "// CONTROLADOR", cor: "#5A4FCF", corClara: "#7B70D9",
    descricao: "Omen, uma lembrança fantasmagórica, caça nas sombras. Ele cega os inimigos, teleporta através do campo de batalha e deixa a paranoia assumir o controle enquanto o adversário tenta descobrir de onde virá seu próximo ataque."
  },
  brimstone: {
    nome: "BRIMSTONE", funcao: "// CONTROLADOR", cor: "#D1913C", corClara: "#E5A855",
    descricao: "Vindo diretamente dos EUA, Brimstone oferece um arsenal incendiário constante e confiável para seu esquadrão. Sua capacidade de entregar utilidade de forma precisa e segura faz dele o comandante perfeito."
  },
  raze: {
    nome: "RAZE", funcao: "// DUELISTA", cor: "#FF6B35", corClara: "#FF8A5B",
    descricao: "Raze vem do Brasil com sua personalidade explosiva e suas armas enormes. Com sua habilidade de causar danos colaterais massivos, ela é ótima para expulsar inimigos entrincheirados e limpar espaços apertados."
  },
  cypher: {
    nome: "CYPHER", funcao: "// SENTINELA", cor: "#FFFFFF", corClara: "#E0E0E0",
    descricao: "Cypher, um negociante de informações do Marrocos, é uma verdadeira rede de vigilância de um homem só que fica de olho em cada movimento dos inimigos. Nenhum segredo está a salvo. Nenhuma manobra passa despercebida."
  },
  viper: {
    nome: "VIPER", funcao: "// CONTROLADORA", cor: "#01C38D", corClara: "#2DD5A8",
    descricao: "Viper, a química americana, emprega uma variedade de dispositivos químicos venenosos para controlar o campo de batalha e prejudicar a visão do inimigo. Se as toxinas não matarem sua presa, suas táticas irão."
  },
  yoru: {
    nome: "YORU", funcao: "// DUELISTA", cor: "#1A237E", corClara: "#3949AB",
    descricao: "Yoru, nativo do Japão, abre fendas na realidade para se infiltrar nas linhas inimigas sem ser visto. Usando tanto artimanhas quanto táticas agressivas, ele pega os inimigos desprevenidos."
  },
  skye: {
    nome: "SKYE", funcao: "// INICIADORA", cor: "#4CAF50", corClara: "#6CBF6F",
    descricao: "Vinda da Austrália, Skye e sua matilha de feras rastreiam inimigos e curam aliados com luzes curativas. Seus amigos se sentem mais seguros ao lado dela, e seus inimigos, mais assombrados."
  },
  kayo: {
    nome: "KAY/O", funcao: "// INICIADOR", cor: "#9E9E9E", corClara: "#BDBDBD",
    descricao: "KAY/O é uma máquina de guerra feita para neutralizar radiantes. Seu arsenal de fragmentos supressores, lâminas explosivas e pulsos supressores garantem que os inimigos fiquem privados de poder."
  },
  chamber: {
    nome: "CHAMBER", funcao: "// SENTINELA", cor: "#FFD700", corClara: "#FFED4E",
    descricao: "Bem vestido e bem armado, Chamber, designer de armas francês, repele agressores com precisão letal. Ele aproveita seu arsenal personalizado para segurar posições e abater inimigos de longe."
  },
  neon: {
    nome: "NEON", funcao: "// DUELISTA", cor: "#00D4FF", corClara: "#33E0FF",
    descricao: "Neon, nossa Agente filipina, avança em velocidades impressionantes, descarregando rajadas de radiância bioelétrica tão rápido quanto seu corpo se move. Ela está rapidamente adiantada, deixando inimigos no choque."
  },
  fade: {
    nome: "FADE", funcao: "// INICIADORA", cor: "#7B68EE", corClara: "#9A7FFF",
    descricao: "Fade, a caçadora de recompensas turca, libera o poder dos pesadelos para agarrar os segredos dos inimigos. Em sintonia com o terror em si, ela persegue alvos e revela seus medos mais profundos."
  },
  harbor: {
    nome: "HARBOR", funcao: "// CONTROLADOR", cor: "#20B2AA", corClara: "#48CAC6",
    descricao: "Vindo da costa indiana, Harbor entra em campo com tecnologia ancestral de controle da água. Ele libera corredeiras furiosas e ondas esmagadoras para proteger seus aliados e atacar aqueles que se opõem a ele."
  },
  gekko: {
    nome: "GEKKO", funcao: "// INICIADOR", cor: "#98FB98", corClara: "#B8FFB8",
    descricao: "Gekko lidera um grupo de criaturas caóticas para Los Angeles. Seus amigos atropelam os inimigos, depois se transformam em glóbulos dormentes para serem recuperados e reimplantados após um breve período de recarga."
  },
  deadlock: {
    nome: "DEADLOCK", funcao: "// SENTINELA", cor: "#2E7D32", corClara: "#4CAF50",
    descricao: "A Agente norueguesa Deadlock implanta uma matriz de nanofios para proteger o flanco da equipe. Ninguém escapa de sua vigilância, nem de sua ferocidade."
  },
  iso: {
    nome: "ISO", funcao: "// DUELISTA", cor: "#512DA8", corClara: "#7C4DFF",
    descricao: "Iso, o fixador chinês, entra no campo de batalha para desarmar situações complicadas. Reconfigurando a energia radiante ambiente em proteção inviolável, ele avança com confiança para duelos que não pode perder."
  },
  clove: {
    nome: "CLOVE", funcao: "// CONTROLADORA", cor: "#E91E63", corClara: "#F48FB1",
    descricao: "Clove, agente imortal da Escócia, mantém o ritmo da batalha de qualquer lugar do mapa. Jovem e imprudente, eles mantêm a equipe unida com suas habilidades, mesmo após a morte."
  },
  vyse: {
    nome: "VYSE", funcao: "// SENTINELA", cor: "#8E24AA", corClara: "#BA68C8",
    descricao: "Vyse, a prodigiosa metalúrgica, molda metal líquido para isolar, prender e desarmar seus inimigos. Através de seu controle astuto, ela força todos a repensar onde é seguro pisar."
  },
  tejo: {
    nome: "TEJO", funcao: "// INICIADOR", cor: "#8E24AA", corClara: "#BA68C8",
    descricao: "Tejo é um iniciador estratégico, capaz de manipular o campo de batalha com precisão dotado de habilidades que desorientam e bloqueiam a visão inimiga, ele transforma o caos em vantagem tática."
  },
  waylay: {
    nome: "WAYLAY", funcao: "// DUELISTA", cor: "#8E24AA", corClara: "#BA68C8",
    descricao: "Waylay é uma Duelist explosiva e engenhosa, que manipula a luz para controlar os combates e escapar em um piscar de olhos. Seus talentos vêm com bônus: velocidade de movimentação, efeito de desaceleração em área (Hindering) e uma fuga segura — uma combinação que redefine o estilo agressivo de entrada."
  }
};

const elementos = {};

function cachearElementos() {
  elementos.titulo = document.getElementById("agent-title");
  elementos.funcao = document.getElementById("agent-role");
  elementos.descricao = document.getElementById("agent-description");
  elementos.imgFundo = document.getElementById("agent-bg-img");
  elementos.containerHabilidades = document.getElementById("abilities-container");
  elementos.seletores = document.querySelectorAll(".selector-item");
}

function atualizarEfeitoBrilho() {
  if (!elementos.titulo) return;
  
  const texto = elementos.titulo.textContent;
  const metade = Math.floor(texto.length / 2);
  
  elementos.titulo.innerHTML = texto.split('').map((letra, i) => 
    `<span class="glow-letter ${i < metade ? 'first-half' : 'second-half'}">${letra}</span>`
  ).join('');
}

async function carregarDadosAgentes() {
  if (dadosAgentesCache) return dadosAgentesCache;
  
  try {
    const resposta = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=pt-BR");
    const dados = await resposta.json();
    dadosAgentesCache = dados.data;
    return dadosAgentesCache;
  } catch (erro) {
    console.error("Erro ao carregar dados:", erro);
    return null;
  }
}

function renderizarHabilidades(chaveAgente) {
  if (!elementos.containerHabilidades) return;
  
  // Limpa container
  elementos.containerHabilidades.innerHTML = "";
  
  if (!dadosAgentesCache) {
    criarHabilidadesPlaceholder();
    return;
  }
  
  const nomeApi = chaveAgente === "chyper" ? "cypher" : chaveAgente;
  const agenteApi = dadosAgentesCache.find(a => 
    a.displayName.toLowerCase().replace(/[\/\-]/g, "") === nomeApi.toLowerCase()
  );
  
  if (!agenteApi) {
    criarHabilidadesPlaceholder();
    return;
  }
  
  const fragment = document.createDocumentFragment();
  
  agenteApi.abilities.forEach(habilidade => {
    if (!habilidade.displayIcon) return;
    
    const elementoHabilidade = document.createElement("div");
    elementoHabilidade.className = `ability ${habilidade.slot === "Ultimate" ? "ultimate-ability" : ""}`;
    elementoHabilidade.style.width = "120px";
    
    const ehUltimate = habilidade.slot === "Ultimate";
    
    elementoHabilidade.innerHTML = `
      <div class="ability-icon ${ehUltimate ? "ultimate" : ""}">
        <img src="${habilidade.displayIcon}" alt="${habilidade.displayName}" 
             style="width:38px;height:38px;margin-top:-10px">
      </div>
      <div class="ability-name">${habilidade.displayName.split(" ")[0]}</div>
      ${ehUltimate ? '<div class="ultimate-indicator">ULTIMATE</div>' : ''}
    `;
    let tooltip = null;
    
    elementoHabilidade.addEventListener("mouseenter", () => {
      esconderTooltip();
      tooltip = criarTooltip(elementoHabilidade, habilidade.displayName, habilidade.description);
    });
    
    elementoHabilidade.addEventListener("mouseleave", esconderTooltip);
    
    fragment.appendChild(elementoHabilidade);
  });
  
  elementos.containerHabilidades.appendChild(fragment);
}


function criarHabilidadesPlaceholder() {
  const fragment = document.createDocumentFragment();
  
  for (let i = 0; i < 5; i++) {
    const div = document.createElement("div");
    div.className = `ability ${i === 4 ? "ultimate-ability" : ""}`;
    div.innerHTML = `
      <div class="ability-icon ${i === 4 ? "ultimate" : ""}"></div>
      ${i === 4 ? '<div class="ultimate-indicator">ULTIMATE</div>' : ''}
    `;
    fragment.appendChild(div);
  }
  
  elementos.containerHabilidades.appendChild(fragment);
}

function criarTooltip(elemento, nome, descricao) {
  const tooltip = document.createElement("div");
  tooltip.className = "ability-tooltip show";
  tooltip.innerHTML = `<h3>${nome}</h3><p>${descricao}</p>`;
  
  document.body.appendChild(tooltip);
  
  const rect = elemento.getBoundingClientRect();
  tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
  tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
  
  return tooltip;
}

function esconderTooltip() {
  const tooltips = document.querySelectorAll(".ability-tooltip");
  tooltips.forEach(t => t.remove());
}

function mudarAgente(chaveAgente) {
  if (isChanging || !agentes[chaveAgente]) return;
  
  isChanging = true;
  
  const agente = agentes[chaveAgente];
  
  elementos.seletores.forEach(s => s.classList.remove("active"));
  const seletorAtivo = document.querySelector(`[data-agent="${chaveAgente}"]`);
  if (seletorAtivo) seletorAtivo.classList.add("active");
  

  [elementos.titulo, elementos.funcao, elementos.descricao].forEach(el => 
    el?.classList.add("fade-out")
  );
  
  setTimeout(() => {

    if (elementos.titulo) elementos.titulo.textContent = agente.nome;
    if (elementos.funcao) elementos.funcao.textContent = agente.funcao;
    if (elementos.descricao) elementos.descricao.textContent = agente.descricao;

    if (elementos.imgFundo) {
      const nomeImg = chaveAgente === "chyper" ? "cypher" : chaveAgente;
      elementos.imgFundo.src = `assets/agentes/${nomeImg}.avif`;
      elementos.imgFundo.alt = `${agente.nome} Fundo`;
    }

    const root = document.documentElement.style;
    root.setProperty("--agent-color", agente.cor);
    root.setProperty("--agent-light-color", agente.corClara);

    if (agente.cor.startsWith("#")) {
      const hex = agente.cor.slice(1);
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      root.setProperty("--agent-rgb-color", `${r}, ${g}, ${b}`);
    }
    
    document.body.className = `${chaveAgente}-theme`;
    
    renderizarHabilidades(chaveAgente);
    
    setTimeout(() => {
      [elementos.titulo, elementos.funcao, elementos.descricao].forEach(el => 
        el?.classList.remove("fade-out")
      );
      atualizarEfeitoBrilho();
      isChanging = false;
    }, 100);
  }, 300);
}

function configurarEventListeners() {
  elementos.seletores.forEach(item => {
    const chaveAgente = item.dataset.agent;
    if (!chaveAgente || !agentes[chaveAgente]) return;
    
    item.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isChanging) mudarAgente(chaveAgente);
    }, { passive: true });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  cachearElementos();
  carregarDadosAgentes();
  configurarEventListeners();
  mudarAgente("astra");
});