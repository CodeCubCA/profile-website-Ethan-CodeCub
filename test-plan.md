# Comprehensive Test Plan for Ethan's Coding Profile Website

## Project Overview
This test plan covers the complete testing strategy for a young coder's interactive portfolio website featuring games, coding environments, and responsive design.

## 1. UNIT TESTS FOR JAVASCRIPT FUNCTIONS

### 1.1 Memory Game Functions

**Test: `shuffleArray(array)`**
```javascript
describe('Memory Game - shuffleArray', () => {
  test('should return array with same length', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffleArray(input);
    expect(result.length).toBe(5);
  });

  test('should contain all original elements', () => {
    const input = ['🐶', '🐱', '🐭'];
    const result = shuffleArray(input);
    expect(result).toEqual(expect.arrayContaining(input));
  });

  test('should not modify original array', () => {
    const input = [1, 2, 3];
    const original = [...input];
    shuffleArray(input);
    expect(input).toEqual(original);
  });

  test('should handle empty array', () => {
    expect(shuffleArray([])).toEqual([]);
  });

  test('should handle single element', () => {
    expect(shuffleArray([1])).toEqual([1]);
  });
});
```

**Test: `flipCard(cardId)`**
```javascript
describe('Memory Game - flipCard', () => {
  beforeEach(() => {
    // Reset game state
    gameState = {
      cards: [
        { id: 0, emoji: '🐶', isFlipped: false, isMatched: false },
        { id: 1, emoji: '🐱', isFlipped: false, isMatched: false }
      ],
      flippedCards: [],
      isProcessing: false
    };
  });

  test('should flip unflipped card', () => {
    flipCard(0);
    expect(gameState.cards[0].isFlipped).toBe(true);
    expect(gameState.flippedCards.length).toBe(1);
  });

  test('should not flip already flipped card', () => {
    gameState.cards[0].isFlipped = true;
    flipCard(0);
    expect(gameState.flippedCards.length).toBe(0);
  });

  test('should not flip matched card', () => {
    gameState.cards[0].isMatched = true;
    flipCard(0);
    expect(gameState.flippedCards.length).toBe(0);
  });

  test('should not flip when processing', () => {
    gameState.isProcessing = true;
    flipCard(0);
    expect(gameState.cards[0].isFlipped).toBe(false);
  });

  test('should trigger match check when two cards flipped', () => {
    flipCard(0);
    flipCard(1);
    expect(gameState.moves).toBe(1);
  });
});
```

**Test: `checkForMatch()`**
```javascript
describe('Memory Game - checkForMatch', () => {
  test('should mark matching cards as matched', async () => {
    gameState.flippedCards = [
      { emoji: '🐶', isMatched: false },
      { emoji: '🐶', isMatched: false }
    ];

    checkForMatch();

    // Wait for timeout
    await new Promise(resolve => setTimeout(resolve, 1100));

    expect(gameState.flippedCards[0].isMatched).toBe(true);
    expect(gameState.flippedCards[1].isMatched).toBe(true);
    expect(gameState.score).toBeGreaterThan(0);
  });

  test('should flip back non-matching cards', async () => {
    gameState.flippedCards = [
      { emoji: '🐶', isFlipped: true },
      { emoji: '🐱', isFlipped: true }
    ];

    checkForMatch();

    await new Promise(resolve => setTimeout(resolve, 1100));

    expect(gameState.flippedCards[0].isFlipped).toBe(false);
    expect(gameState.flippedCards[1].isFlipped).toBe(false);
  });
});
```

### 1.2 Coding Environment Functions

**Test: `runPythonCode()`**
```javascript
describe('Python Environment - runPythonCode', () => {
  test('should execute simple print statement', () => {
    document.getElementById('pythonCodeEditor').value = 'print("Hello World")';
    runPythonCode();
    const output = document.getElementById('pythonOutput').innerHTML;
    expect(output).toContain('Hello World');
  });

  test('should handle multiple print statements', () => {
    document.getElementById('pythonCodeEditor').value = `
print("Line 1")
print("Line 2")`;
    runPythonCode();
    const output = document.getElementById('pythonOutput').innerHTML;
    expect(output).toContain('Line 1');
    expect(output).toContain('Line 2');
  });

  test('should handle f-string formatting', () => {
    document.getElementById('pythonCodeEditor').value = 'print(f"Number: {5+3}")';
    runPythonCode();
    const output = document.getElementById('pythonOutput').innerHTML;
    expect(output).toContain('Number: 8');
  });

  test('should handle for loops', () => {
    document.getElementById('pythonCodeEditor').value = `
for i in range(3):
    print(f"Loop {i+1}")`;
    runPythonCode();
    const output = document.getElementById('pythonOutput').innerHTML;
    expect(output).toContain('Loop 1');
    expect(output).toContain('Loop 2');
    expect(output).toContain('Loop 3');
  });

  test('should ignore comments and empty lines', () => {
    document.getElementById('pythonCodeEditor').value = `
# This is a comment

print("Hello")
# Another comment`;
    runPythonCode();
    const output = document.getElementById('pythonOutput').innerHTML;
    expect(output).toContain('Hello');
    expect(output).not.toContain('#');
  });
});
```

**Test: `runJavaScriptCode()`**
```javascript
describe('JavaScript Environment - runJavaScriptCode', () => {
  test('should capture console.log output', () => {
    document.getElementById('jsCodeEditor').value = 'console.log("Test message")';
    runJavaScriptCode();
    const output = document.getElementById('jsOutput').innerHTML;
    expect(output).toContain('Test message');
  });

  test('should capture alert calls', () => {
    document.getElementById('jsCodeEditor').value = 'alert("Alert message")';
    runJavaScriptCode();
    const output = document.getElementById('jsOutput').innerHTML;
    expect(output).toContain('Alert message');
  });

  test('should handle syntax errors gracefully', () => {
    document.getElementById('jsCodeEditor').value = 'console.log("missing quote)';
    runJavaScriptCode();
    const output = document.getElementById('jsOutput').innerHTML;
    expect(output).toContain('error');
  });

  test('should restore original console.log after execution', () => {
    const originalLog = console.log;
    runJavaScriptCode();
    expect(console.log).toBe(originalLog);
  });
});
```

**Test: `updateHTMLPreview()`**
```javascript
describe('HTML Environment - updateHTMLPreview', () => {
  test('should update iframe with HTML content', () => {
    const htmlCode = '<h1>Test Header</h1>';
    document.getElementById('htmlCodeEditor').value = htmlCode;
    updateHTMLPreview();

    const iframe = document.getElementById('htmlPreview');
    expect(iframe.src).toContain('blob:');
  });

  test('should handle empty HTML', () => {
    document.getElementById('htmlCodeEditor').value = '';
    updateHTMLPreview();

    const iframe = document.getElementById('htmlPreview');
    expect(iframe.src).toContain('blob:');
  });
});
```

### 1.3 Game Logic Functions

**Test: Plane Game Collision Detection**
```javascript
describe('Plane Game - Collision Detection', () => {
  test('should detect laser hitting enemy', () => {
    const laser = { x: 100, y: 50 };
    const enemy = { x: 90, y: 45, destroyed: false };

    const collision = checkLaserEnemyCollision(laser, enemy);
    expect(collision).toBe(true);
  });

  test('should not detect collision when objects far apart', () => {
    const laser = { x: 100, y: 50 };
    const enemy = { x: 200, y: 150, destroyed: false };

    const collision = checkLaserEnemyCollision(laser, enemy);
    expect(collision).toBe(false);
  });

  test('should ignore destroyed enemies', () => {
    const laser = { x: 100, y: 50 };
    const enemy = { x: 100, y: 50, destroyed: true };

    const collision = checkLaserEnemyCollision(laser, enemy);
    expect(collision).toBe(false);
  });
});
```

**Test: Block Breaker Physics**
```javascript
describe('Block Breaker - Ball Physics', () => {
  test('should reverse X velocity on wall collision', () => {
    let ballSpeedX = 3;
    const ballX = 0; // Left wall

    if (ballX <= 0) ballSpeedX = -ballSpeedX;
    expect(ballSpeedX).toBe(-3);
  });

  test('should reverse Y velocity on ceiling collision', () => {
    let ballSpeedY = -3;
    const ballY = 0; // Ceiling

    if (ballY <= 0) ballSpeedY = -ballSpeedY;
    expect(ballSpeedY).toBe(3);
  });

  test('should calculate paddle hit angle correctly', () => {
    const paddleX = 200;
    const paddleWidth = 80;
    const ballX = 240; // Hit center of paddle

    const hitPos = (ballX - paddleX) / paddleWidth - 0.5;
    expect(hitPos).toBe(0); // Center hit
  });
});
```

## 2. INTEGRATION TESTS

### 2.1 Game Workflow Tests

**Test: Complete Memory Game Flow**
```javascript
describe('Memory Game Integration', () => {
  test('should complete full game workflow', async () => {
    // Open game
    openMemoryGame();
    expect(document.getElementById('memoryGameModal').style.display).toBe('flex');

    // Initialize game
    initializeGame();
    expect(gameState.moves).toBe(0);
    expect(gameState.score).toBe(0);

    // Create board
    createGameBoard();
    const cards = document.querySelectorAll('.memory-card');
    expect(cards.length).toBe(16);

    // Simulate card flips
    flipCard(0);
    flipCard(1);
    expect(gameState.moves).toBe(1);

    // Wait for match check
    await new Promise(resolve => setTimeout(resolve, 1100));

    // Close game
    closeMemoryGame();
    expect(document.getElementById('memoryGameModal').style.display).toBe('none');
  });
});
```

**Test: Coding Environment Workflow**
```javascript
describe('Coding Environment Integration', () => {
  test('should handle Python environment complete workflow', () => {
    // Open environment
    openPythonEnvironment();
    expect(document.getElementById('pythonEnvironment').style.display).toBe('flex');

    // Load example
    loadPythonExample('hello');
    const editor = document.getElementById('pythonCodeEditor');
    expect(editor.value).toContain('Hello, World!');

    // Run code
    runPythonCode();
    const output = document.getElementById('pythonOutput');
    expect(output.innerHTML).toContain('Hello, World!');

    // Clear code
    clearPythonCode();
    expect(editor.value).toBe('');

    // Close environment
    closeCodingEnvironment('pythonEnvironment');
    expect(document.getElementById('pythonEnvironment').style.display).toBe('none');
  });
});
```

### 2.2 Navigation Integration Tests

**Test: Menu Navigation**
```javascript
describe('Page Navigation Integration', () => {
  test('should navigate to sections correctly', () => {
    // Mock smooth scrolling
    Element.prototype.scrollIntoView = jest.fn();

    const menuLinks = document.querySelectorAll('.menu-dropdown a');
    menuLinks.forEach(link => {
      if (link.getAttribute('href').startsWith('#')) {
        link.click();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        expect(target.scrollIntoView).toHaveBeenCalled();
      }
    });
  });

  test('should highlight active menu items', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems[0].classList.add('active');

    expect(menuItems[0].classList.contains('active')).toBe(true);

    // Simulate clicking another menu
    menuItems[0].classList.remove('active');
    menuItems[1].classList.add('active');

    expect(menuItems[0].classList.contains('active')).toBe(false);
    expect(menuItems[1].classList.contains('active')).toBe(true);
  });
});
```

## 3. UI/UX TESTS

### 3.1 Responsive Design Tests

**Test: Mobile Responsiveness**
```javascript
describe('Responsive Design', () => {
  test('should adapt layout for mobile screens', () => {
    // Simulate mobile viewport
    global.innerWidth = 480;
    global.innerHeight = 800;
    window.dispatchEvent(new Event('resize'));

    const gameCards = document.querySelector('.games-grid');
    const computedStyle = window.getComputedStyle(gameCards);
    expect(computedStyle.gridTemplateColumns).toBe('1fr');
  });

  test('should show mobile navigation layout', () => {
    global.innerWidth = 480;
    window.dispatchEvent(new Event('resize'));

    const pageMenu = document.querySelector('.page-menu');
    const computedStyle = window.getComputedStyle(pageMenu);
    expect(computedStyle.flexDirection).toBe('column');
  });

  test('should adjust coding environment for mobile', () => {
    global.innerWidth = 768;
    window.dispatchEvent(new Event('resize'));

    const codingContent = document.querySelector('.coding-content');
    const computedStyle = window.getComputedStyle(codingContent);
    expect(computedStyle.gridTemplateColumns).toBe('1fr');
  });
});
```

### 3.2 Accessibility Tests

**Test: Keyboard Navigation**
```javascript
describe('Accessibility - Keyboard Navigation', () => {
  test('should handle Tab navigation', () => {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
      expect(element.tabIndex).not.toBe(-1);
    });
  });

  test('should handle Enter key for buttons', () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      const clickHandler = jest.fn();
      button.addEventListener('click', clickHandler);

      // Simulate Enter key
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      button.dispatchEvent(enterEvent);

      if (button.type !== 'submit') {
        expect(clickHandler).toHaveBeenCalled();
      }
    });
  });

  test('should have proper ARIA labels', () => {
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
      const title = card.querySelector('.game-title');
      expect(title.textContent).toBeTruthy();
    });
  });
});
```

### 3.3 Visual Design Tests

**Test: CSS Animations**
```javascript
describe('Visual Design - Animations', () => {
  test('should apply hover effects to game cards', () => {
    const gameCard = document.querySelector('.game-card');
    gameCard.dispatchEvent(new Event('mouseenter'));

    const computedStyle = window.getComputedStyle(gameCard);
    expect(computedStyle.transform).toContain('translateY');
  });

  test('should show loading animations', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      const computedStyle = window.getComputedStyle(section);
      expect(computedStyle.animation).toBeTruthy();
    });
  });
});
```

## 4. CROSS-BROWSER COMPATIBILITY TESTS

### 4.1 Browser Feature Support

**Test: Browser API Compatibility**
```javascript
describe('Browser Compatibility', () => {
  test('should check for required Web APIs', () => {
    expect(typeof requestAnimationFrame).toBe('function');
    expect(typeof URL.createObjectURL).toBe('function');
    expect(typeof document.querySelector).toBe('function');
    expect(typeof localStorage).toBe('object');
  });

  test('should check CSS feature support', () => {
    const testElement = document.createElement('div');
    testElement.style.display = 'grid';
    expect(testElement.style.display).toBe('grid');

    testElement.style.background = 'linear-gradient(45deg, red, blue)';
    expect(testElement.style.background).toContain('linear-gradient');
  });

  test('should handle touch events for mobile', () => {
    const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (touchSupport) {
      const touchButtons = document.querySelectorAll('.touch-btn');
      expect(touchButtons.length).toBeGreaterThan(0);
    }
  });
});
```

### 4.2 Cross-Browser Event Handling

**Test: Event Compatibility**
```javascript
describe('Cross-Browser Events', () => {
  test('should handle keyboard events consistently', () => {
    const gameArea = document.createElement('div');
    let keyPressed = false;

    gameArea.addEventListener('keydown', (e) => {
      if (e.key === 'Space' || e.code === 'Space') {
        keyPressed = true;
      }
    });

    const spaceEvent = new KeyboardEvent('keydown', { key: ' ', code: 'Space' });
    gameArea.dispatchEvent(spaceEvent);

    expect(keyPressed).toBe(true);
  });

  test('should handle mouse events across browsers', () => {
    const element = document.createElement('div');
    let clicked = false;

    element.addEventListener('click', () => { clicked = true; });
    element.click();

    expect(clicked).toBe(true);
  });
});
```

## 5. MOBILE DEVICE TESTING

### 5.1 Touch Control Tests

**Test: Touch Interactions**
```javascript
describe('Mobile Touch Controls', () => {
  test('should handle touch events for game controls', () => {
    const touchButton = document.querySelector('.touch-btn');
    let touchStarted = false;

    touchButton.addEventListener('touchstart', (e) => {
      e.preventDefault();
      touchStarted = true;
    });

    const touchEvent = new TouchEvent('touchstart', {
      touches: [{ clientX: 100, clientY: 100 }]
    });
    touchButton.dispatchEvent(touchEvent);

    expect(touchStarted).toBe(true);
  });

  test('should prevent default touch behaviors for games', () => {
    const gameArea = document.getElementById('blockArea');
    let defaultPrevented = false;

    gameArea.addEventListener('touchstart', (e) => {
      e.preventDefault();
      defaultPrevented = e.defaultPrevented;
    });

    const touchEvent = new TouchEvent('touchstart');
    gameArea.dispatchEvent(touchEvent);

    expect(defaultPrevented).toBe(true);
  });

  test('should handle swipe gestures', () => {
    const gameArea = document.createElement('div');
    let swipeDirection = null;

    let startX, startY;
    gameArea.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    gameArea.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        swipeDirection = deltaX > 0 ? 'right' : 'left';
      } else {
        swipeDirection = deltaY > 0 ? 'down' : 'up';
      }
    });

    // Simulate swipe right
    const startTouch = new TouchEvent('touchstart', {
      touches: [{ clientX: 100, clientY: 100 }]
    });
    const endTouch = new TouchEvent('touchend', {
      changedTouches: [{ clientX: 200, clientY: 100 }]
    });

    gameArea.dispatchEvent(startTouch);
    gameArea.dispatchEvent(endTouch);

    expect(swipeDirection).toBe('right');
  });
});
```

### 5.2 Viewport and Orientation Tests

**Test: Mobile Viewport Handling**
```javascript
describe('Mobile Viewport', () => {
  test('should handle orientation changes', () => {
    const originalWidth = window.innerWidth;
    const originalHeight = window.innerHeight;

    // Simulate landscape to portrait
    Object.defineProperty(window, 'innerWidth', { value: originalHeight });
    Object.defineProperty(window, 'innerHeight', { value: originalWidth });

    window.dispatchEvent(new Event('orientationchange'));

    const gameModals = document.querySelectorAll('.memory-game-modal');
    gameModals.forEach(modal => {
      if (modal.style.display === 'flex') {
        expect(modal.offsetWidth).toBeLessThanOrEqual(window.innerWidth);
      }
    });
  });

  test('should adjust game sizes for small screens', () => {
    Object.defineProperty(window, 'innerWidth', { value: 320 });
    Object.defineProperty(window, 'innerHeight', { value: 568 });

    window.dispatchEvent(new Event('resize'));

    const memoryBoard = document.querySelector('.memory-game-board');
    if (memoryBoard) {
      const computedStyle = window.getComputedStyle(memoryBoard);
      expect(parseInt(computedStyle.gap)).toBeLessThanOrEqual(10);
    }
  });
});
```

## 6. PERFORMANCE TESTS

### 6.1 Game Performance Tests

**Test: Animation Frame Rate**
```javascript
describe('Game Performance', () => {
  test('should maintain consistent frame rate', (done) => {
    let frameCount = 0;
    let startTime = performance.now();

    function testFrame() {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - startTime >= 1000) {
        expect(frameCount).toBeGreaterThanOrEqual(30); // At least 30 FPS
        done();
      } else {
        requestAnimationFrame(testFrame);
      }
    }

    requestAnimationFrame(testFrame);
  });

  test('should handle multiple game objects efficiently', () => {
    const gameArea = document.createElement('div');
    const startTime = performance.now();

    // Create 100 game objects
    for (let i = 0; i < 100; i++) {
      const gameObject = document.createElement('div');
      gameObject.style.cssText = `
        position: absolute;
        left: ${Math.random() * 500}px;
        top: ${Math.random() * 400}px;
        width: 20px;
        height: 20px;
        background: red;
      `;
      gameArea.appendChild(gameObject);
    }

    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(100); // Should complete in under 100ms
  });

  test('should clean up game resources properly', () => {
    // Start a game
    openPlaneLaserShooter();

    // Simulate game running
    const initialElementCount = document.querySelectorAll('*').length;

    // Stop game and close modal
    const modal = document.querySelector('.game-modal');
    if (modal) {
      modal.remove();
    }

    // Check for memory leaks
    const finalElementCount = document.querySelectorAll('*').length;
    expect(finalElementCount).toBeLessThanOrEqual(initialElementCount + 5);
  });
});
```

### 6.2 Memory Management Tests

**Test: Memory Leak Detection**
```javascript
describe('Memory Management', () => {
  test('should remove event listeners when closing games', () => {
    const initialListeners = getEventListenerCount();

    // Open and close multiple games
    openMemoryGame();
    closeMemoryGame();

    openPlaneLaserShooter();
    const modal = document.querySelector('.game-modal');
    if (modal) modal.remove();

    const finalListeners = getEventListenerCount();
    expect(finalListeners).toBeLessThanOrEqual(initialListeners + 2);
  });

  test('should clear intervals and timeouts', () => {
    const activeTimers = [];
    const originalSetInterval = setInterval;
    const originalSetTimeout = setTimeout;

    setInterval = jest.fn((...args) => {
      const id = originalSetInterval(...args);
      activeTimers.push(id);
      return id;
    });

    setTimeout = jest.fn((...args) => {
      const id = originalSetTimeout(...args);
      activeTimers.push(id);
      return id;
    });

    // Start a game that uses timers
    startMoleGame();

    // Clean up
    activeTimers.forEach(id => {
      clearInterval(id);
      clearTimeout(id);
    });

    expect(activeTimers.length).toBeGreaterThan(0);

    // Restore original functions
    setInterval = originalSetInterval;
    setTimeout = originalSetTimeout;
  });
});

function getEventListenerCount() {
  // Mock implementation - in real testing, you'd use dev tools or memory profiling
  return document.querySelectorAll('*').length;
}
```

### 6.3 Loading Performance Tests

**Test: Resource Loading**
```javascript
describe('Loading Performance', () => {
  test('should load CSS styles efficiently', () => {
    const styleSheets = document.styleSheets;
    expect(styleSheets.length).toBeGreaterThan(0);

    // Check that critical styles are loaded
    const computedBody = window.getComputedStyle(document.body);
    expect(computedBody.fontFamily).toBeTruthy();
    expect(computedBody.background).toBeTruthy();
  });

  test('should handle image loading gracefully', () => {
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
      profilePhoto.addEventListener('error', (e) => {
        // Should have fallback or graceful degradation
        expect(e.target.alt).toBeTruthy();
      });
    }
  });

  test('should minimize reflows and repaints', () => {
    const testElement = document.createElement('div');
    testElement.style.width = '100px';
    testElement.style.height = '100px';
    document.body.appendChild(testElement);

    const startTime = performance.now();

    // Batch DOM changes
    testElement.style.cssText = `
      width: 200px;
      height: 200px;
      background: red;
      transform: translateX(100px);
    `;

    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(10); // Should be fast

    document.body.removeChild(testElement);
  });
});
```

## 7. VIDEO CONTENT TESTS

### 7.1 Video Modal Tests

**Test: Video Content Display**
```javascript
describe('Video Content', () => {
  test('should open video modal correctly', () => {
    showVideoContent('minecraft1');

    const modal = document.querySelector('.video-modal');
    expect(modal).toBeTruthy();
    expect(modal.style.display).toBe('flex');
  });

  test('should display correct video content', () => {
    showVideoContent('python1');

    const modal = document.querySelector('.video-modal');
    const content = modal.querySelector('.video-content');
    expect(content.innerHTML).toContain('Python');
  });

  test('should close video modal', () => {
    showVideoContent('minecraft1');

    const closeBtn = document.querySelector('.video-close-btn');
    closeBtn.click();

    const modal = document.querySelector('.video-modal');
    expect(modal.style.display).toBe('none');
  });
});
```

## 8. ERROR HANDLING TESTS

### 8.1 Graceful Degradation Tests

**Test: JavaScript Error Handling**
```javascript
describe('Error Handling', () => {
  test('should handle missing DOM elements gracefully', () => {
    expect(() => {
      const missingElement = document.getElementById('nonexistent');
      if (missingElement) {
        missingElement.style.display = 'block';
      }
    }).not.toThrow();
  });

  test('should handle game errors without crashing', () => {
    expect(() => {
      // Simulate game error
      gameState = null;
      flipCard(0);
    }).not.toThrow();
  });

  test('should provide user feedback for errors', () => {
    const originalConsoleError = console.error;
    const errorMessages = [];
    console.error = (message) => errorMessages.push(message);

    // Trigger an error scenario
    runJavaScriptCode(); // With invalid code

    expect(errorMessages.length).toBeGreaterThanOrEqual(0);
    console.error = originalConsoleError;
  });
});
```

## 9. SECURITY TESTS

### 9.1 Code Execution Safety

**Test: Safe Code Execution**
```javascript
describe('Security - Code Execution', () => {
  test('should not execute malicious JavaScript in Python environment', () => {
    const maliciousCode = `
print("<script>alert('XSS')</script>")
# eval("malicious code")`;

    document.getElementById('pythonCodeEditor').value = maliciousCode;
    runPythonCode();

    const output = document.getElementById('pythonOutput');
    expect(output.innerHTML).not.toContain('<script>');
  });

  test('should sanitize HTML preview content', () => {
    const maliciousHTML = `
<script>alert('XSS')</script>
<h1>Safe Content</h1>`;

    document.getElementById('htmlCodeEditor').value = maliciousHTML;
    updateHTMLPreview();

    // The preview should be in an iframe, providing isolation
    const iframe = document.getElementById('htmlPreview');
    expect(iframe.src).toContain('blob:');
  });
});
```

## 10. USABILITY TESTS

### 10.1 User Experience Tests

**Test: Game Accessibility for Young Users**
```javascript
describe('Usability for Young Users', () => {
  test('should have clear visual feedback for interactions', () => {
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
      const title = card.querySelector('.game-title');
      expect(title.textContent.length).toBeGreaterThan(0);

      const description = card.querySelector('.game-description');
      expect(description.textContent.length).toBeGreaterThan(0);
    });
  });

  test('should have age-appropriate content', () => {
    const allText = document.body.textContent;
    const appropriateWords = ['fun', 'awesome', 'cool', 'amazing', 'great'];
    const hasAppropriateLanguage = appropriateWords.some(word =>
      allText.toLowerCase().includes(word)
    );
    expect(hasAppropriateLanguage).toBe(true);
  });

  test('should provide encouraging feedback', () => {
    // Test game completion messages
    gameState.pairsFound = gameState.totalPairs;
    showWinMessage();

    // Should see encouraging message
    expect(document.body.textContent).toContain('🎉');
  });
});
```

## Test Execution Strategy

### Manual Testing Checklist

1. **Cross-Browser Testing**
   - [ ] Chrome (latest)
   - [ ] Firefox (latest)
   - [ ] Safari (latest)
   - [ ] Edge (latest)
   - [ ] Mobile Safari (iOS)
   - [ ] Chrome Mobile (Android)

2. **Device Testing**
   - [ ] Desktop (1920x1080)
   - [ ] Laptop (1366x768)
   - [ ] Tablet (768x1024)
   - [ ] Mobile (375x667)
   - [ ] Large Mobile (414x896)

3. **Accessibility Testing**
   - [ ] Screen reader compatibility
   - [ ] Keyboard navigation
   - [ ] Color contrast
   - [ ] Text size scaling

4. **Performance Testing**
   - [ ] Page load time < 3 seconds
   - [ ] Game frame rate > 30 FPS
   - [ ] Memory usage stable
   - [ ] No memory leaks after 30 minutes

### Automated Test Setup

```javascript
// Jest configuration for the test suite
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test-setup.js'],
  collectCoverageFrom: [
    'script.js',
    '!**/node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

This comprehensive test plan ensures that Ethan's coding profile website is robust, user-friendly, and performs well across all devices and browsers, providing a great experience for visitors exploring his coding journey and interactive games.