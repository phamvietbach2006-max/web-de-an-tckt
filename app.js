/**
 * DE AN TAI CAU TRUC BAN TO CHUC - KIEM TRA
 * Doan TNCS Ho Chi Minh Dai hoc Bach khoa Ha Noi
 * Interactive scripts with GSAP 3.12, ScrollSpy & Mobile Optimizations
 */

document.addEventListener('DOMContentLoaded', () => {
  initGsapAnimations();
  initScrollSpy();
  initKpiCalculator();
  initAccordions();
  initMobileDrawer();
  initFloatingActionButtons();
});

// 1. GSAP ENTRANCE & COUNTERS
function initGsapAnimations() {
  if (typeof gsap === 'undefined') return;

  const counters = [
    { id: 'counter-total', target: 67 },
    { id: 'counter-core', target: 8 },
    { id: 'counter-depts', target: 5 },
    { id: 'counter-units', target: 12 }
  ];

  counters.forEach(c => {
    const el = document.getElementById(c.id);
    if (!el) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: c.target,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => {
        el.innerText = Math.round(obj.val).toString().padStart(2, '0');
      }
    });
  });

  gsap.from('#hero-header', {
    opacity: 0,
    y: 25,
    duration: 0.9,
    ease: 'power3.out'
  });

  gsap.from('.stat-card', {
    opacity: 0,
    y: 15,
    duration: 0.7,
    stagger: 0.1,
    delay: 0.2,
    ease: 'back.out(1.4)'
  });
}

// 2. SCROLLSPY & SMOOTH NAVIGATION
function initScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-section-link');
  const sections = document.querySelectorAll('.doc-section');

  function getOffset() {
    return window.innerWidth < 640 ? 115 : 95;
  }

  // Smooth scroll on click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const headerOffset = getOffset();
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        navLinks.forEach(l => {
          l.classList.remove('active', 'bg-blue-600', 'text-white', 'shadow-md');
          l.classList.add('text-slate-300');
        });
        link.classList.add('active', 'bg-blue-600', 'text-white', 'shadow-md');
        link.classList.remove('text-slate-300');

        // Close mobile drawer if open
        closeMobileDrawer();
      }
    });
  });

  // Scroll listener for active link highlight
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.pageYOffset + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = '#' + sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(l => {
        if (l.getAttribute('href') === currentId) {
          l.classList.add('active', 'bg-blue-600', 'text-white', 'shadow-md');
          l.classList.remove('text-slate-300');
          // Auto scroll horizontal nav bar to keep active item in view
          l.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          l.classList.remove('active', 'bg-blue-600', 'text-white', 'shadow-md');
          l.classList.add('text-slate-300');
        }
      });
    }
  });
}

// 3. KPI CALCULATOR (Phân loại chính xác A, B, C, D theo thang điểm 100)
function initKpiCalculator() {
  const s1 = document.getElementById('kpi-s1');
  const s2 = document.getElementById('kpi-s2');
  const s3 = document.getElementById('kpi-s3');
  const s4 = document.getElementById('kpi-s4');

  const v1 = document.getElementById('kpi-v1');
  const v2 = document.getElementById('kpi-v2');
  const v3 = document.getElementById('kpi-v3');
  const v4 = document.getElementById('kpi-v4');

  const totalEl = document.getElementById('kpi-total');
  const rankEl = document.getElementById('kpi-rank');
  const rankDesc = document.getElementById('kpi-rank-desc');
  const rankBadge = document.getElementById('kpi-rank-badge');

  function calculate() {
    if (!s1 || !s2 || !s3 || !s4) return;
    const score1 = parseInt(s1.value, 10);
    const score2 = parseInt(s2.value, 10);
    const score3 = parseInt(s3.value, 10);
    const score4 = parseInt(s4.value, 10);

    if (v1) v1.innerText = `${score1}/40đ`;
    if (v2) v2.innerText = `${score2}/30đ`;
    if (v3) v3.innerText = `${score3}/20đ`;
    if (v4) v4.innerText = `${score4}/10đ`;

    const total = score1 + score2 + score3 + score4;
    if (totalEl) totalEl.innerText = `${total}/100`;

    if (total >= 90) {
      if (rankEl) {
        rankEl.innerText = "LOẠI A - HOÀN THÀNH XUẤT SẮC";
        rankEl.className = "text-lg sm:text-xl font-black text-emerald-700";
      }
      if (rankBadge) {
        rankBadge.className = "inline-block px-4 sm:px-5 py-2 rounded-full font-black text-xs sm:text-sm bg-emerald-100 text-emerald-800 border-2 border-emerald-300 shadow-sm";
        rankBadge.innerText = "XẾP LOẠI: A - XUẤT SẮC";
      }
      if (rankDesc) {
        rankDesc.innerHTML = "🌟 <b>Đặc quyền:</b> Thành viên gương mẫu, vững chuyên môn, phản hồi cơ sở nhanh, bọc lót tích cực cho đồng đội. Được ưu tiên đề xuất Giấy khen Đoàn trường, cộng Điểm rèn luyện mức tối đa cho cán bộ Đoàn, ưu tiên xét chọn học lớp Cảm tình Đảng / Đoàn viên ưu tú và quy hoạch nguồn cán bộ kế cận.";
      }
    } else if (total >= 75) {
      if (rankEl) {
        rankEl.innerText = "LOẠI B - HOÀN THÀNH TỐT";
        rankEl.className = "text-lg sm:text-xl font-black text-blue-700";
      }
      if (rankBadge) {
        rankBadge.className = "inline-block px-4 sm:px-5 py-2 rounded-full font-black text-xs sm:text-sm bg-blue-100 text-blue-800 border-2 border-blue-300 shadow-sm";
        rankBadge.innerText = "XẾP LOẠI: B - HOÀN THÀNH TỐT";
      }
      if (rankDesc) {
        rankDesc.innerHTML = "🔵 <b>Đánh giá:</b> Hoàn thành đầy đủ nhiệm vụ chuyên môn và tác nghiệp, chấp hành tốt kỷ luật Ban; được tính điểm rèn luyện cán bộ Đoàn theo quy chế.";
      }
    } else if (total >= 60) {
      if (rankEl) {
        rankEl.innerText = "LOẠI C - HOÀN THÀNH";
        rankEl.className = "text-lg sm:text-xl font-black text-amber-700";
      }
      if (rankBadge) {
        rankBadge.className = "inline-block px-4 sm:px-5 py-2 rounded-full font-black text-xs sm:text-sm bg-amber-100 text-amber-800 border-2 border-amber-300 shadow-sm";
        rankBadge.innerText = "XẾP LOẠI: C - HOÀN THÀNH";
      }
      if (rankDesc) {
        rankDesc.innerHTML = "🟡 <b>Nhắc nhở:</b> Có biểu hiện chậm trễ tiến độ, để sót việc hoặc vắng họp/trực ca. Trưởng mảng sẽ trực tiếp trao đổi, nhắc nhở và phân công kèm cặp trong học kỳ tiếp theo.";
      }
    } else {
      if (rankEl) {
        rankEl.innerText = "LOẠI D - KHÔNG HOÀN THÀNH";
        rankEl.className = "text-lg sm:text-xl font-black text-red-700";
      }
      if (rankBadge) {
        rankBadge.className = "inline-block px-4 sm:px-5 py-2 rounded-full font-black text-xs sm:text-sm bg-red-100 text-red-800 border-2 border-red-300 shadow-sm";
        rankBadge.innerText = "XẾP LOẠI: D - KHÔNG HOÀN THÀNH";
      }
      if (rankDesc) {
        rankDesc.innerHTML = "🔴 <b>Cảnh báo:</b> Vi phạm kỷ luật; bỏ bê đơn vị phụ trách; để cơ sở khiếu nại nhiều lần hoặc vắng họp/trực ca không phép nhiều lần. Đưa ra khỏi nguồn tác nghiệp và xem xét cho thôi tham gia Ban TCKT.";
      }
    }
  }

  [s1, s2, s3, s4].forEach(s => s && s.addEventListener('input', calculate));
  calculate();
}

// 4. ACCORDION TOGGLE
function initAccordions() {
  const triggers = document.querySelectorAll('.accordion-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      const icon = trigger.querySelector('.accordion-icon');

      if (!targetEl) return;
      const isHidden = targetEl.classList.contains('hidden');
      
      if (isHidden) {
        targetEl.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      } else {
        targetEl.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
      }
    });
  });
}

// 5. MOBILE NAVIGATION DRAWER
function initMobileDrawer() {
  const drawer = document.getElementById('mobile-nav-drawer');
  const openBtn = document.getElementById('btn-open-mobile-menu');
  const closeBtn = document.getElementById('btn-close-mobile-menu');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');

  if (!drawer) return;

  function openDrawer() {
    drawer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const panel = drawer.querySelector('.drawer-panel');
      const backdrop = drawer.querySelector('.drawer-backdrop');
      if (panel) panel.classList.remove('translate-y-full');
      if (backdrop) backdrop.classList.remove('opacity-0');
    }, 10);
  }

  window.closeMobileDrawer = function() {
    const panel = drawer.querySelector('.drawer-panel');
    const backdrop = drawer.querySelector('.drawer-backdrop');
    if (panel) panel.classList.add('translate-y-full');
    if (backdrop) backdrop.classList.add('opacity-0');
    setTimeout(() => {
      drawer.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  };

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeMobileDrawer);

  const backdrop = drawer.querySelector('.drawer-backdrop');
  if (backdrop) backdrop.addEventListener('click', closeMobileDrawer);

  drawerLinks.forEach(l => {
    l.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = l.getAttribute('href');
      closeMobileDrawer();
      setTimeout(() => {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          const offset = window.innerWidth < 640 ? 115 : 95;
          const pos = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: pos, behavior: 'smooth' });
        }
      }, 320);
    });
  });
}

// 6. FLOATING ACTION BUTTONS (Back to top & Quick menu)
function initFloatingActionButtons() {
  const fabContainer = document.getElementById('mobile-fab-container');
  const backToTopBtn = document.getElementById('btn-back-to-top');
  const quickMenuBtn = document.getElementById('btn-quick-menu');

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (quickMenuBtn) {
    quickMenuBtn.addEventListener('click', () => {
      const openBtn = document.getElementById('btn-open-mobile-menu');
      if (openBtn) openBtn.click();
    });
  }

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      if (fabContainer) fabContainer.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-6');
    } else {
      if (fabContainer) fabContainer.classList.add('opacity-0', 'pointer-events-none', 'translate-y-6');
    }
  });
}

// 7. DIAGRAM VIEW TOGGLE (Mobile Cards vs Full SVG)
window.toggleDiagramView = function(diagId) {
  const svgWrapper = document.getElementById(`${diagId}-svg-wrap`);
  const mobileWrap = document.getElementById(`${diagId}-mobile-wrap`);
  const btnText = document.getElementById(`toggle-text-${diagId}`);
  const btnIcon = document.getElementById(`toggle-icon-${diagId}`);

  if (!svgWrapper || !mobileWrap) return;

  const isMobileVisible = !mobileWrap.classList.contains('hidden');

  if (isMobileVisible) {
    // Switch to SVG graphic
    mobileWrap.classList.add('hidden');
    svgWrapper.classList.remove('hidden');
    if (btnText) btnText.innerText = "Xem Thẻ Mobile";
    if (btnIcon) btnIcon.setAttribute('data-lucide', 'layers');
  } else {
    // Switch to Mobile Cards
    mobileWrap.classList.remove('hidden');
    svgWrapper.classList.add('hidden');
    if (btnText) btnText.innerText = "Xem Sơ Đồ Đồ Họa";
    if (btnIcon) btnIcon.setAttribute('data-lucide', 'git-fork');
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
};

// 8. FULLSCREEN DIAGRAM MODAL
window.openFullscreenModal = function(svgId, titleText) {
  const modal = document.getElementById('diagram-fullscreen-modal');
  const modalTitle = document.getElementById('modal-diagram-title');
  const modalContent = document.getElementById('modal-diagram-content');
  const originalSvg = document.getElementById(svgId);

  if (!modal || !modalContent || !originalSvg) return;

  if (modalTitle) modalTitle.innerText = titleText || "Sơ đồ chi tiết";
  modalContent.innerHTML = originalSvg.outerHTML;

  // Make the cloned SVG fill the viewport cleanly
  const clonedSvg = modalContent.querySelector('svg');
  if (clonedSvg) {
    clonedSvg.removeAttribute('id');
    clonedSvg.classList.remove('w-full');
    clonedSvg.style.minWidth = '950px';
    clonedSvg.style.maxWidth = '1600px';
    clonedSvg.style.height = 'auto';
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

window.closeFullscreenModal = function() {
  const modal = document.getElementById('diagram-fullscreen-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
};
