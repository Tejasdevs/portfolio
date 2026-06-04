// Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle
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

// Navbar scroll
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile toggle
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

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ---- SCROLL PROGRESS BAR ----
const progressBar = document.getElementById('scroll-progress');

// ---- ACTIVE NAV ON SCROLL ----
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // Progress bar
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';

    // Active nav highlight
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollTop >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    allNavLinks.forEach(link => {
        link.classList.remove('nav-active');
        const href = link.getAttribute('href');
        if (href === '#' + current) {
            link.classList.add('nav-active');
        }
    });
});

// ---- DYNAMIC HERO WORD ----
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

// Page Load Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.remove();
    }, 2100);
});
