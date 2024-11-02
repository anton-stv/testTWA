document.addEventListener('DOMContentLoaded', function () {
    const gameArea = document.getElementById('game-area');
    const wolf = document.getElementById('wolf');
    const startButton = document.getElementById('start-button');

    let wolfPosition = gameArea.offsetWidth / 2;
    let wolfSpeed = 5;
    let eggs = [];
    let gameInterval;
    let score = 0;
    let missed = 0;
    let gameRunning = false;

    // Устанавливаем размер Волка и позицию по умолчанию
    wolf.style.left = `${wolfPosition}px`;

    // Старт игры
    startButton.addEventListener('click', () => {
        if (!gameRunning) {
            resetGame();
            startButton.style.display = 'none';
            gameRunning = true;
            gameInterval = setInterval(gameLoop, 50);
        }
    });

    // Управление Волком
    document.addEventListener('keydown', (event) => {
        if (!gameRunning) return;
        if (event.key === 'ArrowLeft' && wolfPosition > 0) {
            wolfPosition -= wolfSpeed * 2; // скорость передвижения
        } else if (event.key === 'ArrowRight' && wolfPosition < gameArea.offsetWidth - wolf.offsetWidth) {
            wolfPosition += wolfSpeed * 2;
        }
        wolf.style.left = `${wolfPosition}px`;
    });

    // Логика игры
    function gameLoop() {
        // Создание новых яиц
        if (Math.random() < 0.05) {
            createEgg();
        }

        // Обновление положения яиц
        eggs.forEach((egg, index) => {
            egg.positionY += egg.speed;
            egg.element.style.top = `${egg.positionY}px`;

            // Проверка на ловлю яйца
            if (egg.positionY + egg.element.offsetHeight >= gameArea.offsetHeight * 0.9 &&
                egg.positionX >= wolfPosition &&
                egg.positionX <= wolfPosition + wolf.offsetWidth) {
                score++;
                egg.element.remove();
                eggs.splice(index, 1);
                updateScore();
            }

            // Проверка на пропущенное яйцо
            if (egg.positionY > gameArea.offsetHeight) {
                missed++;
                egg.element.remove();
                eggs.splice(index, 1);
                updateMissed();
                if (missed >= 3) {
                    endGame();
                }
            }
        });
    }

    // Создание яйца
    function createEgg() {
        const egg = document.createElement('img');
        egg.src = 'egg.png';
        egg.classList.add('egg');
        gameArea.appendChild(egg);

        const positionX = Math.random() * (gameArea.offsetWidth - 50);
        egg.style.left = `${positionX}px`;
        egg.style.top = '0px';

        eggs.push({
            element: egg,
            positionX: positionX,
            positionY: 0,
            speed: Math.random() * 3 + 1
        });
    }

    // Обновление счета
    function updateScore() {
        console.log(`Счет: ${score}`);
    }

    // Обновление штрафных очков
    function updateMissed() {
        console.log(`Пропущено: ${missed}`);
    }

    // Конец игры
    function endGame() {
        gameRunning = false;
        clearInterval(gameInterval);
        eggs.forEach((egg) => egg.element.remove());
        eggs = [];
        alert(`Игра окончена! Ваш счет: ${score}`);
        startButton.style.display = 'block';
    }

    // Сброс игры
    function resetGame() {
        wolfPosition = gameArea.offsetWidth / 2;
        wolf.style.left = `${wolfPosition}px`;
        score = 0;
        missed = 0;
        eggs.forEach((egg) => egg.element.remove());
        eggs = [];
    }
});
