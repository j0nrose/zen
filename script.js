// Zen Garden JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('nav-active');
        
        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        navToggle.classList.toggle('active');
        
        if (navToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Smooth scrolling for navigation links
    const navLinksAll = document.querySelectorAll('.nav-links a');
    navLinksAll.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('nav-active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Parallax effect for floating leaves
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const leaves = document.querySelectorAll('.leaf');
        
        leaves.forEach((leaf, index) => {
            const speed = 0.5 + (index * 0.2);
            leaf.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Rock Garden Interactive Ripples
    const rockGarden = document.querySelector('.rock-garden');
    
    rockGarden.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create ripple element
        const ripple = document.createElement('div');
        ripple.classList.add('garden-ripple');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 1000);
        
        // Add gentle rock movement
        const rocks = document.querySelectorAll('.rock');
        rocks.forEach(rock => {
            rock.style.transform = 'scale(1.05)';
            setTimeout(() => {
                rock.style.transform = 'scale(1)';
            }, 300);
        });
    });

    // Breathing Exercise
    const breatheBtn = document.getElementById('breathe-btn');
    const stopBtn = document.getElementById('stop-btn');
    const breathingCircle = document.querySelector('.breathing-circle');
    const breathText = document.querySelector('.breath-text');
    
    let breathingInterval;
    let isBreathing = false;
    
    const breathingSteps = [
        { text: 'Breathe In...', duration: 4000 },
        { text: 'Hold...', duration: 2000 },
        { text: 'Breathe Out...', duration: 4000 },
        { text: 'Rest...', duration: 2000 }
    ];
    
    let currentStep = 0;
    
    function startBreathing() {
        if (isBreathing) return;
        
        isBreathing = true;
        breathingCircle.classList.add('breathing');
        breatheBtn.style.opacity = '0.5';
        breatheBtn.disabled = true;
        
        function cycleBreathing() {
            const step = breathingSteps[currentStep];
            breathText.textContent = step.text;
            
            setTimeout(() => {
                currentStep = (currentStep + 1) % breathingSteps.length;
                if (isBreathing) {
                    cycleBreathing();
                }
            }, step.duration);
        }
        
        cycleBreathing();
    }
    
    function stopBreathing() {
        isBreathing = false;
        breathingCircle.classList.remove('breathing');
        breathText.textContent = 'Click to begin';
        breatheBtn.style.opacity = '1';
        breatheBtn.disabled = false;
        currentStep = 0;
    }
    
    breatheBtn.addEventListener('click', startBreathing);
    stopBtn.addEventListener('click', stopBreathing);
    
    // Click breathing circle to start
    breathingCircle.addEventListener('click', function() {
        if (!isBreathing) {
            startBreathing();
        }
    });

    // Zen Cards Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe zen cards
    const zenCards = document.querySelectorAll('.zen-card');
    zenCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('.form-input').value;
        
        if (email) {
            // Simulate form submission
            const btn = this.querySelector('.form-btn');
            const originalText = btn.textContent;
            btn.textContent = 'Subscribed! ✓';
            btn.style.background = 'var(--zen-gold)';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = 'var(--zen-green)';
                this.querySelector('.form-input').value = '';
            }, 2000);
        }
    });

    // Background ambient sounds (visual feedback only)
    let ambientActive = false;
    
    // Add ambient sound toggle (visual only)
    const ambientToggle = document.createElement('div');
    ambientToggle.innerHTML = '🔊';
    ambientToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: rgba(127, 176, 105, 0.9);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 1.2rem;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    ambientToggle.addEventListener('click', function() {
        ambientActive = !ambientActive;
        this.innerHTML = ambientActive ? '🔇' : '🔊';
        this.style.background = ambientActive ? 'rgba(212, 175, 55, 0.9)' : 'rgba(127, 176, 105, 0.9)';
        
        // Visual feedback for "ambient sounds"
        if (ambientActive) {
            document.body.style.filter = 'sepia(0.1)';
        } else {
            document.body.style.filter = 'none';
        }
    });
    
    document.body.appendChild(ambientToggle);

    // Random zen quotes
    const zenQuotes = [
        "The present moment is the only time over which we have dominion.",
        "Peace comes from within. Do not seek it without.",
        "You are the sky, everything else is just the weather.",
        "In the end, just three things matter: How well we have lived, how well we have loved, how well we have learned to let go.",
        "Wherever you are, be there totally.",
        "The quieter you become, the more you can hear.",
        "Let go or be dragged.",
        "The moon does not fight the clouds or the sky."
    ];

    // Add zen quote tooltip on hero section
    const heroContent = document.querySelector('.hero-content');
    let quoteTimeout;
    
    function showZenQuote() {
        const quote = zenQuotes[Math.floor(Math.random() * zenQuotes.length)];
        
        // Create quote element
        const quoteElement = document.createElement('div');
        quoteElement.style.cssText = `
            position: absolute;
            bottom: -60px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(139, 115, 85, 0.9);
            color: white;
            padding: 12px 20px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-style: italic;
            max-width: 300px;
            text-align: center;
            opacity: 0;
            transition: opacity 0.5s ease;
            z-index: 10;
        `;
        quoteElement.textContent = `"${quote}"`;
        
        heroContent.appendChild(quoteElement);
        
        // Fade in
        setTimeout(() => {
            quoteElement.style.opacity = '1';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            quoteElement.style.opacity = '0';
            setTimeout(() => {
                if (quoteElement.parentNode) {
                    quoteElement.remove();
                }
            }, 500);
        }, 5000);
    }
    
    // Show random quote every 15 seconds
    setInterval(showZenQuote, 15000);
    
    // Show first quote after 3 seconds
    setTimeout(showZenQuote, 3000);

    // Add subtle hover effects to rocks
    const rocks = document.querySelectorAll('.rock');
    rocks.forEach((rock, index) => {
        rock.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(5deg)';
            this.style.boxShadow = '0 8px 25px rgba(139, 115, 85, 0.4)';
        });
        
        rock.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 4px 15px rgba(139, 115, 85, 0.3)';
        });
    });

    // Keyboard shortcuts for zen experience
    document.addEventListener('keydown', function(e) {
        // Press 'B' to start breathing
        if (e.key === 'b' || e.key === 'B') {
            if (!isBreathing) {
                startBreathing();
            }
        }
        
        // Press 'S' to stop breathing
        if (e.key === 's' || e.key === 'S') {
            if (isBreathing) {
                stopBreathing();
            }
        }
        
        // Press 'M' to toggle ambient (visual effect)
        if (e.key === 'm' || e.key === 'M') {
            ambientToggle.click();
        }
        
        // Press 'Q' to show random quote
        if (e.key === 'q' || e.key === 'Q') {
            showZenQuote();
        }
    });

    // Add dynamic sand patterns to rock garden
    function createSandWave() {
        const sandPattern = document.querySelector('.sand-pattern');
        const wave = document.createElement('div');
        
        wave.style.cssText = `
            position: absolute;
            top: 0;
            left: -100px;
            width: 100px;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(139, 115, 85, 0.2), transparent);
            animation: sandWave 8s linear infinite;
        `;
        
        sandPattern.appendChild(wave);
        
        setTimeout(() => {
            wave.remove();
        }, 8000);
    }
    
    // Add CSS animation for sand wave
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sandWave {
            0% { left: -100px; }
            100% { left: 100%; }
        }
        
        .nav-active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(248, 249, 250, 0.98);
            backdrop-filter: blur(10px);
            padding: 1rem 0;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }
        
        .nav-active li {
            margin: 0.5rem 0;
            text-align: center;
        }
        
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create sand waves periodically
    setInterval(createSandWave, 12000);

    // Add gentle page transitions
    window.addEventListener('beforeunload', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
    });

    // Easter egg: Konami code for special zen mode
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === konamiSequence.length && 
            konamiCode.every((code, index) => code === konamiSequence[index])) {
            
            // Activate special zen mode
            document.body.style.filter = 'sepia(0.3) saturate(1.2)';
            
            // Add special particles
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    createFloatingParticle();
                }, i * 200);
            }
            
            // Show special message
            const specialMessage = document.createElement('div');
            specialMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(212, 175, 55, 0.95);
                color: white;
                padding: 20px 40px;
                border-radius: 15px;
                font-size: 1.2rem;
                text-align: center;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.5s ease;
            `;
            specialMessage.innerHTML = '✨ Special Zen Mode Activated ✨<br><small>Enhanced tranquility unlocked</small>';
            
            document.body.appendChild(specialMessage);
            
            setTimeout(() => {
                specialMessage.style.opacity = '1';
            }, 100);
            
            setTimeout(() => {
                specialMessage.style.opacity = '0';
                setTimeout(() => {
                    specialMessage.remove();
                }, 500);
            }, 3000);
        }
    });
    
    function createFloatingParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 10}px;
            animation: floatUp 6s linear forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 6000);
    }
    
    // Add float up animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-${window.innerHeight + 100}px) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(floatStyle);

    console.log('🧘 Zen Garden loaded. Press B to breathe, S to stop, M for ambient mode, Q for wisdom.');
});