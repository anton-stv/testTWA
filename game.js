let wolf, eggs = [], score = 0, missed = 0, eggFallInterval, eggSpawnInterval;
const eggSpawnRate = 1500; // Задержка между появлением яиц в миллисекундах
const eggFallSpeed = 4; // Скорость падения яиц

document.addEventListener('DOMContentLoaded', function () {
    wolf = document.getElementById('wolf');
    const scoreDisplay = document.getElementById('score');
    const startButton = document.getElementById('startButton');

    startButton.addEventListener('click', startGame);

    function startGame() {
        score = 0;
        missed = 0;
        eggs.forEach(egg => egg.remove());
        eggs = [];
        updateScore();

        startButton.style.display = 'none';

        eggSpawnInterval = setInterval(spawnEgg, eggSpawnRate);
        eggFallInterval = requestAnimationFrame(updateEggs);
    }

    function spawnEgg() {
        const egg = document.createElement('div');
        egg.classList.add('egg');
        egg.style.left = Math.random() * 90 + '%'; // Позиция яйца по ширине
        egg.style.top = '0px';
        document.getElementById('gameContainer').appendChild(egg);
        eggs.push(egg);
    }

    function updateEggs() {
        eggs.forEach((egg, index) => {
            const eggTop = parseFloat(egg.style.top);
            egg.style.top = eggTop + eggFallSpeed + 'px';

            // Проверка на ловлю яйца
            const wolfRect = wolf.getBoundingClientRect();
            const eggRect = egg.getBoundingClientRect();

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

    // Управление волком с помощью стрелок
    document.addEventListener('keydown', function (event) {
        const wolfLeft = parseFloat(wolf.style.left);
        if (event.key === 'ArrowLeft' && wolfLeft > 0) {
            wolf.style.left = wolfLeft - 15 + 'px';
        } else if (event.key === 'ArrowRight' && wolfLeft < window.innerWidth - wolf.offsetWidth) {
            wolf.style.left = wolfLeft + 15 + 'px';
        }
    });
});
