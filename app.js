/**
 * DE AN TAI CAU TRUC BAN TO CHUC - KIEM TRA
 * Doan TNCS Ho Chi Minh Dai hoc Bach khoa Ha Noi
 * Interactive scripts with GSAP 3.12 animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initGsapAnimations();
  initNavigationTabs();
  initKpiCalculator();
});

// 1. GSAP ENTRANCE & COUNTERS
function initGsapAnimations() {
  if (typeof gsap === 'undefined') return;

  // Counter animation
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

  // Hero fade-in
  gsap.from('#hero-header', {
    opacity: 0,
    y: 30,
    duration: 1.0,
    ease: 'power3.out'
  });

  // Stagger stats cards
  gsap.from('.stat-card', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.12,
    delay: 0.2,
    ease: 'back.out(1.4)'
  });
}

// 2. TABS SWITCHER
function initNavigationTabs() {
  const tabButtons = document.querySelectorAll('.nav-tab-btn');
  const tabContents = document.querySelectorAll('.tab-content-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      
      tabButtons.forEach(b => {
        b.classList.remove('active', 'border-blue-600', 'text-blue-600', 'bg-blue-50');
        b.classList.add('text-slate-300', 'border-transparent');
      });
      btn.classList.add('active', 'border-blue-600', 'text-blue-600', 'bg-blue-50');
      btn.classList.remove('text-slate-300');

      tabContents.forEach(content => {
        if (content.id === target) {
          content.classList.remove('hidden');
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(content, 
              { opacity: 0, y: 20 }, 
              { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
            );
          }
        } else {
          content.classList.add('hidden');
        }
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// 3. KPI CALCULATOR (Luon xep Loai B - Hoan thanh tot theo quy che)
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

    // Theo yeu cau quy che: Bất kể bao nhiêu điểm cũng chỉ ghi Loại B - Hoàn thành tốt
    if (rankEl) rankEl.innerText = "LOẠI B - HOÀN THÀNH TỐT";
    if (rankBadge) {
      rankBadge.className = "inline-block px-5 py-2 rounded-full font-black text-sm bg-blue-100 text-blue-900 border border-blue-300 shadow-sm";
      rankBadge.innerText = "XẾP LOẠI: B - HOÀN THÀNH TỐT";
    }
    if (rankDesc) {
      rankDesc.innerHTML = "🔵 <b>Đánh giá:</b> Hoàn thành tốt mọi nhiệm vụ được giao. Được cộng điểm rèn luyện cán bộ Đoàn theo quy định chung của Ban.";
    }
  }

  [s1, s2, s3, s4].forEach(s => s && s.addEventListener('input', calculate));
  calculate();
}
