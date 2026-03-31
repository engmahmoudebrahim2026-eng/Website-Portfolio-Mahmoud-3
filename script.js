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




const searchMap = [
    { name: 'Home', link: '/index.html#home' },
    { name: 'About', link: '/index.html#about' },
    { name: 'Skills', link: '/index.html#skills' },
    { name: 'Service', link: '/index.html#service' },
    { name: 'Project', link: '/index.html#project' },
    { name: 'Content', link: '/index.html#content' },

    { name: 'Projects', link: '/Projects.html' },
    { name: 'My Project', link: '/Projects.html#projects' },
    { name: 'Content', link: '/Projects.html#Contact' },

    { name: 'CV', link: '/cv.html' },
    { name: 'CV', link: '/cv.html#cv' },
    { name: 'CV Content', link: '/cv.html#Contact' },

    { name: 'Contact', link: '/contant.html' }
];

const input = document.getElementById('smartSearch');
const dropdown = document.getElementById('searchDropdown');

input.addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();
    dropdown.innerHTML = '';
    if (query === '') {
        dropdown.style.display = 'none';
        return;
    }

    const results = searchMap.filter(item => item.name.toLowerCase().includes(query));
    if (results.length === 0) {
        dropdown.innerHTML = `<div style="padding:10px;color:white;text-align:center;">No results found</div>`;
    } else {
        results.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item.name;
            div.style.padding = '10px';
            div.style.cursor = 'pointer';
            div.style.color = 'white';
            div.addEventListener('mouseenter', () => { div.style.background = 'rgba(34,211,238,0.08)'; });
            div.addEventListener('mouseleave', () => { div.style.background = 'transparent'; });
            div.addEventListener('click', () => { window.location.href = item.link; });
            dropdown.appendChild(div);
        });
    }
    dropdown.style.display = 'block';
});

// اختفاء الـ dropdown لما تضغط خارجها
document.addEventListener('click', function (e) {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
    }
});

// إمكانية الضغط Enter على أول نتيجة
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const first = dropdown.querySelector('div');
        if (first) window.location.href = searchMap.find(item => item.name === first.textContent).link;
    }
});


// ══════════════════════════════
//  DARK MODE
const htmlEl = document.documentElement;

// تحميل الوضع المحفوظ
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  htmlEl.setAttribute('data-theme', savedTheme);
}

// زرار التبديل
document.querySelectorAll('#darkToggle, #darkToggleMobile').forEach(btn => {
  btn.addEventListener('click', () => {
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem("theme", newTheme);
  });
});

  // Back to Top
  const backTop = document.getElementById('backToTop');
  if (backTop) {
    window.addEventListener('scroll', function() {
      backTop.classList.toggle('show', window.scrollY > 300);
    });
    backTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }