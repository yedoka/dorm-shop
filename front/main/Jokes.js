function playRandomSound() {
  const sounds = ['sound1.mp3', 'sound1.mp3', 'sound1.mp3'];
  // Select a random sound
  const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
  // Create an audio element and play the sound
  const audio = new Audio('./Sounds/' + randomSound);
  audio.play();
}

function applyMovementToContainer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Container with ID ' + containerId + ' not found.');
        return;
    }

    const numberOfImages = 100; // Adjust as needed

    function getRandomPosition(element) {
        const x = Math.floor(Math.random() * (container.offsetWidth - element.clientWidth));
        const y = Math.floor(Math.random() * (container.offsetHeight - element.clientHeight));
        return { x, y };
    }

    for (let i = 0; i < numberOfImages; i++) {
        let img = document.createElement('img');
        img.src = './images/dick.png'; // Set the correct path to your image
        img.onerror = function() {
            console.error("Image can't be loaded, using fallback.");
            this.src = 'https://via.placeholder.com/50'; // Fallback image with smaller size
        };
        img.classList.add('movingImage');

        const { x, y } = getRandomPosition(img);
        img.style.left = x + 'px';
        img.style.top = y + 'px';

        container.appendChild(img);
        moveAndRotate(img);
    }

    function moveAndRotate(img) {
        let x = parseFloat(img.style.left, 10);
        let y = parseFloat(img.style.top, 10);
        let dx = (Math.random() * 4 + 1)/2; // Randomized speed
        let dy = (Math.random() * 4 + 1)/2;
        let angle = 0;
        let dAngle = Math.random() * 2 + 1; // Randomized rotation speed
        let rotateDirection = Math.random() < 0.5 ? -1 : 1; // Randomized rotation direction

        function update() {
            x += dx;
            y += dy;

            if (x + img.width > container.offsetWidth) {
                x = container.offsetWidth - img.width;
                dx = -dx;
            } else if (x < 0) {
                x = 0;
                dx = -dx;
            }

            if (y + img.height > container.offsetHeight) {
                y = container.offsetHeight - img.height;
                dy = -dy;
            } else if (y < 0) {
                y = 0;
                dy = -dy;
            }

            angle += dAngle * rotateDirection;
            img.style.transform = `rotate(${angle}deg)`;
            img.style.left = `${x}px`;
            img.style.top = `${y}px`;

            requestAnimationFrame(update);
        }

        update();
    }
};