// ===================================
// Anniversary Website - JavaScript
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Smooth Scroll Animation
    // ===================================
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===================================
    // Scroll Animation Observer
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // ===================================
    // Floating Hearts Animation
    // ===================================
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '💕';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.fontSize = (Math.random() * 1 + 1.5) + 'rem';
        
        const floatingHeartsContainer = document.querySelector('.floating-hearts');
        if (floatingHeartsContainer) {
            floatingHeartsContainer.appendChild(heart);
            
            // Remove heart after animation completes
            setTimeout(() => {
                heart.remove();
            }, 7000);
        }
    }
    
    // Create a new floating heart every 3 seconds
    setInterval(createFloatingHeart, 3000);
    
    // ===================================
    // Gallery Image Click Handler
    // ===================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const imgSrc = img.getAttribute('src');
            
            // Create lightbox
            createLightbox(imgSrc);
        });
    });
    
    function createLightbox(imageSrc) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${imageSrc}" alt="صورة مكبرة">
            </div>
        `;
        
        // Add styles dynamically
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        `;
        
        const content = lightbox.querySelector('.lightbox-content');
        content.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
        `;
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
            transition: color 0.3s ease;
        `;
        
        const img = lightbox.querySelector('img');
        img.style.cssText = `
            max-width: 100%;
            max-height: 90vh;
            border-radius: 8px;
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        `;
        
        // Append to body
        document.body.appendChild(lightbox);
        
        // Close on click
        closeBtn.addEventListener('click', () => {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => lightbox.remove(), 300);
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => lightbox.remove(), 300);
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                lightbox.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => lightbox.remove(), 300);
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }
    
    // ===================================
    // Parallax Effect on Hero Section
    // ===================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // ===================================
    // Dynamic Date Display
    // ===================================
    function updateAnniversaryDate() {
        const anniversaryDate = new Date('2024-12-07');
        const today = new Date();
        const diffTime = Math.abs(today - anniversaryDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // You can use this to display days passed
        console.log(`مرت ${diffDays} يوماً على اعترافنا بالحب`);
    }
    
    updateAnniversaryDate();
    
    // ===================================
    // Add Heartbeat Animation to Hearts
    // ===================================
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        setTimeout(() => {
            heart.style.animation = `float 6s ease-in-out infinite, heartbeat 1.5s ease infinite`;
        }, index * 200);
    });
    
    // ===================================
    // Timeline Animation Enhancement
    // ===================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });
    
    // ===================================
    // Add Loading Animation
    // ===================================
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ===================================
    // Console Message
    // ===================================
    console.log('%c💕 صُنع بكل الحب 💕', 'font-size: 20px; color: #ff6b9d; font-weight: bold;');
    console.log('%cهذا الموقع مصمم خصيصاً للاحتفال بسنة من الحب', 'font-size: 14px; color: #764ba2;');
});

// ===================================
// Fade Out Animation Keyframes
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
