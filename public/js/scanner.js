/**
 * CyberGuard AI - Scanner Suite Engine
 * Handles Message Scanner, Phishing URL Scanner, and Email Scam Detector
 * Synchronizes with backend APIs and updates session history and telemetry.
 */

// Realistic Sample Datasets
const SAMPLES = {
  message: {
    sbiKyc: "Dear Customer, Your SBI NetBanking Account will be blocked today due to pending PAN Card KYC. Please update immediately to avoid suspension: http://sbi-pan-kyc.online/verify",
    electricity: "Dear Consumer, your electricity power supply will be disconnected tonight at 9:30 PM from the power office because your previous month bill was not updated. Immediately contact our electricity officer at 9876543210. Mahavitaran Discom.",
    kbcLottery: "CONGRATULATIONS!! You have won Rs 25,00,000 cash prize in KBC WhatsApp lucky lottery draw 2026. Send your photo, Aadhaar card, and processing fee of Rs 3,500 to Manager Rana Pratap Singh on WhatsApp 9123456789.",
    digitalArrest: "This is Inspector Rajesh Kumar from Mumbai Police Cyber Crime Cell & CBI. An illegal FedEx courier with 5 fake passports and 140g MDMA narcotics was seized in your name. You are placed under DIGITAL ARREST. Join Skype immediately or arrest warrant will be executed.",
    safeBank: "Dear Customer, INR 2,500.00 debited from A/c XX1234 on 13-Nov-26 at 20:14 via UPI to Zomato. UPI Ref: 431829104812. If not done by you, call 1800-111-222."
  },
  url: {
    phishingSbi: "http://sbi-kyc-update-portal.online/login.php",
    typosquatPaytm: "https://paytmm-cashback-reward.site/claim-5000",
    shortener: "http://bit.ly/urgent-account-verification-alert",
    safeApple: "https://www.apple.com/in/",
    safeSbi: "https://www.onlinesbi.sbi/"
  },
  email: {
    bec: {
      sender: "Rajesh Sharma (CEO) <ceo-office@company-corp-desk.com>",
      subject: "URGENT: Confidential Acquisition Wire Transfer Required Today",
      body: "Hi Accounts Team,\n\nI am currently in a closed-door board meeting and cannot take phone calls. We are finalizing an urgent strategic acquisition. Kindly execute an immediate confidential wire transfer of ₹4,85,000 to our external legal consultant account below before 4:00 PM today.\n\nAccount: 90218491028\nIFSC: HDFC0001824\nBeneficiary: Elite Corporate Legal Services\n\nKeep this strictly confidential until press announcement.\n\nRegards,\nRajesh Sharma\nManaging Director & CEO"
    },
    itRefund: {
      sender: "Income Tax Department <tax-refunds@gov-incometax-portal.online>",
      subject: "NOTIFICATION: Your Approved Tax Refund of ₹24,850 is Pending Disbursement",
      body: "Dear Taxpayer,\n\nOur automated tax auditing server has recalculated your Annual Information Statement for Financial Year 2025-26. A surplus refund of INR 24,850 has been approved.\n\nTo accept disbursement into your bank account, verify your NetBanking username and submit your one-time verification password immediately on our secure portal:\n\nhttp://incometax-refunds-verification.site/login\n\nFailure to verify within 24 hours will result in forfeiture of the refund.\n\nRegards,\nCentral Board of Direct Taxes"
    },
    safeNewsletter: {
      sender: "Tech Digest Weekly <updates@techdigest.io>",
      subject: "Issue #142: Breakthroughs in Quantum Cryptography & AI Safety",
      body: "Hello Subscriber,\n\nWelcome to this week's edition of Tech Digest. Today we explore new standards in post-quantum cryptography, NIST recommendations, and the evolution of AI-driven threat intelligence.\n\nRead the full issue on our blog or listen to our 10-minute audio briefing. You can update your subscription preferences anytime in your account settings.\n\nBest regards,\nThe Tech Digest Editorial Team"
    }
  }
};

export function initScannerSuite(onScanCompleted) {
  // Tab Switching
  const tabBtns = document.querySelectorAll('.scanner-tab-btn');
  const tabPanes = document.querySelectorAll('.scanner-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const target = btn.dataset.tab;
      const targetPane = document.getElementById(target);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Setup Message Scanner
  setupMessageScanner(onScanCompleted);

  // Setup URL Scanner
  setupUrlScanner(onScanCompleted);

  // Setup Email Scanner
  setupEmailScanner(onScanCompleted);
}

// --------------------------------------------------------------------------
// 1. MESSAGE SCANNER
// --------------------------------------------------------------------------
function setupMessageScanner(onScanCompleted) {
  const textarea = document.getElementById('message-input');
  const charCounter = document.getElementById('message-char-count');
  const clearBtn = document.getElementById('clear-message-btn');
  const analyzeBtn = document.getElementById('analyze-message-btn');
  const loading = document.getElementById('message-loading');
  const resultCard = document.getElementById('message-result-card');

  if (!textarea) return;

  // Live Character Counter
  textarea.addEventListener('input', () => {
    charCounter.textContent = `${textarea.value.length} characters`;
  });

  // Clear button
  clearBtn.addEventListener('click', () => {
    textarea.value = '';
    charCounter.textContent = '0 characters';
    resultCard.classList.remove('active');
  });

  // Sample Buttons
  document.querySelectorAll('[data-sample-msg]').forEach(btn => {
    btn.addEventListener('click', () => {
      const sampleKey = btn.dataset.sampleMsg;
      if (SAMPLES.message[sampleKey]) {
        textarea.value = SAMPLES.message[sampleKey];
        charCounter.textContent = `${textarea.value.length} characters`;
        resultCard.classList.remove('active');
      }
    });
  });

  // Analyze Action
  analyzeBtn.addEventListener('click', async () => {
    const text = textarea.value.trim();
    if (!text) {
      alert('Please enter or paste a suspicious message to scan.');
      textarea.focus();
      return;
    }

    analyzeBtn.disabled = true;
    resultCard.classList.remove('active');
    loading.classList.add('active');

    // Simulate multi-stage visual steps for Apple-like smoothness
    const stageEl = document.getElementById('message-loading-stage');
    const stages = [
      'Extracting linguistic tokens and syntax markers...',
      'Cross-referencing banking & telecom threat patterns...',
      'Evaluating social engineering & urgency vectors...',
      'Synthesizing risk assessment dashboard...'
    ];

    let stageIdx = 0;
    const interval = setInterval(() => {
      if (stageEl && stageIdx < stages.length) {
        stageEl.textContent = stages[stageIdx++];
      }
    }, 350);

    try {
      const response = await fetch('/api/scan-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      clearInterval(interval);
      loading.classList.remove('active');
      analyzeBtn.disabled = false;

      if (!data.success) {
        alert(data.error || 'Failed to analyze message. Please try again.');
        return;
      }

      renderMessageResult(data.result);
      if (typeof onScanCompleted === 'function') {
        onScanCompleted({
          type: 'Message',
          snippet: text.length > 55 ? text.substring(0, 52) + '...' : text,
          riskLevel: data.result.riskLevel,
          score: data.result.riskScore,
          category: data.result.threatCategory,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          fullResult: data.result
        });
      }
    } catch (err) {
      clearInterval(interval);
      loading.classList.remove('active');
      analyzeBtn.disabled = false;
      alert('Network error connecting to analysis backend: ' + err.message);
    }
  });
}

function renderMessageResult(res) {
  const card = document.getElementById('message-result-card');
  const header = document.getElementById('message-result-header');

  header.className = `result-card-header risk-${res.riskLevel.toLowerCase()}`;
  document.getElementById('message-category-display').textContent = res.threatCategory;
  document.getElementById('message-source-display').textContent = `Engine: ${res.source || 'CyberGuard Threat Intelligence'}`;

  const scoreEl = document.getElementById('message-score-display');
  scoreEl.textContent = `${res.riskScore}/100`;
  scoreEl.className = `risk-score-display score-${res.riskLevel.toLowerCase()}`;

  document.getElementById('message-level-badge').className = `badge badge-${res.riskLevel.toLowerCase()}`;
  document.getElementById('message-level-badge').textContent = `${res.riskLevel} RISK`;

  // Suspicious phrases tags
  const phrasesContainer = document.getElementById('message-phrases-container');
  if (res.suspiciousPhrases && res.suspiciousPhrases.length > 0) {
    phrasesContainer.innerHTML = res.suspiciousPhrases.map(p => `<span class="phrase-tag">${escapeHtml(p)}</span>`).join('');
    document.getElementById('message-phrases-wrapper').style.display = 'block';
  } else {
    document.getElementById('message-phrases-wrapper').style.display = 'none';
  }

  // Warning signs list
  const warningsList = document.getElementById('message-warnings-list');
  warningsList.innerHTML = res.identifiedWarningSigns.map(w => `<li>${escapeHtml(w)}</li>`).join('');

  // Actions list
  const actionsList = document.getElementById('message-actions-list');
  actionsList.innerHTML = res.recommendedSafetyActions.map(a => `<li>${escapeHtml(a)}</li>`).join('');

  // Explanation
  document.getElementById('message-explanation-text').textContent = res.detailedExplanation;

  card.classList.add('active');
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// --------------------------------------------------------------------------
// 2. PHISHING URL SCANNER
// --------------------------------------------------------------------------
function setupUrlScanner(onScanCompleted) {
  const input = document.getElementById('url-input');
  const clearBtn = document.getElementById('clear-url-btn');
  const analyzeBtn = document.getElementById('analyze-url-btn');
  const loading = document.getElementById('url-loading');
  const resultCard = document.getElementById('url-result-card');

  if (!input) return;

  clearBtn.addEventListener('click', () => {
    input.value = '';
    resultCard.classList.remove('active');
  });

  // Sample Buttons
  document.querySelectorAll('[data-sample-url]').forEach(btn => {
    btn.addEventListener('click', () => {
      const sampleKey = btn.dataset.sampleUrl;
      if (SAMPLES.url[sampleKey]) {
        input.value = SAMPLES.url[sampleKey];
        resultCard.classList.remove('active');
      }
    });
  });

  analyzeBtn.addEventListener('click', async () => {
    const rawUrl = input.value.trim();
    if (!rawUrl) {
      alert('Please enter a website URL to scan.');
      input.focus();
      return;
    }

    analyzeBtn.disabled = true;
    resultCard.classList.remove('active');
    loading.classList.add('active');

    try {
      const response = await fetch('/api/scan-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: rawUrl })
      });

      const data = await response.json();
      loading.classList.remove('active');
      analyzeBtn.disabled = false;

      if (!data.success) {
        alert(data.error || 'Failed to analyze URL.');
        return;
      }

      renderUrlResult(data.result);
      if (typeof onScanCompleted === 'function') {
        onScanCompleted({
          type: 'URL',
          snippet: rawUrl.length > 55 ? rawUrl.substring(0, 52) + '...' : rawUrl,
          riskLevel: data.result.riskLevel,
          score: data.result.riskScore,
          category: data.result.threatCategory,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          fullResult: data.result
        });
      }
    } catch (err) {
      loading.classList.remove('active');
      analyzeBtn.disabled = false;
      alert('Network error connecting to URL analysis server: ' + err.message);
    }
  });
}

function renderUrlResult(res) {
  const card = document.getElementById('url-result-card');
  const header = document.getElementById('url-result-header');

  header.className = `result-card-header risk-${res.riskLevel.toLowerCase()}`;
  document.getElementById('url-category-display').textContent = res.threatCategory;
  document.getElementById('url-scanned-address').textContent = res.url;
  document.getElementById('url-hostname-display').textContent = res.hostname;

  const protocolBadge = document.getElementById('url-protocol-badge');
  if (res.isHttps) {
    protocolBadge.className = 'badge badge-low';
    protocolBadge.textContent = 'HTTPS Encrypted (TLS)';
  } else {
    protocolBadge.className = 'badge badge-high';
    protocolBadge.textContent = 'HTTP Unencrypted (Insecure)';
  }

  const scoreEl = document.getElementById('url-score-display');
  scoreEl.textContent = `${res.riskScore}/100`;
  scoreEl.className = `risk-score-display score-${res.riskLevel.toLowerCase()}`;

  document.getElementById('url-level-badge').className = `badge badge-${res.riskLevel.toLowerCase()}`;
  document.getElementById('url-level-badge').textContent = `${res.riskLevel} RISK`;

  const warningsList = document.getElementById('url-warnings-list');
  warningsList.innerHTML = (res.identifiedWarningSigns && res.identifiedWarningSigns.length > 0)
    ? res.identifiedWarningSigns.map(w => `<li>${escapeHtml(w)}</li>`).join('')
    : '<li>No anomalous domain patterns or typosquatting markers detected.</li>';

  const actionsList = document.getElementById('url-actions-list');
  actionsList.innerHTML = res.recommendedSafetyActions.map(a => `<li>${escapeHtml(a)}</li>`).join('');

  document.getElementById('url-disclaimer-text').textContent = res.disclaimer;

  card.classList.add('active');
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// --------------------------------------------------------------------------
// 3. EMAIL SCAM DETECTOR
// --------------------------------------------------------------------------
function setupEmailScanner(onScanCompleted) {
  const senderInput = document.getElementById('email-sender-input');
  const subjectInput = document.getElementById('email-subject-input');
  const bodyInput = document.getElementById('email-body-input');
  const clearBtn = document.getElementById('clear-email-btn');
  const analyzeBtn = document.getElementById('analyze-email-btn');
  const loading = document.getElementById('email-loading');
  const resultCard = document.getElementById('email-result-card');

  if (!bodyInput) return;

  clearBtn.addEventListener('click', () => {
    senderInput.value = '';
    subjectInput.value = '';
    bodyInput.value = '';
    resultCard.classList.remove('active');
  });

  // Sample Buttons
  document.querySelectorAll('[data-sample-email]').forEach(btn => {
    btn.addEventListener('click', () => {
      const sampleKey = btn.dataset.sampleEmail;
      if (SAMPLES.email[sampleKey]) {
        senderInput.value = SAMPLES.email[sampleKey].sender;
        subjectInput.value = SAMPLES.email[sampleKey].subject;
        bodyInput.value = SAMPLES.email[sampleKey].body;
        resultCard.classList.remove('active');
      }
    });
  });

  analyzeBtn.addEventListener('click', async () => {
    const sender = senderInput.value.trim();
    const subject = subjectInput.value.trim();
    const body = bodyInput.value.trim();

    if (!body) {
      alert('Please paste the email body content to analyze.');
      bodyInput.focus();
      return;
    }

    analyzeBtn.disabled = true;
    resultCard.classList.remove('active');
    loading.classList.add('active');

    try {
      const response = await fetch('/api/scan-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender, subject, body })
      });

      const data = await response.json();
      loading.classList.remove('active');
      analyzeBtn.disabled = false;

      if (!data.success) {
        alert(data.error || 'Failed to analyze email.');
        return;
      }

      renderEmailResult(data.result);
      if (typeof onScanCompleted === 'function') {
        const snippetText = subject || body;
        onScanCompleted({
          type: 'Email',
          snippet: snippetText.length > 55 ? snippetText.substring(0, 52) + '...' : snippetText,
          riskLevel: data.result.riskLevel,
          score: data.result.riskScore,
          category: data.result.threatCategory,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          fullResult: data.result
        });
      }
    } catch (err) {
      loading.classList.remove('active');
      analyzeBtn.disabled = false;
      alert('Network error connecting to email analyzer: ' + err.message);
    }
  });
}

function renderEmailResult(res) {
  const card = document.getElementById('email-result-card');
  const header = document.getElementById('email-result-header');

  header.className = `result-card-header risk-${res.riskLevel.toLowerCase()}`;
  document.getElementById('email-category-display').textContent = res.threatCategory;

  const scoreEl = document.getElementById('email-score-display');
  scoreEl.textContent = `${res.riskScore}/100`;
  scoreEl.className = `risk-score-display score-${res.riskLevel.toLowerCase()}`;

  document.getElementById('email-level-badge').className = `badge badge-${res.riskLevel.toLowerCase()}`;
  document.getElementById('email-level-badge').textContent = `${res.riskLevel} RISK`;

  const warningsList = document.getElementById('email-warnings-list');
  warningsList.innerHTML = (res.identifiedWarningSigns && res.identifiedWarningSigns.length > 0)
    ? res.identifiedWarningSigns.map(w => `<li>${escapeHtml(w)}</li>`).join('')
    : '<li>No standard spoofing or credential harvest patterns detected.</li>';

  const actionsList = document.getElementById('email-actions-list');
  actionsList.innerHTML = res.recommendedSafetyActions.map(a => `<li>${escapeHtml(a)}</li>`).join('');

  document.getElementById('email-explanation-text').textContent = res.detailedExplanation;

  card.classList.add('active');
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
