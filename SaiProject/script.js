 // Smooth Scroll
  document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Navbar Shadow
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('shadow-sm');
    } else {
      navbar.classList.remove('shadow-sm');
    }
  });

  // Scroll-to-top Button
  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scrollBtn';
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(scrollBtn);

  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  // Auto Collapse Navbar
  document.querySelectorAll('.navbar-collapse .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const navbarToggler = document.querySelector('.navbar-toggler');
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }
    });
  });

  // Section fade-in on scroll
  function revealSections() {
    document.querySelectorAll('section').forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        sec.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', revealSections);
  window.addEventListener('DOMContentLoaded', revealSections);

  // Animate room cards on hover
  document.querySelectorAll('.room-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('shadow-lg'));
    card.addEventListener('mouseleave', () => card.classList.remove('shadow-lg'));
  });

  // View All Rooms functionality
  const viewAllRoomsBtn = document.getElementById('viewAllRoomsBtn');
  const extraRooms = document.querySelectorAll('.extra-room');
  let allRoomsVisible = false;

  viewAllRoomsBtn.addEventListener('click', function() {
    allRoomsVisible = !allRoomsVisible;
    extraRooms.forEach(room => {
      if (allRoomsVisible) {
        room.classList.remove('d-none');
      } else {
        room.classList.add('d-none');
      }
    });
    viewAllRoomsBtn.textContent = allRoomsVisible ? 'Show Less' : 'View All Rooms';
    // Optional: scroll to rooms section when showing all
    if (allRoomsVisible) {
      document.getElementById('rooms').scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Horizontal drag-to-scroll for gallery (no auto-scroll)
  const gallery = document.querySelector('.gallery-row-scroll');
  let isDown = false;
  let startX, scrollLeft;

  if (gallery) {
    gallery.addEventListener('mousedown', (e) => {
      isDown = true;
      gallery.classList.add('active');
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    });
    gallery.addEventListener('mouseleave', () => {
      isDown = false;
      gallery.classList.remove('active');
    });
    gallery.addEventListener('mouseup', () => {
      isDown = false;
      gallery.classList.remove('active');
    });
    gallery.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 1.2;
      gallery.scrollLeft = scrollLeft - walk;
    });

    // Touch support
    gallery.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    });
    gallery.addEventListener('touchend', () => {
      isDown = false;
    });
    gallery.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - gallery.offsetLeft;
      const walk = (x - startX) * 1.2;
      gallery.scrollLeft = scrollLeft - walk;
    });

    // Enable horizontal scroll with mouse wheel (no Shift needed)
    gallery.addEventListener('wheel', function(e) {
      if (e.deltaY !== 0) {
        e.preventDefault();
        gallery.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }
