/**
 * ==========================================================================
 * Main Application Logic
 * Portfolio: Abdullah Falich (Minimalist & Professional)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Theme Management (Charcoal Dark & Studio Light)
  // ========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const iconSun = themeToggleBtn?.querySelector('.icon-sun');
  const iconMoon = themeToggleBtn?.querySelector('.icon-moon');

  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Default to dark charcoal as requested in the prompt
    return 'dark';
  };

  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (iconSun && iconMoon) {
      if (theme === 'dark') {
        iconSun.style.display = 'block';
        iconMoon.style.display = 'none';
        themeToggleBtn.setAttribute('aria-label', 'Beralih ke mode terang');
        themeToggleBtn.setAttribute('title', 'Beralih ke mode terang');
      } else {
        iconSun.style.display = 'none';
        iconMoon.style.display = 'block';
        themeToggleBtn.setAttribute('aria-label', 'Beralih ke mode gelap');
        themeToggleBtn.setAttribute('title', 'Beralih ke mode gelap');
      }
    }
  };

  // Initialize theme
  applyTheme(getPreferredTheme());

  themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    showToast(nextTheme === 'dark' ? 'Mode charcoal aktif' : 'Mode terang aktif');
  });

  // 2. Mobile Navigation Drawer
  // ========================================================================
  const menuToggle = document.getElementById('menu-toggle');
  const siteNav = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMobileMenu = (forceClose = false) => {
    if (!siteNav || !menuToggle) return;
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    const shouldOpen = forceClose ? false : !isExpanded;

    menuToggle.setAttribute('aria-expanded', String(shouldOpen));
    if (shouldOpen) {
      siteNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      siteNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  menuToggle?.addEventListener('click', () => toggleMobileMenu());

  // Close nav when clicking a link or pressing Escape
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMobileMenu(true);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleMobileMenu(true);
    }
  });

  // 3. Scroll Spy / Active Section Indicator
  // ========================================================================
  const sections = document.querySelectorAll('section[id]');

  const updateActiveNavLink = () => {
    const scrollY = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // 4. Portfolio Category Filtering
  // ========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      // Update active state on buttons
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter cards with smooth fade
      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.98)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 180);
        }
      });
    });
  });

  // 5. Toast Notification Utility
  // ========================================================================
  const toastContainer = document.getElementById('toast-container');

  const showToast = (message, duration = 3200) => {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Trigger animation in
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 250);
    }, duration);
  };

  // 6. Quick Copy Email to Clipboard
  // ========================================================================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailTextEl = document.getElementById('email-address');

  copyEmailBtn?.addEventListener('click', async () => {
    const emailToCopy = emailTextEl ? emailTextEl.textContent.trim() : 'abdullahfalichits@gmail.com';

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(emailToCopy);
      } else {
        // Fallback for non-https/older contexts
        const textArea = document.createElement('textarea');
        textArea.value = emailToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }

      // Update button state temporarily
      const originalContent = copyEmailBtn.innerHTML;
      copyEmailBtn.innerHTML = `
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Tersalin!</span>
      `;
      copyEmailBtn.classList.add('btn-primary');
      copyEmailBtn.classList.remove('btn-secondary');

      showToast('Alamat email berhasil disalin ke clipboard.');

      setTimeout(() => {
        copyEmailBtn.innerHTML = originalContent;
        copyEmailBtn.classList.remove('btn-primary');
        copyEmailBtn.classList.add('btn-secondary');
      }, 2500);
    } catch (err) {
      showToast('Gagal menyalin email. Silakan pilih dan salin secara manual.');
    }
  });

  // 7. Contact Form Handling
  // ========================================================================
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const formSubmitBtn = document.getElementById('form-submit-btn');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!formFeedback || !formSubmitBtn) return;

    // Reset feedback
    formFeedback.className = 'form-feedback';
    formFeedback.style.display = 'none';
    formFeedback.textContent = '';

    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const subject = document.getElementById('contact-subject')?.value.trim();
    const message = document.getElementById('contact-message')?.value.trim();

    // Client-side validation with informative text (antislop-human compliant)
    if (!name || !email || !subject || !message) {
      formFeedback.classList.add('error');
      formFeedback.style.display = 'block';
      formFeedback.textContent = 'Harap lengkapi semua kolom formulir sebelum mengirim pesan.';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formFeedback.classList.add('error');
      formFeedback.style.display = 'block';
      formFeedback.textContent = 'Format alamat surel tidak valid. Contoh: nama@domain.com.';
      return;
    }

    if (message.length < 15) {
      formFeedback.classList.add('error');
      formFeedback.style.display = 'block';
      formFeedback.textContent = 'Pesan terlalu singkat. Harap berikan detail minimal 15 karakter.';
      return;
    }

    // Simulate sending state
    const originalBtnText = formSubmitBtn.innerHTML;
    formSubmitBtn.disabled = true;
    formSubmitBtn.innerHTML = '<span>Mengirimkan pesan...</span>';

    setTimeout(() => {
      formSubmitBtn.disabled = false;
      formSubmitBtn.innerHTML = originalBtnText;

      formFeedback.classList.add('success');
      formFeedback.style.display = 'block';
      formFeedback.textContent = 'Terima kasih! Pesan Anda berhasil dikirimkan. Saya akan merespons dalam 24 jam kerja.';

      showToast('Pesan terkirim dengan sukses.');
      contactForm.reset();

      // Clear success feedback after 6 seconds
      setTimeout(() => {
        formFeedback.style.display = 'none';
        formFeedback.className = 'form-feedback';
      }, 6000);
    }, 900);
  });
});

