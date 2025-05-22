// botoes do site
const fortniteBtn = document.getElementById('fortniteButton');
const valorantBtn = document.querySelector('.valorant-button');
const playBtn = document.querySelector('.valorant-play-btn');

// Vídeos
const fortniteVideo = document.getElementById('fortniteVideo');
const valorantVideo = document.getElementById('valorantVideo');

// variaveis barra de pesquisa
const input = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const icons = document.getElementById('icons');

// Funcoes
function fortniteGame() {
    fortniteVideo.style.opacity = '1';
    fortniteVideo.style.filter = 'none'; 
    fortniteVideo.play();
    valorantVideo.style.opacity = '0';
    valorantVideo.pause();
}

function paraFortnite() {
    fortniteVideo.style.opacity = '0';
    fortniteVideo.pause();
}

function valorantGame() {
    valorantVideo.style.opacity = '1';
    valorantVideo.style.filter = 'none'; 
    valorantVideo.play();
    fortniteVideo.style.opacity = '0';
    fortniteVideo.pause();
}

function paraValorant() {
    valorantVideo.style.opacity = '0';
    valorantVideo.pause();
}


// Input barra de pesquisa
input.addEventListener('input', () => {
      icons.classList.toggle('show-icons', input.value.length > 0);
    });

clearBtn.addEventListener('click', () => {
    input.value = '';
    input.focus();
    icons.classList.remove('show-icons');
});

// botao jogue agora menu
playBtn.addEventListener('mouseenter', () => {
    playBtn.classList.add('pulse');
});
        
playBtn.addEventListener('mouseleave', () => {
    playBtn.classList.remove('pulse');
});
        
playBtn.addEventListener('click', () => {
    console.log('Jogo iniciado!');
});



// Eventos
fortniteBtn.addEventListener('mouseenter', fortniteGame);
fortniteBtn.addEventListener('mouseleave', paraFortnite);

valorantBtn.addEventListener('mouseenter', valorantGame);
valorantBtn.addEventListener('mouseleave', paraValorant);
