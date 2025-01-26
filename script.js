// Adiciona efeito hover nos links para animar o tamanho da fonte
const links = document.querySelectorAll("a");
links.forEach((link) => {
  link.addEventListener("mouseover", () => {
    link.style.fontSize = "1.2rem";
    link.style.transition = "font-size 0.3s ease";
  });
  link.addEventListener("mouseout", () => {
    link.style.fontSize = "1rem";
  });
});

// Animação de scroll suave ao clicar nos links internos
const navLinks = document.querySelectorAll("a[href^='#']");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth",
    });
  });
});

// Botão de alerta para WhatsApp
const whatsappButton = document.querySelector(".whatsapp-button");
whatsappButton.addEventListener("click", () => {
  alert("Abrindo WhatsApp... Certifique-se de que o app está instalado!");
});

// Adiciona efeito de fade-in ao carregar a página
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  document.body.style.transition = "opacity 1s ease-in-out";
});

// Cria uma mensagem dinâmica no rodapé com o ano atual
const footer = document.querySelector("footer p");
const year = new Date().getFullYear();
footer.textContent = `© ${year} Jaine Silva. Todos os direitos reservados.`;
const canvas = document.getElementById("pacmanCanvas");
const ctx = canvas.getContext("2d");

// Configurações básicas
const gridSize = 20;
const rows = canvas.height / gridSize;
const cols = canvas.width / gridSize;

// Pac-Man
let pacman = {
  x: 1,
  y: 1,
  direction: "RIGHT",
};

// Bolinhas
let dots = [];

// Inicializa as bolinhas
function createDots() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!(row === pacman.y && col === pacman.x)) {
        dots.push({ x: col, y: row });
      }
    }
  }
}

// Desenha o Pac-Man
function drawPacman() {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(
    pacman.x * gridSize + gridSize / 2,
    pacman.y * gridSize + gridSize / 2,
    gridSize / 2 - 2,
    0.2 * Math.PI,
    1.8 * Math.PI
  );
  ctx.lineTo(pacman.x * gridSize + gridSize / 2, pacman.y * gridSize + gridSize / 2);
  ctx.fill();
}

// Desenha as bolinhas
function drawDots() {
  ctx.fillStyle = "white";
  dots.forEach((dot) => {
    ctx.beginPath();
    ctx.arc(
      dot.x * gridSize + gridSize / 2,
      dot.y * gridSize + gridSize / 2,
      3,
      0,
      2 * Math.PI
    );
    ctx.fill();
  });
}

// Atualiza a posição do Pac-Man
function updatePacman() {
  if (pacman.direction === "RIGHT") pacman.x++;
  if (pacman.direction === "LEFT") pacman.x--;
  if (pacman.direction === "UP") pacman.y--;
  if (pacman.direction === "DOWN") pacman.y++;

  // Bordas
  if (pacman.x < 0) pacman.x = cols - 1;
  if (pacman.x >= cols) pacman.x = 0;
  if (pacman.y < 0) pacman.y = rows - 1;
  if (pacman.y >= rows) pacman.y = 0;

  // Come bolinhas
  dots = dots.filter((dot) => !(dot.x === pacman.x && dot.y === pacman.y));
}

// Controle do Pac-Man
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") pacman.direction = "RIGHT";
  if (e.key === "ArrowLeft") pacman.direction = "LEFT";
  if (e.key === "ArrowUp") pacman.direction = "UP";
  if (e.key === "ArrowDown") pacman.direction = "DOWN";
});

// Loop principal
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawDots();
  drawPacman();
  updatePacman();

  requestAnimationFrame(gameLoop);
}

// Inicializa o jogo
createDots();
gameLoop();
const canvas = document.getElementById("pacmanCanvas");
const ctx = canvas.getContext("2d");

// Configurações básicas
const gridSize = 20;
const rows = canvas.height / gridSize;
const cols = canvas.width / gridSize;

// Pac-Man
let pacman = { x: 1, y: 1, direction: "RIGHT" };

// Fantasmas
let ghosts = [
  { x: 10, y: 5, color: "red", direction: "LEFT" },
  { x: 15, y: 8, color: "pink", direction: "UP" },
];

// Bolinhas
let dots = [];

// Pontuação
let score = 0;
let gameOver = false;

// Inicializa as bolinhas
function createDots() {
  dots = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!(row === pacman.y && col === pacman.x)) {
        dots.push({ x: col, y: row });
      }
    }
  }
}

// Desenha o Pac-Man
function drawPacman() {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(
    pacman.x * gridSize + gridSize / 2,
    pacman.y * gridSize + gridSize / 2,
    gridSize / 2 - 2,
    0.2 * Math.PI,
    1.8 * Math.PI
  );
  ctx.lineTo(pacman.x * gridSize + gridSize / 2, pacman.y * gridSize + gridSize / 2);
  ctx.fill();
}

// Desenha os fantasmas
function drawGhosts() {
  ghosts.forEach((ghost) => {
    ctx.fillStyle = ghost.color;
    ctx.fillRect(
      ghost.x * gridSize + 5,
      ghost.y * gridSize + 5,
      gridSize - 10,
      gridSize - 10
    );
  });
}

// Desenha as bolinhas
function drawDots() {
  ctx.fillStyle = "white";
  dots.forEach((dot) => {
    ctx.beginPath();
    ctx.arc(
      dot.x * gridSize + gridSize / 2,
      dot.y * gridSize + gridSize / 2,
      3,
      0,
      2 * Math.PI
    );
    ctx.fill();
  });
}

// Atualiza a posição do Pac-Man
function updatePacman() {
  if (pacman.direction === "RIGHT") pacman.x++;
  if (pacman.direction === "LEFT") pacman.x--;
  if (pacman.direction === "UP") pacman.y--;
  if (pacman.direction === "DOWN") pacman.y++;

  // Bordas
  if (pacman.x < 0) pacman.x = cols - 1;
  if (pacman.x >= cols) pacman.x = 0;
  if (pacman.y < 0) pacman.y = rows - 1;
  if (pacman.y >= rows) pacman.y = 0;

  // Come bolinhas
  dots = dots.filter((dot) => {
    if (dot.x === pacman.x && dot.y === pacman.y) {
      score += 10;
      document.getElementById("score").textContent = score;
      return false;
    }
    return true;
  });
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let pacMan = { x: 50, y: 50, size: 20, speed: 5, direction: 'RIGHT' };
let pellets = [];
let ghosts = [
  { x: 400, y: 300, size: 20, speed: 2, color: 'red' },
  { x: 500, y: 400, size: 20, speed: 2, color: 'pink' }
];
let score = 0;

// Create pellets
for (let i = 0; i < 50; i++) {
  pellets.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 5
  });
}

// Draw Pac-Man
function drawPacMan() {
  ctx.beginPath();
  ctx.arc(pacMan.x, pacMan.y, pacMan.size, 0.2 * Math.PI, 1.8 * Math.PI);
  ctx.lineTo(pacMan.x, pacMan.y);
  ctx.fillStyle = 'yellow';
  ctx.fill();
  ctx.closePath();
}

// Draw pellets
function drawPellets() {
  ctx.fillStyle = 'white';
  pellets.forEach((pellet) => {
    ctx.beginPath();
    ctx.arc(pellet.x, pellet.y, pellet.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  });
}

// Draw ghosts
function drawGhosts() {
  ghosts.forEach((ghost) => {
    ctx.beginPath();
    ctx.arc(ghost.x, ghost.y, ghost.size, 0, 2 * Math.PI);
    ctx.fillStyle = ghost.color;
    ctx.fill();
    ctx.closePath();
  });
}

// Move Pac-Man
function movePacMan() {
  if (pacMan.direction === 'RIGHT') pacMan.x += pacMan.speed;
  if (pacMan.direction === 'LEFT') pacMan.x -= pacMan.speed;
  if (pacMan.direction === 'UP') pacMan.y -= pacMan.speed;
  if (pacMan.direction === 'DOWN') pacMan.y += pacMan.speed;

  // Boundary check
  if (pacMan.x < 0) pacMan.x = canvas.width;
  if (pacMan.x > canvas.width) pacMan.x = 0;
  if (pacMan.y < 0) pacMan.y = canvas.height;
  if (pacMan.y > canvas.height) pacMan.y = 0;
}

// Move ghosts
function moveGhosts() {
  ghosts.forEach((ghost) => {
    const dx = pacMan.x - ghost.x;
    const dy = pacMan.y - ghost.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 200) {
      ghost.x += dx / distance * ghost.speed;
      ghost.y += dy / distance * ghost.speed;
    }
  });
}

// Check collisions
function checkCollisions() {
  // Pac-Man eating pellets
  pellets = pellets.filter((pellet) => {
    const dx = pacMan.x - pellet.x;
    const dy = pacMan.y - pellet.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < pacMan.size + pellet.size) {
      score += 10;
      document.getElementById('score').innerText = `Score: ${score}`;
      return false; // Remove the pellet
    }
    return true;
  });

  // Ghosts catching Pac-Man
  ghosts.forEach((ghost) => {
    const dx = pacMan.x - ghost.x;
    const dy = pacMan.y - ghost.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < pacMan.size + ghost.size) {
      alert('Game Over!');
      document.location.reload();
    }
  });
}

// Handle key presses
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') pacMan.direction = 'RIGHT';
  if (e.key === 'ArrowLeft') pacMan.direction = 'LEFT';
  if (e.key === 'ArrowUp') pacMan.direction = 'UP';
  if (e.key === 'ArrowDown') pacMan.direction = 'DOWN';
});

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPacMan();
  drawPellets();
  drawGhosts();
  movePacMan();
  moveGhosts();
  checkCollisions();
  requestAnimationFrame(gameLoop);
}
gameLoop();
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let pacMan = { x: 50, y: 50, size: 20, speed: 5, direction: 'RIGHT', frame: 0 };
let pellets = [];
let ghosts = [
  { x: 400, y: 300, size: 20, speed: 2, color: 'red', dx: 1, dy: 1 }
];
let maze = [];
let score = 0;

// Sounds
const eatSound = document.getElementById('eatSound');
const gameOverSound = document.getElementById('gameOverSound');
const bgMusic = document.getElementById('bgMusic');
bgMusic.play();

// Create maze
const mazeWidth = 16; // Blocks horizontally
const mazeHeight = 12; // Blocks vertically
for (let i = 0; i < mazeHeight; i++) {
  maze[i] = [];
  for (let j = 0; j < mazeWidth; j++) {
    maze[i][j] = Math.random() > 0.8 ? 1 : 0; // 1 = wall, 0 = empty
  }
}

// Create pellets
for (let i = 0; i < 50; i++) {
  pellets.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 5
  });
}

// Draw maze
function drawMaze() {
  maze.forEach((row, y) => {
    row.forEach((block, x) => {
      if (block === 1) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(x * 50, y * 50, 50, 50);
      }
    });
  });
}

// Draw Pac-Man
function drawPacMan() {
  ctx.beginPath();
  const mouthOpen = pacMan.frame % 2 === 0 ? 0.2 : 0;
  ctx.arc(
    pacMan.x,
    pacMan.y,
    pacMan.size,
    mouthOpen * Math.PI,
    (2 - mouthOpen) * Math.PI
  );
  ctx.lineTo(pacMan.x, pacMan.y);
  ctx.fillStyle = 'yellow';
  ctx.fill();
  ctx.closePath();
}

// Draw pellets
function drawPellets() {
  ctx.fillStyle = 'white';
  pellets.forEach((pellet) => {
    ctx.beginPath();
    ctx.arc(pellet.x, pellet.y, pellet.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  });
}

// Draw ghosts
function drawGhosts() {
  ghosts.forEach((ghost) => {
    ctx.beginPath();
    ctx.arc(ghost.x, ghost.y, ghost.size, 0, 2 * Math.PI);
    ctx.fillStyle = ghost.color;
    ctx.fill();
    ctx.closePath();
  });
}

// Move Pac-Man
function movePacMan() {
  if (pacMan.direction === 'RIGHT') pacMan.x += pacMan.speed;
  if (pacMan.direction === 'LEFT') pacMan.x -= pacMan.speed;
  if (pacMan.direction === 'UP') pacMan.y -= pacMan.speed;
  if (pacMan.direction === 'DOWN') pacMan.y += pacMan.speed;

  // Boundary check
  if (pacMan.x < 0) pacMan.x = canvas.width;
  if (pacMan.x > canvas.width) pacMan.x = 0;
  if (pacMan.y < 0) pacMan.y = canvas.height;
  if (pacMan.y > canvas.height) pacMan.y = 0;

  pacMan.frame++;
}

// Move ghosts
function moveGhosts() {
  ghosts.forEach((ghost) => {
    ghost.x += ghost.dx * ghost.speed;
    ghost.y += ghost.dy * ghost.speed;

    // Bounce off walls
    if (ghost.x < 0 || ghost.x > canvas.width) ghost.dx *= -1;
    if (ghost.y < 0 || ghost.y > canvas.height) ghost.dy *= -1;
  });
}

// Check collisions
function checkCollisions() {
  // Pac-Man eating pellets
  pellets = pellets.filter((pellet) => {
    const dx = pacMan.x - pellet.x;
    const dy = pacMan.y - pellet.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < pacMan.size + pellet.size) {
      score += 10;
      eatSound.play();
      document.getElementById('score').innerText = `Score: ${score}`;
      return false; // Remove the pellet
    }
    return true;
  });

  // Ghosts catching Pac-Man
  ghosts.forEach((ghost) => {
    const dx = pacMan.x - ghost.x;
    const dy = pacMan.y - ghost.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < pacMan.size + ghost.size) {
      gameOverSound.play();
      alert('Game Over!');
      document.location.reload();
    }
  });
}

// Handle key presses
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') pacMan.direction = 'RIGHT';
  if (e.key === 'ArrowLeft') pacMan.direction = 'LEFT';
  if (e.key === 'ArrowUp') pacMan.direction = 'UP';
  if (e.key === 'ArrowDown') pacMan.direction = 'DOWN';
});

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMaze();
  drawPacMan();
  drawPellets();
  drawGhosts();
  movePacMan();
  moveGhosts();
  checkCollisions();
  requestAnimationFrame(gameLoop);
}

gameLoop();
// Seleção de elementos
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotWindow = document.querySelector('.chatbot-window');
const chatInput = document.querySelector('#chat-input');
const sendBtn = document.querySelector('#send-btn');
const chatBody = document.querySelector('.chat-body');

// Abre e fecha o chatbot
chatbotToggle.addEventListener('click', () => {
  chatbotWindow.style.display =
    chatbotWindow.style.display === 'flex' ? 'none' : 'flex';
});

// Responde às mensagens
const botResponses = {
  "olá": "Olá! Tudo bem? Como posso te ajudar?",
  "quero informações": "Claro, sobre qual assunto você gostaria de saber mais?",
  "obrigado": "De nada! Estou aqui para ajudar.",
};

sendBtn.addEventListener('click', () => {
  const userMessage = chatInput.value.toLowerCase();
  if (!userMessage) return;

  // Adiciona a mensagem do usuário
  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'user-message';
  userMsgDiv.textContent = chatInput.value;
  chatBody.appendChild(userMsgDiv);

  // Resposta do bot
  const botMsgDiv = document.createElement('div');
  botMsgDiv.className = 'bot-message';
  botMsgDiv.textContent =
    botResponses[userMessage] || "Desculpe, não entendi sua mensagem.";
  chatBody.appendChild(botMsgDiv);

  // Limpa o input
  chatInput.value = '';

  // Rola para baixo automaticamente
  chatBody.scrollTop = chatBody.scrollHeight;
});
// Seleção de elementos
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotWindow = document.querySelector('.chatbot-window');
const chatInput = document.querySelector('#chat-input');
const sendBtn = document.querySelector('#send-btn');
const chatBody = document.querySelector('.chat-body');

// Função para abrir/fechar o chatbot
chatbotToggle.addEventListener('click', () => {
  if (chatbotWindow.style.display === 'flex') {
    chatbotWindow.style.display = 'none';
  } else {
    chatbotWindow.style.display = 'flex';
  }
});

// Função para adicionar mensagens ao chat
sendBtn.addEventListener('click', () => {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // Adiciona a mensagem do usuário
  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'user-message';
  userMsgDiv.textContent = userMessage;
  chatBody.appendChild(userMsgDiv);

  // Responde com base no input
  const botResponses = {
    olá: "Olá! Tudo bem? Como posso te ajudar?",
    "quero informações": "Claro, sobre qual assunto você gostaria de saber mais?",
    obrigado: "De nada! Estou aqui para ajudar.",
  };

  const botReply = botResponses[userMessage.toLowerCase()] || "Desculpe, não entendi sua mensagem.";
  const botMsgDiv = document.createElement('div');
  botMsgDiv.className = 'bot-message';
  botMsgDiv.textContent = botReply;
  chatBody.appendChild(botMsgDiv);

  // Limpa o campo de texto
  chatInput.value = '';
  chatBody.scrollTop = chatBody.scrollHeight; // Rola automaticamente para a última mensagem
});

// Carrossel funcionalidade
const carouselImages = document.querySelector('.carousel-images');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const images = document.querySelectorAll('.carousel-images img');
let currentIndex = 0;

// Função para atualizar a posição do carrossel
function updateCarousel() {
    const offset = -currentIndex * 100;
    carouselImages.style.transform = `translateX(${offset}%)`;
}

// Botão para retroceder
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
});

// Botão para avançar
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
});

// Rolagem suave para links da barra de navegação
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 50,
            behavior: 'smooth'
        });
    });
});

// Configurações de neve e chuva
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const particles = [];
const maxParticles = 200;

class Particle {
    constructor(type) {
        this.type = type;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * 2 + 1;
        this.color = this.type === 'snow' ? 'white' : '#00f';
    }

    update() {
        this.y += this.speedY;
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Gerar partículas de neve e chuva
for (let i = 0; i < maxParticles; i++) {
    const type = Math.random() > 0.5 ? 'snow' : 'rain';
    particles.push(new Particle(type));
}

// Animar as partículas
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

animate();

function showDetails(id) {
    // Hide all details first
    const allDetails = document.querySelectorAll('.details');
    allDetails.forEach(detail => detail.classList.add('hidden'));

    // Show the selected detail
    const selectedDetail = document.getElementById(id);
    if (selectedDetail) {
        selectedDetail.classList.remove('hidden');
    }
}
