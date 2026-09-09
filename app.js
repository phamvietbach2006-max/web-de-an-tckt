/**
 * DE AN TAI CAU TRUC BAN TO CHUC - KIEM TRA
 * Doan TNCS Ho Chi Minh Dai hoc Bach khoa Ha Noi
 * World-Class UI/UX & Motion Design Powered by GSAP 3.12 & ScrollTrigger
 */

let isProgrammaticScrolling = false;

document.addEventListener('DOMContentLoaded', () => {
  // Register ScrollTrigger if available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  initScreenBorderProgress();
  initHeroAnimations();
  initSpotlightCards();
  initScrollSpyWithPill();
  initScrollReveals();
  initAccordion();
  initKpiCalculator();
  initUnitLookup();
  initRaciFilter();
  initMobileDrawer();
  initFloatingActionButtons();
  initPlanFilter();
  initDiagramInteractivity();

  if (window.lucide) {
    lucide.createIcons();
  }
});

// -------------------------------------------------------------------------
// 1. 4-EDGE ROUNDED SCREEN BORDER PROGRESS (GSAP / SVG POWERED)
// -------------------------------------------------------------------------
function initScreenBorderProgress() {
  const thumb = document.getElementById('screen-border-thumb');
  const track = document.getElementById('screen-border-track');
  const svg = document.getElementById('screen-border-svg');
  if (!thumb || !svg) return;

  let totalLength = 0;

  function resizeBorder() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const inset = w < 640 ? 5 : 8;
    const rx = w < 640 ? 14 : 20;

    const rectW = Math.max(10, w - (inset * 2));
    const rectH = Math.max(10, h - (inset * 2));

    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

    [track, thumb].forEach(el => {
      if (!el) return;
      el.setAttribute('x', inset);
      el.setAttribute('y', inset);
      el.setAttribute('width', rectW);
      el.setAttribute('height', rectH);
      el.setAttribute('rx', rx);
      el.setAttribute('ry', rx);
    });

    try {
      totalLength = thumb.getTotalLength();
    } catch (e) {
      totalLength = 2 * (rectW + rectH) - ((8 - 2 * Math.PI) * rx);
    }

    thumb.style.strokeDasharray = `${totalLength}`;
    updateProgress();
  }

  function updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;

    if (totalLength > 0) {
      const offset = totalLength * (1 - progress);
      thumb.style.strokeDashoffset = `${offset}`;
    }
  }

  window.addEventListener('resize', resizeBorder, { passive: true });
  window.addEventListener('scroll', updateProgress, { passive: true });

  resizeBorder();
}

// -------------------------------------------------------------------------
// 2. HERO TIMELINE & ENTRANCE ANIMATION (GSAP MASTER TIMELINE)
// -------------------------------------------------------------------------
function initHeroAnimations() {
  if (typeof gsap === 'undefined') {
    document.querySelectorAll('.stat-card, #hero-title, #hero-badge, #hero-cta').forEach(el => el.removeAttribute('style'));
    return;
  }

  try {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('#hero-badge', 
      { y: -15, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6 }
    )
    .fromTo('#hero-title', 
      { y: 20, opacity: 0.4 }, 
      { y: 0, opacity: 1, duration: 0.7 }, 
      '-=0.3'
    )
    .fromTo('#hero-cta', 
      { scale: 0.95, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)' }, 
      '-=0.3'
    )
    .fromTo('.stat-card', 
      { y: 25, opacity: 0.5 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.08, 
        clearProps: 'transform,opacity',
        onComplete: () => {
          document.querySelectorAll('.stat-card').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
          });
        }
      }, 
      '-=0.2'
    );
  } catch (err) {
    console.warn('Hero GSAP animation skipped:', err);
    document.querySelectorAll('.stat-card, #hero-title, #hero-badge, #hero-cta').forEach(el => el.removeAttribute('style'));
  }

  // Failsafe timeout
  setTimeout(() => {
    document.querySelectorAll('.stat-card, #hero-title, #hero-badge, #hero-cta').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }, 900);

  // Smooth Numeric Counters
  const counters = [
    { id: 'counter-total', target: 68 },
    { id: 'counter-core', target: 8 },
    { id: 'counter-depts', target: 4 },
    { id: 'counter-units', target: 12 }
  ];

  counters.forEach(c => {
    const el = document.getElementById(c.id);
    if (!el) return;

    let obj = { val: 0 };
    gsap.to(obj, {
      val: c.target,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => {
        el.innerText = Math.floor(obj.val).toString().padStart(2, '0');
      }
    });
  });
}

// -------------------------------------------------------------------------
// 3. MOUSE-FOLLOWING SPOTLIGHT CARDS (GSAP.COM AESTHETIC)
// -------------------------------------------------------------------------
function initSpotlightCards() {
  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// -------------------------------------------------------------------------
// 4. SCROLLSPY & SMOOTH NAVIGATION WITH SLIDING ACTIVE PILL
// -------------------------------------------------------------------------
function initScrollSpyWithPill() {
  const navLinks = document.querySelectorAll('.nav-section-link');
  const sections = document.querySelectorAll('.doc-section');
  const navContainer = document.getElementById('main-nav-tabs');
  const activePill = document.getElementById('nav-active-pill');

  function getOffset() {
    return window.innerWidth < 640 ? 115 : 95;
  }

  function movePillTo(linkEl) {
    if (!activePill || !linkEl || !navContainer) return;
    const navRect = navContainer.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();
    const targetLeft = linkRect.left - navRect.left + navContainer.scrollLeft;

    if (typeof gsap !== 'undefined') {
      gsap.to(activePill, {
        x: targetLeft,
        width: linkRect.width,
        duration: 0.32,
        ease: 'power2.out'
      });
    } else {
      activePill.style.transform = `translateX(${targetLeft}px)`;
      activePill.style.width = `${linkRect.width}px`;
    }
  }

  // Initialize pill on the active link
  const initialActive = document.querySelector('.nav-section-link.active') || navLinks[0];
  if (initialActive) {
    setTimeout(() => { movePillTo(initialActive); }, 150);
  }

  // Smooth scroll on click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        isProgrammaticScrolling = true;
        const headerOffset = getOffset();
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update active class & pill
        navLinks.forEach(l => {
          l.classList.remove('active', 'text-white');
          l.classList.add('text-slate-300');
        });
        link.classList.add('active', 'text-white');
        link.classList.remove('text-slate-300');
        movePillTo(link);

        closeMobileDrawer();

        setTimeout(() => {
          isProgrammaticScrolling = false;
        }, 750);
      }
    });
  });

  // Scroll listener for active link highlight
  window.addEventListener('scroll', () => {
    if (isProgrammaticScrolling) return;

    let currentId = '';
    const scrollPos = window.pageYOffset + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = '#' + sec.id;
      }
    });

    if (currentId) {
      navLinks.forEach(l => {
        if (l.getAttribute('href') === currentId) {
          if (!l.classList.contains('active')) {
            navLinks.forEach(other => {
              other.classList.remove('active', 'text-white');
              other.classList.add('text-slate-300');
            });
            l.classList.add('active', 'text-white');
            l.classList.remove('text-slate-300');
            movePillTo(l);

            // Keep nav scrolled to visible item
            if (navContainer) {
              const navRect = navContainer.getBoundingClientRect();
              const linkRect = l.getBoundingClientRect();
              const diff = linkRect.left - navRect.left - (navContainer.clientWidth / 2) + (linkRect.width / 2);
              navContainer.scrollLeft += diff;
            }
          }
        }
      });
    }
  }, { passive: true });
}

// -------------------------------------------------------------------------
// 5. SCROLL-DRIVEN REVEALS (GSAP SCROLLTRIGGER)
// -------------------------------------------------------------------------
function initScrollReveals() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const sections = document.querySelectorAll('.doc-section');
  sections.forEach(sec => {
    gsap.fromTo(sec, 
      { opacity: 0.9, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sec,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true
        },
        clearProps: 'transform,opacity'
      }
    );
  });
}

// -------------------------------------------------------------------------
// 6. ACCORDION LOGIC
// -------------------------------------------------------------------------
function initAccordion() {
  const triggers = document.querySelectorAll('.accordion-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-target');
      const content = document.getElementById(targetId);
      const icon = trigger.querySelector('.accordion-icon');

      if (!content) return;

      const isExpanded = !content.classList.contains('hidden');
      if (isExpanded) {
        content.classList.add('hidden');
        if (icon) icon.classList.remove('rotate-180');
      } else {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(content, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
        }
      }
    });
  });
}

// -------------------------------------------------------------------------
// 7. INTERACTIVE KPI CALCULATOR (100 DIEM) WITH SMOOTH GSAP TRANSITIONS
// -------------------------------------------------------------------------
function initKpiCalculator() {
  const sliderCM = document.getElementById('slider-cm');
  const sliderPH = document.getElementById('slider-ph');
  const sliderKL = document.getElementById('slider-kl');
  const sliderSK = document.getElementById('slider-sk');

  const valCM = document.getElementById('val-cm');
  const valPH = document.getElementById('val-ph');
  const valKL = document.getElementById('val-kl');
  const valSK = document.getElementById('val-sk');

  const totalScoreEl = document.getElementById('kpi-total-score');
  const kpiBadge = document.getElementById('kpi-rating-badge');
  const kpiDesc = document.getElementById('kpi-rating-desc');
  const kpiProgressBar = document.getElementById('kpi-progress-bar');

  if (!sliderCM || !sliderPH || !sliderKL || !sliderSK) return;

  let currentTotal = 0;

  function updateKpi() {
    const cm = parseInt(sliderCM.value) || 0;
    const ph = parseInt(sliderPH.value) || 0;
    const kl = parseInt(sliderKL.value) || 0;
    const sk = parseInt(sliderSK.value) || 0;

    if (valCM) valCM.innerText = cm + ' / 40đ';
    if (valPH) valPH.innerText = ph + ' / 30đ';
    if (valKL) valKL.innerText = kl + ' / 20đ';
    if (valSK) valSK.innerText = sk + ' / 10đ';

    const total = cm + ph + kl + sk;

    if (totalScoreEl) {
      if (typeof gsap !== 'undefined') {
        let scoreObj = { val: currentTotal };
        gsap.to(scoreObj, {
          val: total,
          duration: 0.35,
          ease: 'power1.out',
          onUpdate: () => {
            totalScoreEl.innerText = Math.round(scoreObj.val);
          }
        });
      } else {
        totalScoreEl.innerText = total;
      }
      currentTotal = total;
    }

    if (kpiProgressBar) {
      kpiProgressBar.style.width = total + '%';
    }

    // Official Tier evaluation (Table 6)
    let newTier = '';
    let badgeClass = '';
    let descText = '';
    let barClass = '';

    if (total >= 90) {
      newTier = 'LOẠI A - HOÀN THÀNH XUẤT SẮC';
      badgeClass = 'inline-block px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm';
      descText = 'Biểu dương, xem xét giao nhiệm vụ và đề xuất khen thưởng theo điều kiện áp dụng.';
      barClass = 'h-full bg-emerald-500 rounded-full transition-all duration-300';
    } else if (total >= 75) {
      newTier = 'LOẠI B - HOÀN THÀNH TỐT';
      badgeClass = 'inline-block px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black bg-blue-100 text-blue-800 border border-blue-300 shadow-sm';
      descText = 'Duy trì phân công, bồi dưỡng kỹ năng còn cần hoàn thiện.';
      barClass = 'h-full bg-blue-500 rounded-full transition-all duration-300';
    } else if (total >= 60) {
      newTier = 'LOẠI C - HOÀN THÀNH NHIỆM VỤ';
      badgeClass = 'inline-block px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black bg-amber-100 text-amber-800 border border-amber-300 shadow-sm';
      descText = 'Xác định nội dung cần khắc phục, người hỗ trợ và thời hạn theo dõi.';
      barClass = 'h-full bg-amber-500 rounded-full transition-all duration-300';
    } else {
      newTier = 'LOẠI D - CHƯA HOÀN THÀNH NHIỆM VỤ';
      badgeClass = 'inline-block px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black bg-rose-100 text-rose-800 border border-rose-300 shadow-sm';
      descText = 'Trao đổi nguyên nhân, lập kế hoạch khắc phục, xem xét điều chỉnh nhiệm vụ.';
      barClass = 'h-full bg-rose-500 rounded-full transition-all duration-300';
    }

    if (kpiBadge && kpiBadge.innerText !== newTier) {
      kpiBadge.innerText = newTier;
      kpiBadge.className = badgeClass;
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(kpiBadge, { scale: 0.92 }, { scale: 1, duration: 0.25, ease: 'back.out(1.5)' });
      }
    }
    if (kpiDesc) kpiDesc.innerText = descText;
    if (kpiProgressBar) kpiProgressBar.className = barClass;
  }

  sliderCM.addEventListener('input', updateKpi);
  sliderPH.addEventListener('input', updateKpi);
  sliderKL.addEventListener('input', updateKpi);
  sliderSK.addEventListener('input', updateKpi);

  updateKpi();
}

// -------------------------------------------------------------------------
// 8. INTERACTIVE UNIT LOOKUP TOOL
// -------------------------------------------------------------------------
const unitDatabase = [
  { id: 'DV01', name: 'Đoàn trường Công nghệ Thông tin & Truyền thông', m1: 'A01 (Dự phòng: A02)', m2: 'B01 (Dự phòng: B02)', m3: 'C01 (Dự phòng: C02)', leader: 'Tổ trưởng: A01 | Tổ phó: B01' },
  { id: 'DV02', name: 'Đoàn trường Cơ khí', m1: 'A02 (Dự phòng: A01)', m2: 'B02 (Dự phòng: B01)', m3: 'C02 (Dự phòng: C01)', leader: 'Tổ trưởng: C02 | Tổ phó: A02' },
  { id: 'DV03', name: 'Đoàn trường Điện - Điện tử', m1: 'A03 (Dự phòng: A04)', m2: 'B03 (Dự phòng: B04)', m3: 'C03 (Dự phòng: C04)', leader: 'Tổ trưởng: B03 | Tổ phó: C03' },
  { id: 'DV04', name: 'Đoàn trường Hóa và Khoa học sự sống', m1: 'A04 (Dự phòng: A03)', m2: 'B04 (Dự phòng: B03)', m3: 'C04 (Dự phòng: C03)', leader: 'Tổ trưởng: A04 | Tổ phó: B04' },
  { id: 'DV05', name: 'Đoàn trường Vật liệu', m1: 'A05 (Dự phòng: A06)', m2: 'B05 (Dự phòng: B06)', m3: 'C05 (Dự phòng: C06)', leader: 'Tổ trưởng: C05 | Tổ phó: A05' },
  { id: 'DV06', name: 'Liên chi đoàn Toán - Tin', m1: 'A06 (Dự phòng: A05)', m2: 'B06 (Dự phòng: B05)', m3: 'C06 (Dự phòng: C05)', leader: 'Tổ trưởng: B06 | Tổ phó: C06' },
  { id: 'DV07', name: 'Liên chi đoàn Vật lý kỹ thuật', m1: 'A07 (Dự phòng: A08)', m2: 'B07 (Dự phòng: B08)', m3: 'C07 (Dự phòng: C08)', leader: 'Tổ trưởng: A07 | Tổ phó: B07' },
  { id: 'DV08', name: 'Liên chi đoàn Ngoại ngữ', m1: 'A08 (Dự phòng: A07)', m2: 'B08 (Dự phòng: B07)', m3: 'C08 (Dự phòng: C07)', leader: 'Tổ trưởng: C08 | Tổ phó: A08' },
  { id: 'DV09', name: 'Liên chi đoàn Quản lý kinh tế & KHCN', m1: 'A09 (Dự phòng: A10)', m2: 'B09 (Dự phòng: B10)', m3: 'C09 (Dự phòng: C10)', leader: 'Tổ trưởng: B09 | Tổ phó: C09' },
  { id: 'DV10', name: 'Liên chi đoàn Sư phạm kỹ thuật', m1: 'A10 (Dự phòng: A09)', m2: 'B10 (Dự phòng: B09)', m3: 'C10 (Dự phòng: C09)', leader: 'Tổ trưởng: A10 | Tổ phó: B10' },
  { id: 'DV11', name: 'Liên chi đoàn Khoa học & Kỹ thuật máy tính', m1: 'A11 (Dự phòng: A12)', m2: 'B11 (Dự phòng: B12)', m3: 'C11 (Dự phòng: C12)', leader: 'Tổ trưởng: C11 | Tổ phó: A11' },
  { id: 'DV12', name: 'Khối Chi đoàn Cán bộ / Trung tâm / Viện trực thuộc', m1: 'A12 (Dự phòng: A11)', m2: 'B12 (Dự phòng: B11)', m3: 'C12 (Dự phòng: C11)', leader: 'Tổ trưởng: B12 | Tổ phó: C12' }
];

function initUnitLookup() {
  const selectEl = document.getElementById('unit-select');
  const resultCard = document.getElementById('unit-result-card');
  if (!selectEl || !resultCard) return;

  function renderUnit(id) {
    const u = unitDatabase.find(x => x.id === id) || unitDatabase[0];
    resultCard.innerHTML = `
      <div class="p-4 sm:p-5 rounded-2xl bg-white border-2 border-blue-300 shadow-sm space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
          <div>
            <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-800">${u.id}</span>
            <h5 class="text-base sm:text-lg font-black text-slate-900 mt-1">${u.name}</h5>
          </div>
          <div class="text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            ${u.leader}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div class="p-3 rounded-xl bg-sky-50 border border-sky-200 space-y-1">
            <div class="font-black text-sky-950 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-sky-600"></span>
              <span>Đại diện Mảng Tổ chức & Phát triển Đoàn vụ:</span>
            </div>
            <p class="font-bold text-sky-900">${u.m1}</p>
            <p class="text-[11px] text-slate-500">Hướng dẫn hồ sơ tổ chức, nhân sự, đoàn viên, văn thư.</p>
          </div>

          <div class="p-3 rounded-xl bg-red-50 border border-red-200 space-y-1">
            <div class="font-black text-red-950 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-red-600"></span>
              <span>Đại diện Mảng Xây dựng Đảng & Chuyển đổi số:</span>
            </div>
            <p class="font-bold text-red-900">${u.m2}</p>
            <p class="text-[11px] text-slate-500">Theo dõi hồ sơ Đảng, đối soát số liệu, hỗ trợ kỹ thuật.</p>
          </div>

          <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
            <div class="font-black text-amber-950 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-amber-600"></span>
              <span>Đại diện Mảng Giám sát Kiểm tra & ĐRL:</span>
            </div>
            <p class="font-bold text-amber-900">${u.m3}</p>
            <p class="text-[11px] text-slate-500">Hướng dẫn đề án, tiến độ xét duyệt, minh chứng, phản ánh ĐRL.</p>
          </div>
        </div>

        <div class="p-2.5 rounded-xl bg-slate-50 text-[11.5px] text-slate-600 flex items-center justify-between">
          <span><b>Kênh phối hợp:</b> 01 Nhóm chung Zalo/Teams • Hòm thư điện tử Ban</span>
          <span class="text-indigo-600 font-bold">Mảng Truyền thông & Nội bộ phối hợp theo chương trình</span>
        </div>
      </div>
    `;
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(resultCard.firstElementChild, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
    }
  }

  selectEl.addEventListener('change', (e) => {
    renderUnit(e.target.value);
  });

  renderUnit('DV01');
}

// -------------------------------------------------------------------------
// 9. RACI MATRIX FILTER
// -------------------------------------------------------------------------
function initRaciFilter() {
  const filterBtns = document.querySelectorAll('.raci-filter-btn');
  const rows = document.querySelectorAll('.raci-row');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-blue-600', 'text-white');
        b.classList.add('bg-slate-100', 'text-slate-700');
      });
      btn.classList.add('active', 'bg-blue-600', 'text-white');
      btn.classList.remove('bg-slate-100', 'text-slate-700');

      const filter = btn.getAttribute('data-filter');
      rows.forEach(r => {
        if (filter === 'all' || r.getAttribute('data-dept').includes(filter)) {
          r.classList.remove('hidden');
        } else {
          r.classList.add('hidden');
        }
      });
    });
  });
}

// -------------------------------------------------------------------------
// 10. MOBILE DRAWER NAVIGATION
// -------------------------------------------------------------------------
function initMobileDrawer() {
  const openBtn = document.getElementById('mobile-drawer-toggle');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.remove('translate-y-full');
    backdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  window.closeMobileDrawer = function() {
    drawer.classList.add('translate-y-full');
    backdrop.classList.add('hidden');
    document.body.style.overflow = '';
  };

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeMobileDrawer);
  if (backdrop) backdrop.addEventListener('click', closeMobileDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      closeMobileDrawer();
      setTimeout(() => {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          isProgrammaticScrolling = true;
          const offset = window.innerWidth < 640 ? 115 : 95;
          const pos = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: pos, behavior: 'smooth' });
          setTimeout(() => { isProgrammaticScrolling = false; }, 750);
        }
      }, 320);
    });
  });
}

// -------------------------------------------------------------------------
// 11. FLOATING ACTION BUTTONS
// -------------------------------------------------------------------------
function initFloatingActionButtons() {
  const backToTopBtn = document.getElementById('fab-back-to-top');
  const fabTocBtn = document.getElementById('fab-toc');

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      isProgrammaticScrolling = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => { isProgrammaticScrolling = false; }, 600);
    });
  }

  if (fabTocBtn) {
    fabTocBtn.addEventListener('click', () => {
      const openBtn = document.getElementById('mobile-drawer-toggle');
      if (openBtn) openBtn.click();
    });
  }

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      if (backToTopBtn) backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
    } else {
      if (backToTopBtn) backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
    }
  }, { passive: true });
}

// -------------------------------------------------------------------------
// 12. PLAN 2026 - 2027 TASK FILTER BY DEPT WITH GSAP TRANSITIONS
// -------------------------------------------------------------------------
function initPlanFilter() {
  const filterBtns = document.querySelectorAll('.plan-filter-btn');
  const taskCards = document.querySelectorAll('.plan-task-card');
  if (!filterBtns.length || !taskCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const dept = btn.getAttribute('data-dept');

      filterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
        b.classList.add('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');
      });
      btn.classList.remove('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-md');

      const visibleCards = [];
      taskCards.forEach(card => {
        const depts = card.getAttribute('data-depts') || '';
        if (dept === 'all' || depts.split(' ').includes(dept) || depts.includes(dept)) {
          card.classList.remove('hidden');
          visibleCards.push(card);
        } else {
          card.classList.add('hidden');
        }
      });

      if (typeof gsap !== 'undefined' && visibleCards.length) {
        gsap.fromTo(visibleCards, 
          { opacity: 0, y: 10, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.03, ease: 'power2.out' }
        );
      }
    });
  });
}

// -------------------------------------------------------------------------
// 13. FULLSCREEN MODAL WITH GSAP ZOOM
// -------------------------------------------------------------------------
window.openFullscreenModal = function(svgId, titleText) {
  const modal = document.getElementById('fullscreen-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  const originalSvg = document.getElementById(svgId);

  if (!modal || !originalSvg) return;

  if (modalTitle) modalTitle.innerText = titleText || "Sơ đồ chi tiết";
  modalContent.innerHTML = originalSvg.outerHTML;

  const clonedSvg = modalContent.querySelector('svg');
  if (clonedSvg) {
    clonedSvg.removeAttribute('id');
    clonedSvg.style.width = '100%';
    clonedSvg.style.height = 'auto';
    clonedSvg.style.maxHeight = '80vh';
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  if (typeof gsap !== 'undefined') {
    gsap.fromTo(modal.firstElementChild, 
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' }
    );
  }
};

window.closeFullscreenModal = function() {
  const modal = document.getElementById('fullscreen-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
};

window.toggleDiagramView = function(diagId) {
  const mobileWrap = document.getElementById(diagId + '-mobile');
  const svgWrapper = document.getElementById(diagId + '-wrapper');
  const btnText = document.getElementById(diagId + '-btn-text');
  const btnIcon = document.getElementById(diagId + '-btn-icon');

  if (!mobileWrap || !svgWrapper) return;

  const isMobileVisible = !mobileWrap.classList.contains('hidden');

  if (isMobileVisible) {
    mobileWrap.classList.add('hidden');
    svgWrapper.classList.remove('hidden');
    if (btnText) btnText.innerText = "Xem Thẻ Mobile";
    if (btnIcon) btnIcon.setAttribute('data-lucide', 'layers');
  } else {
    mobileWrap.classList.remove('hidden');
    svgWrapper.classList.add('hidden');
    if (btnText) btnText.innerText = "Xem Sơ Đồ Đồ Họa";
    if (btnIcon) btnIcon.setAttribute('data-lucide', 'image');
  }

  if (window.lucide) lucide.createIcons();
};

function initDiagramInteractivity() {
  // Add subtle hover response on diagram node groups
  const svgElements = document.querySelectorAll('#diag-1-svg g[filter], #diag-2-svg g[filter]');
  svgElements.forEach(g => {
    g.addEventListener('mouseenter', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(g, { scale: 1.015, transformOrigin: 'center center', duration: 0.2, ease: 'power1.out' });
      }
    });
    g.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(g, { scale: 1, duration: 0.2, ease: 'power1.out' });
      }
    });
  });
}
