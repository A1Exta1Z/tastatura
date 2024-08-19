const text = document.querySelector('.text');
const keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];

const timestamps = [];

const generateRandomText = length => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomText = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomText += characters[randomIndex];
    }
    return randomText;
}

const updateTextContent = () => {
    text.innerHTML = '';
    for (let i = 0; i < currentText.length; i++) {
        const span = document.createElement('span');
        span.textContent = currentText[i];
        text.appendChild(span);
    }
}

let currentText = generateRandomText(Math.floor(Math.random() * 33) + 1);
updateTextContent();

let currentIndex = 0;

const getTimestamp = () => {
    return Math.floor(Date.now() / 1000);
}

timestamps.unshift(getTimestamp());

document.addEventListener("keyup", event => {
    const keyPressed = event.key.toLowerCase();
    const keyElement = document.getElementById(keyPressed.toUpperCase());
    const highlightedKey = document.querySelector(".selected");
    const currentSpan = text.children[currentIndex];
    
    if (keyElement) {
        keyElement.classList.add("hit");
        keyElement.addEventListener('animationend', () => {
            keyElement.classList.remove("hit");
        });
    }
    
    if (highlightedKey) {
        if (keyPressed === currentText[currentIndex]) {
            timestamps.unshift(getTimestamp());
            const elapsedTime = timestamps[0] - timestamps[1];
            console.log(`Character per minute ${60/elapsedTime}`);
            highlightedKey.classList.remove("selected");
            currentSpan.classList.add('correct');
            currentIndex++;
            if (currentIndex < currentText.length) {
                targetNextKey();
            } else {
                currentText = generateRandomText(Math.floor(Math.random() * 33) + 1);
                currentIndex = 0;
                updateTextContent();
                targetNextKey();
            }
        } else {
            currentSpan.classList.add('incorrect');
        }
    }
});

const targetNextKey = () => {
    const nextChar = currentText[currentIndex].toUpperCase();
    const keyElement = document.getElementById(nextChar);
    if (keyElement) {
        keyElement.classList.add("selected");
    }
}

targetNextKey();
