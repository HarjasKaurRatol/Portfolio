document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const closeMenu = document.getElementById('close-menu');
  
    // Handle multiple menu-toggle buttons (from both navbars)
    document.querySelectorAll('.menu-toggle').forEach(button => {
      button.addEventListener('click', () => {
        sidebar.classList.remove('-translate-x-full');
      });
    });
  
    closeMenu.addEventListener('click', () => {
      sidebar.classList.add('-translate-x-full');
    });
  
    // Auto-close sidebar on link click
    document.querySelectorAll('#sidebar a').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
      });
    });
  
    // Handle multiple open-drawer buttons (for contact drawer)
    document.querySelectorAll('.open-drawer').forEach(button => {
      button.addEventListener('click', () => {
        document.getElementById('bottomDrawer').classList.remove('translate-y-full');
      });
    });
  
    document.getElementById('closeDrawer').addEventListener('click', () => {
      document.getElementById('bottomDrawer').classList.add('translate-y-full');
    });
  
    // Navbar scroll behavior
    const navbarInitial = document.getElementById("navbarInitial");
    const navbarScrolled = document.getElementById("navbarScrolled");
    const hero = document.getElementById("hero");
  
    window.addEventListener("scroll", () => {
      const heroMiddle = hero.offsetTop + hero.offsetHeight / 2;
      const scrollY = window.scrollY + window.innerHeight / 2;
  
      if (scrollY > heroMiddle) {
        navbarScrolled.classList.remove("-translate-y-full");
        navbarInitial.classList.add("-translate-y-full");
      } else {
        navbarScrolled.classList.add("-translate-y-full");
        navbarInitial.classList.remove("-translate-y-full");
      }
    });
  });
//Skill Section Buttons 
  document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
  
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
  
        // Toggle active button styles
        filterButtons.forEach(b => b.classList.remove('active', 'text-white', 'border-b-2', 'border-white'));
        btn.classList.add('active', 'text-white', 'border-b-2', 'border-white');
  
        // Filter skill cards
        skillCards.forEach(card => {
          const matches = category === 'all' || card.dataset.category === category;
          card.style.display = matches ? 'block' : 'none';
        });
      });
    });
  });

  //Back to top button 
  // Back to top button toggle
window.addEventListener("scroll", () => {
  const btn = document.getElementById("backToTop");
  if (window.scrollY > 400) {
    btn.classList.remove("hidden");
  } else {
    btn.classList.add("hidden");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800, // animation duration
    easing: 'ease-in-out',
    once: true,    // animation triggers only once
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const moreBtn = document.getElementById('showMoreBtn');
  const hiddenSection = document.getElementById('moreExperience');

  moreBtn.addEventListener('click', () => {
    hiddenSection.classList.toggle('hidden');

    moreBtn.innerText = hiddenSection.classList.contains('hidden')
      ? 'Show More'
      : 'Show Less';
  });
});