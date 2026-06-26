document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initScrollReveal();
  initMenuFilter();
  initGalleryModal();
  initReservationForm();
  initNewsletterForm();
  initBackToTop();
  initSmoothScroll();
  initActiveNavLink();
  setMinReservationDate();
});

/* ---- Preloader ---- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 600);
  });
}

/* ---- Navbar scroll effect ---- */
function initNavbar() {
  const navbar = document.getElementById('mainNav');
  const toggleNavBg = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  toggleNavBg();
  window.addEventListener('scroll', toggleNavBg, { passive: true });

  const navCollapse = document.getElementById('navMenu');
  document.querySelectorAll('#navMenu .nav-link, #navMenu .btn').forEach(link => {
    link.addEventListener('click', () => {
      const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
      if (bsCollapse) bsCollapse.hide();
    });
  });
}

/* ---- Scroll reveal animations ---- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.1}s`;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );
  reveals.forEach(el => observer.observe(el));
}

/* ---- Menu category filter ---- */
function initMenuFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      menuItems.forEach(item => {
        const category = item.dataset.category;
        const show = filter === 'all' || category === filter;

        if (show) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeUp 0.5s ease forwards';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

/* ---- Gallery lightbox ---- */
function initGalleryModal() {
  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('galleryModalImg');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      modalImg.src = item.dataset.img;
    });
  });

  modal.addEventListener('hidden.bs.modal', () => {
    modalImg.src = '';
  });
}

/* ---- Reservation form ---- */
function initReservationForm() {
  const form = document.getElementById('reservationForm');
  const successMsg = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    form.classList.add('was-validated');
    form.style.display = 'none';
    successMsg.classList.remove('d-none');

    setTimeout(() => {
      form.reset();
      form.classList.remove('was-validated');
      form.style.display = '';
      successMsg.classList.add('d-none');
      setMinReservationDate();
    }, 5000);
  });
}

function setMinReservationDate() {
  const dateInput = document.getElementById('date');
  if (!dateInput) return;
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

/* ---- Newsletter form ---- */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  const toastEl = document.getElementById('newsletterToast');
  const toast = new bootstrap.Toast(toastEl, { delay: 4000 });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) return;
    toast.show();
    form.reset();
  });
}

/* ---- Back to top button ---- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---- Smooth scroll for anchor links ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ---- Active nav link on scroll ---- */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navMenu .nav-link');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();
}
