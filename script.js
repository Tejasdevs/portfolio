
document.getElementById('year').textContent = new Date().getFullYear();


const themeToggle = document.getElementById('themeToggle');

const currentTheme = localStorage.getItem('portfolio_theme') || 'dark';
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
} else {
    document.body.classList.remove('dark-mode');
    themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('portfolio_theme', 'dark');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('portfolio_theme', 'light');
    }
});

const nav = document.getElementById('navbar');

const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
    links.classList.toggle('open');
});
const navAnchors = links.querySelectorAll('a');
navAnchors.forEach(a => {
    a.addEventListener('click', (e) => {
        links.classList.remove('open');
        navAnchors.forEach(link => link.classList.remove('nav-cta'));
        e.currentTarget.classList.add('nav-cta');
    });
});


const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));


const progressBar = document.getElementById('scroll-progress');

const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

let scrollFrameRequested = false;
let activeSection = '';

const updateScrollState = () => {
    scrollFrameRequested = false;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.transform = `scaleX(${progress / 100})`;
    nav.classList.toggle('scrolled', scrollTop > 50);

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollTop >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    if (current !== activeSection) {
        activeSection = current;
        allNavLinks.forEach(link => {
            link.classList.toggle('nav-active', link.getAttribute('href') === '#' + current);
        });
    }
};

const requestScrollUpdate = () => {
    if (!scrollFrameRequested) {
        scrollFrameRequested = true;
        requestAnimationFrame(updateScrollState);
    }
};

window.addEventListener('scroll', requestScrollUpdate, { passive: true });
window.addEventListener('resize', requestScrollUpdate, { passive: true });
requestScrollUpdate();


const dynamicWord = document.getElementById('dynamic-word');
if (dynamicWord) {
    const words = ["creative", "scalable", "modern", "powerful", "AI-driven", "intelligent"];
    let wordIndex = 0;

    setInterval(() => {
        dynamicWord.style.opacity = '0';
        setTimeout(() => {
            dynamicWord.textContent = words[wordIndex];
            dynamicWord.style.opacity = '1';
            wordIndex = (wordIndex + 1) % words.length;
        }, 400);
    }, 2500);
}


const loader = document.getElementById('loader');
if (loader) {
    loader.addEventListener('animationend', () => loader.remove(), { once: true });
}
