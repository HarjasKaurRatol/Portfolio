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
    duration: 900,
    easing: 'ease-out-cubic',
    once: true,
    offset: 40,
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const moreBtn = document.getElementById('showMoreBtn');
  const hiddenSection = document.getElementById('moreExperience');

  if (!moreBtn || !hiddenSection) return;

  moreBtn.addEventListener('click', () => {
    hiddenSection.classList.toggle('hidden');

    moreBtn.innerText = hiddenSection.classList.contains('hidden')
      ? 'Show More'
      : 'Show Less';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Apply consistent staggered delays to section cards for smoother reveal rhythm.
  const staggerSelectors = [
    '#skills .skill-card',
    '#soft-skills .group',
    '#projects .grid > div',
    '#experience #moreExperience .relative'
  ];

  staggerSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (!element.getAttribute('data-aos')) {
        element.setAttribute('data-aos', 'fade-up');
      }
      element.setAttribute('data-aos-delay', String((index % 6) * 80));
    });
  });

  // AOS already scanned the DOM before these attributes were added; make it look again.
  if (window.AOS) AOS.refreshHard();
});

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('profileReveal');
  const canvas = document.getElementById('profileRevealCanvas');
  if (!container || !canvas) return;

  const ctx = canvas.getContext('2d');
  const pixelImg = new Image();
  pixelImg.src = 'assets/images/Pixal%20Image.png';

  const OBJECT_POSITION_Y = 0.5;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const PRIME_COLOR = '#0a0a0a';
  let width = 0;
  let height = 0;
  let fadeFrame = null;
  let hasAssembled = false;

  function drawPixelLayer(alpha) {
    if (!pixelImg.complete || !width || !height) return;
    const scale = Math.max(width / pixelImg.naturalWidth, height / pixelImg.naturalHeight);
    const sw = width / scale;
    const sh = height / scale;
    const sx = (pixelImg.naturalWidth - sw) * 0.5;
    const sy = (pixelImg.naturalHeight - sh) * OBJECT_POSITION_Y;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(pixelImg, sx, sy, sw, sh, 0, 0, width, height);
    ctx.restore();
  }

  function resizeCanvas() {
    const rect = container.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    if (hasAssembled) {
      drawPixelLayer(1);
    } else if (width && height) {
      ctx.fillStyle = PRIME_COLOR;
      ctx.fillRect(0, 0, width, height);
    }
  }

  function assembleIn() {
    if (!pixelImg.complete || !width || !height) return;

    const GRID = 14;
    const scale = Math.max(width / pixelImg.naturalWidth, height / pixelImg.naturalHeight);
    const sw = width / scale;
    const sh = height / scale;
    const sx = (pixelImg.naturalWidth - sw) * 0.5;
    const sy = (pixelImg.naturalHeight - sh) * OBJECT_POSITION_Y;

    const cellW = width / GRID;
    const cellH = height / GRID;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxDist = Math.hypot(centerX, centerY);

    const cells = [];
    for (let j = 0; j < GRID; j++) {
      for (let i = 0; i < GRID; i++) {
        const finalX = i * cellW;
        const finalY = j * cellH;
        const vx = finalX + cellW / 2 - centerX;
        const vy = finalY + cellH / 2 - centerY;
        const dist = Math.hypot(vx, vy) || 1;
        const nx = vx / dist;
        const ny = vy / dist;
        const flyDist = 50 + Math.random() * 100;
        cells.push({
          sx: sx + (i / GRID) * sw,
          sy: sy + (j / GRID) * sh,
          sw: sw / GRID,
          sh: sh / GRID,
          finalX,
          finalY,
          startX: finalX + nx * flyDist,
          startY: finalY + ny * flyDist,
          delay: (dist / maxDist) * 380 + Math.random() * 220,
          duration: 380 + Math.random() * 220
        });
      }
    }

    hasAssembled = false;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      ctx.fillStyle = PRIME_COLOR;
      ctx.fillRect(0, 0, width, height);

      let allDone = true;
      cells.forEach((cell) => {
        const t = Math.min(Math.max((elapsed - cell.delay) / cell.duration, 0), 1);
        if (t < 1) allDone = false;
        if (t <= 0) return;
        const eased = 1 - Math.pow(1 - t, 3);
        const x = cell.startX + (cell.finalX - cell.startX) * eased;
        const y = cell.startY + (cell.finalY - cell.startY) * eased;
        ctx.save();
        ctx.globalAlpha = eased;
        ctx.drawImage(pixelImg, cell.sx, cell.sy, cell.sw, cell.sh, x, y, cellW + 0.5, cellH + 0.5);
        ctx.restore();
      });

      if (!allDone) {
        requestAnimationFrame(step);
      } else {
        hasAssembled = true;
        drawPixelLayer(1);
      }
    }

    requestAnimationFrame(step);
  }

  function cancelFade() {
    if (fadeFrame !== null) {
      cancelAnimationFrame(fadeFrame);
      fadeFrame = null;
    }
  }

  function revealAt(x, y) {
    const radius = Math.max(width, height) * 0.24;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(0,0,0,1)');
    gradient.addColorStop(0.65, 'rgba(0,0,0,0.5)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }

  function fadeBackToPixel() {
    let alpha = 0;
    const step = () => {
      alpha = Math.min(alpha + 0.035, 1);
      ctx.clearRect(0, 0, width, height);
      drawPixelLayer(alpha);
      fadeFrame = alpha < 1 ? requestAnimationFrame(step) : null;
    };
    cancelFade();
    fadeFrame = requestAnimationFrame(step);
  }

  function pointFromEvent(e) {
    const rect = container.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  }

  pixelImg.onload = () => {
    resizeCanvas();
    assembleIn();
  };
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  container.addEventListener('mousemove', (e) => {
    if (!hasAssembled) return;
    cancelFade();
    const { x, y } = pointFromEvent(e);
    revealAt(x, y);
  });

  container.addEventListener('mouseleave', () => {
    if (!hasAssembled) return;
    fadeBackToPixel();
  });

  container.addEventListener('touchmove', (e) => {
    if (!hasAssembled) return;
    cancelFade();
    const { x, y } = pointFromEvent(e);
    revealAt(x, y);
  }, { passive: true });

  container.addEventListener('touchend', fadeBackToPixel);
});
