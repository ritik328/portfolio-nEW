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
  const footer = document.querySelector('.footer p');
  if (footer && !footer.textContent.includes(year)) {
    footer.innerHTML = footer.innerHTML;
  }

});
