const yesBtn = document.getElementById('yesButton');
const noBtn = document.getElementById('noButton');
const responseDiv = document.getElementById('response');
const buttonContainer = document.querySelector('.button-container');
const heading = document.querySelector('h1');
const surePrompt = document.getElementById('surePrompt');

let hoverCount = 0;
let yesStep = 1; // 1 = Αρχή, 2 = Σίγουρα, 3 = 100%
let rainInterval = null;

// --- Λειτουργία για το κουμπί ΝΑΙ ---
yesBtn.addEventListener('click', () => {
    if (yesStep === 1) {
        // --- ΒΗΜΑ 1: Η πρώτη ερώτηση ---
        surePrompt.style.display = 'block';
        surePrompt.innerText = "Σίγουρα; 🤨";
        yesBtn.innerText = "Ναιιι σίγουρα ❤️";
        yesStep = 2;
        
        // Μικρή βροχή για 1 δευτερόλεπτο
        triggerShortRain();

    } else if (yesStep === 2) {
        // --- ΒΗΜΑ 2: Η δεύτερη ερώτηση (ΝΕΟ) ---
        surePrompt.innerText = "100%; 🤨🤨"; // Αλλάζουμε την ερώτηση
        yesBtn.innerText = "ΣΕ ΛΑΤΡΕΥΩ ΞΕΚΟΛΛΑ"; // Αλλάζουμε το κουμπί
        yesStep = 3;

        // Μικρή βροχή ξανά για 1 δευτερόλεπτο
        triggerShortRain();

    } else {
        // --- ΒΗΜΑ 3: ΤΕΛΟΣ ---
        heading.style.display = 'none';
        surePrompt.style.display = 'none';
        buttonContainer.style.display = 'none';

        responseDiv.innerHTML = "AYYYY ΠΑΜΕ ΛΙΓΟΟΟΟ!";
        responseDiv.style.display = 'block';

        // Μόνιμη βροχή (καθαρίζουμε τυχόν παλιές και ξεκινάμε τη γρήγορη)
        if (rainInterval) clearInterval(rainInterval);
        rainInterval = setInterval(createHeart, 100); 
    }
});

// --- Λειτουργία για το κουμπί ΟΧΙ ---
noBtn.addEventListener('mouseover', () => {
    if (hoverCount < 5) {
        const range = 350;
        const randomX = Math.floor(Math.random() * (range * 2)) - range;
        const randomY = Math.floor(Math.random() * (range * 2)) - range;
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
        hoverCount++;
    } else {
        noBtn.style.transform = `translate(0px, 0px)`;
    }
});

// --- ΔΡΑΜΑΤΙΚΟ ΤΕΛΟΣ (ΟΧΙ) ---
noBtn.addEventListener('click', () => {
    heading.style.display = "none";
    surePrompt.style.display = 'none';
    buttonContainer.style.display = 'none';
    document.body.classList.add('dramatic-mode');
    responseDiv.innerHTML = "ΟΚ ΡΕ ΝΑ ΠΕΘΑΝΩ";
    responseDiv.classList.add('sad-text');
    
    if (rainInterval) clearInterval(rainInterval);
});


// --- ΒΟΗΘΗΤΙΚΕΣ ΣΥΝΑΡΤΗΣΕΙΣ ---

// Συνάρτηση για σύντομη βροχή (1 δευτερόλεπτο)
function triggerShortRain() {
    if (rainInterval) clearInterval(rainInterval);
    rainInterval = setInterval(createHeart, 30); // Ξεκινάει
    
    setTimeout(() => {
        clearInterval(rainInterval); // Σταματάει μετά από 1s
    }, 1000);
}

// Συνάρτηση που φτιάχνει ΜΙΑ καρδιά
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('falling-heart');
    
    const hearts = ['❤️', '💖', '💕', '💗', '🥰', '😍'];
    heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
    
    heart.style.left = Math.random() * 100 + 'vw';
    
    const size = Math.random() * 30 + 20; 
    heart.style.fontSize = size + 'px';
    
    const duration = Math.random() * 3 + 2;
    heart.style.animationDuration = duration + 's';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}