let wolf, eggs = [], score = 0, missed = 0, eggFallInterval, eggSpawnInterval;
const eggSpawnRate = 2000; // Задержка между появлением яиц (уменьшено)
const eggFallSpeed = 2; // Скорость падения яиц (уменьшено)

document.addEventListener('DOMContentLoaded', function () {
    wolf = document.getElementById('wolf');
    const scoreDisplay = document.getElementById('score');
    const missedDisplay = document.createElement('div');
    missedDisplay.id = 'missed';
    missedDisplay.textContent = `Пропущено: ${missed}`;
    document.getElementById('gameContainer').appendChild(missedDisplay);

    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', startGame);

    function startGame() {
        score = 0;
        missed = 0;
        updateScore();
        updateMissed();
        eggs.forEach(egg => egg.remove());
        eggs = [];
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
                updateMissed();
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

    function updateMissed() {
        missedDisplay.textContent = `Пропущено: ${missed}`;
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
