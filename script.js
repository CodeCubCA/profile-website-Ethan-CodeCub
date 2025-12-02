// Add click functionality to programming language badges
document.addEventListener('DOMContentLoaded', function() {
    const languageBadges = document.querySelectorAll('.goal-badge');

    languageBadges.forEach(badge => {
        badge.style.cursor = 'pointer';
        badge.addEventListener('click', function() {
            // Remove active class from all badges
            languageBadges.forEach(b => b.classList.remove('active'));

            // Add active class to clicked badge
            this.classList.add('active');

            // Get the language name
            const language = this.textContent.trim();

            // Open the appropriate coding environment
            if (language.includes('Python')) {
                openPythonEnvironment();
            } else if (language.includes('HTML')) {
                openHTMLEnvironment();
            } else if (language.includes('JavaScript')) {
                openJavaScriptEnvironment();
            }
        });
    });

    // Add hover effects to game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            const gameTitle = this.querySelector('.game-title').textContent;

            // Launch specific games
            switch(gameTitle) {
                case 'Memory Game':
                    openMemoryGame();
                    break;
                case 'Plane Laser Shooter':
                    openPlaneLaserShooter();
                    break;
                case 'Math Challenge':
                    openMathChallenge();
                    break;
                case 'Animal Rescue':
                    openAnimalRescue();
                    break;
                case 'Ocean Explorer':
                    openOceanExplorer();
                    break;
                case 'Whack a Mole':
                    openJumpParkour();
                    break;
                case 'Block Breaker':
                    openBlockBreaker();
                    break;
                case 'Fix the Computer':
                    openFixComputer();
                    break;
                case 'Collect the Coins':
                    openCollectCoins();
                    break;
                case 'Ping Pong':
                    openPingPong();
                    break;
                default:
                    openSimpleGame(gameTitle);
            }
        });
    });

    // Load default examples for coding environments
    loadPythonExample('default');
    loadHTMLExample('default');
    loadJSExample('default');
});

// Coding Environment Functions
function openPythonEnvironment() {
    document.getElementById('pythonEnvironment').style.display = 'flex';
    // Auto-run the default code
    setTimeout(() => runPythonCode(), 500);
}

function openHTMLEnvironment() {
    document.getElementById('htmlEnvironment').style.display = 'flex';
    // Auto-update preview
    setTimeout(() => updateHTMLPreview(), 500);
}

function openJavaScriptEnvironment() {
    document.getElementById('jsEnvironment').style.display = 'flex';
}

function closeCodingEnvironment(environmentId) {
    document.getElementById(environmentId).style.display = 'none';
}

// Python Environment Functions
function runPythonCode() {
    const code = document.getElementById('pythonCodeEditor').value;
    const output = document.getElementById('pythonOutput');

    // Simple Python interpreter simulation
    try {
        let result = '';
        const lines = code.split('\n');

        for (let line of lines) {
            line = line.trim();
            if (line === '' || line.startsWith('#')) continue;

            // Handle print statements
            const printMatch = line.match(/print\((.+)\)/);
            if (printMatch) {
                let printContent = printMatch[1];
                // Handle f-strings
                if (printContent.startsWith('f"') && printContent.endsWith('"')) {
                    printContent = printContent.slice(2, -1);
                    // Simple f-string processing
                    printContent = printContent.replace(/\{([^}]+)\}/g, (match, expr) => {
                        if (expr.includes('+')) {
                            const parts = expr.split('+');
                            if (parts.length === 2 && parts[1].trim() === '1') {
                                return '{number}'; // placeholder for loop
                            }
                        }
                        return expr;
                    });
                }
                // Handle regular strings
                else if (printContent.startsWith('"') && printContent.endsWith('"')) {
                    printContent = printContent.slice(1, -1);
                }
                result += printContent + '\n';
            }

            // Handle simple for loops
            const forMatch = line.match(/for\s+(\w+)\s+in\s+range\((\d+)\):/);
            if (forMatch) {
                const variable = forMatch[1];
                const range = parseInt(forMatch[2]);
                // Look for the next line (print statement in loop)
                const nextLineIndex = lines.indexOf(line) + 1;
                if (nextLineIndex < lines.length) {
                    const nextLine = lines[nextLineIndex].trim();
                    const loopPrintMatch = nextLine.match(/print\((.+)\)/);
                    if (loopPrintMatch) {
                        let loopContent = loopPrintMatch[1];
                        for (let i = 0; i < range; i++) {
                            let output = loopContent;
                            if (output.startsWith('f"') && output.endsWith('"')) {
                                output = output.slice(2, -1);
                                output = output.replace(new RegExp(`\\{${variable}\\+1\\}`, 'g'), i + 1);
                                output = output.replace(new RegExp(`\\{${variable}\\}`, 'g'), i);
                            }
                            result += output + '\n';
                        }
                    }
                }
            }
        }

        if (result === '') {
            result = '✨ Code executed successfully! (No output to display)';
        }

        output.innerHTML = `<span style="color: #00ff00;">🎉 Python Output:</span>\n${result}`;
    } catch (error) {
        output.innerHTML = `<span style="color: #ff6b6b;">❌ Oops! There's an error:</span>\n${error.message}`;
    }
}

function loadPythonExample(type = 'default') {
    const editor = document.getElementById('pythonCodeEditor');
    const examples = {
        default: `# Welcome to Python Playground!
print("Hello, I'm Ethan!")
for i in range(5):
    print(f"I love coding! {i+1}")`,
        hello: `# Hello World Example
print("🌍 Hello, World!")
print("🎉 Welcome to Python!")
print("✨ Let's code something amazing!")`,
        math: `# Math Fun Example
print("🧮 Let's do some math!")
print(f"5 + 3 = {5 + 3}")
print(f"10 * 2 = {10 * 2}")
print(f"15 / 3 = {15 / 3}")
print("🎯 Math is awesome!")
for i in range(1, 6):
    print(f"{i} x 2 = {i * 2}")`,
        story: `# Story Generator
print("📖 Once upon a time...")
print("🏰 There was a young coder named Ethan")
print("💻 Who loved to write Python code")
for day in range(1, 4):
    print(f"Day {day}: Ethan coded amazing projects!")
print("🎉 And they all lived happily ever after!")
print("✨ The End!")
print("💫 What story will you create?")`
    };

    if (type === 'game') {
        editor.value = `# Simple Number Game
print("🎲 Welcome to the Number Game!")
print("🤔 I'm thinking of a number...")
secret_number = 7
guess = 5
print(f"Your guess: {guess}")
if guess == secret_number:
    print("🎉 Congratulations! You got it!")
else:
    print(f"🎯 The number was {secret_number}")
    print("Try again next time!")`;
    } else {
        editor.value = examples[type] || examples.default;
    }

    runPythonCode();
}

function clearPythonCode() {
    document.getElementById('pythonCodeEditor').value = '';
    clearPythonOutput();
}

function clearPythonOutput() {
    document.getElementById('pythonOutput').textContent = 'Click "Run Code" to see your Python magic! ✨';
}

// HTML Environment Functions
function updateHTMLPreview() {
    const code = document.getElementById('htmlCodeEditor').value;
    const preview = document.getElementById('htmlPreview');

    // Create a blob URL for the HTML content
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    preview.src = url;

    // Clean up the previous URL
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function loadHTMLExample(type = 'default') {
    const editor = document.getElementById('htmlCodeEditor');
    const examples = {
        default: `<!DOCTYPE html>
<html>
<head>
    <title>My Awesome Website</title>
</head>
<body>
    <h1 style="color: blue;">My Awesome Website</h1>
    <p style="color: purple;">I made this with HTML!</p>
    <button onclick="alert('Hello from Ethan!')">Click me!</button>
    <img src="https://via.placeholder.com/200x100/ff6b6b/white?text=My+Image" alt="Cool image">
</body>
</html>`,
        basic: `<!DOCTYPE html>
<html>
<head>
    <title>Ethan's First Website</title>
</head>
<body>
    <h1>Welcome to My Website! 🌟</h1>
    <h2>About Me</h2>
    <p>Hi! I'm Ethan and I love coding!</p>
    <h2>My Hobbies</h2>
    <ul>
        <li>Programming 💻</li>
        <li>Playing games 🎮</li>
        <li>Learning new things 📚</li>
    </ul>
</body>
</html>`,
        colorful: `<!DOCTYPE html>
<html>
<head>
    <title>Colorful Page</title>
    <style>
        body { background: linear-gradient(45deg, #ff6b6b, #4ecdc4); font-family: Arial; }
        h1 { color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
        .box { background: rgba(255,255,255,0.9); padding: 20px; margin: 10px; border-radius: 15px; }
    </style>
</head>
<body>
    <h1>🌈 Colorful HTML Page! 🌈</h1>
    <div class="box">
        <h2>This is so colorful! 🎨</h2>
        <p>HTML can make beautiful websites!</p>
    </div>
</body>
</html>`,
        interactive: `<!DOCTYPE html>
<html>
<head>
    <title>Interactive Fun</title>
</head>
<body>
    <h1>Interactive Elements! ⚡</h1>
    <button onclick="changeColor()">🎨 Change Background</button>
    <button onclick="showMessage()">💬 Show Message</button>
    <button onclick="playSound()">🔊 Beep!</button>

    <script>
        function changeColor() {
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.style.backgroundColor = randomColor;
        }
        function showMessage() {
            alert('🎉 Hello from your interactive website!');
        }
        function playSound() {
            alert('🔊 Beep! (Imagine a cool sound here!)');
        }
    </script>
</body>
</html>`
    };

    if (type === 'fun') {
        editor.value = `<!DOCTYPE html>
<html>
<head>
    <title>Fun Elements</title>
    <style>
        .rainbow { background: linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet);
                  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .bounce { animation: bounce 2s infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
    </style>
</head>
<body>
    <h1 class="rainbow">🎉 Super Fun HTML! 🎉</h1>
    <p class="bounce">This text is bouncing! 🏀</p>
    <marquee>🌟 This text is moving! 🌟</marquee>
    <details>
        <summary>🎁 Click to reveal a surprise!</summary>
        <p>🎊 Surprise! You're awesome at HTML! 🎊</p>
    </details>
</body>
</html>`;
    } else {
        editor.value = examples[type] || examples.default;
    }

    updateHTMLPreview();
}

function clearHTMLCode() {
    document.getElementById('htmlCodeEditor').value = '';
    document.getElementById('htmlPreview').src = 'about:blank';
}

// JavaScript Environment Functions
function runJavaScriptCode() {
    const code = document.getElementById('jsCodeEditor').value;
    const output = document.getElementById('jsOutput');

    // Clear previous output
    output.innerHTML = '';

    // Capture console.log output
    const originalLog = console.log;
    const logs = [];
    console.log = function(...args) {
        logs.push(args.join(' '));
    };

    // Capture alert calls
    const originalAlert = window.alert;
    const alerts = [];
    window.alert = function(message) {
        alerts.push(message);
    };

    try {
        // Execute the JavaScript code
        eval(code);

        let result = '';

        // Display alerts
        if (alerts.length > 0) {
            result += '<span style="color: #feca57;">🚨 Alerts:</span>\n';
            alerts.forEach(alert => {
                result += `💬 ${alert}\n`;
            });
            result += '\n';
        }

        // Display console logs
        if (logs.length > 0) {
            result += '<span style="color: #00cec9;">📝 Console Output:</span>\n';
            logs.forEach(log => {
                result += `${log}\n`;
            });
        } else if (alerts.length === 0) {
            result = '<span style="color: #00ff00;">✨ Code executed successfully! (No output to display)</span>';
        }

        output.innerHTML = result;
    } catch (error) {
        output.innerHTML = `<span style="color: #ff6b6b;">❌ Oops! There's an error:</span>\n${error.message}`;
    } finally {
        // Restore original functions
        console.log = originalLog;
        window.alert = originalAlert;
    }
}

function loadJSExample(type = 'default') {
    const editor = document.getElementById('jsCodeEditor');
    const examples = {
        default: `// Welcome to JavaScript Magic!
alert("Welcome to my JavaScript playground!");

for(let i = 1; i <= 5; i++) {
    console.log("JavaScript is awesome! " + i);
}

// Try changing the numbers or messages!`,
        hello: `// Hello World with JavaScript
alert("🌍 Hello, World!");
console.log("🎉 Welcome to JavaScript!");
console.log("✨ Let's create some magic!");

// Fun with variables
let myName = "Ethan";
console.log("👋 Hi, I'm " + myName + "!");
console.log("🎯 I love coding!");`,
        calculator: `// Simple Calculator
console.log("🧮 Welcome to the JavaScript Calculator!");

// Let's do some math!
let num1 = 10;
let num2 = 5;

console.log("Numbers: " + num1 + " and " + num2);
console.log("Addition: " + num1 + " + " + num2 + " = " + (num1 + num2));
console.log("Subtraction: " + num1 + " - " + num2 + " = " + (num1 - num2));
console.log("Multiplication: " + num1 + " × " + num2 + " = " + (num1 * num2));
console.log("Division: " + num1 + " ÷ " + num2 + " = " + (num1 / num2));

alert("🎉 Math is fun with JavaScript!");`,
        colors: `// Color Changer Magic
alert("🎨 Let's change some colors!");

// Array of fun colors
let colors = ["red", "blue", "green", "purple", "orange"];

console.log("🌈 Available colors:");
for(let i = 0; i < colors.length; i++) {
    console.log((i + 1) + ". " + colors[i]);
}

// Pick a random color
let randomIndex = Math.floor(Math.random() * colors.length);
let selectedColor = colors[randomIndex];

console.log("\n🎯 Random color selected: " + selectedColor);
alert("Your random color is: " + selectedColor + "!");`
    };

    if (type === 'animation') {
        editor.value = `// Fun Animation with JavaScript
alert("🎭 Let's create some animation magic!");

// Animated counting
console.log("🚀 Countdown starting...");
for(let i = 5; i >= 1; i--) {
    console.log("⏰ " + i + "...");
}
console.log("🎉 Blast off!");

// Fun with loops and patterns
console.log("\n✨ Creating a pattern:");
for(let i = 1; i <= 5; i++) {
    let stars = "";
    for(let j = 1; j <= i; j++) {
        stars += "⭐";
    }
    console.log(stars);
}

alert("🎊 Animation complete!");`;
    } else {
        editor.value = examples[type] || examples.default;
    }
}

function clearJavaScriptCode() {
    document.getElementById('jsCodeEditor').value = '';
    clearJavaScriptOutput();
}

function clearJavaScriptOutput() {
    document.getElementById('jsOutput').textContent = 'Click "Run Code" to see your JavaScript magic! ⚡';
}

// Memory Game Variables
let gameState = {
    cards: [],
    flippedCards: [],
    moves: 0,
    score: 0,
    pairsFound: 0,
    totalPairs: 8,
    isProcessing: false
};

// Fun emojis for the memory game
const gameEmojis = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
    '🍎', '🍌', '🍊', '🍓', '🍇', '🍑', '🍒', '🥝'
];

// Memory Game Functions
function openMemoryGame() {
    document.getElementById('memoryGameModal').style.display = 'flex';
    initializeGame();
}

function closeMemoryGame() {
    document.getElementById('memoryGameModal').style.display = 'none';
}

function initializeGame() {
    gameState = {
        cards: [],
        flippedCards: [],
        moves: 0,
        score: 0,
        pairsFound: 0,
        totalPairs: 8,
        isProcessing: false
    };

    updateStats();
    createGameBoard();
}

function createGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    // Select 8 random emojis and create pairs
    const selectedEmojis = gameEmojis.slice(0, 8);
    const cardPairs = [...selectedEmojis, ...selectedEmojis];

    // Shuffle the cards
    const shuffledCards = shuffleArray(cardPairs);

    // Create card elements
    shuffledCards.forEach((emoji, index) => {
        const card = createCard(emoji, index);
        gameBoard.appendChild(card);
        gameState.cards.push({
            id: index,
            emoji: emoji,
            isFlipped: false,
            isMatched: false,
            element: card
        });
    });
}

function createCard(emoji, index) {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.setAttribute('data-id', index);
    card.onclick = () => flipCard(index);

    const cardFront = document.createElement('div');
    cardFront.className = 'card-face card-front';
    cardFront.textContent = '?';

    const cardBack = document.createElement('div');
    cardBack.className = 'card-face card-back';
    cardBack.textContent = emoji;

    card.appendChild(cardFront);
    card.appendChild(cardBack);

    return card;
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function flipCard(cardId) {
    if (gameState.isProcessing ||
        gameState.cards[cardId].isFlipped ||
        gameState.cards[cardId].isMatched ||
        gameState.flippedCards.length >= 2) {
        return;
    }

    const card = gameState.cards[cardId];
    card.isFlipped = true;
    card.element.classList.add('flipped');
    gameState.flippedCards.push(card);

    if (gameState.flippedCards.length === 2) {
        gameState.moves++;
        updateStats();
        checkForMatch();
    }
}

function checkForMatch() {
    gameState.isProcessing = true;
    const [card1, card2] = gameState.flippedCards;

    setTimeout(() => {
        if (card1.emoji === card2.emoji) {
            // Match found!
            card1.isMatched = true;
            card2.isMatched = true;
            card1.element.classList.add('matched');
            card2.element.classList.add('matched');

            gameState.pairsFound++;
            gameState.score += 100;

            // Add bonus for fewer moves
            if (gameState.moves <= 10) gameState.score += 50;
            if (gameState.moves <= 15) gameState.score += 25;

            if (gameState.pairsFound === gameState.totalPairs) {
                setTimeout(() => showWinMessage(), 800);
            }
        } else {
            // No match - flip back
            card1.isFlipped = false;
            card2.isFlipped = false;
            card1.element.classList.remove('flipped');
            card2.element.classList.remove('flipped');
        }

        gameState.flippedCards = [];
        gameState.isProcessing = false;
        updateStats();
    }, 1000);
}

function updateStats() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('moves').textContent = gameState.moves;
}

function showWinMessage() {
    let performance = 'Amazing!';
    if (gameState.moves <= 12) performance = 'Perfect!';
    else if (gameState.moves <= 16) performance = 'Excellent!';
    else if (gameState.moves <= 20) performance = 'Great!';
    else if (gameState.moves <= 25) performance = 'Good job!';

    alert(`🎉 ${performance}\nFinal Score: ${gameState.score}\nCompleted in ${gameState.moves} moves!`);
}

function restartGame() {
    initializeGame();
}

// Game Functions
function openPlaneLaserShooter() {
    createGameModal('Plane Laser Shooter', `
        <div id="planeGame" style="width: 100%; height: 400px; background: linear-gradient(180deg, #87CEEB 0%, #4682B4 100%); position: relative; overflow: hidden; border-radius: 10px;">
            <div id="plane" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); width: 40px; height: 40px; font-size: 30px;">✈️</div>
            <div id="planeScore" style="position: absolute; top: 10px; left: 10px; color: white; font-weight: bold;">Score: 0</div>
            <div id="planeHealth" style="position: absolute; top: 10px; right: 10px; color: white; font-weight: bold;">Health: 100</div>
            <div style="color: white; text-align: center; margin-top: 20px;">Use WASD to move! Press SPACE to shoot lasers! Destroy enemy planes! 💥</div>
        </div>
    `, startPlaneGame);
}

function startPlaneGame() {
    let planeScore = 0;
    let planeHealth = 100;
    let gameRunning = true;
    const plane = document.getElementById('plane');
    const gameArea = document.getElementById('planeGame');
    const scoreDisplay = document.getElementById('planeScore');
    const healthDisplay = document.getElementById('planeHealth');

    // Wait for modal to render properly
    setTimeout(() => {
        if (!gameRunning) return;

        // Plane position
        let planeX = gameArea.offsetWidth / 2 - 20; // Center plane
        let planeY = gameArea.offsetHeight - 60; // Near bottom

        // Movement speed
        const moveSpeed = 8;
        const laserSpeed = 12;

        // Arrays to track game objects
        const lasers = [];
        const enemies = [];

        // Create enemy planes
        function createEnemy() {
            if (!gameRunning) return;

            const enemy = document.createElement('div');
            enemy.innerHTML = '🛩️';
            enemy.style.cssText = `
                position: absolute;
                top: -40px;
                left: ${Math.random() * (gameArea.offsetWidth - 40)}px;
                font-size: 30px;
                pointer-events: none;
            `;

            gameArea.appendChild(enemy);
            enemies.push({
                element: enemy,
                x: parseInt(enemy.style.left),
                y: -40,
                destroyed: false
            });

            // Animate enemy moving down
            let moveInterval = setInterval(() => {
                const enemyIndex = enemies.findIndex(e => e.element === enemy);
                if (enemyIndex === -1) {
                    clearInterval(moveInterval);
                    return;
                }

                enemies[enemyIndex].y += 3;
                enemy.style.top = enemies[enemyIndex].y + 'px';

                // Check if enemy hits player
                if (enemies[enemyIndex].y > planeY - 30 &&
                    enemies[enemyIndex].y < planeY + 40 &&
                    enemies[enemyIndex].x > planeX - 30 &&
                    enemies[enemyIndex].x < planeX + 40) {
                    // Player hit!
                    planeHealth -= 20;
                    healthDisplay.textContent = `Health: ${planeHealth}`;

                    // Remove enemy
                    enemy.remove();
                    enemies.splice(enemyIndex, 1);
                    clearInterval(moveInterval);

                    // Check game over
                    if (planeHealth <= 0) {
                        gameRunning = false;
                        alert(`💥 Game Over! Final Score: ${planeScore}`);
                    }
                }

                // Remove enemy if it goes off screen
                if (enemies[enemyIndex].y > gameArea.offsetHeight) {
                    enemy.remove();
                    enemies.splice(enemyIndex, 1);
                    clearInterval(moveInterval);
                }
            }, 50);
        }

        // Create laser
        function shootLaser() {
            if (!gameRunning) return;

            const laser = document.createElement('div');
            laser.innerHTML = '🔴';
            laser.style.cssText = `
                position: absolute;
                top: ${planeY - 10}px;
                left: ${planeX + 15}px;
                font-size: 15px;
                pointer-events: none;
            `;

            gameArea.appendChild(laser);
            lasers.push({
                element: laser,
                x: planeX + 15,
                y: planeY - 10
            });

            // Animate laser moving up
            let laserInterval = setInterval(() => {
                const laserIndex = lasers.findIndex(l => l.element === laser);
                if (laserIndex === -1) {
                    clearInterval(laserInterval);
                    return;
                }

                lasers[laserIndex].y -= laserSpeed;
                laser.style.top = lasers[laserIndex].y + 'px';

                // Check collision with enemies
                for (let i = enemies.length - 1; i >= 0; i--) {
                    const enemy = enemies[i];
                    if (!enemy.destroyed &&
                        lasers[laserIndex].y < enemy.y + 30 &&
                        lasers[laserIndex].y > enemy.y - 10 &&
                        lasers[laserIndex].x > enemy.x - 10 &&
                        lasers[laserIndex].x < enemy.x + 40) {
                        // Hit!
                        planeScore += 50;
                        scoreDisplay.textContent = `Score: ${planeScore}`;

                        // Remove enemy and laser
                        enemy.element.remove();
                        enemies.splice(i, 1);
                        laser.remove();
                        lasers.splice(laserIndex, 1);
                        clearInterval(laserInterval);

                        // Visual explosion
                        const explosion = document.createElement('div');
                        explosion.innerHTML = '💥';
                        explosion.style.cssText = `
                            position: absolute;
                            top: ${enemy.y}px;
                            left: ${enemy.x}px;
                            font-size: 25px;
                            pointer-events: none;
                        `;
                        gameArea.appendChild(explosion);
                        setTimeout(() => explosion.remove(), 500);
                        return;
                    }
                }

                // Remove laser if it goes off screen
                if (lasers[laserIndex].y < -20) {
                    laser.remove();
                    lasers.splice(laserIndex, 1);
                    clearInterval(laserInterval);
                }
            }, 30);
        }

        // Create enemies every 2 seconds
        const enemyInterval = setInterval(createEnemy, 2000);

        // WASD movement and shooting
        const keys = {};

        function handleKeyDown(e) {
            const key = e.key.toLowerCase();
            keys[key] = true;

            // Shoot laser with spacebar
            if (e.code === 'Space') {
                e.preventDefault();
                shootLaser();
            }
        }

        function handleKeyUp(e) {
            keys[e.key.toLowerCase()] = false;
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        // Movement loop
        function updatePlanePosition() {
            if (!gameRunning) return;

            // Move left/right with A/D
            if (keys['a'] && planeX > 0) {
                planeX -= moveSpeed;
            }
            if (keys['d'] && planeX < gameArea.offsetWidth - 40) {
                planeX += moveSpeed;
            }

            // Move up/down with W/S
            if (keys['w'] && planeY > 0) {
                planeY -= moveSpeed;
            }
            if (keys['s'] && planeY < gameArea.offsetHeight - 40) {
                planeY += moveSpeed;
            }

            // Update plane position
            plane.style.left = planeX + 'px';
            plane.style.top = planeY + 'px';

            requestAnimationFrame(updatePlanePosition);
        }

        updatePlanePosition();

        // Stop game when modal is closed
        setTimeout(() => {
            if (gameRunning && planeHealth > 0) {
                gameRunning = false;
                alert(`✈️ Mission Complete! Final Score: ${planeScore}`);
            }
            clearInterval(enemyInterval);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }, 45000); // Game runs for 45 seconds

    }, 100); // Wait 100ms for modal to render
}

function openMathChallenge() {
    createGameModal('Math Challenge', `
        <div id="mathGame" style="text-align: center;">
            <h3 id="mathQuestion" style="font-size: 2rem; margin: 20px 0;">2 + 3 = ?</h3>
            <input type="number" id="mathAnswer" style="font-size: 1.5rem; padding: 10px; border-radius: 10px; border: 2px solid #667eea; text-align: center;" placeholder="Your answer">
            <button onclick="checkMathAnswer()" style="font-size: 1.2rem; padding: 10px 20px; margin-left: 10px; background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; border-radius: 10px; cursor: pointer;">Submit</button>
            <div id="mathScore" style="margin-top: 20px; font-size: 1.2rem; font-weight: bold;">Score: 0</div>
            <div id="mathFeedback" style="margin-top: 10px; font-size: 1.1rem;"></div>
        </div>
    `, startMathGame);
}

function openAnimalRescue() {
    createGameModal('Animal Rescue', `
        <div id="animalGame" style="width: 100%; height: 400px; background: linear-gradient(180deg, #87CEEB 0%, #98FB98 100%); position: relative; overflow: hidden; border-radius: 10px;">
            <div id="basket" style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); width: 60px; height: 40px; font-size: 35px;">🧺</div>
            <div id="animalScore" style="position: absolute; top: 10px; left: 10px; font-weight: bold;">Animals Saved: 0</div>
            <div style="text-align: center; margin-top: 20px;">Use A/D keys to move the basket! Save the falling animals! 🐾</div>
        </div>
    `, startAnimalGame);
}

function startAnimalGame() {
    let animalScore = 0;
    let gameRunning = true;
    const basket = document.getElementById('basket');
    const gameArea = document.getElementById('animalGame');
    const scoreDisplay = document.getElementById('animalScore');
    const animals = ['🐶', '🐱', '🐰', '🐹', '🐨', '🐼', '🦊', '🐸'];

    // Basket position
    let basketX = gameArea.offsetWidth / 2 - 30;
    const basketY = gameArea.offsetHeight - 50;

    // Movement speed
    const moveSpeed = 10;

    // Create falling animals
    function createAnimal() {
        if (!gameRunning) return;

        const animal = document.createElement('div');
        animal.innerHTML = animals[Math.floor(Math.random() * animals.length)];
        animal.style.cssText = `
            position: absolute;
            top: -30px;
            left: ${Math.random() * (gameArea.offsetWidth - 30)}px;
            font-size: 25px;
            pointer-events: none;
        `;

        gameArea.appendChild(animal);

        // Animate animal falling
        let fallInterval = setInterval(() => {
            const animalTop = parseInt(animal.style.top) || -30;
            if (animalTop > gameArea.offsetHeight) {
                animal.remove();
                clearInterval(fallInterval);
            } else {
                animal.style.top = (animalTop + 4) + 'px';

                // Check collision with basket
                const animalRect = animal.getBoundingClientRect();
                const gameRect = gameArea.getBoundingClientRect();
                const animalX = animalRect.left - gameRect.left;
                const animalY = animalRect.top - gameRect.top;

                if (animalX < basketX + 60 &&
                    animalX + 30 > basketX &&
                    animalY < basketY + 40 &&
                    animalY + 30 > basketY) {
                    // Animal caught!
                    animalScore++;
                    scoreDisplay.textContent = `Animals Saved: ${animalScore}`;
                    animal.remove();
                    clearInterval(fallInterval);

                    // Visual feedback
                    basket.style.transform = 'translateX(-50%) scale(1.2)';
                    setTimeout(() => {
                        basket.style.transform = 'translateX(-50%) scale(1)';
                    }, 200);
                }
            }
        }, 50);
    }

    // Create animals every 2 seconds
    const animalInterval = setInterval(createAnimal, 2000);

    // Keyboard movement
    const keys = {};

    function handleKeyDown(e) {
        keys[e.key.toLowerCase()] = true;
    }

    function handleKeyUp(e) {
        keys[e.key.toLowerCase()] = false;
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Movement loop
    function updateBasketPosition() {
        if (!gameRunning) return;

        // Move left/right with A/D
        if (keys['a'] && basketX > 0) {
            basketX -= moveSpeed;
        }
        if (keys['d'] && basketX < gameArea.offsetWidth - 60) {
            basketX += moveSpeed;
        }

        // Update basket position
        basket.style.left = basketX + 'px';

        requestAnimationFrame(updateBasketPosition);
    }

    updateBasketPosition();

    // Stop game when modal is closed
    setTimeout(() => {
        gameRunning = false;
        clearInterval(animalInterval);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
    }, 30000); // Game runs for 30 seconds
}

function openOceanExplorer() {
    createGameModal('Ocean Explorer', `
        <div id="oceanGame" style="width: 100%; height: 400px; background: linear-gradient(180deg, #87CEEB 0%, #006994 100%); position: relative; overflow: hidden; border-radius: 10px;">
            <div id="diver" style="position: absolute; top: 50%; left: 50px; transform: translateY(-50%); width: 40px; height: 40px; font-size: 30px;">🤿</div>
            <div id="oceanScore" style="position: absolute; top: 10px; left: 10px; color: white; font-weight: bold;">Treasures: 0</div>
            <div style="color: white; text-align: center; margin-top: 20px;">Use WASD keys to swim! Collect the treasures! 💎</div>
        </div>
    `, startOceanGame);
}

function startOceanGame() {
    let oceanScore = 0;
    let gameRunning = true;
    const diver = document.getElementById('diver');
    const gameArea = document.getElementById('oceanGame');
    const scoreDisplay = document.getElementById('oceanScore');
    const treasures = ['💎', '👑', '💰', '🏆', '⭐', '🔮', '💍', '🎭'];

    // Diver position
    let diverX = 50;
    let diverY = gameArea.offsetHeight / 2 - 20;

    // Movement speed
    const moveSpeed = 8;

    // Create treasures to collect
    function createTreasure() {
        if (!gameRunning) return;

        const treasure = document.createElement('div');
        treasure.innerHTML = treasures[Math.floor(Math.random() * treasures.length)];
        treasure.style.cssText = `
            position: absolute;
            top: ${Math.random() * (gameArea.offsetHeight - 50)}px;
            left: ${gameArea.offsetWidth}px;
            font-size: 25px;
            pointer-events: none;
        `;

        gameArea.appendChild(treasure);

        // Animate treasure moving left
        let moveInterval = setInterval(() => {
            const treasureLeft = parseInt(treasure.style.left) || gameArea.offsetWidth;
            if (treasureLeft < -30) {
                treasure.remove();
                clearInterval(moveInterval);
            } else {
                treasure.style.left = (treasureLeft - 3) + 'px';

                // Check collision with diver
                const treasureRect = treasure.getBoundingClientRect();
                const gameRect = gameArea.getBoundingClientRect();
                const treasureX = treasureRect.left - gameRect.left;
                const treasureY = treasureRect.top - gameRect.top;

                if (treasureX < diverX + 40 &&
                    treasureX + 30 > diverX &&
                    treasureY < diverY + 40 &&
                    treasureY + 30 > diverY) {
                    // Treasure collected!
                    oceanScore++;
                    scoreDisplay.textContent = `Treasures: ${oceanScore}`;
                    treasure.remove();
                    clearInterval(moveInterval);

                    // Visual feedback
                    diver.style.transform = 'scale(1.3)';
                    setTimeout(() => {
                        diver.style.transform = 'scale(1)';
                    }, 200);
                }
            }
        }, 50);
    }

    // Create treasures every 2.5 seconds
    const treasureInterval = setInterval(createTreasure, 2500);

    // WASD movement
    const keys = {};

    function handleKeyDown(e) {
        keys[e.key.toLowerCase()] = true;
    }

    function handleKeyUp(e) {
        keys[e.key.toLowerCase()] = false;
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Movement loop
    function updateDiverPosition() {
        if (!gameRunning) return;

        // Move left/right with A/D
        if (keys['a'] && diverX > 0) {
            diverX -= moveSpeed;
        }
        if (keys['d'] && diverX < gameArea.offsetWidth - 40) {
            diverX += moveSpeed;
        }

        // Move up/down with W/S
        if (keys['w'] && diverY > 0) {
            diverY -= moveSpeed;
        }
        if (keys['s'] && diverY < gameArea.offsetHeight - 40) {
            diverY += moveSpeed;
        }

        // Update diver position
        diver.style.left = diverX + 'px';
        diver.style.top = diverY + 'px';

        requestAnimationFrame(updateDiverPosition);
    }

    updateDiverPosition();

    // Stop game when modal is closed
    setTimeout(() => {
        gameRunning = false;
        clearInterval(treasureInterval);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
    }, 30000); // Game runs for 30 seconds
}

// Enhanced simple games with unique gameplay
function openJumpParkour() {
    createGameModal('Whack a Mole', `
        <div style="text-align: center; padding: 20px;">
            <h2>🔨 Whack a Mole</h2>
            <p>Click the moles when they pop up! Get as many as you can!</p>
            <div id="moleArea" style="width: 400px; height: 300px; position: relative; border: 3px solid #8b4513; border-radius: 15px; background: #2ecc71; overflow: hidden; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr); gap: 10px; padding: 20px;">
                <div class="mole-hole" data-hole="0" style="background: #654321; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative;"></div>
                <div class="mole-hole" data-hole="1" style="background: #654321; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative;"></div>
                <div class="mole-hole" data-hole="2" style="background: #654321; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative;"></div>
                <div class="mole-hole" data-hole="3" style="background: #654321; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative;"></div>
                <div class="mole-hole" data-hole="4" style="background: #654321; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative;"></div>
                <div class="mole-hole" data-hole="5" style="background: #654321; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative;"></div>
                <div class="mole-hole" data-hole="6" style="background: #654321; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative;"></div>
                <div class="mole-hole" data-hole="7" style="background: #654321; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative;"></div>
                <div class="mole-hole" data-hole="8" style="background: #654321; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative;"></div>
            </div>
            <div style="margin-top: 15px; display: flex; justify-content: space-between; max-width: 400px; margin-left: auto; margin-right: auto;">
                <div id="moleScore" style="color: #2c3e50; font-weight: bold; font-size: 18px;">Score: 0</div>
                <div id="moleTimer" style="color: #2c3e50; font-weight: bold; font-size: 18px;">Time: 30s</div>
            </div>
        </div>
    `, startMoleGame);
}

function startMoleGame() {
    let score = 0;
    let timeLeft = 30;
    let gameRunning = true;
    const scoreDisplay = document.getElementById('moleScore');
    const timerDisplay = document.getElementById('moleTimer');
    const holes = document.querySelectorAll('.mole-hole');

    // Mole types for variety
    const moleTypes = ['🐹', '🐭', '🦔', '🐰'];
    let currentMoles = [];

    // Timer countdown
    const gameTimer = setInterval(() => {
        if (!gameRunning) {
            clearInterval(gameTimer);
            return;
        }

        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;

        if (timeLeft <= 0) {
            gameRunning = false;
            alert(`🔨 Game Over! You whacked ${score} moles!`);
            clearInterval(gameTimer);
            clearInterval(moleSpawner);
        }
    }, 1000);

    // Show mole in random hole
    function showMole() {
        if (!gameRunning) return;

        // Hide any existing moles
        currentMoles.forEach(mole => {
            if (mole.element.parentNode) {
                mole.element.remove();
            }
        });
        currentMoles = [];

        // Show 1-2 random moles
        const numMoles = Math.random() < 0.7 ? 1 : 2;
        const usedHoles = [];

        for (let i = 0; i < numMoles; i++) {
            let randomHole;
            do {
                randomHole = Math.floor(Math.random() * holes.length);
            } while (usedHoles.includes(randomHole));

            usedHoles.push(randomHole);
            const hole = holes[randomHole];

            // Create mole element
            const mole = document.createElement('div');
            const moleType = moleTypes[Math.floor(Math.random() * moleTypes.length)];
            mole.innerHTML = moleType;
            mole.style.cssText = `
                font-size: 40px;
                cursor: pointer;
                animation: molePopUp 0.3s ease-out;
                user-select: none;
            `;

            // Add click handler
            mole.addEventListener('click', () => {
                if (gameRunning) {
                    score++;
                    scoreDisplay.textContent = `Score: ${score}`;

                    // Visual feedback
                    mole.style.transform = 'scale(1.5)';
                    mole.innerHTML = '💥';
                    setTimeout(() => {
                        if (mole.parentNode) {
                            mole.remove();
                        }
                    }, 200);

                    // Remove from current moles array
                    const index = currentMoles.findIndex(m => m.element === mole);
                    if (index > -1) {
                        currentMoles.splice(index, 1);
                    }
                }
            });

            hole.appendChild(mole);
            currentMoles.push({ element: mole, hole: randomHole });
        }

        // Hide moles after random time if not clicked
        setTimeout(() => {
            currentMoles.forEach(mole => {
                if (mole.element.parentNode && mole.element.innerHTML !== '💥') {
                    mole.element.style.animation = 'molePopDown 0.3s ease-in';
                    setTimeout(() => {
                        if (mole.element.parentNode) {
                            mole.element.remove();
                        }
                    }, 300);
                }
            });
        }, 3500 + Math.random() * 3500); // Stay visible for 2.5-5 seconds
    }

    // Start spawning moles
    showMole(); // Show first mole immediately
    const moleSpawner = setInterval(() => {
        if (gameRunning) {
            showMole();
        }
    }, 800 + Math.random() * 1200); // Spawn every 0.8-2 seconds
}

function openBlockBreaker() {
    createGameModal('Block Breaker', `
        <div style="text-align: center; padding: 20px;">
            <h2>🧱 Block Breaker</h2>
            <p>Use mouse or A/D keys to move paddle! Bounce the ball to break blocks!</p>
            <div id="blockArea" style="width: 500px; height: 400px; position: relative; border: 3px solid #2c3e50; border-radius: 10px; background: #34495e; overflow: hidden; margin: 0 auto;">
                <div id="paddle" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); width: 80px; height: 10px; background: #3498db; border-radius: 5px;"></div>
                <div id="ball" style="position: absolute; bottom: 35px; left: 50%; transform: translateX(-50%); width: 12px; height: 12px; background: #e74c3c; border-radius: 50%;"></div>
                <div id="blockScore" style="position: absolute; top: 10px; left: 10px; color: white; font-weight: bold; z-index: 100;">Score: 0</div>
                <div id="blockLives" style="position: absolute; top: 10px; right: 10px; color: white; font-weight: bold; z-index: 100;">Lives: 3</div>
            </div>
        </div>
    `, startBlockGame);
}

function startBlockGame() {
    let score = 0;
    let lives = 3;
    let gameRunning = true;
    const gameArea = document.getElementById('blockArea');
    const paddle = document.getElementById('paddle');
    const ball = document.getElementById('ball');
    const scoreDisplay = document.getElementById('blockScore');
    const livesDisplay = document.getElementById('blockLives');

    // Game dimensions
    const gameWidth = 500;
    const gameHeight = 400;

    // Paddle properties
    let paddleX = gameWidth / 2 - 40; // Center paddle
    const paddleWidth = 80;
    const paddleHeight = 10;
    const paddleSpeed = 8;

    // Ball properties
    let ballX = gameWidth / 2 - 6;
    let ballY = gameHeight - 50;
    let ballSpeedX = 3;
    let ballSpeedY = -3;
    const ballSize = 12;

    // Blocks array
    const blocks = [];
    const blockWidth = 60;
    const blockHeight = 20;
    const blockRows = 5;
    const blockCols = 7;
    const blockColors = ['#e74c3c', '#f39c12', '#f1c40f', '#2ecc71', '#3498db'];

    // Create blocks
    function createBlocks() {
        for (let row = 0; row < blockRows; row++) {
            for (let col = 0; col < blockCols; col++) {
                const block = document.createElement('div');
                const x = col * (blockWidth + 5) + 25;
                const y = row * (blockHeight + 5) + 50;

                block.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${blockWidth}px;
                    height: ${blockHeight}px;
                    background: ${blockColors[row % blockColors.length]};
                    border-radius: 3px;
                    border: 1px solid rgba(255,255,255,0.3);
                `;

                gameArea.appendChild(block);
                blocks.push({
                    element: block,
                    x: x,
                    y: y,
                    width: blockWidth,
                    height: blockHeight,
                    destroyed: false
                });
            }
        }
    }

    // Initialize blocks
    createBlocks();

    // Keyboard controls
    const keys = {};

    function handleKeyDown(e) {
        keys[e.key.toLowerCase()] = true;
    }

    function handleKeyUp(e) {
        keys[e.key.toLowerCase()] = false;
    }

    // Mouse controls
    function handleMouseMove(e) {
        const rect = gameArea.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        paddleX = Math.max(0, Math.min(gameWidth - paddleWidth, mouseX - paddleWidth / 2));
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    gameArea.addEventListener('mousemove', handleMouseMove);

    // Game loop
    function gameLoop() {
        if (!gameRunning) return;

        // Move paddle with A/D keys
        if (keys['a'] && paddleX > 0) {
            paddleX -= paddleSpeed;
        }
        if (keys['d'] && paddleX < gameWidth - paddleWidth) {
            paddleX += paddleSpeed;
        }

        // Update paddle position
        paddle.style.left = paddleX + 'px';

        // Move ball
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Ball collision with walls
        if (ballX <= 0 || ballX >= gameWidth - ballSize) {
            ballSpeedX = -ballSpeedX;
        }
        if (ballY <= 0) {
            ballSpeedY = -ballSpeedY;
        }

        // Ball collision with paddle
        if (ballY >= gameHeight - 30 - ballSize &&
            ballY <= gameHeight - 20 &&
            ballX >= paddleX - ballSize &&
            ballX <= paddleX + paddleWidth) {

            ballSpeedY = -ballSpeedY;

            // Add some angle based on where ball hits paddle
            const hitPos = (ballX - paddleX) / paddleWidth - 0.5;
            ballSpeedX += hitPos * 2;

            // Limit ball speed
            ballSpeedX = Math.max(-6, Math.min(6, ballSpeedX));
        }

        // Ball collision with blocks
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            if (block.destroyed) continue;

            if (ballX < block.x + block.width &&
                ballX + ballSize > block.x &&
                ballY < block.y + block.height &&
                ballY + ballSize > block.y) {

                // Block hit!
                block.destroyed = true;
                block.element.remove();
                ballSpeedY = -ballSpeedY;
                score += 10;
                scoreDisplay.textContent = `Score: ${score}`;

                // Check win condition
                if (blocks.every(b => b.destroyed)) {
                    gameRunning = false;
                    alert(`🎉 You Win! Final Score: ${score}`);
                    return;
                }
                break;
            }
        }

        // Ball falls below paddle (lose life)
        if (ballY >= gameHeight) {
            lives--;
            livesDisplay.textContent = `Lives: ${lives}`;

            if (lives <= 0) {
                gameRunning = false;
                alert(`💥 Game Over! Final Score: ${score}`);
                return;
            }

            // Reset ball position
            ballX = gameWidth / 2 - 6;
            ballY = gameHeight - 50;
            ballSpeedX = 3;
            ballSpeedY = -3;
        }

        // Update ball position
        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';

        requestAnimationFrame(gameLoop);
    }

    // Start game
    gameLoop();

    // Cleanup
    setTimeout(() => {
        gameRunning = false;
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
        gameArea.removeEventListener('mousemove', handleMouseMove);
    }, 120000); // 2 minute max game time
}

function openFixComputer() {
    createGameModal('Fix the Computer', `
        <div id="computerGame" style="width: 100%; height: 400px; background: linear-gradient(180deg, #1e3c72 0%, #2a5298 100%); position: relative; overflow: hidden; border-radius: 10px;">
            <div id="computerScreen" style="width: 80%; height: 300px; background: #000; margin: 20px auto; border-radius: 10px; position: relative; border: 3px solid #333;">
                <div id="computerScore" style="position: absolute; top: 10px; left: 10px; color: #00ff00; font-weight: bold;">Fixes: 0</div>
                <div id="computerTimer" style="position: absolute; top: 10px; right: 10px; color: #00ff00; font-weight: bold;">Time: 60s</div>
                <div id="taskDisplay" style="color: #00ff00; text-align: center; margin-top: 40px; font-family: monospace; padding: 20px;">
                    <div>🖥️ COMPUTER REPAIR SYSTEM</div>
                    <div style="margin-top: 20px; color: #ffff00;">CLICK ON ERRORS TO FIX THEM!</div>
                </div>
            </div>
        </div>
    `, startComputerGame);
}

function startComputerGame() {
    let computerScore = 0;
    let timeLeft = 60;
    let gameRunning = true;
    const gameArea = document.getElementById('computerScreen');
    const scoreDisplay = document.getElementById('computerScore');
    const timerDisplay = document.getElementById('computerTimer');
    const taskDisplay = document.getElementById('taskDisplay');

    const errorTypes = [
        { icon: '❌', name: 'System Error', points: 10 },
        { icon: '⚠️', name: 'Warning', points: 5 },
        { icon: '🔥', name: 'Critical Bug', points: 20 },
        { icon: '🐛', name: 'Software Bug', points: 15 },
        { icon: '⛔', name: 'Access Denied', points: 12 },
        { icon: '💀', name: 'Fatal Error', points: 25 },
        { icon: '🚫', name: 'Connection Failed', points: 8 }
    ];

    const computerTasks = [
        'Installing security updates...',
        'Scanning for viruses...',
        'Cleaning temporary files...',
        'Updating drivers...',
        'Optimizing system performance...',
        'Fixing registry errors...',
        'Backing up important files...',
        'Running diagnostic tests...'
    ];

    let currentTaskIndex = 0;

    // Update timer
    const timerInterval = setInterval(() => {
        if (!gameRunning) {
            clearInterval(timerInterval);
            return;
        }

        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;

        if (timeLeft <= 0) {
            gameRunning = false;
            alert(`💻 Time's up! You fixed ${computerScore} errors! Great job!`);
            clearInterval(timerInterval);
        }
    }, 1000);

    // Update task display
    const taskInterval = setInterval(() => {
        if (!gameRunning) {
            clearInterval(taskInterval);
            return;
        }

        currentTaskIndex = (currentTaskIndex + 1) % computerTasks.length;
        taskDisplay.innerHTML = `
            <div>🖥️ COMPUTER REPAIR SYSTEM</div>
            <div style="margin-top: 20px; color: #ffff00;">CLICK ON ERRORS TO FIX THEM!</div>
            <div style="margin-top: 15px; color: #00ffff; font-size: 14px;">${computerTasks[currentTaskIndex]}</div>
        `;
    }, 3000);

    // Create computer errors
    function createError() {
        if (!gameRunning) return;

        const errorType = errorTypes[Math.floor(Math.random() * errorTypes.length)];
        const error = document.createElement('div');
        error.innerHTML = errorType.icon;
        error.title = errorType.name;

        error.style.cssText = `
            position: absolute;
            top: ${Math.random() * 200 + 50}px;
            left: ${Math.random() * (gameArea.offsetWidth - 100) + 50}px;
            font-size: 25px;
            cursor: pointer;
            animation: pulse 1s infinite;
            z-index: 100;
        `;

        error.addEventListener('click', () => {
            computerScore += errorType.points;
            scoreDisplay.textContent = `Fixes: ${computerScore}`;

            // Create fix animation
            const fixAnimation = document.createElement('div');
            fixAnimation.innerHTML = '✅';
            fixAnimation.style.cssText = `
                position: absolute;
                top: ${error.style.top};
                left: ${error.style.left};
                font-size: 20px;
                color: #00ff00;
                pointer-events: none;
                animation: fixPulse 0.5s ease-out;
            `;

            gameArea.appendChild(fixAnimation);
            setTimeout(() => fixAnimation.remove(), 500);

            // Remove error
            error.remove();

            // Add bonus message
            const bonus = document.createElement('div');
            bonus.innerHTML = `+${errorType.points}`;
            bonus.style.cssText = `
                position: absolute;
                top: ${parseInt(error.style.top) - 20}px;
                left: ${error.style.left};
                color: #ffff00;
                font-weight: bold;
                pointer-events: none;
                animation: scoreFloat 1s ease-out;
            `;
            gameArea.appendChild(bonus);
            setTimeout(() => bonus.remove(), 1000);
        });

        gameArea.appendChild(error);

        // Auto-remove error after 5 seconds if not clicked
        setTimeout(() => {
            if (error.parentNode) {
                error.remove();
            }
        }, 5000);
    }

    // Create errors every 1.5 seconds
    const errorInterval = setInterval(createError, 1500);

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        @keyframes fixPulse {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes scoreFloat {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(-30px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Stop game after 60 seconds
    setTimeout(() => {
        if (gameRunning) {
            gameRunning = false;
            alert(`💻 Computer fixed! You resolved ${computerScore} errors! Excellent work!`);
        }
        clearInterval(errorInterval);
        clearInterval(timerInterval);
        clearInterval(taskInterval);
        style.remove();
    }, 60000);
}

function openCollectCoins() {
    createGameModal('Collect the Coins', `
        <div style="text-align: center; padding: 20px;">
            <h2>🪙 Collect the Coins</h2>
            <p>Use WASD keys to move and collect coins!</p>
            <div id="coinArea" style="width: 100%; height: 350px; position: relative; border: 2px solid #f39c12; border-radius: 10px; background: linear-gradient(45deg, #f1c40f, #f39c12); overflow: hidden;">
                <div id="player" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); width: 30px; height: 30px; font-size: 25px;">🏃‍♂️</div>
                <div id="coinScore" style="position: absolute; top: 10px; left: 10px; color: white; font-weight: bold;">Coins: 0</div>
                <div id="coinTimer" style="position: absolute; top: 10px; right: 10px; color: white; font-weight: bold;">Time: 30s</div>
            </div>
        </div>
    `, startCoinGame);
}

function startCoinGame() {
    let coinScore = 0;
    let timeLeft = 30;
    let gameRunning = true;
    const gameArea = document.getElementById('coinArea');
    const player = document.getElementById('player');
    const scoreDisplay = document.getElementById('coinScore');
    const timerDisplay = document.getElementById('coinTimer');
    const coinTypes = ['🪙', '💰', '🏆', '💎', '⭐'];
    const coins = [];

    // Player position
    let playerX = gameArea.offsetWidth / 2 - 15;
    let playerY = gameArea.offsetHeight - 50;
    const playerSpeed = 8;

    // Update player position
    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';

    // Timer countdown
    const timerInterval = setInterval(() => {
        if (!gameRunning) {
            clearInterval(timerInterval);
            return;
        }

        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;

        if (timeLeft <= 0) {
            gameRunning = false;
            alert(`🪙 Time's up! You collected ${coinScore} coins!`);
            clearInterval(timerInterval);
        }
    }, 1000);

    // Spawn coins randomly
    function spawnCoin() {
        if (!gameRunning) return;

        const coin = document.createElement('div');
        coin.innerHTML = coinTypes[Math.floor(Math.random() * coinTypes.length)];
        coin.style.cssText = `
            position: absolute;
            font-size: 30px;
            pointer-events: none;
            top: ${Math.random() * (gameArea.offsetHeight - 80)}px;
            left: ${Math.random() * (gameArea.offsetWidth - 40)}px;
            animation: glow 1s infinite alternate;
            z-index: 1;
        `;

        gameArea.appendChild(coin);
        coins.push({
            element: coin,
            x: parseInt(coin.style.left),
            y: parseInt(coin.style.top)
        });

        // Remove coin after 5 seconds if not collected
        setTimeout(() => {
            if (coin.parentNode) {
                coin.remove();
                const index = coins.findIndex(c => c.element === coin);
                if (index > -1) coins.splice(index, 1);
            }
        }, 5000);
    }

    // Spawn coins every 1.5 seconds
    const coinInterval = setInterval(() => {
        if (gameRunning) spawnCoin();
    }, 1500);

    // Initial coins
    spawnCoin();

    // WASD movement controls
    const keys = {};

    function handleKeyDown(e) {
        const key = e.key.toLowerCase();
        keys[key] = true;
    }

    function handleKeyUp(e) {
        keys[e.key.toLowerCase()] = false;
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Movement and collision detection loop
    function gameLoop() {
        if (!gameRunning) return;

        // Move player based on WASD keys
        if (keys['w'] && playerY > 0) {
            playerY -= playerSpeed;
        }
        if (keys['s'] && playerY < gameArea.offsetHeight - 30) {
            playerY += playerSpeed;
        }
        if (keys['a'] && playerX > 0) {
            playerX -= playerSpeed;
        }
        if (keys['d'] && playerX < gameArea.offsetWidth - 30) {
            playerX += playerSpeed;
        }

        // Update player position
        player.style.left = playerX + 'px';
        player.style.top = playerY + 'px';

        // Check collision with coins
        for (let i = coins.length - 1; i >= 0; i--) {
            const coin = coins[i];
            const coinX = coin.x;
            const coinY = coin.y;

            // Simple collision detection
            if (playerX < coinX + 30 &&
                playerX + 30 > coinX &&
                playerY < coinY + 30 &&
                playerY + 30 > coinY) {

                // Coin collected!
                coinScore++;
                scoreDisplay.textContent = `Coins: ${coinScore}`;

                // Visual feedback
                player.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    player.style.transform = 'scale(1)';
                }, 200);

                // Remove coin
                coin.element.remove();
                coins.splice(i, 1);
            }
        }

        requestAnimationFrame(gameLoop);
    }

    gameLoop();

    // Cleanup function when game ends
    setTimeout(() => {
        gameRunning = false;
        clearInterval(coinInterval);
        clearInterval(timerInterval);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
        if (timeLeft > 0) {
            alert(`🪙 Game Complete! You collected ${coinScore} coins!`);
        }
    }, 30000);
}

function openPingPong() {
    createGameModal('Ping Pong', `
        <div style="text-align: center; padding: 20px;">
            <h2>🏓 Ping Pong</h2>
            <p>Use mouse or A/D keys to move your racket! Keep the ball bouncing!</p>
            <div id="pingPongArea" style="width: 400px; height: 300px; position: relative; border: 3px solid #2c3e50; border-radius: 10px; background: #27ae60; overflow: hidden; margin: 0 auto;">
                <div id="racket" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); width: 60px; height: 8px; background: #e74c3c; border-radius: 4px;"></div>
                <div id="ball" style="position: absolute; bottom: 35px; left: 50%; transform: translateX(-50%); width: 12px; height: 12px; background: white; border-radius: 50%;"></div>
                <div id="pingPongScore" style="position: absolute; top: 10px; left: 10px; color: white; font-weight: bold;">Hits: 0</div>
                <div id="pingPongLives" style="position: absolute; top: 10px; right: 10px; color: white; font-weight: bold;">Lives: 3</div>
            </div>
        </div>
    `, startPingPongGame);
}

function startPingPongGame() {
    let hits = 0;
    let lives = 3;
    let gameRunning = true;
    const gameArea = document.getElementById('pingPongArea');
    const racket = document.getElementById('racket');
    const ball = document.getElementById('ball');
    const scoreDisplay = document.getElementById('pingPongScore');
    const livesDisplay = document.getElementById('pingPongLives');

    // Game dimensions
    const gameWidth = 400;
    const gameHeight = 300;

    // Racket properties
    let racketX = gameWidth / 2 - 30; // Center racket
    const racketWidth = 60;
    const racketSpeed = 8;

    // Ball properties
    let ballX = gameWidth / 2 - 6;
    let ballY = gameHeight - 50;
    let ballSpeedX = 3;
    let ballSpeedY = -4;
    const ballSize = 12;

    // Initialize positions
    racket.style.left = racketX + 'px';
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    // Keyboard controls
    const keys = {};

    function handleKeyDown(e) {
        keys[e.key.toLowerCase()] = true;
    }

    function handleKeyUp(e) {
        keys[e.key.toLowerCase()] = false;
    }

    // Mouse controls
    function handleMouseMove(e) {
        const rect = gameArea.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        racketX = Math.max(0, Math.min(gameWidth - racketWidth, mouseX - racketWidth / 2));
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    gameArea.addEventListener('mousemove', handleMouseMove);

    // Game loop
    function gameLoop() {
        if (!gameRunning) return;

        // Move racket with A/D keys
        if (keys['a'] && racketX > 0) {
            racketX -= racketSpeed;
        }
        if (keys['d'] && racketX < gameWidth - racketWidth) {
            racketX += racketSpeed;
        }

        // Update racket position
        racket.style.left = racketX + 'px';

        // Move ball
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Ball collision with side walls
        if (ballX <= 0 || ballX >= gameWidth - ballSize) {
            ballSpeedX = -ballSpeedX;
        }

        // Ball collision with top wall
        if (ballY <= 0) {
            ballSpeedY = -ballSpeedY;
        }

        // Ball collision with racket
        if (ballY >= gameHeight - 28 - ballSize &&
            ballY <= gameHeight - 20 &&
            ballX >= racketX - ballSize &&
            ballX <= racketX + racketWidth) {

            ballSpeedY = -ballSpeedY;
            hits++;
            scoreDisplay.textContent = `Hits: ${hits}`;

            // Add some angle based on where ball hits racket
            const hitPos = (ballX - racketX) / racketWidth - 0.5;
            ballSpeedX += hitPos * 3;

            // Limit ball speed and increase difficulty slightly
            ballSpeedX = Math.max(-7, Math.min(7, ballSpeedX));

            // Increase speed slightly every 5 hits
            if (hits % 5 === 0) {
                ballSpeedY *= 1.05;
                ballSpeedX *= 1.05;
            }

            // Visual feedback
            racket.style.backgroundColor = '#f39c12';
            setTimeout(() => {
                racket.style.backgroundColor = '#e74c3c';
            }, 100);
        }

        // Ball falls below racket (lose life)
        if (ballY >= gameHeight) {
            lives--;
            livesDisplay.textContent = `Lives: ${lives}`;

            if (lives <= 0) {
                gameRunning = false;
                alert(`🏓 Game Over! You hit the ball ${hits} times!`);
                return;
            }

            // Reset ball position
            ballX = gameWidth / 2 - 6;
            ballY = gameHeight - 50;
            ballSpeedX = 3;
            ballSpeedY = -4;
        }

        // Update ball position
        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';

        requestAnimationFrame(gameLoop);
    }

    // Start game
    gameLoop();

    // Victory condition - survive 50 hits
    const checkVictory = setInterval(() => {
        if (!gameRunning) {
            clearInterval(checkVictory);
            return;
        }

        if (hits >= 50) {
            gameRunning = false;
            alert(`🏆 Amazing! You're a Ping Pong Master with ${hits} hits!`);
            clearInterval(checkVictory);
        }
    }, 1000);

    // Cleanup
    setTimeout(() => {
        gameRunning = false;
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
        gameArea.removeEventListener('mousemove', handleMouseMove);
        clearInterval(checkVictory);
    }, 120000); // 2 minute max game time
}

// Keep the original simple game for fallback
function openSimpleGame(gameTitle) {
    createGameModal(gameTitle, `
        <div style="text-align: center; padding: 40px;">
            <h2>🎮 ${gameTitle}</h2>
            <p style="font-size: 1.2rem; margin: 20px 0;">This is a fun clicking game!</p>
            <button id="gameButton" onclick="playSimpleGame()" style="font-size: 2rem; padding: 20px 40px; background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; border-radius: 20px; cursor: pointer; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">
                Click to Play! 🎯
            </button>
            <div id="simpleScore" style="margin-top: 20px; font-size: 1.5rem; font-weight: bold;">Score: 0</div>
        </div>
    `);
}

function createGameModal(title, content, startFunction = null) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); z-index: 10000; display: flex;
        align-items: center; justify-content: center;
    `;

    modal.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 20px; max-width: 600px; width: 90%; max-height: 80%; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; color: #333;">${title}</h2>
                <button onclick="closeGameModal(this)" style="background: #ff6b6b; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 16px;">×</button>
            </div>
            ${content}
        </div>
    `;

    document.body.appendChild(modal);
    if (startFunction) startFunction();
}

// Function to properly close game modals and stop all games
function closeGameModal(button) {
    // Stop any running games by setting global game flags
    if (typeof gameRunning !== 'undefined') {
        gameRunning = false;
    }

    // Clear any intervals that might be running
    for (let i = 1; i < 99999; i++) {
        clearInterval(i);
        clearTimeout(i);
    }

    // Remove the modal
    const modal = button.closest('[style*="position: fixed"]');
    if (modal) {
        modal.remove();
    }
}

// Game logic functions
let simpleGameScore = 0;
function playSimpleGame() {
    simpleGameScore++;
    document.getElementById('simpleScore').textContent = `Score: ${simpleGameScore}`;
    document.getElementById('gameButton').textContent = `Great! Click again! 🎉`;
}

// Math game variables
let mathScore = 0;
let currentMathQuestion = {};

function startMathGame() {
    mathScore = 0;
    generateMathQuestion();
}

function generateMathQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '×'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let answer;
    switch(operation) {
        case '+': answer = num1 + num2; break;
        case '-': answer = num1 - num2; break;
        case '×': answer = num1 * num2; break;
    }

    currentMathQuestion = { question: `${num1} ${operation} ${num2} = ?`, answer };
    document.getElementById('mathQuestion').textContent = currentMathQuestion.question;
    document.getElementById('mathAnswer').value = '';
    document.getElementById('mathAnswer').focus();
}

function checkMathAnswer() {
    const userAnswer = parseInt(document.getElementById('mathAnswer').value);
    const feedback = document.getElementById('mathFeedback');

    if (userAnswer === currentMathQuestion.answer) {
        mathScore++;
        feedback.innerHTML = '🎉 Correct! Great job!';
        feedback.style.color = '#00b894';
        document.getElementById('mathScore').textContent = `Score: ${mathScore}`;
        setTimeout(generateMathQuestion, 1500);
    } else {
        feedback.innerHTML = `❌ Oops! The answer is ${currentMathQuestion.answer}. Try the next one!`;
        feedback.style.color = '#ff6b6b';
        setTimeout(generateMathQuestion, 2000);
    }
}

// Add Enter key support for math game
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.getElementById('mathAnswer')) {
        checkMathAnswer();
    }
});

// Page Menu Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all menu items and sections
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.section');

    // Smooth scrolling for menu links
    document.querySelectorAll('.menu-dropdown a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active menu item
                updateActiveMenuItem(this.getAttribute('href').substring(1));

                // Close all dropdown menus
                menuItems.forEach(item => {
                    item.classList.remove('dropdown-open');
                });
            }
        });
    });

    // Close dropdown when clicking on game or coding environment links
    document.querySelectorAll('.menu-dropdown a[onclick]').forEach(anchor => {
        anchor.addEventListener('click', function () {
            // Close all dropdown menus
            menuItems.forEach(item => {
                item.classList.remove('dropdown-open');
            });
        });
    });

    // Function to update active menu item
    function updateActiveMenuItem(sectionId) {
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.target === sectionId) {
                item.classList.add('active');
            }
        });
    }

    // Intersection Observer for scroll-based active menu highlighting
    const observerOptions = {
        root: null,
        rootMargin: '-50px 0px -50px 0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                updateActiveMenuItem(sectionId);
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        if (section.id) {
            observer.observe(section);
        }
    });

    // Add click handlers for menu buttons to scroll to sections or open coding environments
    menuItems.forEach(item => {
        const button = item.querySelector('.menu-button');
        button.addEventListener('click', function() {
            const targetId = item.dataset.target;

            // Special handling for coding environments
            if (targetId === 'coding-environments') {
                // Default to opening Python environment when clicking Code button
                openPythonEnvironment();
                return;
            }

            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.menu-item')) {
            menuItems.forEach(item => {
                item.classList.remove('dropdown-open');
            });
        }
    });

    // Enhanced dropdown interactions for all devices
    menuItems.forEach(item => {
        const button = item.querySelector('.menu-button');
        let dropdownTimeout;

        // Show dropdown on hover (desktop)
        item.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                clearTimeout(dropdownTimeout);
                item.classList.add('dropdown-open');
            }
        });

        // Hide dropdown when mouse leaves (desktop)
        item.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                dropdownTimeout = setTimeout(() => {
                    item.classList.remove('dropdown-open');
                }, 100);
            }
        });

        // Toggle dropdown on tap/click (mobile)
        button.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.stopPropagation();

                // Close other dropdowns first
                menuItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('dropdown-open');
                    }
                });

                // Toggle current dropdown
                item.classList.toggle('dropdown-open');
            }
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    document.getElementById('hero-section').scrollIntoView({ behavior: 'smooth' });
                    break;
                case '2':
                    e.preventDefault();
                    document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
                    break;
                case '3':
                    e.preventDefault();
                    document.getElementById('journey-section').scrollIntoView({ behavior: 'smooth' });
                    break;
                case '4':
                    e.preventDefault();
                    document.getElementById('games-section').scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'p':
                    e.preventDefault();
                    openPythonEnvironment();
                    break;
                case 'h':
                    e.preventDefault();
                    openHTMLEnvironment();
                    break;
                case 'j':
                    e.preventDefault();
                    openJavaScriptEnvironment();
                    break;
            }
        }
    });

    // Initial active menu item based on scroll position
    const initialSection = document.querySelector('.section');
    if (initialSection && initialSection.id) {
        updateActiveMenuItem(initialSection.id);
    }
});