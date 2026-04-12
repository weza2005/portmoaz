// 1. Smooth Scroll لروابط الـ Navbar
// عشان لما تدوس على Ferrari أو Lamborghini ينزل بهدوء مش فجأة
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 2. تأثير ظهور الصور (Scroll Reveal)
// أول ما تنزل عند قسم العربية، الصورة "تزحف" من اليمين للشمال
const carObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0) scale(1)';
        }
    });
}, { threshold: 0.3 });

// بنطبق التأثير على كل صور العربيات
document.querySelectorAll('.car-img').forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'translateX(100px) scale(0.8)';
    img.style.transition = 'all 1.2s cubic-bezier(0.17, 0.55, 0.55, 1)';
    carObserver.observe(img);
});

// 3. تأثير الـ 3D Tilt الخفيف مع الماوس
// عشان لما تحرك الماوس فوق العربية تحس إنها بتتحرك معاك "فخامة"
document.querySelectorAll('.car-section').forEach(section => {
    section.addEventListener('mousemove', (e) => {
        const img = section.querySelector('.car-img');
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;
        
        img.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.05)`;
    });

    section.addEventListener('mouseleave', (e) => {
        const img = section.querySelector('.car-img');
        img.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
    });
});

// 4. تغيير شكل الـ Navbar عند الـ Scroll
// عشان لما تنزل الـ Navbar ياخد خلفية سوداء شفافة شيك
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.padding = '15px 5%';
        nav.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        nav.style.padding = '20px 5%';
        nav.style.background = 'rgba(0, 0, 0, 0.7)';
    }
});
const observerOptions = {
    threshold: 0.4 // القسم يظهر أول ما 40% منه يبان
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            // لو عايز الأنيميشن يتكرر كل ما تطلع وتنزل (اختياري)
            // entry.target.classList.remove('active'); 
        }
    });
}, observerOptions);

// نطبق المراقب على كل Sections العربيات
document.querySelectorAll('.car-section').forEach(section => {
    sectionObserver.observe(section);
});
function startExperience() {
    const loader = document.getElementById('loader');
    const audio = document.getElementById('engine-start');
    
    // تشغيل الصوت
    audio.play().catch(error => console.log("Autoplay blocked, wait for interaction"));
    
    // إخفاء الشاشة بحركة فخمة
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
}
function initApp() {
            const startScreen = document.getElementById('start-screen');
            const mainContent = document.getElementById('main-content');
            const audio = document.getElementById('engine-audio');

            // 1. تشغيل الصوت (sund.mp3)
            audio.play().then(() => {
                console.log("Engine Revving...");
            }).catch(err => {
                console.log("Audio play failed:", err);
            });

            // 2. إخفاء شاشة البداية
            startScreen.style.opacity = '0';
            setTimeout(() => {
                startScreen.style.display = 'none';
                // 3. إظهار محتوى الموقع بنعومة
                mainContent.style.opacity = '1';
                document.body.style.overflow = 'auto'; // السماح بالسكرول بعد البدء
            }, 1000);
        }
        const burger = document.getElementById('hamburger-btn');
const nav = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // فتح/قفل المنيو
    nav.classList.toggle('active');
    
    // أنيميشن الـ X
    burger.classList.toggle('toggle');
});

// قفل المنيو لما تختار حاجة عشان ينزل للقسم صح
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
    });
});