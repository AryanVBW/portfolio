// Boot Animation
function createParticles() {
  const particlesContainer = document.querySelector('.boot-particles');
  const particleCount = 80; // Increased particle count

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random delay
    particle.style.animationDelay = Math.random() * 3 + 's';
    
    // Random size variation
    const size = Math.random() * 3 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random rotation
    particle.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    particlesContainer.appendChild(particle);
  }
}

function updateStatusMessages() {
  const statusElement = document.querySelector('.boot-status');
  const messages = [
    "Loading core modules...",
    "Initializing system components...",
    "Establishing secure connection...",
    "Calibrating interface parameters...",
    "Preparing user experience...",
    "System ready in progress..."
  ];
  
  let currentIndex = 0;
  
  const interval = setInterval(() => {
    statusElement.style.opacity = '0';
    
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % messages.length;
      statusElement.textContent = messages[currentIndex];
      statusElement.style.opacity = '1';
    }, 500);
  }, 1000);
  
  return interval;
}

function initBootAnimation() {
  createParticles();
  const statusInterval = updateStatusMessages();
  
  // Add 3D tilt effect to boot content
  const bootContent = document.querySelector('.boot-content');
  document.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    bootContent.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });
  
  // Remove boot animation after it completes
  setTimeout(() => {
    clearInterval(statusInterval);
    const bootAnimation = document.querySelector('.boot-animation');
    bootAnimation.style.opacity = '0';
    setTimeout(() => {
      bootAnimation.remove();
    }, 1000);
  }, 3000);
}

// Initialize boot animation when DOM is loaded
document.addEventListener('DOMContentLoaded', initBootAnimation);

// Cursor and Click Handling
const cursorInner = document.querySelector('.cursor-inner');
const cursorOuter = document.querySelector('.cursor-outer');
const clickableElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');

// Mouse movement tracking
document.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorInner.style.left = `${posX}px`;
  cursorInner.style.top = `${posY}px`;

  cursorOuter.style.left = `${posX}px`;
  cursorOuter.style.top = `${posY}px`;
});

// Click handling
document.addEventListener('mousedown', () => {
  cursorInner.classList.add('click');
  cursorOuter.classList.add('click');
});

document.addEventListener('mouseup', () => {
  cursorInner.classList.remove('click');
  cursorOuter.classList.remove('click');
});

// Hover effects
clickableElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursorInner.classList.add('hover');
    cursorOuter.classList.add('hover');
  });

  element.addEventListener('mouseleave', () => {
    cursorInner.classList.remove('hover');
    cursorOuter.classList.remove('hover');
  });
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursorInner.style.opacity = '0';
  cursorOuter.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursorInner.style.opacity = '1';
  cursorOuter.style.opacity = '1';
});

// Ensure boot animation doesn't block clicks
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.remove('boot-animation');
  }, 3000);
}); 