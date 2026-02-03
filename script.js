// ===== 1. Scroll Progress Bar =====
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  document.querySelector('.scroll-progress').style.width = scrolled + '%';
});

// ===== 2. Particle Network Background =====
const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 60;
const connectionDistance = 130;
let mouse = { x: null, y: null };
let animationId;

function resizeCanvas() {
  const hero = document.getElementById('hero');
  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.size = Math.random() * 2 + 1;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    
    // Bounce off edges
    if(this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if(this.y < 0 || this.y > canvas.height) this.vy *= -1;
    
    // Mouse repulsion
    if(mouse.x != null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const distance = Math.sqrt(dx*dx + dy*dy);
      if(distance < 150) {
        const force = (150 - distance) / 150;
        this.x += dx * force * 0.02;
        this.y += dy * force * 0.02;
      }
    }
  }
  
  draw() {
    ctx.fillStyle = '#00d4ff';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00d4ff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

// Create particles
for(let i=0; i<particleCount; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw connections
  ctx.strokeStyle = 'rgba(0, 212, 255, 0.08)';
  ctx.lineWidth = 1;
  
  for(let i=0; i<particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    
    for(let j=i+1; j<particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      if(dist < connectionDistance) {
        const opacity = (1 - dist/connectionDistance) * 0.15;
        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  
  animationId = requestAnimationFrame(animateParticles);
}
animateParticles();

document.getElementById('hero').addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});
document.getElementById('hero').addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

// ===== 3. Typing Animation =====
const roles = ["Project Manager", "Data Analyst", "Automation Developer", "Product Analyst"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing-text');

function type() {
  const current = roles[roleIndex];
  
  if(isDeleting) {
    typingElement.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let speed = isDeleting ? 50 : 100;
  
  if(!isDeleting && charIndex === current.length) {
    speed = 2000; // Pause at end
    isDeleting = true;
  } else if(isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 500;
  }
  
  setTimeout(type, speed);
}
type();

// ===== 4. Intersection Observer for Fade-ins =====
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.12
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-delay');
      if(delay) {
        entry.target.style.transitionDelay = delay + 'ms';
      }
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach((el) => {
  observer.observe(el);
});

// ===== 5. 3D Tilt Cards (Disabled - no rotation effect) =====
// Cards remain static when hovering

// ===== 6. Spotlight Effect for Cards =====
document.querySelectorAll('.spotlight-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
  });
});

// ===== 7. Timeline Progress =====
const timeline = document.querySelector('.timeline');
const timelineProgress = document.querySelector('.timeline-progress');
if(timeline) {
  window.addEventListener('scroll', () => {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if(rect.top < windowHeight && rect.bottom > 0) {
      const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, scrollPercent));
      timelineProgress.style.height = (clamped * 100) + '%';
    }
  });
}

// ===== 8. Animated Counters =====
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      const stat = entry.target;
      const target = parseInt(stat.getAttribute('data-target'));
      const numEl = stat.querySelector('.num');
      const isPercent = numEl.textContent.includes('%');
      const duration = 2000;
      const start = 0;
      const startTime = performance.now();
      
      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        const current = Math.floor(easeOut * target);
        
        numEl.textContent = current + (isPercent ? '%' : '+');
        
        if(progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          numEl.textContent = target + (isPercent ? '%' : '+');
        }
      }
      
      requestAnimationFrame(updateCounter);
      counterObserver.unobserve(stat);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => counterObserver.observe(stat));

// ===== 9. Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if(target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== 10. Accessibility =====
document.querySelectorAll('.glass-btn, .cta-outline, .mini-btn, .btn').forEach(btn => {
  btn.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btn.click();
    }
  });
});