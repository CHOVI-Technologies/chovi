/**
 * ============================================================
 * VICTOR NWAOKENYE — CHOVI TECHNOLOGIES
 * Main JavaScript
 * ============================================================
 * Sections:
 *   1. Navigation (scroll behavior, hamburger menu)
 *   2. Scroll animations (reveal on scroll)
 *   3. Scroll-to-top button
 *   4. Smooth scroll for anchor links
 * ============================================================
 */

// ============================================================
// 1. NAVIGATION
// ============================================================

const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.nav-mobile');

// Sticky nav — add .scrolled class after scrolling past 60px
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// Hamburger toggle
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    // Prevent body scroll when menu is open
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// ============================================================
// 2. SCROLL ANIMATIONS (Intersection Observer)
// ============================================================

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing once revealed for performance
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,      // Trigger when 12% of element is visible
    rootMargin: '0px 0px -40px 0px'  // Slightly before fully in view
  }
);

revealElements.forEach(el => revealObserver.observe(el));

// ============================================================
// 3. SCROLL-TO-TOP BUTTON
// ============================================================

const scrollTopBtn = document.querySelector('.scroll-top');

if (scrollTopBtn) {
  // Show button after scrolling 400px
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================
// 4. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = 72; // Height of fixed nav in px
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// ============================================================
// 5. HERO TYPING EFFECT (optional — comment out to disable)
// ============================================================

const typingTargets = document.querySelectorAll('[data-type]');

function typeText(el, text, speed = 60) {
  el.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

// Run on load with a small delay so page has settled
window.addEventListener('load', () => {
  typingTargets.forEach((el, idx) => {
    setTimeout(() => {
      const text = el.dataset.type;
      typeText(el, text);
    }, idx * 800 + 400);
  });
});

// ============================================================
// 6. CURSOR GLOW EFFECT (subtle, desktop only)
// ============================================================

if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(26,108,245,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
    left: -300px;
    top: -300px;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
}

// ============================================================
// 7. ACTIVE NAV LINK HIGHLIGHTING
// ============================================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  {
    threshold: 0.4,
    rootMargin: '-72px 0px 0px 0px'
  }
);

sections.forEach(s => sectionObserver.observe(s));
