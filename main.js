var audio=document.getElementById("audioPlayer"),loader=document.getElementById("preloader");function settingtoggle(){document.getElementById("setting-container").classList.toggle("settingactivate"),document.getElementById("visualmodetogglebuttoncontainer").classList.toggle("visualmodeshow"),document.getElementById("soundtogglebuttoncontainer").classList.toggle("soundmodeshow")}function playpause(){!1==document.getElementById("switchforsound").checked?audio.pause():audio.play()}function visualmode(){document.body.classList.toggle("light-mode"),document.querySelectorAll(".needtobeinvert").forEach(function(e){e.classList.toggle("invertapplied")})}window.addEventListener("load",function(){loader.style.display="none",document.querySelector(".hey").classList.add("popup")});let emptyArea=document.getElementById("emptyarea"),mobileTogglemenu=document.getElementById("mobiletogglemenu");function hamburgerMenu(){document.body.classList.toggle("stopscrolling"),document.getElementById("mobiletogglemenu").classList.toggle("show-toggle-menu"),document.getElementById("burger-bar1").classList.toggle("hamburger-animation1"),document.getElementById("burger-bar2").classList.toggle("hamburger-animation2"),document.getElementById("burger-bar3").classList.toggle("hamburger-animation3")}function hidemenubyli(){document.body.classList.toggle("stopscrolling"),document.getElementById("mobiletogglemenu").classList.remove("show-toggle-menu"),document.getElementById("burger-bar1").classList.remove("hamburger-animation1"),document.getElementById("burger-bar2").classList.remove("hamburger-animation2"),document.getElementById("burger-bar3").classList.remove("hamburger-animation3")}const sections=document.querySelectorAll("section"),navLi=document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li"),mobilenavLi=document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");window.addEventListener("scroll",()=>{let e="";sections.forEach(t=>{let o=t.offsetTop;t.clientHeight,pageYOffset>=o-200&&(e=t.getAttribute("id"))}),mobilenavLi.forEach(t=>{t.classList.remove("activeThismobiletab"),t.classList.contains(e)&&t.classList.add("activeThismobiletab")}),navLi.forEach(t=>{t.classList.remove("activeThistab"),t.classList.contains(e)&&t.classList.add("activeThistab")})}),console.log("%c Designed and Developed by vivek w ","background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white;font-weight:900;font-size:1rem; padding:20px;");let mybutton=document.getElementById("backtotopbutton");function scrollFunction(){document.body.scrollTop>400||document.documentElement.scrollTop>400?mybutton.style.display="block":mybutton.style.display="none"}function scrolltoTopfunction(){document.body.scrollTop=0,document.documentElement.scrollTop=0}window.onscroll=function(){scrollFunction()},document.addEventListener("contextmenu",function(e){"IMG"===e.target.nodeName&&e.preventDefault()},!1);let Pupils=document.getElementsByClassName("footer-pupil"),pupilsArr=Array.from(Pupils),pupilStartPoint=-10,pupilRangeX=20,pupilRangeY=15,mouseXStartPoint=0,mouseXEndPoint=window.innerWidth,currentXPosition=0,fracXValue=0,mouseYEndPoint=window.innerHeight,currentYPosition=0,fracYValue=0,mouseXRange=mouseXEndPoint-mouseXStartPoint;const mouseMove=e=>{fracXValue=(currentXPosition=e.clientX-mouseXStartPoint)/mouseXRange,fracYValue=(currentYPosition=e.clientY)/mouseYEndPoint;let t=pupilStartPoint+fracXValue*pupilRangeX,o=pupilStartPoint+fracYValue*pupilRangeY;pupilsArr.forEach(e=>{e.style.transform=`translate(${t}px, ${o}px)`})},windowResize=e=>{mouseXEndPoint=window.innerWidth,mouseYEndPoint=window.innerHeight,mouseXRange=mouseXEndPoint-mouseXStartPoint};window.addEventListener("mousemove",mouseMove),window.addEventListener("resize",windowResize);

function openURL() {
  const pdfPath = window.location.origin + '/src/pdf/vivek-resume.pdf';
  window.open(pdfPath, '_blank');
}

// Scroll Animation Observer
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: Stop observing after animation
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Start observing all elements with scroll-animate class
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.scroll-animate');
  animatedElements.forEach(element => observer.observe(element));
});

// Custom cursor
const cursorInner = document.querySelector('.cursor-inner');
const cursorOuter = document.querySelector('.cursor-outer');

document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  
  // Update cursor position with smooth transition
  cursorInner.style.transition = 'transform 0.1s ease';
  cursorOuter.style.transition = 'transform 0.2s ease';
  
  cursorInner.style.transform = `translate(${x}px, ${y}px)`;
  cursorOuter.style.transform = `translate(${x}px, ${y}px)`;
});

// Add hover effect for interactive elements
const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');

interactiveElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursorOuter.style.transition = 'transform 0.2s ease, background 0.2s ease';
    cursorOuter.style.transform = `translate(${element.getBoundingClientRect().left + element.offsetWidth / 2}px, ${element.getBoundingClientRect().top + element.offsetHeight / 2}px) scale(1.5)`;
    cursorOuter.style.background = 'rgba(255, 255, 255, 0.2)';
  });
  
  element.addEventListener('mouseleave', () => {
    cursorOuter.style.transition = 'transform 0.2s ease, background 0.2s ease';
    cursorOuter.style.transform = `translate(${element.getBoundingClientRect().left + element.offsetWidth / 2}px, ${element.getBoundingClientRect().top + element.offsetHeight / 2}px) scale(1)`;
    cursorOuter.style.background = 'rgba(255, 255, 255, 0.1)';
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

// Boot Animation
function createParticles() {
  const particlesContainer = document.querySelector('.boot-particles');
  const particleCount = 30; // Reduced from 80 to 30

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random delay
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    // Fixed size for better performance
    particle.style.width = '3px';
    particle.style.height = '3px';
    
    particlesContainer.appendChild(particle);
  }
}

function updateStatusMessages() {
  const statusElement = document.querySelector('.boot-status');
  const messages = [
    "Loading...",
    "Almost there...",
    "Ready!"
  ];
  
  let currentIndex = 0;
  
  const interval = setInterval(() => {
    statusElement.style.opacity = '0';
    
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % messages.length;
      statusElement.textContent = messages[currentIndex];
      statusElement.style.opacity = '1';
    }, 300);
  }, 1000);
  
  return interval;
}

function initBootAnimation() {
  createParticles();
  const statusInterval = updateStatusMessages();
  
  // Remove boot animation after it completes
  setTimeout(() => {
    clearInterval(statusInterval);
    const bootAnimation = document.querySelector('.boot-animation');
    bootAnimation.style.opacity = '0';
    setTimeout(() => {
      bootAnimation.remove();
    }, 500);
  }, 2000); // Reduced from 3000ms to 2000ms
}

// Initialize boot animation when DOM is loaded
document.addEventListener('DOMContentLoaded', initBootAnimation);

// Ensure boot animation doesn't block clicks
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.remove('boot-animation');
  }, 2000);
});
