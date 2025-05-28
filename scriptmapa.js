import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import gsap from 'gsap';

// Dados dos mapas
const maps = [
    {
        id: 'ascent',
        name: 'ASCENT',
        location: 'ITÁLIA',
        description: 'Um campo de batalha aberto para pequenas guerras de posição e desgaste, dividido por um meio que ambas as equipes podem disputar.',
        background: 'assets/fundoAscent.jpg',
        mapLayout: 'ascent-map.png',
        callouts: 'ascent-callouts.png',
        ambientSound: 'ascent-ambient.mp3'
    },
    {
        id: 'bind',
        name: 'BIND',
        location: 'MARROCOS',
        description: 'Dois pontos. Sem meio. Muitas oportunidades para confrontos em pequena escala e jogos mentais com rotações.',
        background: 'assets/fundoBind.webp',
        mapLayout: 'bind-map.png',
        callouts: 'bind-callouts.png',
        ambientSound: 'bind-ambient.mp3'
    },
    {
        id: 'haven',
        name: 'HAVEN',
        location: 'BUTÃO',
        description: 'Três pontos. Três rotas. Mais áreas para controlar. Oportunidades únicas de jogabilidade e um paraíso para controladores.',
        background: 'assets/backgroundhaven.jpg',
        mapLayout: 'haven-map.png',
        callouts: 'haven-callouts.png',
        ambientSound: 'haven-ambient.mp3'
    },
    {
        id: 'split',
        name: 'SPLIT',
        location: 'JAPÃO',
        description: 'Um mapa dividido com um toque de verticalidade. Lute pelo controle do meio com diferentes alcances de combate.',
        background: 'assets/fundoSplit.webp',
        mapLayout: 'split-map.png',
        callouts: 'split-callouts.png',
        ambientSound: 'split-ambient.mp3'
    },
    {
        id: 'icebox',
        name: 'ICEBOX',
        location: 'RÚSSIA',
        description: 'Um sítio de escavação secreto da Kingdom tomado pelo Ártico. Ângulos fechados e tirolesas verticais tornam este um campo de batalha vertical.',
        background: 'assets/backgroundicebox.webp',
        mapLayout: 'icebox-map.png',
        callouts: 'icebox-callouts.png',
        ambientSound: 'icebox-ambient.mp3'
    },
    {
        id: 'breeze',
        name: 'BREEZE',
        location: 'CARIBE',
        description: 'Aproveite as paisagens de ruínas históricas ou cavernas à beira-mar neste paraíso tropical com espaços abertos e longas linhas de visão.',
        background: 'assets/FundoBreeze.jpg',
        mapLayout: 'breeze-map.png',
        callouts: 'breeze-callouts.png',
        ambientSound: 'breeze-ambient.mp3'
    },
    {
        id: 'fracture',
        name: 'FRACTURE',
        location: 'DESERTO DE SANTA FÉ',
        description: 'Uma instalação de pesquisa ultrassecreta dividida por um experimento de radianita que falhou. Ataque pelos dois lados neste mapa dividido.',
        background: 'assets/fundoFracture.webp',
        mapLayout: 'fracture-map.png',
        callouts: 'fracture-callouts.png',
        ambientSound: 'fracture-ambient.mp3'
    },
    {
        id: 'pearl',
        name: 'PEARL',
        location: 'PORTUGAL',
        description: 'Os atacantes avançam para o território dos defensores nesta cidade subaquática. Pearl é um mapa com rotas divididas e três caminhos.',
        background: 'assets/fundoPearl.webp',
        mapLayout: 'assets/fundoPearl.webp',
        callouts: 'pearl-callouts.png',
        ambientSound: 'pearl-ambient.mp3'
    },
    {
        id: 'lotus',
        name: 'LOTUS',
        location: 'ÍNDIA',
        description: 'Um mapa com três pontos, portas giratórias e paredes destrutíveis. Domine esta instalação antiga construída para rituais misteriosos.',
        background: 'assets/fundoLotus.webp',
        mapLayout: 'ltus-map.png',
        callouts: 'lotus-callouts.png',
        ambientSound: 'lotus-ambient.mp3'
    },
    {
        id: 'sunset',
        name: 'SUNSET',
        location: 'LOS ANGELES',
        description: 'Navegue pelas ruas de LA neste mapa com dois pontos. Múltiplos caminhos oferecem diversas opções táticas.',
        background: 'assets/fundoSunset.webp',
        mapLayout: 'sunset-map.png',
        callouts: 'sunset-callouts.png',
        ambientSound: 'sunset-ambient.mp3'
    }
];

// Audio elements
const hoverSound = document.getElementById('hover-sound');
const selectSound = document.getElementById('select-sound');
const ambientSound = document.getElementById('ambient-sound');
const exploreSound = document.getElementById('explore-sound');

// DOM elements
const loader = document.querySelector('.loader');
const loaderProgress = document.querySelector('.loader-progress');
const mapCards = document.querySelectorAll('.map-card');
const mapBackground = document.querySelector('.map-background');
const mapTitle = document.querySelector('.map-title');
const mapSubtitle = document.querySelector('.map-subtitle');
const mapDescription = document.querySelector('.map-description');
const mapLayout = document.querySelector('.map-layout');
const calloutButton = document.querySelector('.callout-button');
const calloutsOverlay = document.querySelector('.callouts-overlay');
const closeCallouts = document.querySelector('.close-callouts');
const calloutsImage = document.querySelector('.callouts-image');
const exploreButton = document.querySelector('.explore-button');
const threeContainer = document.querySelector('.three-container');
const backButton = document.querySelector('.back-button');
const teleportPoints = document.querySelector('.teleport-points');

// Current active map
let currentMap = maps[0];

// Loader simulation
let progress = 0;
const loaderInterval = setInterval(() => {
    progress += Math.random() * 5;
    if (progress >= 100) {
        progress = 100;
        clearInterval(loaderInterval);
        
        // Fade out loader
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                
                // Play ambient sound
                ambientSound.src = currentMap.ambientSound;
                ambientSound.volume = 0.3;
                ambientSound.play();
                
                // Animate initial elements
                animateIntro();
            }, 500);
        }, 500);
    }
    loaderProgress.style.width = `${progress}%`;
}, 100);

// Sound effects
hoverSound.src = 'hover.mp3';
selectSound.src = 'select.mp3';
exploreSound.src = 'explore.mp3';

// Event listeners
mapCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
    
    card.addEventListener('click', () => {
        selectSound.currentTime = 0;
        selectSound.play();
        
        const mapId = card.getAttribute('data-map');
        const newMap = maps.find(map => map.id === mapId);
        
        if (newMap && newMap !== currentMap) {
            updateMap(newMap);
        }
        
        // Update active class
        mapCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});

calloutButton.addEventListener('click', () => {
    selectSound.currentTime = 0;
    selectSound.play();
    
    calloutsOverlay.style.opacity = '1';
    calloutsOverlay.style.pointerEvents = 'auto';
});

closeCallouts.addEventListener('click', () => {
    selectSound.currentTime = 0;
    selectSound.play();
    
    calloutsOverlay.style.opacity = '0';
    calloutsOverlay.style.pointerEvents = 'none';
});

exploreButton.addEventListener('click', () => {
    exploreSound.currentTime = 0;
    exploreSound.play();
    
    ambientSound.pause();
    
    threeContainer.style.display = 'block';
    initThreeScene();
});

backButton.addEventListener('click', () => {
    selectSound.currentTime = 0;
    selectSound.play();
    
    // Play ambient sound again
    ambientSound.play();
    
    threeContainer.style.display = 'none';
    disposeThreeScene();
});

// Functions
function updateMap(map) {
    currentMap = map;
    
    // Fade out current content
    gsap.to('.map-content', {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            // Update content
            mapTitle.textContent = map.name;
            mapSubtitle.textContent = map.location;
            mapDescription.textContent = map.description;
            mapBackground.style.backgroundImage = `url('${map.background}')`;
            mapLayout.style.backgroundImage = `url('${map.mapLayout}')`;
            calloutsImage.style.backgroundImage = `url('${map.callouts}')`;
            
            // Update ambient sound
            ambientSound.src = map.ambientSound;
            ambientSound.play();
            
            // Fade in updated content
            gsap.to('.map-content', {
                opacity: 1,
                duration: 0.3
            });
        }
    });
}

function animateIntro() {
    gsap.from('.map-title', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });
    
    gsap.from('.map-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out'
    });
    
    gsap.from('.map-description', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power2.out'
    });
    
    gsap.from('.map-layout', {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power2.out'
    });
    
    gsap.from('.maps-selector', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: 'power2.out'
    });
    
    gsap.from('.explore-button', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 1,
        ease: 'power2.out'
    });
}

// Three.js 3D exploration
let scene, camera, renderer, controls;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
let prevTime = performance.now();

function initThreeScene() {
    // Create scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x11151c, 0.05);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.7, 5);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x11151c);
    renderer.shadowMap.enabled = true;
    threeContainer.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Add pointer lock controls
    controls = new PointerLockControls(camera, renderer.domElement);
    scene.add(controls.getObject());
    
    // Event listeners for movement
    const onKeyDown = function(event) {
        switch(event.code) {
            case 'KeyW':
                moveForward = true;
                break;
            case 'KeyA':
                moveLeft = true;
                break;
            case 'KeyS':
                moveBackward = true;
                break;
            case 'KeyD':
                moveRight = true;
                break;
            case 'Space':
                if(canJump) {
                    velocity.y += 10;
                    canJump = false;
                }
                break;
            case 'ShiftLeft':
                // Sprint
                camera.fov = 80;
                camera.updateProjectionMatrix();
                break;
        }
    };
    
    const onKeyUp = function(event) {
        switch(event.code) {
            case 'KeyW':
                moveForward = false;
                break;
            case 'KeyA':
                moveLeft = false;
                break;
            case 'KeyS':
                moveBackward = false;
                break;
            case 'KeyD':
                moveRight = false;
                break;
            case 'ShiftLeft':
                // Stop sprint
                camera.fov = 75;
                camera.updateProjectionMatrix();
                break;
        }
    };
    
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    
    // Lock controls on click
    renderer.domElement.addEventListener('click', () => {
        controls.lock();
    });
    
    // Add floor
    const floorGeometry = new THREE.PlaneGeometry(100, 100, 32, 32);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333,
        roughness: 0.8,
        metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    
    // Add some basic map structures based on current map
    createMapStructures();
    
    // Add teleport points
    createTeleportPoints();
    
    // Start animation loop
    animate();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function createMapStructures() {
    // This is a simplified version - in a real implementation,
    // you would load actual 3D models of the maps
    
    // Add walls
    const wallMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x5d7f9e,
        roughness: 0.7,
        metalness: 0.2
    });
    
    // Side walls
    const wallGeometry1 = new THREE.BoxGeometry(100, 4, 1);
    const wall1 = new THREE.Mesh(wallGeometry1, wallMaterial);
    wall1.position.set(0, 2, -50);
    wall1.castShadow = true;
    scene.add(wall1);
    
    const wall2 = new THREE.Mesh(wallGeometry1, wallMaterial);
    wall2.position.set(0, 2, 50);
    wall2.castShadow = true;
    scene.add(wall2);
    
    // Back/front walls
    const wallGeometry2 = new THREE.BoxGeometry(1, 4, 100);
    const wall3 = new THREE.Mesh(wallGeometry2, wallMaterial);
    wall3.position.set(-50, 2, 0);
    wall3.castShadow = true;
    scene.add(wall3);
    
    const wall4 = new THREE.Mesh(wallGeometry2, wallMaterial);
    wall4.position.set(50, 2, 0);
    wall4.castShadow = true;
    scene.add(wall4);
    
    // Add some internal structures based on the current map
    if (currentMap.id === 'ascent') {
        // A site structures
        const aSiteGeometry = new THREE.BoxGeometry(15, 4, 15);
        const aSiteMaterial = new THREE.MeshStandardMaterial({ color: 0x8c7f66 });
        const aSite = new THREE.Mesh(aSiteGeometry, aSiteMaterial);
        aSite.position.set(-20, 2, -20);
        aSite.castShadow = true;
        scene.add(aSite);
        
        // B site structures
        const bSiteGeometry = new THREE.BoxGeometry(15, 4, 15);
        const bSiteMaterial = new THREE.MeshStandardMaterial({ color: 0x8c7f66 });
        const bSite = new THREE.Mesh(bSiteGeometry, bSiteMaterial);
        bSite.position.set(20, 2, -20);
        bSite.castShadow = true;
        scene.add(bSite);
        
        // Mid structures
        const midGeometry = new THREE.BoxGeometry(10, 4, 30);
        const midMaterial = new THREE.MeshStandardMaterial({ color: 0x6e8898 });
        const mid = new THREE.Mesh(midGeometry, midMaterial);
        mid.position.set(0, 2, 0);
        mid.castShadow = true;
        scene.add(mid);
    } else if (currentMap.id === 'bind') {
        // Different structures for Bind
        // ... simplified example
    }
    
    // Add some crates and props
    const crateGeometry = new THREE.BoxGeometry(2, 2, 2);
    const crateMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    
    for (let i = 0; i < 20; i++) {
        const crate = new THREE.Mesh(crateGeometry, crateMaterial);
        crate.position.set(
            Math.random() * 80 - 40,
            1,
            Math.random() * 80 - 40
        );
        crate.castShadow = true;
        scene.add(crate);
    }
}

function createTeleportPoints() {
    // Create teleport buttons for different locations on the map
    const locations = [
        { name: 'A SITE', position: new THREE.Vector3(-20, 1.7, -20) },
        { name: 'B SITE', position: new THREE.Vector3(20, 1.7, -20) },
        { name: 'MID', position: new THREE.Vector3(0, 1.7, 0) },
        { name: 'SPAWN', position: new THREE.Vector3(0, 1.7, 30) }
    ];
    
    // Clear existing teleport points
    teleportPoints.innerHTML = '';
    
    // Create buttons for each location
    locations.forEach(location => {
        const button = document.createElement('div');
        button.classList.add('callout-button');
        button.textContent = location.name;
        button.style.marginBottom = '10px';
        
        button.addEventListener('click', () => {
            selectSound.currentTime = 0;
            selectSound.play();
            
            // Teleport to location
            controls.getObject().position.copy(location.position);
        });
        
        teleportPoints.appendChild(button);
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    if (controls.isLocked) {
        const time = performance.now();
        const delta = (time - prevTime) / 1000;
        
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 100.0 * delta; // gravity
        
        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize();
        
        const speedMultiplier = camera.fov === 80 ? 400.0 : 200.0; // sprint vs walk
        
        if (moveForward || moveBackward) velocity.z -= direction.z * speedMultiplier * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * speedMultiplier * delta;
        
        controls.moveRight(-velocity.x * delta);
        controls.moveForward(-velocity.z * delta);
        
        controls.getObject().position.y += (velocity.y * delta); // Apply gravity
        
        // Collision with floor
        if (controls.getObject().position.y < 1.7) {
            velocity.y = 0;
            controls.getObject().position.y = 1.7;
            canJump = true;
        }
        
        prevTime = time;
    }
    
    renderer.render(scene, camera);
}

function disposeThreeScene() {
    // Clean up scene to prevent memory leaks
    scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
            if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
            } else {
                object.material.dispose();
            }
        }
    });
    
    // Remove renderer from DOM
    if (renderer) {
        renderer.domElement.remove();
        renderer.dispose();
    }
    
    // Remove event listeners
    window.removeEventListener('resize', onWindowResize);
}

