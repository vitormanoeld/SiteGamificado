const mapas = {
    ascent: {
        nome: 'ASCENT',
        local: 'ITÁLIA',
        desc: 'Um campo de batalha aberto para pequenas guerras de posição e desgaste, dividido por um meio que ambas as equipes podem disputar.',
        fundo: '/assets/ascent/ascentfundo.jpg',
        layout: '/assets/ascent/miniacent.webp',
    },
    bind: {
        nome: 'BIND',
        local: 'MARROCOS',
        desc: 'Dois pontos. Sem meio. Muitas oportunidades para confrontos em pequena escala e jogos mentais com rotações.',
        fundo: '/assets/bind/Bind_Map.png',
        layout: '/assets/bind/layout-bind.webp',

    },
    haven: {
        nome: 'HAVEN',
        local: 'BUTÃO',
        desc: 'Três pontos. Três rotas. Mais áreas para controlar. Oportunidades únicas de jogabilidade e um paraíso para controladores.',
        fundo: '/assets/haven/backgroundhaven.jpg',
        layout: '/assets/haven/Haven_minimap.webp',

    },
    split: {
        nome: 'SPLIT',
        local: 'JAPÃO',
        desc: 'Um mapa dividido com um toque de verticalidade. Lute pelo controle do meio com diferentes alcances de combate.',
        fundo: '/assets/split/splitfundo.webp',
        layout: '/assets/split/Split_minimap.webp',
    },
    icebox: {
        nome: 'ICEBOX',
        local: 'RÚSSIA',
        desc: 'Um sítio de escavação secreto da Kingdom tomado pelo Ártico. Ângulos fechados e tirolesas verticais tornam este um campo de batalha vertical.',
        fundo: '/assets/icebox/backgroundicebox.webp',
        layout: '/assets/icebox/Icebox_minimap.webp',
    },
    breeze: {
        nome: 'BREEZE',
        local: 'CARIBE',
        desc: 'Aproveite as paisagens de ruínas históricas ou cavernas à beira-mar neste paraíso tropical com espaços abertos e longas linhas de visão.',
        fundo: '/assets/breeze/fundobreeze.jpg',
        layout: '/assets/breeze/Breeze_minimap.webp',
    },
    fracture: {
        nome: 'FRACTURE',
        local: 'DESERTO DE SANTA FÉ',
        desc: 'Uma instalação de pesquisa ultrassecreta dividida por um experimento de radianita que falhou. Ataque pelos dois lados neste mapa dividido.',
        fundo: '/assets/fracture/fracturefundo.webp',
        layout: '/assets/fracture/Fracture_minimap.webp',
    },
    pearl: {
        nome: 'PEARL',
        local: 'PORTUGAL',
        desc: 'Os atacantes avançam para o território dos defensores nesta cidade subaquática. Pearl é um mapa com rotas divididas e três caminhos.',
        fundo: '/assets/pearl/pearlfundo.jpg',
        layout: '/assets/pearl/Pearl_minimap.webp',
    },
    lotus: {
        nome: 'LOTUS',
        local: 'ÍNDIA',
        desc: 'Um mapa com três pontos, portas giratórias e paredes destrutíveis. Domine esta instalação antiga construída para rituais misteriosos.',
        fundo: '/assets/lotus/lotusbackground.jpg',
        layout: '/assets/lotus/Lotus_minimap.webp',
    },
    sunset: {
        nome: 'SUNSET',
        local: 'LOS ANGELES',
        desc: 'Navegue pelas ruas de LA neste mapa com dois pontos. Múltiplos caminhos oferecem diversas opções táticas.',
        fundo: '/assets/sunset/sunset.png',
        layout: '/assets/sunset/Sunset_minimap.webp',
    }
};

function obterElementosAudio() {
    return {
        hover: document.getElementById('hover-sound'),
        click: document.getElementById('select-sound')
    };
}

function atualizarExibicaoMapa(mapa) {
    document.querySelector('.map-title').textContent = mapa.nome;
    document.querySelector('.map-subtitle').textContent = mapa.local;
    document.querySelector('.map-description p').textContent = mapa.desc;
    document.querySelector('.map-background').style.backgroundImage = `url(${mapa.fundo})`;
    document.querySelector('.map-layout').style.backgroundImage = `url(${mapa.layout})`;
}

function trocarMapa(id) {
    const mapa = mapas[id];
    if (!mapa) return;
    atualizarExibicaoMapa(mapa);
}

function definirCartaoAtivo(cartaoAtivo) {
    const cartoesMapa = document.querySelectorAll('.map-card');
    cartoesMapa.forEach(cartao => cartao.classList.remove('active'));
    cartaoAtivo.classList.add('active');
}

function manipularCliqueMapa(cartao, audio) {
    audio.click.play();
    definirCartaoAtivo(cartao);
    const idMapa = cartao.getAttribute('data-map');
    trocarMapa(idMapa);
}

function configurarCartoesMapa() {
    const cartoesMapa = document.querySelectorAll('.map-card');
    const audio = obterElementosAudio();

    cartoesMapa.forEach(cartao => {
        cartao.addEventListener('mouseenter', () => audio.hover.play());
        cartao.addEventListener('click', () => manipularCliqueMapa(cartao, audio));
    });
}


function inicializar() {
    configurarCartoesMapa();
    trocarMapa('ascent');

   
    const cartaoInicial = document.querySelector('.map-card[data-map="ascent"]');
    if (cartaoInicial) definirCartaoAtivo(cartaoInicial);
}




inicializar();