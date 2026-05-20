/* ============================================================
   BIZ CALL SOLUTIONS — Utility JS (utils.js)
   Scroll reveal, pricing toggle, form handlers, misc
   ============================================================ */

/* ─── Scroll Reveal ─── */
function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });
  els.forEach(el => io.observe(el));
}

/* ─── Pricing Toggle ─── */
function initPricingToggle() {
  const sw = document.getElementById('pricing-toggle');
  if (!sw) return;

  const monthlyLabel = document.getElementById('label-monthly');
  const yearlyLabel  = document.getElementById('label-yearly');
  const prices       = document.querySelectorAll('[data-monthly][data-yearly]');
  let isYearly = false;

  function update() {
    sw.classList.toggle('yearly', isYearly);
    if (monthlyLabel) monthlyLabel.classList.toggle('active', !isYearly);
    if (yearlyLabel)  yearlyLabel.classList.toggle('active',  isYearly);
    prices.forEach(el => {
      const val = isYearly ? el.dataset.yearly : el.dataset.monthly;
      el.textContent = val;
    });
  }

  sw.addEventListener('click', () => { isYearly = !isYearly; update(); });
  update();
}

/* ─── FAQ Accordion ─── */
function initFAQ() {
  document.querySelectorAll('[data-faq-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('[data-faq-item]');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('[data-faq-item].open').forEach(i => i.classList.remove('open'));
      // Open clicked if it was closed
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ─── Tab System ─── */
function initTabs() {
  document.querySelectorAll('[data-tab-group]').forEach(group => {
    const tabs    = group.querySelectorAll('[data-tab]');
    const panels  = group.querySelectorAll('[data-panel]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t   => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = group.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

/* ─── Smooth Anchor Scroll ─── */
function initAnchorScroll() {
  document.querySelectorAll('a[href*="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const url   = new URL(a.href, location.href);
      const hash  = url.hash;
      if (url.pathname === location.pathname && hash) {
        const el = document.querySelector(hash);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

/* ─── Counter Animation ─── */
function animateCount(el) {
  const target  = parseFloat(el.dataset.count);
  const suffix  = el.dataset.suffix || '';
  const prefix  = el.dataset.prefix || '';
  const dur     = 2000;
  const start   = performance.now();
  const isFloat = target % 1 !== 0;

  function tick(now) {
    const elapsed = now - start;
    const prog    = Math.min(elapsed / dur, 1);
    const ease    = 1 - Math.pow(1 - prog, 3);
    const current = target * ease;
    el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
    if (prog < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));
}

/* ─── Boot ─── */
document.addEventListener('DOMContentLoaded', () => {
  if (window.BizCallNav)    BizCallNav.init(document.body.dataset.page || '');
  if (window.BizCallFooter) BizCallFooter.init();
  initScrollReveal();
  initPricingToggle();
  initFAQ();
  initTabs();
  initAnchorScroll();
  initCounters();
});