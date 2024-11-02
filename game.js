let wolf, eggs = [], score = 0, missed = 0, eggFallInterval, eggSpawnInterval;
let eggFallSpeed = 1;
const eggFallSpeedIncrement = 0.2; // Прирост скорости каждые 10 очков
const eggSpawnRate = 2000; // Интервал появления яиц
const initialEggFallSpeed = 0.5; // Начальная скорость падения

document.addEventListener('DOMContentLoaded', function () {
    wolf = document.getElementById('wolf');
    const scoreDisplay = document.getElementById('score');
    const startButton = document.getElementById('startButton');
    const leftControl = document.getElementById('leftControl');
    const rightControl = document.getElementById('rightControl');

    startButton.addEventListener('click', startGame);
    leftControl.addEventListener('click', () => moveWolf(-15));
    rightControl.addEventListener('click', () => moveWolf(15));

    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            moveWolf(-15);
        } else if (event.key === 'ArrowRight') {
            moveWolf(15);
        }
    });

    // Добавляем поддержку касания на мобильных устройствах
    document.getElementById('gameContainer').addEventListener('touchmove', (event) => {
        const touchX = event.touches[0].clientX;
        moveWolfTo(touchX - wolf.offsetWidth / 2);
    });

    function startGame() {
        score = 0;
        missed = 0;
        eggFallSpeed = initialEggFallSpeed;
        updateScore();
        eggs.forEach(egg => egg.remove());
        eggs = [];
        startButton.style.display = 'none';

        eggSpawnInterval = setInterval(spawnEgg, eggSpawnRate);
        eggFallInterval = requestAnimationFrame(updateEggs);
    }

    function spawnEgg() {
        const egg = document.createElement('div');
        egg.classList.add('egg');
        egg.style.left = Math.random() * 90 + '%';
        egg.style.top = '0px';
        document.getElementById('gameContainer').appendChild(egg);
        eggs.push(egg);
    }

    function updateEggs() {
        eggs.forEach((egg, index) => {
            const eggTop = parseFloat(egg.style.top);
            egg.style.top = eggTop + eggFallSpeed + 'px';

            const wolfRect = wolf.getBoundingClientRect();
            const eggRect = egg.getBoundingClientRect();

            // Проверка на сбор яйца
            if (
                eggRect.bottom >= wolfRect.top &&
                eggRect.left >= wolfRect.left &&
                eggRect.right <= wolfRect.right
            ) {
                score++;
                updateScore();
                egg.remove();
                eggs.splice(index, 1);
            } else if (eggTop > window.innerHeight) {
                missed++;
                egg.remove();
                eggs.splice(index, 1);

                if (missed >= 3) {
                    endGame();
                }
            }
        });

        // Увеличение скорости падения каждые 10 очков
        if (score > 0 && score % 10 === 0) {
            eggFallSpeed += eggFallSpeedIncrement;
        }

        requestAnimationFrame(updateEggs);
    }

    function updateScore() {
        scoreDisplay.textContent = `Счёт: ${score}`;
    }

    function endGame() {
        clearInterval(eggSpawnInterval);
        eggs.forEach(egg => egg.remove());
        eggs = [];
        startButton.style.display = 'block';
        alert(`Игра окончена! Ваш счёт: ${score}`);
    }

    function moveWolf(distance) {
        let wolfLeft = parseFloat(wolf.style.left) || 0;
        wolfLeft += distance;
        if (wolfLeft < 0) wolfLeft = 0;
        if (wolfLeft > window.innerWidth - wolf.offsetWidth) {
            wolfLeft = window.innerWidth - wolf.offsetWidth;
        }
        wolf.style.left = wolfLeft + 'px';
    }

    // Функция для перемещения волка синхронно с пальцем
    function moveWolfTo(positionX) {
        if (positionX < 0) positionX = 0;
        if (positionX > window.innerWidth - wolf.offsetWidth) {
            positionX = window.innerWidth - wolf.offsetWidth;
        }
        wolf.style.left = positionX + 'px';
    }
});
