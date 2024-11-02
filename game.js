let score = 0;
let penaltyScore = 0;
let gameInterval;
let gameMode = 'A'; // Игра A по умолчанию
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
let wolfPosition = 1; // Позиция Волка (0 - левый, 1 - средний, 2 - правый, 3 - самый правый)

document.getElementById('startGame').addEventListener('click', () => {
    startGame('A');
});

document.getElementById('startGameB').addEventListener('click', () => {
    startGame('B');
});

// Обработчики для управления Волком
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        moveWolf(-1); // Влево
    } else if (event.key === 'ArrowRight') {
        moveWolf(1); // Вправо
    }
});

function startGame(mode) {
    gameMode = mode;
    score = 0;
    penaltyScore = 0;
    scoreDisplay.textContent = `Очки: ${score}`;
    gameArea.innerHTML = ''; // Очищаем игровую область
    createWolf();
    gameInterval = setInterval(dropEgg, 1000); // Каждую секунду

    // Увеличиваем скорость игры через каждые 100 очков
    setInterval(() => {
        if (score % 100 === 0 && score > 0) {
            clearInterval(gameInterval);
            gameInterval = setInterval(dropEgg, Math.max(300 - Math.floor(score / 10) * 10, 100)); // Уменьшаем интервал до минимума
        }
    }, 1000);
}

function createWolf() {
    const wolf = document.createElement('img');
    wolf.src = 'images/wolf.png'; // Укажите путь к изображению Волка
    wolf.alt = 'Волк';
    wolf.className = 'wolf';
    wolf.style.left = '120px'; // Начальная позиция
    gameArea.appendChild(wolf);
}

// Функция для перемещения Волка
function moveWolf(direction) {
    const wolf = document.querySelector('.wolf');
    if (direction === -1 && wolfPosition > 0) {
        wolfPosition--; // Двигаем влево
    } else if (direction === 1 && wolfPosition < (gameMode === 'A' ? 2 : 3)) {
        wolfPosition++; // Двигаем вправо
    }
    // Обновляем позицию Волка на экране
    wolf.style.left = `${(wolfPosition * 100) + 20}px`;
}

function createEgg() {
    const egg = document.createElement('img');
    egg.src = 'images/egg.png'; // Укажите путь к изображению яйца
    egg.alt = 'Яйцо';
    egg.className = 'egg';
    gameArea.appendChild(egg);
    return egg;
}

function dropEgg() {
    const position = Math.floor(Math.random() * (gameMode === 'A' ? 3 : 4));
    const egg = createEgg();
    egg.style.left = `${(position * 100) + 20}px`; // Позиционируем яйцо
    egg.style.top = '0px';

    let eggFallInterval = setInterval(() => {
        const topPosition = parseInt(egg.style.top);
        if (topPosition < 550) { // Если яйцо не достигло дна
            egg.style.top = `${topPosition + 5}px`; // Падает на 5 пикселей
        } else {
            clearInterval(eggFallInterval);
            handleEggDrop(egg);
        }
    }, 100);
}

function handleEggDrop(egg) {
    penaltyScore += 1; // Увеличиваем штрафные очки
    updateScore();
    egg.remove(); // Удаляем яйцо

    if (penaltyScore >= 3) {
        alert('Игра окончена! Вы набрали ' + score + ' очков.');
        clearInterval(gameInterval); // Останавливаем игру
    }
}

function updateScore() {
    scoreDisplay.textContent = `Очки: ${score} | Штрафные очки: ${penaltyScore}`;
}

// Для дальнейшего развития игры добавьте логику по ловле яиц, взаимодействию с Волком и обработку штрафов.
