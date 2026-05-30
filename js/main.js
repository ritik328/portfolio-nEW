/* ============================================================
   HRITIK PORTFOLIO — Interactions & Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Theme Switcher ────────────────────────────────────────
  const themeToggleBtns = document.querySelectorAll('#theme-toggle');
  
  // Set initial theme state from localStorage
  const initialTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', initialTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  });

  // ── Scroll Reveal ─────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  // ── Active Nav Link Tracking ──────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.top-nav a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === `#${id}`) {
            a.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.35,
    rootMargin: '-80px 0px -40% 0px'
  });

  sections.forEach(s => sectionObserver.observe(s));

  // ── Smooth Scroll ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        const offset = 90;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Counter Animation ─────────────────────────────────────
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el, target) {
    let current = 0;
    const increment = target / 40;
    const duration = 1200;
    const stepTime = duration / 40;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = '+' + Math.floor(current);
    }, stepTime);
  }


  // ── Project & Experience Item Click ───────────────────────
  document.querySelectorAll('.project-item, .experience-item, .thought-item').forEach(item => {
    item.style.cursor = 'pointer';
  });

  // ── Copyright Year ────────────────────────────────────────
  const year = new Date().getFullYear();
  const footerElement = document.querySelector('.footer p');
  if (footerElement && !footerElement.textContent.includes(year)) {
    footerElement.innerHTML = footerElement.innerHTML;
  }

  // ── Easter Egg: Developer Control Portal ──────────────────
  const profileImg = document.querySelector('.profile-photo-wrapper img');
  const devPortal = document.getElementById('dev-portal');
  
  if (profileImg && devPortal) {
    let clickCount = 0;
    let clickTimer = null;

    profileImg.addEventListener('click', () => {
      clickCount++;
      
      // Clear existing timer
      if (clickTimer) clearTimeout(clickTimer);

      // Reset click count after 3 seconds of inactivity
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 3000);

      // Trigger Dev Portal on 5th click
      if (clickCount === 5) {
        clickCount = 0;
        clearTimeout(clickTimer);
        openDevPortal();
      }
    });

    // Dev Portal Elements
    const closeBtn = document.getElementById('dev-portal-close');
    const resetBtn = document.getElementById('dev-portal-reset');
    const saveBtn = document.getElementById('dev-portal-save');
    const scaleSlider = document.getElementById('avatar-scale');
    const ySlider = document.getElementById('avatar-y');
    const fileInput = document.getElementById('avatar-upload');
    const fileNameLabel = document.getElementById('file-name-label');
    const styleBtns = document.querySelectorAll('.style-btn');
    const scaleDisplay = document.getElementById('scale-value-display');
    const yDisplay = document.getElementById('y-value-display');
    const photoWrapper = document.querySelector('.profile-photo-wrapper');

    // State Variables
    let currentScale = localStorage.getItem('profile-pic-scale') || '1';
    let currentY = localStorage.getItem('profile-pic-y') || '0';
    let currentRadius = localStorage.getItem('profile-pic-radius') || 'var(--radius-lg)';
    let customImgData = localStorage.getItem('custom-profile-pic') || '';

    // Apply saved configurations immediately on load
    applyProfileStyles();

    function openDevPortal() {
      // Setup sliders/inputs with current values
      scaleSlider.value = currentScale;
      ySlider.value = currentY;
      scaleDisplay.textContent = `${currentScale}x`;
      yDisplay.textContent = `${currentY}px`;
      fileNameLabel.textContent = customImgData ? "Custom image loaded" : "No file selected";
      
      styleBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-radius') === currentRadius);
      });

      devPortal.classList.add('open');
    }

    function closeDevPortal() {
      devPortal.classList.remove('open');
    }

    function applyProfileStyles() {
      if (customImgData) {
        profileImg.src = customImgData;
      }
      profileImg.style.transform = `scale(${currentScale}) translateY(${currentY}px)`;
      if (photoWrapper) {
        photoWrapper.style.borderRadius = currentRadius;
      }
    }

    // Slider Event Listeners (Real-time updates)
    scaleSlider.addEventListener('input', (e) => {
      currentScale = e.target.value;
      scaleDisplay.textContent = `${currentScale}x`;
      applyProfileStyles();
    });

    ySlider.addEventListener('input', (e) => {
      currentY = e.target.value;
      yDisplay.textContent = `${currentY}px`;
      applyProfileStyles();
    });

    // Style Button Listeners
    styleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        styleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentRadius = btn.getAttribute('data-radius');
        applyProfileStyles();
      });
    });

    // File Upload Handler (FileReader)
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        fileNameLabel.textContent = file.name;
        const reader = new FileReader();
        reader.onload = (event) => {
          customImgData = event.target.result;
          applyProfileStyles();
        };
        reader.readAsDataURL(file);
      }
    });

    // Close Actions
    closeBtn.addEventListener('click', closeDevPortal);
    
    saveBtn.addEventListener('click', () => {
      // Commit state to local storage
      localStorage.setItem('profile-pic-scale', currentScale);
      localStorage.setItem('profile-pic-y', currentY);
      localStorage.setItem('profile-pic-radius', currentRadius);
      if (customImgData) {
        localStorage.setItem('custom-profile-pic', customImgData);
      }
      closeDevPortal();
    });

    resetBtn.addEventListener('click', () => {
      if (confirm('Reset all profile card styling to default settings?')) {
        localStorage.removeItem('profile-pic-scale');
        localStorage.removeItem('profile-pic-y');
        localStorage.removeItem('profile-pic-radius');
        localStorage.removeItem('custom-profile-pic');
        
        // Reset defaults
        currentScale = '1';
        currentY = '0';
        currentRadius = 'var(--radius-lg)';
        customImgData = '';
        profileImg.src = 'assets/profile.jpg';
        
        applyProfileStyles();
        closeDevPortal();
      }
    });
  }

});
