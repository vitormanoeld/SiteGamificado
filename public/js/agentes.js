document.addEventListener("DOMContentLoaded", () => {
  let isChanging = false;

  const atualizarEfeitoBrilho = () => {
    const nomeAgente = document.querySelector(".agent-name h1");
    if (!nomeAgente) return;

    const textoNome = nomeAgente.textContent;
    const metade = Math.floor(textoNome.length / 2);

    const primeiraParte = textoNome.substring(0, metade);
    const segundaParte = textoNome.substring(metade);

    nomeAgente.innerHTML =
      primeiraParte
        .split("")
        .map((letra) => `<span class="glow-letter first-half">${letra}</span>`)
        .join("") +
      segundaParte
        .split("")
        .map((letra) => `<span class="glow-letter second-half">${letra}</span>`)
        .join("");
  };

  atualizarEfeitoBrilho();

  const agentes = {
    astra: {
      nome: "ASTRA",
      funcao: "// CONTROLADORA",
      descricao:
        "Astra, a Agente ganense, utiliza energias cósmicas para moldar o campo de batalha a seu bel-prazer. Com total domínio da sua forma astral e um talento estratégico nato, ela está sempre anos-luz à frente dos inimigos.",
      cor: "#6f3dc3",
      corClara: "#9252de",
    },
    jett: {
      nome: "JETT",
      funcao: "// DUELISTA",
      descricao:
        "Jett é uma duelista ágil e letal que veio diretamente da Coreia do Sul. Seu estilo de combate é baseado na mobilidade extrema, permitindo que ela entre e saia das lutas em um piscar de olhos.",
      cor: "#5ABFBD",
      corClara: "#7ED0CE",
    },
    phoenix: {
      nome: "PHOENIX",
      funcao: "// DUELISTA",
      descricao:
        "Originário do Reino Unido, o poder estelar de Phoenix brilha através de seu estilo de luta incendiário e sua personalidade estelar. Seja iluminando inimigos ou sendo revivido pelas próprias chamas.",
      cor: "#FD7C23",
      corClara: "#FF9A4A",
    },
    sage: {
      nome: "SAGE",
      funcao: "// SENTINELA",
      descricao:
        "Como uma verdadeira fortaleza chinesa, Sage traz segurança para si mesma e para sua equipe onde quer que vá. Capaz de reviver aliados caídos e criar barreiras através de terrenos hostis.",
      cor: "#15E0D8",
      corClara: "#42E8E0",
    },
    reyna: {
      nome: "REYNA",
      funcao: "// DUELISTA",
      descricao:
        "Criada no coração do México, Reyna domina combates individuais, destacando-se a cada abate que consegue. Sua capacidade só é limitada por sua própria habilidade crua.",
      cor: "#AB30CF",
      corClara: "#C257E6",
    },
    killjoy: {
      nome: "KILLJOY",
      funcao: "// SENTINELA",
      descricao:
        "A gênia alemã Killjoy defende posições-chave no campo de batalha facilmente com seu arsenal de invenções. Se o dano de seus equipamentos não der cabo dos inimigos, os danos secundários de suas máquinas irão.",
      cor: "#FEB931",
      corClara: "#FFCA58",
    },
    sova: {
      nome: "SOVA",
      funcao: "// INICIADOR",
      descricao:
        "Nascido na tundra russa, Sova rastreia, encontra e elimina inimigos com eficiência e precisão implacáveis. Seu arco personalizado e suas habilidades de reconhecimento inigualáveis fazem com que seja impossível se esconder dele.",
      cor: "#4A90E2",
      corClara: "#6BA4F0",
    },
    breach: {
      nome: "BREACH",
      funcao: "// INICIADOR",
      descricao:
        "Breach, o homem-máquina sueco, dispara poderosos jatos cinéticos para abrir caminho através de território inimigo. O dano e a interrupção que ele causa garantem que nenhuma luta seja justa.",
      cor: "#E87D3E",
      corClara: "#F0955D",
    },
    omen: {
      nome: "OMEN",
      funcao: "// CONTROLADOR",
      descricao:
        "Omen, uma lembrança fantasmagórica, caça nas sombras. Ele cega os inimigos, teleporta através do campo de batalha e deixa a paranoia assumir o controle enquanto o adversário tenta descobrir de onde virá seu próximo ataque.",
      cor: "#5A4FCF",
      corClara: "#7B70D9",
    },
    brimstone: {
      nome: "BRIMSTONE",
      funcao: "// CONTROLADOR",
      descricao:
        "Vindo diretamente dos EUA, Brimstone oferece um arsenal incendiário constante e confiável para seu esquadrão. Sua capacidade de entregar utilidade de forma precisa e segura faz dele o comandante perfeito.",
      cor: "#D1913C",
      corClara: "#E5A855",
    },
    raze: {
      nome: "RAZE",
      funcao: "// DUELISTA",
      descricao:
        "Raze vem do Brasil com sua personalidade explosiva e suas armas enormes. Com sua habilidade de causar danos colaterais massivos, ela é ótima para expulsar inimigos entrincheirados e limpar espaços apertados.",
      cor: "#FF6B35",
      corClara: "#FF8A5B",
    },

    cypher: {
      nome: "CYPHER",
      funcao: "// SENTINELA",
      descricao:
        "Cypher, um negociante de informações do Marrocos, é uma verdadeira rede de vigilância de um homem só que fica de olho em cada movimento dos inimigos. Nenhum segredo está a salvo. Nenhuma manobra passa despercebida.",
      cor: "#FFFFFF",
      corClara: "#E0E0E0",
    },
    viper: {
      nome: "VIPER",
      funcao: "// CONTROLADORA",
      descricao:
        "Viper, a química americana, emprega uma variedade de dispositivos químicos venenosos para controlar o campo de batalha e prejudicar a visão do inimigo. Se as toxinas não matarem sua presa, suas táticas irão.",
      cor: "#01C38D",
      corClara: "#2DD5A8",
    },
    yoru: {
      nome: "YORU",
      funcao: "// DUELISTA",
      descricao:
        "Yoru, nativo do Japão, abre fendas na realidade para se infiltrar nas linhas inimigas sem ser visto. Usando tanto artimanhas quanto táticas agressivas, ele pega os inimigos desprevenidos.",
      cor: "#1A237E",
      corClara: "#3949AB",
    },
    skye: {
      nome: "SKYE",
      funcao: "// INICIADORA",
      descricao:
        "Vinda da Austrália, Skye e sua matilha de feras rastreiam inimigos e curam aliados com luzes curativas. Seus amigos se sentem mais seguros ao lado dela, e seus inimigos, mais assombrados.",
      cor: "#4CAF50",
      corClara: "#6CBF6F",
    },
    kayo: {
      nome: "KAY/O",
      funcao: "// INICIADOR",
      descricao:
        "KAY/O é uma máquina de guerra feita para neutralizar radiantes. Seu arsenal de fragmentos supressores, lâminas explosivas e pulsos supressores garantem que os inimigos fiquem privados de poder.",
      cor: "#9E9E9E",
      corClara: "#BDBDBD",
    },
    chamber: {
      nome: "CHAMBER",
      funcao: "// SENTINELA",
      descricao:
        "Bem vestido e bem armado, Chamber, designer de armas francês, repele agressores com precisão letal. Ele aproveita seu arsenal personalizado para segurar posições e abater inimigos de longe.",
      cor: "#FFD700",
      corClara: "#FFED4E",
    },
    neon: {
      nome: "NEON",
      funcao: "// DUELISTA",
      descricao:
        "Neon, nossa Agente filipina, avança em velocidades impressionantes, descarregando rajadas de radiância bioelétrica tão rápido quanto seu corpo se move. Ela está rapidamente adiantada, deixando inimigos no choque.",
      cor: "#00D4FF",
      corClara: "#33E0FF",
    },
    fade: {
      nome: "FADE",
      funcao: "// INICIADORA",
      descricao:
        "Fade, a caçadora de recompensas turca, libera o poder dos pesadelos para agarrar os segredos dos inimigos. Em sintonia com o terror em si, ela persegue alvos e revela seus medos mais profundos.",
      cor: "#7B68EE",
      corClara: "#9A7FFF",
    },
    harbor: {
      nome: "HARBOR",
      funcao: "// CONTROLADOR",
      descricao:
        "Vindo da costa indiana, Harbor entra em campo com tecnologia ancestral de controle da água. Ele libera corredeiras furiosas e ondas esmagadoras para proteger seus aliados e atacar aqueles que se opõem a ele.",
      cor: "#20B2AA",
      corClara: "#48CAC6",
    },
    gekko: {
      nome: "GEKKO",
      funcao: "// INICIADOR",
      descricao:
        "Gekko lidera um grupo de criaturas caóticas para Los Angeles. Seus amigos atropelam os inimigos, depois se transformam em glóbulos dormentes para serem recuperados e reimplantados após um breve período de recarga.",
      cor: "#98FB98",
      corClara: "#B8FFB8",
    },
    deadlock: {
      nome: "DEADLOCK",
      funcao: "// SENTINELA",
      descricao:
        "A Agente norueguesa Deadlock implanta uma matriz de nanofios para proteger o flanco da equipe. Ninguém escapa de sua vigilância, nem de sua ferocidade.",
      cor: "#2E7D32",
      corClara: "#4CAF50",
    },
    iso: {
      nome: "ISO",
      funcao: "// DUELISTA",
      descricao:
        "Iso, o fixador chinês, entra no campo de batalha para desarmar situações complicadas. Reconfigurando a energia radiante ambiente em proteção inviolável, ele avança com confiança para duelos que não pode perder.",
      cor: "#512DA8",
      corClara: "#7C4DFF",
    },
    clove: {
      nome: "CLOVE",
      funcao: "// CONTROLADORA",
      descricao:
        "Clove, agente imortal da Escócia, mantém o ritmo da batalha de qualquer lugar do mapa. Jovem e imprudente, eles mantêm a equipe unida com suas habilidades, mesmo após a morte.",
      cor: "#E91E63",
      corClara: "#F48FB1",
    },
    vyse: {
      nome: "VYSE",
      funcao: "// SENTINELA",
      descricao:
        "Vyse, a prodigiosa metalúrgica, molda metal líquido para isolar, prender e desarmar seus inimigos. Através de seu controle astuto, ela força todos a repensar onde é seguro pisar.",
      cor: "#8E24AA",
      corClara: "#BA68C8",
    },
    tejo: {
      nome: "TEJO",
      funcao: "// INICIADOR",
      descricao:
        "Tejo é um iniciador estratégico, capaz de manipular o campo de batalha com precisão dotado de habilidades que desorientam e bloqueiam a visão inimiga, ele transforma o caos em vantagem tática.",
      cor: "#8E24AA",
      corClara: "#BA68C8",
    },
    waylay: {
      nome: "WAYLAY",
      funcao: "// DUELISTA",
      descricao:
        "Waylay é uma Duelist explosiva e engenhosa, que manipula a luz para controlar os combates e escapar em um piscar de olhos. Seus talentos vêm com bônus: velocidade de movimentação, efeito de desaceleração em área (Hindering) e uma fuga segura — uma combinação que redefine o estilo agressivo de entrada.",
      cor: "#8E24AA",
      corClara: "#BA68C8",
    },
  };

  async function atualizarIconesHabilidades(chaveAgente) {
    const containerHabilidades = document.getElementById("abilities-container");
    if (!containerHabilidades) return;

    containerHabilidades.innerHTML = "";

    try {
      const nomeParaApi = chaveAgente === "chyper" ? "cypher" : chaveAgente;

      const resposta = await fetch(
        "https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=pt-BR"
      );
      const dados = await resposta.json();
      const agenteApi = dados.data.find(
        (a) =>
          a.displayName.toLowerCase().replace("/", "").replace("-", "") ===
          nomeParaApi.toLowerCase().replace("/", "").replace("-", "")
      );

      if (!agenteApi) {
        for (let i = 0; i < 5; i++) {
          const elementoHabilidade = document.createElement("div");
          elementoHabilidade.classList.add("ability");
          if (i === 4) elementoHabilidade.classList.add("ultimate-ability");

          const iconeHabilidade = document.createElement("div");
          iconeHabilidade.classList.add("ability-icon");
          if (i === 4) iconeHabilidade.classList.add("ultimate");

          elementoHabilidade.appendChild(iconeHabilidade);

          if (i === 4) {
            const indicadorUltimate = document.createElement("div");
            indicadorUltimate.classList.add("ultimate-indicator");
            indicadorUltimate.textContent = "ULTIMATE";
            elementoHabilidade.appendChild(indicadorUltimate);
          }

          containerHabilidades.appendChild(elementoHabilidade);
        }
        return;
      }

      agenteApi.abilities.forEach((habilidade) => {
        if (!habilidade.displayIcon) return;

        const elementoHabilidade = document.createElement("div");
        elementoHabilidade.classList.add("ability");
        elementoHabilidade.style.width = "120px";
        elementoHabilidade.style.width = "120px";

        const ehUltimate = habilidade.slot === "Ultimate";
        if (ehUltimate) elementoHabilidade.classList.add("ultimate-ability");

        const iconeHabilidade = document.createElement("div");
        iconeHabilidade.classList.add("ability-icon");
        if (ehUltimate) iconeHabilidade.classList.add("ultimate");

        const imgIcone = document.createElement("img");
        imgIcone.src = habilidade.displayIcon;
        imgIcone.alt = habilidade.displayName;
        imgIcone.style.width = "38px";
        imgIcone.style.height = "38px";
        imgIcone.style.marginTop = "-10px";

        iconeHabilidade.appendChild(imgIcone);
        elementoHabilidade.appendChild(iconeHabilidade);

        const nomeHabilidade = document.createElement("div");
        nomeHabilidade.classList.add("ability-name");
        nomeHabilidade.textContent = habilidade.displayName.split(" ")[0];
        elementoHabilidade.appendChild(nomeHabilidade);

        if (ehUltimate) {
          const indicadorUltimate = document.createElement("div");
          indicadorUltimate.classList.add("ultimate-indicator");
          indicadorUltimate.textContent = "ULTIMATE";
          elementoHabilidade.appendChild(indicadorUltimate);
        }

        containerHabilidades.appendChild(elementoHabilidade);

        elementoHabilidade.addEventListener("mouseenter", () => {
          mostrarTooltipHabilidade(elementoHabilidade, {
            nome: habilidade.displayName,
            descricao: habilidade.description,
            icone: habilidade.displayIcon,
          });
        });

        elementoHabilidade.addEventListener("mouseleave", () => {
          esconderTooltipHabilidade();
        });
      });
    } catch (erro) {
      console.error("Erro ao buscar habilidades:", erro);

      for (let i = 0; i < 5; i++) {
        const elementoHabilidade = document.createElement("div");
        elementoHabilidade.classList.add("ability");
        if (i === 4) elementoHabilidade.classList.add("ultimate-ability");

        const iconeHabilidade = document.createElement("div");
        iconeHabilidade.classList.add("ability-icon");
        if (i === 4) iconeHabilidade.classList.add("ultimate");

        elementoHabilidade.appendChild(iconeHabilidade);
        containerHabilidades.appendChild(elementoHabilidade);
      }
    }
  }

  function mostrarTooltipHabilidade(elementoHabilidade, infoHabilidade) {
    esconderTooltipHabilidade();

    const tooltip = document.createElement("div");
    tooltip.classList.add("ability-tooltip");
    tooltip.id = "tooltip-atual";

    tooltip.innerHTML = `
            <h3>${infoHabilidade.nome}</h3>
            <p>${infoHabilidade.descricao}</p>
        `;

    document.body.appendChild(tooltip);

    const rect = elementoHabilidade.getBoundingClientRect();
    tooltip.style.left = `${
      rect.left + rect.width / 2 - tooltip.offsetWidth / 2
    }px`;
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;

    requestAnimationFrame(() => {
      tooltip.classList.add("show");
    });
  }

  function esconderTooltipHabilidade() {
    const tooltip = document.querySelector("#tooltip-atual");
    if (tooltip) tooltip.remove();
  }

  let indiceAtual = 0;
  const chavesAgentes = Object.keys(agentes);

  function mudarAgente(chaveAgente) {
    if (isChanging || !agentes[chaveAgente]) {
      console.log(
        "Mudança bloqueada:",
        isChanging ? "já processando" : "agente não encontrado"
      );
      return;
    }

    isChanging = true;
    console.log("Mudando para agente:", chaveAgente);

    const tituloAgente = document.getElementById("agent-title");
    const funcaoAgente = document.getElementById("agent-role");
    const descricaoAgente = document.getElementById("agent-description");
    const imgFundoAgente = document.getElementById("agent-bg-img");

    if (!tituloAgente || !funcaoAgente || !descricaoAgente) {
      isChanging = false;
      return;
    }

    const seletores = document.querySelectorAll(".selector-item");
    seletores.forEach((seletor) => seletor.classList.remove("active"));

    const seletorAtivo = document.querySelector(
      `.selector-item[data-agent="${chaveAgente}"]`
    );
    if (seletorAtivo) seletorAtivo.classList.add("active");

    tituloAgente.classList.add("fade-out");
    funcaoAgente.classList.add("fade-out");
    descricaoAgente.classList.add("fade-out");

    setTimeout(() => {
      tituloAgente.textContent = agentes[chaveAgente].nome;
      funcaoAgente.textContent = agentes[chaveAgente].funcao;
      descricaoAgente.textContent = agentes[chaveAgente].descricao;

      if (imgFundoAgente) {
        const nomeImagem = chaveAgente === "chyper" ? "cypher" : chaveAgente;
        imgFundoAgente.src = `assets/agentes/${nomeImagem}.avif`;
        imgFundoAgente.alt = `${agentes[chaveAgente].nome} Fundo`;
      }

      document.documentElement.style.setProperty(
        "--agent-color",
        agentes[chaveAgente].cor
      );
      document.documentElement.style.setProperty(
        "--agent-light-color",
        agentes[chaveAgente].corClara || agentes[chaveAgente].cor + "99"
      );

      let corRgb = "";
      if (agentes[chaveAgente].cor.startsWith("#")) {
        const hex = agentes[chaveAgente].cor.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        corRgb = `${r}, ${g}, ${b}`;
      } else {
        corRgb = "111, 61, 195";
      }

      document.body.className = "";
      document.body.classList.add(`${chaveAgente}-theme`);

      atualizarIconesHabilidades(chaveAgente);

      setTimeout(() => {
        tituloAgente.classList.remove("fade-out");
        funcaoAgente.classList.remove("fade-out");
        descricaoAgente.classList.remove("fade-out");
        atualizarEfeitoBrilho();

        isChanging = false;
      }, 100);
    }, 300);

    indiceAtual = chavesAgentes.indexOf(chaveAgente);
  }

  mudarAgente("astra");

  const itensSeletor = document.querySelectorAll(".selector-item");
  itensSeletor.forEach((item) => {
    const chaveAgente = item.getAttribute("data-agent");
    if (chaveAgente && agentes[chaveAgente]) {
      item.removeEventListener("click", handleClick);

      item.addEventListener("click", handleClick);

      function handleClick(event) {
        event.preventDefault();
        event.stopPropagation();

        if (isChanging) {
          console.log("Clique ignorado - já processando");
          return;
        }

        mudarAgente(chaveAgente);
      }
    }
  });
});
