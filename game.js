let wolf, eggs = [], score = 0, missed = 0, eggFallInterval, eggSpawnInterval;
const eggSpawnRate = 2000;
const eggFallSpeed = 2;
const wolfMoveDistance = 15;

document.addEventListener('DOMContentLoaded', function () {
    wolf = document.getElementById('wolf');
    const scoreDisplay = document.getElementById('score');
    const startButton = document.getElementById('startButton');
    const leftControl = document.getElementById('leftControl');
    const rightControl = document.getElementById('rightControl');

    startButton.addEventListener('click', startGame);
    leftControl.addEventListener('click', () => moveWolf(-wolfMoveDistance));
    rightControl.addEventListener('click', () => moveWolf(wolfMoveDistance));

    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            moveWolf(-wolfMoveDistance);
        } else if (event.key === 'ArrowRight') {
            moveWolf(wolfMoveDistance);
        }
    });

    function startGame() {
        score = 0;
        missed = 0;
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

    function moveWolf(distance) {
        let wolfLeft = parseFloat(wolf.style.left) || 0;
        wolfLeft += distance;
        if (wolfLeft < 0) wolfLeft = 0;
        if (wolfLeft > window.innerWidth - wolf.offsetWidth) {
            wolfLeft = window.innerWidth - wolf.offsetWidth;
        }
        wolf.style.left = wolfLeft + 'px';
    }
});
