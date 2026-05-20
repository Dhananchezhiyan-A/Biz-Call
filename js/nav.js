/* ============================================================
   BIZ CALL SOLUTIONS — Navigation Component (nav.js)
   Renders shared header + mobile nav, handles all interaction
   ============================================================ */

(function () {
  /* ── SVGs ── */
  const ICONS = {
    logo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 012 2.18 2 2 0 014 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>`,
    chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
    arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 012 2.18 2 2 0 014 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>`,
    ai: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>`,
    cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>`,
    ivr: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    analytics: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    crm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
    whatsapp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
    chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
    dialer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    virtual: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>`,
    callcenter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>`,
    blog: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>`,
    faq: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    webinar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`,
    case: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    about: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    partner: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>`,
    support: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    pricing_icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`,
  };

  /* ── Nav Data ── */
  const NAV_DATA = {
    products: {
      label: 'Products',
      columns: [
        {
          heading: 'Communication',
          links: [
            { key:'ai',        label:'AI Voice Agent',    desc:'Automate calls with AI', href:'products.html#ai-voice' },
            { key:'cloud',     label:'Cloud PBX',         desc:'Enterprise phone system', href:'products.html#cloud-pbx' },
            { key:'ivr',       label:'Smart IVR',         desc:'Interactive voice response', href:'products.html#smart-ivr' },
            { key:'whatsapp',  label:'WhatsApp API',      desc:'Business messaging', href:'products.html#whatsapp' },
          ]
        },
        {
          heading: 'Intelligence',
          links: [
            { key:'analytics', label:'Call Analytics',    desc:'Deep call intelligence', href:'products.html#analytics' },
            { key:'crm',       label:'CRM Integration',   desc:'Sync with your CRM', href:'products.html#crm' },
            { key:'chat',      label:'Team Chat',         desc:'Unified team messaging', href:'products.html#team-chat' },
            { key:'dialer',    label:'Power Dialer',      desc:'High-speed outbound', href:'products.html#power-dialer' },
          ]
        }
      ]
    },
    services: {
      label: 'Services',
      columns: [
        {
          heading: 'Solutions',
          links: [
            { key:'virtual',    label:'Virtual Phone System', desc:'Cloud-based phone', href:'services.html#virtual-phone' },
            { key:'dialer',     label:'Predictive Dialer',    desc:'Smart auto-dialing', href:'services.html#predictive' },
            { key:'callcenter', label:'Call Center Solutions',desc:'Full contact center', href:'services.html#call-center' },
          ]
        },
        {
          heading: 'Industries',
          links: [
            { key:'crm',       label:'Real Estate',   desc:'Lead management', href:'services.html#real-estate' },
            { key:'analytics', label:'Finance',       desc:'Compliance ready', href:'services.html#finance' },
            { key:'ai',        label:'Education',     desc:'Student engagement', href:'services.html#education' },
          ]
        }
      ]
    },
    resources: {
      label: 'Resources',
      simple: [
        { key:'blog',    label:'Blog',          desc:'Industry insights', href:'resources.html#blog' },
        { key:'faq',     label:'FAQ',           desc:'Common questions', href:'resources.html#faq' },
        { key:'webinar', label:'Webinars',      desc:'Live & on-demand', href:'resources.html#webinars' },
        { key:'case',    label:'Case Studies',  desc:'Customer success', href:'resources.html#cases' },
      ]
    },
    company: {
      label: 'Company',
      simple: [
        { key:'about',   label:'About Us',       desc:'Our story & mission', href:'company.html#about' },
        { key:'partner', label:'Partner Program',desc:'Grow with us', href:'company.html#partners' },
        { key:'support', label:'Support',        desc:'24/7 customer care', href:'company.html#support' },
      ]
    }
  };

  /* ── Build Mega Link HTML ── */
  function buildMegaLink(item) {
    return `<a href="${item.href}" class="mega-link">
      <div class="mega-link-icon">${ICONS[item.key] || ICONS.ai}</div>
      <div class="mega-link-text"><strong>${item.label}</strong><span>${item.desc}</span></div>
    </a>`;
  }

  /* ── Build Dropdown HTML ── */
  function buildDropdown(data) {
    if (data.simple) {
      return `<div class="mega-dropdown mega-dropdown-sm">
        ${data.simple.map(buildMegaLink).join('')}
      </div>`;
    }
    return `<div class="mega-dropdown">
      <div class="mega-grid">
        ${data.columns.map(col => `
          <div>
            <p class="mega-heading">${col.heading}</p>
            ${col.links.map(buildMegaLink).join('')}
          </div>
        `).join('')}
      </div>
      <div class="mega-divider"></div>
      <div class="mega-cta">
        <div class="mega-cta-text">
          <strong>Talk to a product expert</strong>
          <span>Get a personalised walkthrough</span>
        </div>
        <a href="contact.html" class="btn btn-primary btn-sm">Book Demo ${ICONS.arrow}</a>
      </div>
    </div>`;
  }

  /* ── Build Nav HTML ── */
  function buildNav(currentPage) {
    const pages = ['products','resources','company'];
    const navLinksHtml = pages.map(key => {
  const d = NAV_DATA[key];
  const isActive = currentPage === key ? 'active' : '';

  return `
    <div class="nav-item">

      <!-- CLICKABLE NAVBAR MENU -->
      <a href="${key}.html" class="nav-link ${isActive}">
        ${d.label}
        ${ICONS.chevron}
      </a>

      <!-- DROPDOWN -->
      ${buildDropdown(d)}

    </div>
  `;
}).join('');

    const mobileNavHtml = pages.map(key => {
      const d = NAV_DATA[key];
      const links = d.simple
        ? d.simple.map(l=>`<a href="${l.href}" class="mobile-sub-link">${l.label}</a>`).join('')
        : d.columns.map(col=>col.links.map(l=>`<a href="${l.href}" class="mobile-sub-link">${l.label}</a>`).join('')).join('');
      return `<div class="mobile-nav-item">
        <div class="mobile-nav-link" data-mobile-toggle>
          ${d.label}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
        <div class="mobile-sub-nav">${links}</div>
      </div>`;
    }).join('');

    return `
    <header id="site-header">
      <div class="nav-inner">
        <a href="index.html" class="nav-logo">
          <img src="images/logo.png" alt="Biz Call Solutions Logo" class="bizcall-logo">
        </a>
        <nav class="nav-links">${navLinksHtml}</nav>
        <div class="nav-actions">
          <a href="tel:+918220627183" class="btn btn-primary btn-sm">${ICONS.phone} call </a>
          <a href="contact.html" class="btn btn-primary btn-sm">Get Demo</a>          
          <button class="hamburger" id="hamburger" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
    <div class="mobile-nav" id="mobile-nav">
      ${mobileNavHtml}
      <a href="pricing.html" class="mobile-nav-link" style="border-bottom:1px solid var(--border);padding:16px 0">Pricing</a>
      <div class="mobile-nav-actions">
        <a href="contact.html" class="btn btn-outline" style="justify-content:center">Book Demo</a>        
      </div>
    </div>`;
  }

  /* ── Helper: close mobile nav completely ── */
  function closeMobileNav() {
    const ham       = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    if (!ham || !mobileNav) return;

    ham.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';

    // Collapse all open sub-menus
    document.querySelectorAll('.mobile-sub-nav').forEach(sub => sub.classList.remove('open'));
    document.querySelectorAll('[data-mobile-toggle]').forEach(btn => btn.classList.remove('open'));
  }

  /* ── Init ── */
  function initNav(currentPage) {
    // Render
    const placeholder = document.getElementById('nav-placeholder');
    if (placeholder) {
      placeholder.innerHTML = buildNav(currentPage || '');
    }

    // Scroll effect
    const header = document.getElementById('site-header');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Hamburger toggle
    const ham = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    if (ham && mobileNav) {
      ham.addEventListener('click', () => {
        ham.classList.toggle('open');
        mobileNav.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
      });
    }

    // Mobile accordion
    document.querySelectorAll('[data-mobile-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('open');
        const sub = btn.nextElementSibling;
        if (sub) sub.classList.toggle('open');
      });
    });

    // ── FIX: close nav when any mobile sub-link is clicked ──
    // Using event delegation on the mobile nav so it works
    // even if the DOM is re-rendered after init.
    const mobileNavEl = document.getElementById('mobile-nav');
    if (mobileNavEl) {
      mobileNavEl.addEventListener('click', (e) => {
        const link = e.target.closest('.mobile-sub-link');
        if (link) {
          closeMobileNav();
          // Navigation proceeds normally via the href
        }
      });
    }

    // Also close when the standalone "Pricing" / "Book Demo" links are clicked
    document.querySelectorAll('#mobile-nav .mobile-nav-link[href], #mobile-nav .btn').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });
  }

  window.BizCallNav = { init: initNav };
})();