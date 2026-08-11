document.addEventListener('DOMContentLoaded', () => {

      /* --- 1. NAVBAR SCROLL EFFECT & ACTIVE LINK UPDATE --- */
      const navbar = document.getElementById('navbar');
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-links a');

      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        // Active Link Highlight
        let currentSection = '';
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.clientHeight;
          if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
          }
        });

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
          }
        });
      });

      /* --- 2. MOBILE MENU HAMBURGER TOGGLE --- */
      const hamburger = document.getElementById('hamburger');
      const navMenu = document.getElementById('navLinks');

      hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });

      // Close menu when clicking link
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          const icon = hamburger.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        });
      });

      /* --- 3. INTERACTIVE MENU FILTERING --- */
      const tabBtns = document.querySelectorAll('.tab-btn');
      const menuItems = document.querySelectorAll('.menu-item');

      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Update button active states
          tabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const category = btn.getAttribute('data-category');

          menuItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
              item.classList.remove('hide');
            } else {
              item.classList.add('hide');
            }
          });
        });
      });

      /* --- 4. SCROLL REVEAL ANIMATIONS (IntersectionObserver) --- */
      const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
      };

      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
      });

      /* --- 5. RESERVATION FORM VALIDATION --- */
      const bookingForm = document.getElementById('bookingForm');
      const successMessage = document.getElementById('successMessage');

      // Set min date to today
      const resDateInput = document.getElementById('resDate');
      const today = new Date().toISOString().split('T')[0];
      resDateInput.setAttribute('min', today);

      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        // Elements
        const name = document.getElementById('fullName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const date = document.getElementById('resDate');
        const time = document.getElementById('resTime');
        const guests = document.getElementById('guests');

        // Errors
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const phoneError = document.getElementById('phoneError');
        const dateError = document.getElementById('dateError');
        const timeError = document.getElementById('timeError');
        const guestsError = document.getElementById('guestsError');

        // Reset status
        [name, email, phone, date, time, guests].forEach(el => el.classList.remove('invalid'));
        [nameError, emailError, phoneError, dateError, timeError, guestsError].forEach(el => el.style.display = 'none');

        // Validate Full Name
        if (!name.value.trim()) {
          name.classList.add('invalid');
          nameError.style.display = 'block';
          isValid = false;
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
          email.classList.add('invalid');
          emailError.style.display = 'block';
          isValid = false;
        }

        // Validate Phone (digits & basic phone characters, min 8)
        const phoneRegex = /^[0-9+\s-]{8,}$/;
        if (!phone.value.trim() || !phoneRegex.test(phone.value.trim())) {
          phone.classList.add('invalid');
          phoneError.style.display = 'block';
          isValid = false;
        }

        // Validate Date
        if (!date.value) {
          date.classList.add('invalid');
          dateError.textContent = 'Please select a date.';
          dateError.style.display = 'block';
          isValid = false;
        } else if (date.value < today) {
          date.classList.add('invalid');
          dateError.textContent = 'Date cannot be in the past.';
          dateError.style.display = 'block';
          isValid = false;
        }

        // Validate Time
        if (!time.value) {
          time.classList.add('invalid');
          timeError.style.display = 'block';
          isValid = false;
        }

        // Validate Guests
        if (!guests.value) {
          guests.classList.add('invalid');
          guestsError.style.display = 'block';
          isValid = false;
        }

        // Submit Action
        if (isValid) {
          successMessage.style.display = 'block';
          bookingForm.reset();
          
          // Scroll success alert into view smoothly
          successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

          setTimeout(() => {
            successMessage.style.display = 'none';
          }, 8000);
        }
      });

    });