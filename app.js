/**
 * DE AN TAI CAU TRUC BAN TO CHUC - KIEM TRA
 * Doan TNCS Ho Chi Minh Dai hoc Bach khoa Ha Noi
 * Interactive scripts with GSAP 3.12 animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initGsapAnimations();
  initNavigationTabs();
  initKpiCalculator();
  initAccordions();
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
    y: 30,
    duration: 1.0,
    ease: 'power3.out'
  });

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
        b.classList.remove('active', 'bg-blue-600', 'text-white');
        b.classList.add('text-slate-300');
      });
      btn.classList.add('active', 'bg-blue-600', 'text-white');
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

// 3. KPI CALCULATOR (Phan loai chinh xac A, B, C, D theo thang diem 100)
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

    if (v1) v1.innerText = ${score1}/40đ;
    if (v2) v2.innerText = ${score2}/30đ;
    if (v3) v3.innerText = ${score3}/20đ;
    if (v4) v4.innerText = ${score4}/10đ;

    const total = score1 + score2 + score3 + score4;
    if (totalEl) totalEl.innerText = ${total}/100;

    if (total >= 90) {
      if (rankEl) {
        rankEl.innerText = 'LOẠI A - HOÀN THÀNH XUẤT SẮC';
        rankEl.className = 'text-xl font-black text-emerald-700';
      }
      if (rankBadge) {
        rankBadge.className = 'inline-block px-5 py-2 rounded-full font-black text-sm bg-emerald-100 text-emerald-800 border-2 border-emerald-300 shadow-sm';
        rankBadge.innerText = 'XẾP LOẠI: A - XUẤT SẮC';
      }
      if (rankDesc) {
        rankDesc.innerHTML = '🌟 <b>Đặc quyền:</b> Thành viên gương mẫu, vững chuyên môn, phản hồi cơ sở nhanh, bọc lót tích cực cho đồng đội. Được ưu tiên đề xuất Giấy khen Đoàn trường, cộng Điểm rèn luyện mức tối đa cho cán bộ Đoàn, ưu tiên xét chọn học lớp Cảm tình Đảng / Đoàn viên ưu tú và quy hoạch nguồn cán bộ kế cận.';
      }
    } else if (total >= 75) {
      if (rankEl) {
        rankEl.innerText = 'LOẠI B - HOÀN THÀNH TỐT';
        rankEl.className = 'text-xl font-black text-blue-700';
      }
      if (rankBadge) {
        rankBadge.className = 'inline-block px-5 py-2 rounded-full font-black text-sm bg-blue-100 text-blue-800 border-2 border-blue-300 shadow-sm';
        rankBadge.innerText = 'XẾP LOẠI: B - HOÀN THÀNH TỐT';
      }
      if (rankDesc) {
        rankDesc.innerHTML = '🔵 <b>Đánh giá:</b> Hoàn thành đầy đủ nhiệm vụ chuyên môn và tác nghiệp, chấp hành tốt kỷ luật Ban; được tính điểm rèn luyện cán bộ Đoàn theo quy chế.';
      }
    } else if (total >= 60) {
      if (rankEl) {
        rankEl.innerText = 'LOẠI C - HOÀN THÀNH';
        rankEl.className = 'text-xl font-black text-amber-700';
      }
      if (rankBadge) {
        rankBadge.className = 'inline-block px-5 py-2 rounded-full font-black text-sm bg-amber-100 text-amber-800 border-2 border-amber-300 shadow-sm';
        rankBadge.innerText = 'XẾP LOẠI: C - HOÀN THÀNH';
      }
      if (rankDesc) {
        rankDesc.innerHTML = '🟡 <b>Nhắc nhở:</b> Có biểu hiện chậm trễ tiến độ, để sót việc hoặc vắng họp/trực ca $\rightarrow$ Trưởng mảng trực tiếp trao đổi, nhắc nhở và phân công kèm cặp trong học kỳ tiếp theo.';
      }
    } else {
      if (rankEl) {
        rankEl.innerText = 'LOẠI D - KHÔNG HOÀN THÀNH';
        rankEl.className = 'text-xl font-black text-red-700';
      }
      if (rankBadge) {
        rankBadge.className = 'inline-block px-5 py-2 rounded-full font-black text-sm bg-red-100 text-red-800 border-2 border-red-300 shadow-sm';
        rankBadge.innerText = 'XẾP LOẠI: D - KHÔNG HOÀN THÀNH';
      }
      if (rankDesc) {
        rankDesc.innerHTML = '🔴 <b>Cảnh báo:</b> Vi phạm kỷ luật; bỏ bê đơn vị phụ trách; để cơ sở khiếu nại nhiều lần hoặc vắng họp/trực ca không phép nhiều lần $\rightarrow$ Đưa ra khỏi nguồn tác nghiệp và xem xét cho thôi tham gia Ban TCKT.';
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
