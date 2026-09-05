// JavaScript & GSAP Animations for Ban TCKT Web

// 1. DATA: 12 ĐƠN VỊ CƠ SỞ & CẶP BÀI TRÙNG
const UNITS_DATA = [
  { id: 1, name: "Đoàn trường / LCĐ Đơn vị 1", cluster: 1, clusterLead: "Nhóm trưởng Cụm 1", pair: 1, partner: "Đơn vị 2", dv_main: "Thành viên A1 (Chính)", dv_sub: "Thành viên B1 (Backup)", dang_main: "Thành viên A2 (Chính)", dang_sub: "Thành viên B2 (Backup)", cds_main: "Thành viên A3 (Chính)", cds_sub: "Thành viên B3 (Backup)" },
  { id: 2, name: "Đoàn trường / LCĐ Đơn vị 2", cluster: 1, clusterLead: "Nhóm trưởng Cụm 1", pair: 1, partner: "Đơn vị 1", dv_main: "Thành viên B1 (Chính)", dv_sub: "Thành viên A1 (Backup)", dang_main: "Thành viên B2 (Chính)", dang_sub: "Thành viên A2 (Backup)", cds_main: "Thành viên B3 (Chính)", cds_sub: "Thành viên A3 (Backup)" },
  { id: 3, name: "Đoàn trường / LCĐ Đơn vị 3", cluster: 1, clusterLead: "Nhóm trưởng Cụm 1", pair: 2, partner: "Đơn vị 4", dv_main: "Thành viên A4 (Chính)", dv_sub: "Thành viên B4 (Backup)", dang_main: "Thành viên A5 (Chính)", dang_sub: "Thành viên B5 (Backup)", cds_main: "Thành viên A6 (Chính)", cds_sub: "Thành viên B6 (Backup)" },
  { id: 4, name: "Đoàn trường / LCĐ Đơn vị 4", cluster: 1, clusterLead: "Nhóm trưởng Cụm 1", pair: 2, partner: "Đơn vị 3", dv_main: "Thành viên B4 (Chính)", dv_sub: "Thành viên A4 (Backup)", dang_main: "Thành viên B5 (Chính)", dang_sub: "Thành viên A5 (Backup)", cds_main: "Thành viên B6 (Chính)", cds_sub: "Thành viên A6 (Backup)" },
  
  { id: 5, name: "Đoàn trường / LCĐ Đơn vị 5", cluster: 2, clusterLead: "Nhóm trưởng Cụm 2", pair: 3, partner: "Đơn vị 6", dv_main: "Thành viên A7 (Chính)", dv_sub: "Thành viên B7 (Backup)", dang_main: "Thành viên A8 (Chính)", dang_sub: "Thành viên B8 (Backup)", cds_main: "Thành viên A9 (Chính)", cds_sub: "Thành viên B9 (Backup)" },
  { id: 6, name: "Đoàn trường / LCĐ Đơn vị 6", cluster: 2, clusterLead: "Nhóm trưởng Cụm 2", pair: 3, partner: "Đơn vị 5", dv_main: "Thành viên B7 (Chính)", dv_sub: "Thành viên A7 (Backup)", dang_main: "Thành viên B8 (Chính)", dang_sub: "Thành viên A8 (Backup)", cds_main: "Thành viên B9 (Chính)", cds_sub: "Thành viên A9 (Backup)" },
  { id: 7, name: "Đoàn trường / LCĐ Đơn vị 7", cluster: 2, clusterLead: "Nhóm trưởng Cụm 2", pair: 4, partner: "Đơn vị 8", dv_main: "Thành viên A10 (Chính)", dv_sub: "Thành viên B10 (Backup)", dang_main: "Thành viên A11 (Chính)", dang_sub: "Thành viên B11 (Backup)", cds_main: "Thành viên A12 (Chính)", cds_sub: "Thành viên B12 (Backup)" },
  { id: 8, name: "Đoàn trường / LCĐ Đơn vị 8", cluster: 2, clusterLead: "Nhóm trưởng Cụm 2", pair: 4, partner: "Đơn vị 7", dv_main: "Thành viên B10 (Chính)", dv_sub: "Thành viên A10 (Backup)", dang_main: "Thành viên B11 (Chính)", dang_sub: "Thành viên A11 (Backup)", cds_main: "Thành viên B12 (Chính)", cds_sub: "Thành viên A12 (Backup)" },

  { id: 9, name: "Đoàn trường / LCĐ Đơn vị 9", cluster: 3, clusterLead: "Nhóm trưởng Cụm 3", pair: 5, partner: "Đơn vị 10", dv_main: "Thành viên A13 (Chính)", dv_sub: "Thành viên B13 (Backup)", dang_main: "Thành viên A14 (Chính)", dang_sub: "Thành viên B14 (Backup)", cds_main: "Thành viên A15 (Chính)", cds_sub: "Thành viên B15 (Backup)" },
  { id: 10, name: "Đoàn trường / LCĐ Đơn vị 10", cluster: 3, clusterLead: "Nhóm trưởng Cụm 3", pair: 5, partner: "Đơn vị 9", dv_main: "Thành viên B13 (Chính)", dv_sub: "Thành viên A13 (Backup)", dang_main: "Thành viên B14 (Chính)", dang_sub: "Thành viên A14 (Backup)", cds_main: "Thành viên B15 (Chính)", cds_sub: "Thành viên A15 (Backup)" },
  { id: 11, name: "Đoàn trường / LCĐ Đơn vị 11", cluster: 3, clusterLead: "Nhóm trưởng Cụm 3", pair: 6, partner: "Đơn vị 12", dv_main: "Thành viên A16 (Chính)", dv_sub: "Thành viên B16 (Backup)", dang_main: "Thành viên A17 (Chính)", dang_sub: "Thành viên B17 (Backup)", cds_main: "Thành viên A18 (Chính)", cds_sub: "Thành viên B18 (Backup)" },
  { id: 12, name: "Đoàn trường / LCĐ Đơn vị 12", cluster: 3, clusterLead: "Nhóm trưởng Cụm 3", pair: 6, partner: "Đơn vị 11", dv_main: "Thành viên B16 (Chính)", dv_sub: "Thành viên A16 (Backup)", dang_main: "Thành viên B17 (Chính)", dang_sub: "Thành viên A17 (Backup)", cds_main: "Thành viên B18 (Chính)", cds_sub: "Thành viên A18 (Backup)" }
];

document.addEventListener('DOMContentLoaded', () => {
  initGSAPEntrance();
  initTabsWithGSAP();
  initFontScaler();
  initUnitSearch();
  initKpiCalculator();
});

// 2. GSAP ENTRANCE ANIMATIONS
function initGSAPEntrance() {
  if (typeof gsap === 'undefined') return;

  // Header slide down
  gsap.from('#main-header', {
    y: -80,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });

  // Hero card reveal
  gsap.from('.hero-summary-box', {
    scale: 0.95,
    opacity: 0,
    duration: 0.9,
    delay: 0.2,
    ease: 'power2.out'
  });

  // Numbers counter animation
  const counterElements = document.querySelectorAll('.stat-number');
  counterElements.forEach(el => {
    const target = parseInt(el.getAttribute('data-target') || '0', 10);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.5,
      delay: 0.4,
      ease: 'power2.out',
      onUpdate: () => {
        el.innerText = Math.floor(obj.val).toString().padStart(2, '0');
      }
    });
  });

  // Diagram 1 cards stagger
  gsap.from('.org-dept-card', {
    y: 35,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    delay: 0.5,
    ease: 'back.out(1.4)'
  });
}

// 3. TAB SWITCHING WITH SMOOTH GSAP TRANSITIONS
function initTabsWithGSAP() {
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

// 4. FONT SCALER
function initFontScaler() {
  const contentAreas = document.querySelectorAll('.scalable-text');
  const btnSm = document.getElementById('btn-font-sm');
  const btnMd = document.getElementById('btn-font-md');
  const btnLg = document.getElementById('btn-font-lg');
  const btnXl = document.getElementById('btn-font-xl');

  const setScale = (scaleClass) => {
    contentAreas.forEach(area => {
      area.classList.remove('font-scale-sm', 'font-scale-md', 'font-scale-lg', 'font-scale-xl');
      area.classList.add(scaleClass);
    });

    [btnSm, btnMd, btnLg, btnXl].forEach(b => b && b.classList.remove('bg-blue-600', 'text-white'));
    if (scaleClass === 'font-scale-sm' && btnSm) btnSm.classList.add('bg-blue-600', 'text-white');
    if (scaleClass === 'font-scale-md' && btnMd) btnMd.classList.add('bg-blue-600', 'text-white');
    if (scaleClass === 'font-scale-lg' && btnLg) btnLg.classList.add('bg-blue-600', 'text-white');
    if (scaleClass === 'font-scale-xl' && btnXl) btnXl.classList.add('bg-blue-600', 'text-white');
  };

  if (btnSm) btnSm.addEventListener('click', () => setScale('font-scale-sm'));
  if (btnMd) btnMd.addEventListener('click', () => setScale('font-scale-md'));
  if (btnLg) btnLg.addEventListener('click', () => setScale('font-scale-lg'));
  if (btnXl) btnXl.addEventListener('click', () => setScale('font-scale-xl'));

  setScale('font-scale-md');
}

// 5. UNIT SEARCH & DIRECTORY
function initUnitSearch() {
  const container = document.getElementById('units-cards-container');
  const searchInput = document.getElementById('unit-search-input');
  const clusterFilter = document.getElementById('unit-cluster-filter');

  function renderUnits(units) {
    if (!container) return;
    if (units.length === 0) {
      container.innerHTML = '<div class="col-span-full text-center py-12 text-slate-500 text-lg">Không tìm thấy đơn vị phù hợp.</div>';
      return;
    }

    container.innerHTML = units.map(u => `
      <div class="unit-item-card bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition">
        <div class="bg-gradient-to-r ${u.cluster === 1 ? 'from-blue-600 to-indigo-700' : u.cluster === 2 ? 'from-emerald-600 to-teal-700' : 'from-purple-600 to-indigo-800'} text-white px-5 py-3.5 flex justify-between items-center">
          <div>
            <h4 class="font-bold text-lg">${u.name}</h4>
            <p class="text-xs text-blue-100 font-medium">Thuộc Cụm ${u.cluster} • Điều phối: ${u.clusterLead}</p>
          </div>
          <span class="px-2.5 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm">Cặp ${u.pair}</span>
        </div>
        
        <div class="p-5 space-y-3 text-sm">
          <div class="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
            <span class="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">Đơn vị Song hành:</span>
            <span class="font-semibold text-slate-800">${u.partner}</span>
          </div>

          <div class="space-y-2">
            <div class="p-2.5 rounded-lg border border-emerald-100 bg-emerald-50/50">
              <div class="text-xs font-bold text-emerald-800 flex justify-between">
                <span>📁 MẢNG ĐOÀN VỤ</span>
                <span class="text-[11px] font-normal text-slate-500">QĐ, Con dấu, Nhân sự</span>
              </div>
              <div class="mt-1 text-slate-800 font-medium">${u.dv_main}</div>
              <div class="text-xs text-slate-500">Bọc lót: ${u.dv_sub}</div>
            </div>

            <div class="p-2.5 rounded-lg border border-red-100 bg-red-50/50">
              <div class="text-xs font-bold text-red-800 flex justify-between">
                <span>🚩 MẢNG PHÁT TRIỂN ĐẢNG</span>
                <span class="text-[11px] font-normal text-slate-500">ĐVƯT, Kết nạp Đoàn</span>
              </div>
              <div class="mt-1 text-slate-800 font-medium">${u.dang_main}</div>
              <div class="text-xs text-slate-500">Bọc lót: ${u.dang_sub}</div>
            </div>

            <div class="p-2.5 rounded-lg border border-blue-100 bg-blue-50/50">
              <div class="text-xs font-bold text-blue-800 flex justify-between">
                <span>💻 MẢNG CHUYỂN ĐỔI SỐ</span>
                <span class="text-[11px] font-normal text-slate-500">QLDV App, Email</span>
              </div>
              <div class="mt-1 text-slate-800 font-medium">${u.cds_main}</div>
              <div class="text-xs text-slate-500">Bọc lót: ${u.cds_sub}</div>
            </div>
          </div>

          <div class="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg flex items-start gap-2">
            <span class="text-blue-600 font-bold">ℹ️</span>
            <span>Khi người phụ trách chính bận học thi, người bọc lót có trách nhiệm trả lời và xử lý trong vòng 2h.</span>
          </div>
        </div>
      </div>
    `).join('');

    if (typeof gsap !== 'undefined') {
      gsap.from('.unit-item-card', {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power1.out'
      });
    }
  }

  function filter() {
    const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const c = clusterFilter ? clusterFilter.value : 'all';

    const filtered = UNITS_DATA.filter(u => {
      const matchQuery = u.name.toLowerCase().includes(q) || u.partner.toLowerCase().includes(q);
      const matchCluster = c === 'all' || u.cluster.toString() === c;
      return matchQuery && matchCluster;
    });
    renderUnits(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', filter);
  if (clusterFilter) clusterFilter.addEventListener('change', filter);

  renderUnits(UNITS_DATA);
}

// 6. KPI CALCULATOR
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
      if (rankEl) rankEl.innerText = "LOẠI A - HOÀN THÀNH XUẤT SẮC";
      if (rankBadge) rankBadge.className = "inline-block px-4 py-1.5 rounded-full font-bold text-sm bg-emerald-100 text-emerald-800";
      if (rankDesc) rankDesc.innerHTML = "🌟 <b>Đặc quyền:</b> Ưu tiên đề xuất Giấy khen Đoàn trường, cộng tối đa Điểm rèn luyện cán bộ Đoàn, ưu tiên xét Cảm tình Đảng/ĐVƯT và quy hoạch nguồn cán bộ Ban.";
    } else if (total >= 75) {
      if (rankEl) rankEl.innerText = "LOẠI B - HOÀN THÀNH TỐT";
      if (rankBadge) rankBadge.className = "inline-block px-4 py-1.5 rounded-full font-bold text-sm bg-blue-100 text-blue-800";
      if (rankDesc) rankDesc.innerHTML = "🔵 <b>Đánh giá:</b> Hoàn thành tốt mọi nhiệm vụ, được cộng điểm rèn luyện theo quy chế cán bộ Đoàn.";
    } else if (total >= 60) {
      if (rankEl) rankEl.innerText = "LOẠI C - HOÀN THÀNH";
      if (rankBadge) rankBadge.className = "inline-block px-4 py-1.5 rounded-full font-bold text-sm bg-amber-100 text-amber-800";
      if (rankDesc) rankDesc.innerHTML = "🟡 <b>Nhắc nhở:</b> Còn để sót việc, vắng họp/trực ca. Trưởng mảng sẽ kèm cặp trực tiếp trong kỳ tiếp theo.";
    } else {
      if (rankEl) rankEl.innerText = "LOẠI D - KHÔNG HOÀN THÀNH";
      if (rankBadge) rankBadge.className = "inline-block px-4 py-1.5 rounded-full font-bold text-sm bg-red-100 text-red-800";
      if (rankDesc) rankDesc.innerHTML = "🔴 <b>Cảnh báo:</b> Vi phạm kỷ luật hoặc bỏ bê đơn vị phụ trách. Đưa ra khỏi nguồn tác nghiệp và xem xét cho thôi tham gia Ban.";
    }
  }

  [s1, s2, s3, s4].forEach(s => s && s.addEventListener('input', calculate));
  calculate();
}
