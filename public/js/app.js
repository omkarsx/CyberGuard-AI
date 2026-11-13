/**
 * Main Application Orchestrator
 * CyberGuard AI - Apple-Inspired Cybersecurity Suite
 */

import { initScannerSuite } from './scanner.js';
import { initAwarenessCentre } from './awareness.js';
import { initSafetyTips } from './tips.js';
import { initQuizEngine } from './quiz.js';
import { renderAboutProjectSection } from './about.js';

// Keep scan history for this tab only; it is cleared when the tab closes.
let sessionScanHistory = [];

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation & Mobile Drawer
  setupNavigation();

  // 2. Initialize Subsystems
  initScannerSuite(handleNewScanRecorded);
  initAwarenessCentre();
  initSafetyTips();
  initQuizEngine();
  renderAboutProjectSection();

  // 3. Setup Session Dashboard
  loadSessionHistory();
  setupDashboardControls();

  // 4. Fetch initial backend health/stats
  syncBackendStats();
});

// --------------------------------------------------------------------------
// NAVIGATION & SMOOTH SCROLLING
// --------------------------------------------------------------------------
function setupNavigation() {
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-drawer-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileDrawer.setAttribute('aria-hidden', String(!isOpen));
    });
  }

  // Close mobile drawer when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          if (mobileDrawer) {
            mobileDrawer.classList.remove('open');
            mobileDrawer.setAttribute('aria-hidden', 'true');
            mobileToggle?.setAttribute('aria-expanded', 'false');
          }
          const navOffset = 64;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Update active link
          updateActiveNavLink(href);
        }
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileDrawer?.classList.contains('open')) {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      mobileToggle?.setAttribute('aria-expanded', 'false');
      mobileToggle?.focus();
    }
  });

  // Scrollspy for active nav link
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const sectionHeight = sec.offsetHeight;
      const sectionTop = sec.offsetTop - 80;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = '#' + sec.getAttribute('id');
      }
    });

    if (current) {
      updateActiveNavLink(current);
    }
  }, { passive: true });
}

function updateActiveNavLink(hash) {
  document.querySelectorAll('.nav-menu .nav-link').forEach(l => {
    if (l.getAttribute('href') === hash) {
      l.classList.add('active');
    } else {
      l.classList.remove('active');
    }
  });
}

// --------------------------------------------------------------------------
// SESSION DASHBOARD & HISTORY MANAGEMENT
// --------------------------------------------------------------------------
function loadSessionHistory() {
  try {
    const saved = sessionStorage.getItem('cyberguard_session_history');
    if (saved) {
      sessionScanHistory = JSON.parse(saved);
    }
  } catch (e) {
    sessionScanHistory = [];
  }

  renderDashboardHistory();
}

function saveSessionHistory() {
  try {
    sessionStorage.setItem('cyberguard_session_history', JSON.stringify(sessionScanHistory));
  } catch (e) {}
  renderDashboardHistory();
}

function handleNewScanRecorded(scanRecord) {
  sessionScanHistory.unshift(scanRecord);
  if (sessionScanHistory.length > 50) {
    sessionScanHistory.pop();
  }
  saveSessionHistory();
  syncBackendStats();
}

function renderDashboardHistory() {
  const totalEl = document.getElementById('dash-stat-total');
  const highEl = document.getElementById('dash-stat-high');
  const medEl = document.getElementById('dash-stat-med');
  const lowEl = document.getElementById('dash-stat-low');
  const tableBody = document.getElementById('history-table-body');
  const emptyPlaceholder = document.getElementById('empty-history-placeholder');
  const historyTable = document.getElementById('history-table');

  let total = sessionScanHistory.length;
  let high = 0;
  let med = 0;
  let low = 0;

  sessionScanHistory.forEach(item => {
    if (item.riskLevel === 'HIGH') high++;
    else if (item.riskLevel === 'MEDIUM') med++;
    else low++;
  });

  if (totalEl) totalEl.textContent = total;
  if (highEl) highEl.textContent = high;
  if (medEl) medEl.textContent = med;
  if (lowEl) lowEl.textContent = low;

  if (!tableBody) return;

  if (total === 0) {
    if (historyTable) historyTable.style.display = 'none';
    if (emptyPlaceholder) emptyPlaceholder.style.display = 'block';
    tableBody.innerHTML = '';
    return;
  }

  if (historyTable) historyTable.style.display = 'table';
  if (emptyPlaceholder) emptyPlaceholder.style.display = 'none';

  tableBody.innerHTML = sessionScanHistory.map((scan, idx) => {
    return `
      <tr>
        <td><strong>${scan.timestamp}</strong></td>
        <td><span class="badge badge-subtle">${scan.type}</span></td>
        <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${escapeHtml(scan.snippet)}
        </td>
        <td>
          <span class="badge badge-${scan.riskLevel.toLowerCase()}">${scan.riskLevel} (${scan.score})</span>
        </td>
        <td>
          <button class="btn btn-secondary view-scan-btn" data-index="${idx}" style="padding: 4px 12px; font-size: 0.75rem;">
            View Details
          </button>
        </td>
      </tr>
    `;
  }).join('');

  // Attach modal listener for "View Details"
  tableBody.querySelectorAll('.view-scan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index, 10);
      const record = sessionScanHistory[idx];
      if (record) {
        showHistoryModal(record);
      }
    });
  });
}

function setupDashboardControls() {
  const clearBtn = document.getElementById('clear-history-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (sessionScanHistory.length === 0) {
        alert('Scan history is already empty.');
        return;
      }
      if (confirm('Clear all scans from your current session history?')) {
        sessionScanHistory = [];
        saveSessionHistory();
      }
    });
  }

  // Setup Modal Close
  const modal = document.getElementById('scan-details-modal');
  const closeBtn = document.getElementById('close-modal-btn');
  if (modal && closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }
}

function showHistoryModal(record) {
  const modal = document.getElementById('scan-details-modal');
  if (!modal) return;

  document.getElementById('modal-scan-title').textContent = `${record.type} Scan Details (${record.timestamp})`;
  document.getElementById('modal-scan-category').textContent = record.category || 'General';
  document.getElementById('modal-scan-level').textContent = `${record.riskLevel} (${record.score}/100)`;
  document.getElementById('modal-scan-level').className = `badge badge-${record.riskLevel.toLowerCase()}`;
  document.getElementById('modal-scan-snippet').textContent = record.snippet;

  const warningsEl = document.getElementById('modal-scan-warnings');
  const signs = record.fullResult?.identifiedWarningSigns || [];
  if (signs.length > 0) {
    warningsEl.innerHTML = signs.map(s => `<li>${escapeHtml(s)}</li>`).join('');
  } else {
    warningsEl.innerHTML = '<li>No critical warnings recorded.</li>';
  }

  const actionsEl = document.getElementById('modal-scan-actions');
  const actions = record.fullResult?.recommendedSafetyActions || [];
  actionsEl.innerHTML = actions.map(a => `<li>${escapeHtml(a)}</li>`).join('');

  modal.style.display = 'flex';
}

async function syncBackendStats() {
  try {
    const res = await fetch('/api/stats');
    if (res.ok) {
      const data = await res.json();
      console.log('Backend telemetry status:', data.stats);
    }
  } catch (e) {}
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}
