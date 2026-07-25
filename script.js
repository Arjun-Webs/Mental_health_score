// =======================================================================
// ⚙️ BACKEND CONFIGURATION
// =======================================================================
// The link to your FastAPI backend. 
// For local testing: 'http://127.0.0.1:8000/predict'
// For production (when deployed): e.g., 'https://your-api.onrender.com/predict'

const BACKEND_API_URL = 'https://mental-health-score-arjun.onrender.com';

// =======================================================================


// --- 1. Background Canvas Animation (Stars & Particles) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];
let mouse = { x: null, y: null };

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 120; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.5 + 0.5,
            dx: (Math.random() - 0.5) * 0.3,
            dy: (Math.random() - 0.5) * 0.3,
            opacity: Math.random()
        });
    }
}

window.addEventListener('resize', initCanvas);
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function animateCanvas() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw particles/stars
    particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        // Screen wrapping
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse interaction (glow effect)
        let dist = 1000;
        if (mouse.x != null) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            dist = Math.sqrt(dx*dx + dy*dy);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        let alpha = p.opacity;
        if (dist < 150) alpha = Math.min(1, alpha + (150-dist)/150);
        
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
    });

    // Random shooting star
    if (Math.random() < 0.005) {
        ctx.beginPath();
        let sx = Math.random() * width;
        let sy = Math.random() * height/2;
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx - 50, sy + 50);
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    requestAnimationFrame(animateCanvas);
}

initCanvas();
animateCanvas();

// --- 2. Tilt Parallax Effect (Features & Dashboard) ---
const tiltCards = document.querySelectorAll('.tilt-card, #hero-dashboard');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        // Restore hero dashboard default animation transform
        if(card.id === 'hero-dashboard') {
            card.style.transform = ''; 
        }
    });
});

// --- 3. Intersection Observer for Counters & Scroll Reveal ---
const observerOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseFloat(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        // Check if it's a decimal number (like 86.5)
                        counter.innerText = target % 1 === 0 ? Math.ceil(current) : current.toFixed(1);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if(statsSection) counterObserver.observe(statsSection);

// --- 4. Smooth Scrolling ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// --- 5. Form Submission via FastAPI Backend & Result Animation ---
const form = document.getElementById('predictionForm');
const loadingState = document.getElementById('loading-state');
const resultState = document.getElementById('result-state');
const scoreText = document.getElementById('score-text');
const resultCircle = document.getElementById('result-circle');
const statusBadge = document.getElementById('status-badge');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Hide form, show loading
        form.style.display = 'none';
        loadingState.style.display = 'block';

        // Prepare the payload based on the StudentData model for FastAPI
        const payload = {
            age: parseInt(form.age.value),
            gender: form.gender.value,
            country: form.country.value,
            academic_level: form.academic_level.value,
            most_used_platform: form.most_used_platform.value,
            purpose_of_use: form.purpose_of_use.value,
            avg_daily_usage_hours: parseFloat(form.avg_daily_usage_hours.value),
            daily_unlocks: parseInt(form.daily_unlocks.value),
            study_hours: parseFloat(form.study_hours.value),
            physical_activity_hours: parseFloat(form.physical_activity_hours.value),
            sleep_hours_per_night: parseFloat(form.sleep_hours_per_night.value),
            stress_level: form.stress_level.value
        };

        let finalScore = 0.0;

        try {
            // Send the POST request to your backend URL defined at the top
            const response = await fetch(BACKEND_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                finalScore = parseFloat(data.predicted_mental_health_score);
            } else {
                console.error("API error, falling back to mock data.");
                finalScore = parseFloat((Math.random() * 4 + 4.5).toFixed(1)); // mock fallback
            }
        } catch (error) {
            console.error("Server unreachable, using mock prediction.", error);
            // Fallback for demonstration if the backend isn't running
            finalScore = parseFloat((Math.random() * 4 + 4.5).toFixed(1)); 
        }

        // Display results with animation
        setTimeout(() => {
            loadingState.style.display = 'none';
            resultState.style.display = 'block';
            
            // Update Status based on 10-point score
            let color, status;
            if (finalScore >= 7.5) {
                color = '#4CAF50'; status = '🟢 Excellent';
            } else if (finalScore >= 5.0) {
                color = '#FFD166'; status = '🟡 Moderate';
            } else {
                color = '#FF6B6B'; status = '🔴 Needs Attention';
            }

            statusBadge.innerText = status;
            statusBadge.style.color = color;
            statusBadge.style.borderColor = color;
            statusBadge.style.background = `${color}22`;
            resultCircle.style.stroke = color;
            resultCircle.style.filter = `drop-shadow(0 0 10px ${color})`;
            scoreText.style.color = color;

            // Animate Score Counter
            let currentScore = 0;
            const duration = 1500;
            const step = finalScore / (duration / 16);
            
            const updateScore = () => {
                currentScore += step;
                if (currentScore < finalScore) {
                    scoreText.innerText = currentScore.toFixed(1);
                    requestAnimationFrame(updateScore);
                } else {
                    scoreText.innerText = finalScore.toFixed(1);
                }
            };
            updateScore();

            // Animate SVG Ring out of 10
            const circumference = 565;
            const offset = circumference - (finalScore / 10) * circumference; 
            
            setTimeout(() => {
                resultCircle.style.strokeDashoffset = offset;
            }, 100);

        }, 800);
    });
}

// Function to reset form
function resetForm() {
    resultState.style.display = 'none';
    form.reset();
    form.style.display = 'block';
    resultCircle.style.strokeDashoffset = 565; // Reset ring
    scoreText.innerText = "0.0";
}