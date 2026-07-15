// Function to handle smooth screen transitions
function nextScreen(currentScreenId) {
    const current = document.getElementById(`screen-${currentScreenId}`);
    const next = document.getElementById(`screen-${currentScreenId + 1}`);

    current.style.opacity = '0';
    current.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        current.classList.remove('active');
        next.classList.add('active');
    }, 600); // Wait for fade out
}

// Logic for Screen 2 (Identity Verification)
function wrongAnswer() {
    const errorMsg = document.getElementById('error-msg');
    errorMsg.innerText = "Wrong! Tum Kama nahi ho sakte, itna dimaag toh usme hai hi nahi! Wapas try karo 😒";
    errorMsg.style.animation = "bounce 0.5s";
    setTimeout(() => errorMsg.style.animation = "none", 500);
}

// Logic for Screen 3 (Fake Brain Scanner - Kills time)
function startScanner() {
    nextScreen(2);
    
    const bar = document.getElementById('scan-bar');
    const text = document.getElementById('scan-text');
    
    let progress = 0;
    
    // Simulate a fake scanning process that takes about 6-7 seconds
    const scanInterval = setInterval(() => {
        progress += Math.random() * 10;
        if(progress > 95) progress = 95; // Stop at 95% temporarily
        
        bar.style.width = `${progress}%`;
        
        if (progress > 30 && progress < 60) {
            text.innerText = "Still searching... ek bhi brain cell nahi mil raha 🧐";
        } else if (progress > 60 && progress < 90) {
            text.innerText = "Wait, kuch mila... oh nahi, wo toh kachra hai 🗑️";
        }

    }, 800);

    // End scanner after 8 seconds
    setTimeout(() => {
        clearInterval(scanInterval);
        bar.style.width = "100%";
        bar.style.background = "#f43f5e"; // Turn red
        bar.style.boxShadow = "0 0 15px #f43f5e";
        text.innerText = "Result: 0 Brain Cells Found. Identity 100% Confirmed! ✅";
        text.style.color = "#10b981";
        
        setTimeout(() => {
            startTypingEffect();
        }, 2500);
    }, 8000);
}

// Logic for Screen 4 (Slow Emotional Typing Effect - Burns more time)
const message = "Dekh Kama, mazak apni jagah hai... Par tu sach mein meri zindagi ka sabse bada headache hai. 😂 Lekin tu mera favorite headache hai. Tere bina life kitni boring hoti na? Shayad main shanti se jee pata... par fir mujhe samajh kaun pata? We vibe perfectly because our mental illness level matches perfectly. 🤝";

function startTypingEffect() {
    nextScreen(3);
    const textContainer = document.getElementById('typewriter-text');
    let i = 0;
    
    function typeWriter() {
        if (i < message.length) {
            textContainer.innerHTML += message.charAt(i);
            i++;
            // Random delay to make it feel human (50ms to 150ms per character)
            let speed = Math.floor(Math.random() * 100) + 50; 
            setTimeout(typeWriter, speed);
        } else {
            // Show next button after typing is complete
            setTimeout(() => {
                const btn = document.getElementById('next-to-5');
                btn.style.display = "inline-block";
                btn.classList.remove('hidden');
                btn.style.animation = "popIn 0.5s forwards";
            }, 1000);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// Logic for Screen 5 (The Tricky 'No' Button)
const noBtn = document.getElementById('no-btn');
let noHoverCount = 0;

function dodgeButton(e) {
    noHoverCount++;
    e.preventDefault();

    // The button shrinks every time they try to click it
    let scale = 1 - (noHoverCount * 0.1);
    if(scale < 0.2) scale = 0; // Disappears eventually

    const x = Math.random() * (window.innerWidth - noBtn.clientWidth - 50);
    const y = Math.random() * (window.innerHeight - noBtn.clientHeight - 50);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.transform = `scale(${scale})`;
    
    if (noHoverCount > 6) {
        noBtn.innerText = "Daba ke dikha!";
    }
}

// Work for both mouse and touch (phones)
noBtn.addEventListener('mouseover', dodgeButton);
noBtn.addEventListener('touchstart', dodgeButton);
noBtn.addEventListener('click', dodgeButton);

// Logic for Screen 6 (Finale with Pure CSS Confetti Generator)
function finalScreen() {
    nextScreen(5);
    generateConfetti();
}

function generateConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#facc15', '#f43f5e', '#3b82f6', '#10b981', '#a855f7'];

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Randomize position, color, and size
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            
            // Randomize animation duration
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            
            container.appendChild(confetti);
            
            // Cleanup
            setTimeout(() => { confetti.remove(); }, 5000);
        }, i * 50); // Create them sequentially for a steady flow
    }
}
