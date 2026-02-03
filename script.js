/* ===========================
   MS TV Download Page - Script
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

    // ============ PARTICLES ============
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = Math.random() * 15 + 10 + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.opacity = Math.random() * 0.3 + 0.1;

        const colors = ['#6C3BF5', '#F59E0B', '#10B981', '#8B5CF6'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        particlesContainer.appendChild(particle);
    }

    // ============ NAVBAR SCROLL ============
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============ MOBILE MENU ============
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ============ ANIMATED COUNTER ============
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current).toLocaleString('ar-EG');
            }, 16);
        });
    }

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        statsObserver.observe(heroStats);
    }

    // ============ DOWNLOAD MODAL ============
    const APK_URL = 'https://apk.e-droid.net/apk/app3908708-dfl5vy.apk?v=4';
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadModal = document.getElementById('downloadModal');
    const modalClose = document.getElementById('modalClose');
    const progressFill = document.getElementById('progressFill');
    const modalText = document.getElementById('modalText');
    const modalDownloadBtn = document.getElementById('modalDownloadBtn');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            downloadModal.classList.add('active');
            simulateProgress();
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            downloadModal.classList.remove('active');
            resetProgress();
        });
    }

    downloadModal.addEventListener('click', (e) => {
        if (e.target === downloadModal) {
            downloadModal.classList.remove('active');
            resetProgress();
        }
    });

    function simulateProgress() {
        let progress = 0;
        const messages = [
            { at: 0, text: 'جاري الاتصال بالسيرفر...' },
            { at: 30, text: 'جاري تحضير الملف...' },
            { at: 60, text: 'جاري التحقق من الأمان...' },
            { at: 90, text: 'الملف جاهز للتحميل!' }
        ];

        const interval = setInterval(() => {
            progress += Math.random() * 8 + 2;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                progressFill.style.width = '100%';
                modalText.textContent = 'الملف جاهز للتحميل!';
                modalDownloadBtn.href = APK_URL;
                modalDownloadBtn.style.display = 'inline-flex';
                return;
            }

            progressFill.style.width = progress + '%';

            for (const msg of messages) {
                if (progress >= msg.at) {
                    modalText.textContent = msg.text;
                }
            }
        }, 150);
    }

    function resetProgress() {
        progressFill.style.width = '0%';
        modalText.textContent = 'يرجى الانتظار...';
        modalDownloadBtn.style.display = 'none';
    }

    // ============ KEYBOARD ACCESSIBILITY ============
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            downloadModal.classList.remove('active');
            resetProgress();
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });

});
