let cards = [];
let flipped = [];
let matched = 0;
let moves = 0;
let time = 0;
let timer = null;
let gameStarted = false;

const emojis = ['🎮', '🎯', '🎲', '🎸', '🎨', '🚀', '💎', '🔥'];

function startGame() {
    clearInterval(timer);
    const size = parseInt(document.getElementById('difficulty').value);
    const grid = document.getElementById('grid');
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    const pairs = (size * size) / 2;
    cards = [];
    
    for (let i = 0; i < pairs; i++) {
        const emoji = emojis[i % emojis.length];
        cards.push({ id: i * 2, emoji, flipped: false, matched: false });
        cards.push({ id: i * 2 + 1, emoji, flipped: false, matched: false });
    }
    
    cards.sort(() => Math.random() - 0.5);
    
    flipped = [];
    matched = 0;
    moves = 0;
    time = 0;
    gameStarted = false;
    
    document.getElementById('moves').textContent = '0';
    document.getElementById('time').textContent = '0';
    
    renderGrid();
}

function renderGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    
    cards.forEach((card, index) => {
        const div = document.createElement('div');
        div.className = 'game-card' + (card.flipped ? ' flipped' : '') + (card.matched ? ' matched' : '');
        div.textContent = card.flipped || card.matched ? card.emoji : '?';
        div.onclick = () => flipCard(index);
        grid.appendChild(div);
    });
}

function flipCard(index) {
    if (cards[index].flipped || cards[index].matched || flipped.length >= 2) return;
    
    if (!gameStarted) {
        gameStarted = true;
        timer = setInterval(() => {
            time++;
            document.getElementById('time').textContent = time;
        }, 1000);
    }
    
    cards[index].flipped = true;
    flipped.push(index);
    renderGrid();
    
    if (flipped.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        
        const [i1, i2] = flipped;
        if (cards[i1].emoji === cards[i2].emoji) {
            cards[i1].matched = true;
            cards[i2].matched = true;
            matched += 2;
            flipped = [];
            renderGrid();
            
            if (matched === cards.length) {
                clearInterval(timer);
                setTimeout(() => {
                    alert(`恭喜完成！用时 ${time} 秒，${moves} 步`);
                }, 300);
            }
        } else {
            setTimeout(() => {
                cards[i1].flipped = false;
                cards[i2].flipped = false;
                flipped = [];
                renderGrid();
            }, 1000);
        }
    }
}

startGame();