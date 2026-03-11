function animateBars() {
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = width + '%'; }, 300);
    });
}

// Fade up animation on scroll
const faders = document.querySelectorAll('.fade-up');
const appearOptions = { threshold: 0.3, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('show');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);
faders.forEach(fader => { appearOnScroll.observe(fader); });

// Contact Form Logic with Validation
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const messageDiv = document.getElementById('formMessage');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    // Reset previous states
    document.querySelectorAll('.form-control').forEach(el => {
        el.classList.remove('is-valid', 'is-invalid');
    });

    // Validate each required field
    form.querySelectorAll('input[required], textarea[required]').forEach(field => {
        const value = field.value.trim();

        if (!value) {
            field.classList.add('is-invalid');
            isValid = false;
        }
        else if (field.type === 'email' && (!value.includes('@') || !value.includes('.'))) {
            field.classList.add('is-invalid');
            isValid = false;
        }
        else {
            field.classList.add('is-valid');
        }
    });

    if (!isValid) {
        showMessage('يرجى تصحيح الأخطاء في الحقول المميزة باللون الأحمر', 'error');
        return;
    }

    // Simulate sending
    submitBtn.disabled = true;
    submitBtn.textContent = 'جاري الإرسال...';

    setTimeout(() => {
        showMessage('تم إرسال رسالتك بنجاح! شكراً لك', 'success');

        // Reset form
        form.reset();
        document.querySelectorAll('.form-control').forEach(el => {
            el.classList.remove('is-valid', 'is-invalid');
        });
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
    }, 1400);
});

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = 'form-message ' + type;
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'form-message';
    }, 6500);
}



const typed = new Typed('.multiple-text', {
    strings: ["Frontend Developer & Web Designer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});
