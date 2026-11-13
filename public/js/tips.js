/**
 * Smart Safety Recommendations Module
 * 8 Core Cyber Vigilance Guidelines with Interactive Category Filtering
 */

const SAFETY_TIPS = [
  {
    id: 'tip-otp',
    category: 'financial',
    categoryLabel: 'Financial Security',
    icon: '🔑',
    title: 'Never Share One-Time Passwords (OTPs)',
    rule: 'An OTP is a digital signature that authorizes money leaving your account or account access transferring to another phone.',
    guidance: 'Banks, telecom operators, and government officers will NEVER call you asking for an OTP. If someone is asking for an OTP to "verify your identity" or "credit money", it is 100% fraud.',
    action: 'Hang up immediately. Block the number. Never type an OTP received via SMS into an unverified pop-up form.'
  },
  {
    id: 'tip-upi-pin',
    category: 'financial',
    categoryLabel: 'Financial Security',
    icon: '💳',
    title: 'Never Enter UPI PIN to Receive Money',
    rule: 'A UPI PIN is required strictly and exclusively to DEBIT money from your bank account.',
    guidance: 'When someone sends money to your Google Pay, PhonePe, or Paytm account, the amount is credited automatically. No PIN entry, QR code scanning, or "Accept" button is required.',
    action: 'If an incoming transaction asks for your 4-digit or 6-digit PIN, CANCEL it immediately. It is a fraudulent Collect Request.'
  },
  {
    id: 'tip-links',
    category: 'browsing',
    categoryLabel: 'Browsing & Links',
    icon: '🔗',
    title: 'Avoid Unknown Payment Links & Shorteners',
    rule: 'Shortened URLs (bit.ly, tinyurl) mask the true destination domain to bypass reputation filters.',
    guidance: 'Fraudulent SMS messages frequently use links like `bit.ly/sbi-kyc` or `update-pan.top`. Never click links received via unsolicited SMS or WhatsApp claiming to resolve account locks or pending utility bills.',
    action: 'Use CyberGuard AI’s URL Scanner to inspect links before clicking. Access banking services only by typing the known official URL directly into the browser.'
  },
  {
    id: 'tip-2fa',
    category: 'account',
    categoryLabel: 'Account Protection',
    icon: '🛡️',
    title: 'Enable Hardware or App-Based Two-Factor Authentication',
    rule: 'Passwords alone are vulnerable to database breaches, credential stuffing, and keyloggers.',
    guidance: 'Standard SMS-based 2FA is susceptible to SIM-swap attacks and vishing. Where available, switch your primary accounts (Google, Microsoft, Apple, GitHub) to authenticator apps (Google Authenticator, Microsoft Authenticator) or FIDO2 hardware security keys.',
    action: 'Go to your account security settings today, enable Authenticator 2FA, and store offline recovery emergency codes safely.'
  },
  {
    id: 'tip-passwords',
    category: 'account',
    categoryLabel: 'Account Protection',
    icon: '🔒',
    title: 'Deploy Unique Passphrases & Password Managers',
    rule: 'Reusing one password across multiple websites ensures that when one service is breached, all your accounts fall.',
    guidance: 'Avoid predictable patterns like your name + birth year (`Rahul@1998`). Instead, create 4-word passphrases (`Solar!Galaxy#Coffee&Tiger`) or generate random 16-character alphanumeric strings stored inside an encrypted password manager.',
    action: 'Never save banking passwords in plain text on your phone notes or WhatsApp chats.'
  },
  {
    id: 'tip-remote-apps',
    category: 'device',
    categoryLabel: 'Device Safety',
    icon: '📱',
    title: 'Verify Unknown Callers & Never Install Screen-Sharing Apps',
    rule: 'Screen-sharing software grants complete remote control over your smartphone or desktop computer.',
    guidance: 'Scammers posing as customer service agents instruct victims to install AnyDesk, TeamViewer, QuickSupport, or RustDesk. Once installed, they read your SMS OTPs in real time and initiate unauthorized wire transfers right in front of your eyes.',
    action: 'Never install remote management applications at the request of an incoming caller, no matter what company they claim to represent.'
  },
  {
    id: 'tip-domains',
    category: 'browsing',
    categoryLabel: 'Browsing & Links',
    icon: '🌐',
    title: 'Inspect Website Domains & Beware Lookalikes',
    rule: 'A green padlock / HTTPS simply indicates data transport encryption; it does NOT verify ethical ownership.',
    guidance: 'Criminals register lookalike domains like `onlinesbi-verification.xyz` or `hdfc-netbank.top` with free SSL certificates. Look closely at the top-level domain and the exact spelling before typing passwords.',
    action: 'Check whether the domain belongs to the official root domain (e.g. `onlinesbi.sbi` or `hdfcbank.com`). When in doubt, scan it through CyberGuard AI.'
  },
  {
    id: 'tip-apks',
    category: 'device',
    categoryLabel: 'Device Safety',
    icon: '⚠️',
    title: 'Avoid Unverified APK Attachments & Sideloading',
    rule: 'Android application packages (.apk) sent via WhatsApp or Telegram can contain spyware, keyloggers, and SMS interceptors.',
    guidance: 'Fraudulent schemes circulate APKs disguised as "PM Kisan Yojana", "Electricity Bill Update", "Wedding Invitation", or "E-Challan Notice". Once installed, the malware hides its icon, intercepts all banking SMS OTPs, and forwards them to attacker command servers.',
    action: 'Never install `.apk` files downloaded from WhatsApp or browser links. Only download applications from Google Play Store or Apple App Store with verified developer credentials.'
  }
];

export function initSafetyTips() {
  const container = document.getElementById('safety-tips-cards-grid');
  const filterBtns = document.querySelectorAll('.tip-filter-btn');

  if (!container) return;

  renderTips(container, 'all');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category || 'all';
      renderTips(container, cat);
    });
  });
}

function renderTips(container, category) {
  const filtered = category === 'all'
    ? SAFETY_TIPS
    : SAFETY_TIPS.filter(t => t.category === category);

  container.innerHTML = filtered.map(tip => `
    <div class="tip-card" data-category="${tip.category}">
      <span class="tip-category-tag">${tip.categoryLabel}</span>
      <div style="font-size: 2.2rem; margin-bottom: 14px;">${tip.icon}</div>
      <h3>${escapeHtml(tip.title)}</h3>
      <p style="font-weight: 600; color: #1E293B; margin-bottom: 10px;">${escapeHtml(tip.rule)}</p>
      <p style="margin-bottom: 14px;">${escapeHtml(tip.guidance)}</p>
      <div style="margin-top: auto; padding-top: 14px; border-top: 1px dashed var(--color-border); font-size: 0.8125rem; color: #1D4ED8; font-weight: 600;">
        🛡️ Action: ${escapeHtml(tip.action)}
      </div>
    </div>
  `).join('');
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
