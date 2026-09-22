// Website Opening & Romantic Interactive Logic (Mobile & Desktop Compatible)

document.addEventListener('DOMContentLoaded', () => {
    const openingScreen = document.getElementById('opening-screen');
    const openBtn = document.getElementById('open-btn');
    const mainContent = document.getElementById('main-content');
    const bgMusicToggle = document.getElementById('music-toggle');
    const replayBtn = document.getElementById('replay-btn');
    const heartContainer = document.getElementById('heart-container');

    let audioCtx = null;
    let isMuted = false;
    let isPlayingMelody = false;
    let melodyInterval = null;

    // --- Web Audio API Romantic Ambient Melody ---
    function initAudio() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                audioCtx = new AudioContext();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    function playSoftChime(freq, duration = 1.5, type = 'sine') {
        if (!audioCtx || isMuted) return;
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            
            // Soft attack and fade out
            gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            console.log('Audio playback info:', e);
        }
    }

    function startRomanticMelody() {
        if (isPlayingMelody) return;
        isPlayingMelody = true;
        
        const notes = [523.25, 659.25, 783.99, 987.77, 880.00, 698.46, 587.33, 783.99];
        let noteIndex = 0;

        notes.slice(0, 4).forEach((freq, idx) => {
            setTimeout(() => playSoftChime(freq, 2), idx * 250);
        });

        melodyInterval = setInterval(() => {
            if (!isMuted && audioCtx) {
                playSoftChime(notes[noteIndex], 2);
                noteIndex = (noteIndex + 1) % notes.length;
            }
        }, 800);
    }

    function stopRomanticMelody() {
        if (melodyInterval) clearInterval(melodyInterval);
        isPlayingMelody = false;
    }

    // --- Unlock Audio on First Mobile Touch ---
    const unlockAudioOnMobile = () => {
        initAudio();
        document.removeEventListener('touchstart', unlockAudioOnMobile);
        document.removeEventListener('pointerdown', unlockAudioOnMobile);
    };
    document.addEventListener('touchstart', unlockAudioOnMobile, { passive: true });
    document.addEventListener('pointerdown', unlockAudioOnMobile, { passive: true });

    // --- Music Toggle Handler ---
    if (bgMusicToggle) {
        const toggleMusic = (e) => {
            if (e) e.stopPropagation();
            initAudio();
            isMuted = !isMuted;
            if (isMuted) {
                bgMusicToggle.classList.add('muted');
                bgMusicToggle.innerHTML = '🔇 Music Off';
                stopRomanticMelody();
            } else {
                bgMusicToggle.classList.remove('muted');
                bgMusicToggle.innerHTML = '🎵 Music On';
                startRomanticMelody();
            }
        };

        bgMusicToggle.addEventListener('click', toggleMusic);
    }

    // --- Opening Sequence ---
    if (openBtn) {
        const triggerOpen = (e) => {
            if (e) e.preventDefault();
            initAudio();
            startRomanticMelody();
            
            const rect = openBtn.getBoundingClientRect();
            createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);

            openingScreen.classList.add('opened');
            setTimeout(() => {
                openingScreen.style.display = 'none';
                mainContent.classList.add('visible');
            }, 900);
        };

        openBtn.addEventListener('click', triggerOpen);
        openBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            triggerOpen(e);
        });
    }

    // --- Replay Opening ---
    if (replayBtn) {
        replayBtn.addEventListener('click', () => {
            openingScreen.style.display = 'flex';
            void openingScreen.offsetWidth;
            openingScreen.classList.remove('opened');
            mainContent.classList.remove('visible');
        });
    }

    // --- Continuous Background Floating Hearts ---
    function spawnFloatingHeart() {
        if (!heartContainer) return;
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        
        const hearts = ['❤️', '💖', '💕', '💗', '✨', '🌸', '💘'];
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
        heart.style.fontSize = (Math.random() * 16 + 14) + 'px';
        heart.style.opacity = Math.random() * 0.7 + 0.3;

        heartContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);
    }

    setInterval(spawnFloatingHeart, 450);

    // --- Interactive Sparkles & Hearts on Click / Tap ---
    const handlePointerBurst = (x, y, target) => {
        if (target && (target.tagName === 'BUTTON' || target.closest('button'))) return;
        createHeartBurst(x, y, 6);
        playSoftChime(400 + Math.random() * 400, 0.8, 'triangle');
    };

    window.addEventListener('click', (e) => {
        handlePointerBurst(e.clientX, e.clientY, e.target);
    });

    window.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches[0]) {
            handlePointerBurst(e.touches[0].clientX, e.touches[0].clientY, e.target);
        }
    }, { passive: true });

    function createHeartBurst(x, y, count = 10) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('click-particle');
            
            const symbols = ['❤️', '💖', '✨', '💕', '🌸'];
            particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            const destinationX = (Math.random() - 0.5) * 160;
            const destinationY = (Math.random() - 0.5) * 160;
            const rotation = Math.random() * 360;

            particle.style.setProperty('--dx', `${destinationX}px`);
            particle.style.setProperty('--dy', `${destinationY}px`);
            particle.style.setProperty('--rot', `${rotation}deg`);

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1200);
        }
    }
});
