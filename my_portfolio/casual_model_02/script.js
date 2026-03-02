// Cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
const themeToggle = document.getElementById('themeToggle');
const themeCards = document.querySelectorAll('[data-light-src][data-dark-src]');

function applyTheme(theme) {
    const darkMode = theme === 'dark';
    document.documentElement.classList.toggle('dark-theme', darkMode);

    if (themeToggle) {
        themeToggle.textContent = darkMode ? 'Light' : 'Dark';
        themeToggle.setAttribute('aria-pressed', darkMode ? 'true' : 'false');
        themeToggle.setAttribute('aria-label', darkMode ? 'Switch to light mode' : 'Switch to dark mode');
    }

    themeCards.forEach((card) => {
        card.src = darkMode ? card.dataset.darkSrc : card.dataset.lightSrc;
    });
}

let savedTheme = 'light';
try {
    if (localStorage.getItem('portfolio-theme') === 'dark') savedTheme = 'dark';
} catch (e) { }
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const nextTheme = document.documentElement.classList.contains('dark-theme') ? 'light' : 'dark';
        try {
            localStorage.setItem('portfolio-theme', nextTheme);
        } catch (e) { }
        applyTheme(nextTheme);
    });
}

let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx - 4 + 'px'; cursor.style.top = my - 4 + 'px'; });
setInterval(() => { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx - 18 + 'px'; ring.style.top = ry - 18 + 'px'; }, 16);
document.querySelectorAll('a,button').forEach(el => { el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2.5)'; ring.style.transform = 'scale(1.5)'; ring.style.borderColor = 'rgba(var(--accent-rgb),0.72)'; }); el.addEventListener('mouseleave', () => { cursor.style.transform = ''; ring.style.transform = ''; ring.style.borderColor = ''; }); });

// Typewriter
const phrases = ['Building full-stack web apps.', 'Exploring machine learning.', 'Turning ideas into products.', 'Writing clean, scalable code.', 'Learning something new every day.'];
let pi = 0, ci = 0, typing = true, wait = 0;
const tw = document.getElementById('typewriter');
function typeTick() {
    if (wait > 0) { wait--; setTimeout(typeTick, 80); return; }
    const phrase = phrases[pi];
    if (typing) {
        ci++;
        tw.innerHTML = phrase.slice(0, ci) + '<span class="type-cursor"></span>';
        if (ci >= phrase.length) { typing = false; wait = 24; }
        setTimeout(typeTick, 70);
    } else {
        ci--;
        tw.innerHTML = phrase.slice(0, ci) + '<span class="type-cursor"></span>';
        if (ci <= 0) { typing = true; pi = (pi + 1) % phrases.length; wait = 8; }
        setTimeout(typeTick, 35);
    }
}
typeTick();

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            // trigger skill bars
            e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                bar.style.width = bar.dataset.width + '%';
            });
        }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

// Also trigger bars for initially visible elements
setTimeout(() => {
    document.querySelectorAll('.skill-card.visible .skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
    });
}, 500);

// Animated counters
function animateCount(el, target, suffix = '') {
    const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            let val = 0; const step = Math.ceil(target / 50);
            const t = setInterval(() => { val = Math.min(val + step, target); el.textContent = val + (suffix); if (val >= target) clearInterval(t); }, 30);
            obs.disconnect();
        }
    });
    obs.observe(el);
}
animateCount(document.getElementById('cnt1'), 25);
animateCount(document.getElementById('cnt2'), 6);
animateCount(document.getElementById('cnt3'), 10, '+');
