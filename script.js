// =========== SCROLL PROGRESS BAR ===========
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// =========== NAVIGATION ===========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 100);
});

// =========== ACTIVE NAV LINK ===========
const updateActiveNav = () => {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        
        if (window.scrollY >= top && window.scrollY < bottom) {
            links.forEach(link => link.classList.remove('active'));
            document.querySelector(`.nav-link[href="#${section.id}"]`)?.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveNav);

// =========== LIGHTBOX ===========
const galleryImages = [
    'img/img1.png', 'img/img2.jpg', 'img/img3.jpg', 'img/img4.jpg',
    'img/img5.jpg', 'img/img6.jpg', 'img/img7.jpg', 'img/img8.jpg',
    'img/img9.jpg', 'img/img10.jpg', 'img/img11.jpg', 'img/img12.jpg',
    'img/img13.jpg', 'img/img14.jpg'
];

let currentIndex = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const currentEl = document.getElementById('current');

document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightbox.classList.add('active');
    updateLightboxImage();
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateLightboxImage() {
    lightboxImg.src = galleryImages[currentIndex];
    currentEl.textContent = currentIndex + 1;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-next').addEventListener('click', nextImage);
document.querySelector('.lightbox-prev').addEventListener('click', prevImage);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// =========== FADE-IN ANIMATIONS ===========
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

// =========== FORM SUBMISSION ===========
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('.submit-btn');
    const originalText = btn.textContent;
    btn.textContent = '✓ Odesláno!';
    btn.disabled = true;
    
    setTimeout(() => {
        e.target.reset();
        btn.textContent = originalText;
        btn.disabled = false;
    }, 2000);
});
