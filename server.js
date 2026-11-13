/**
 * CyberGuard AI - Core Backend Server
 * Developed for JSPM University Pune | Innovation Project 2026-27
 * Department of Electronics and Telecommunication Engineering
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, 'public');
const PORT = process.env.PORT || 3000;

// In-memory session stats (reset on server restart, privacy-preserving)
let sessionStats = {
  totalScans: 0,
  highRisk: 0,
  mediumRisk: 0,
  lowRisk: 0,
  messagesScanned: 0,
  urlsScanned: 0,
  emailsScanned: 0,
  startedAt: new Date().toISOString()
};

// ==========================================
// THREAT INTELLIGENCE ENGINE (RULE & HEURISTIC NLP)
// ==========================================

// High-risk brand names frequently targeted in India & globally
const MONITORED_BRANDS = [
  { name: 'State Bank of India', tokens: ['sbi', 'onlinesbi', 'statebank'], domain: 'onlinesbi.sbi' },
  { name: 'HDFC Bank', tokens: ['hdfc', 'hdfcbank'], domain: 'hdfcbank.com' },
  { name: 'ICICI Bank', tokens: ['icici', 'icicibank'], domain: 'icicibank.com' },
  { name: 'Axis Bank', tokens: ['axis', 'axisbank'], domain: 'axisbank.com' },
  { name: 'Punjab National Bank', tokens: ['pnb', 'pnbindia'], domain: 'pnbindia.in' },
  { name: 'Paytm', tokens: ['paytm'], domain: 'paytm.com' },
  { name: 'PhonePe', tokens: ['phonepe'], domain: 'phonepe.com' },
  { name: 'Google Pay', tokens: ['gpay', 'googlepay'], domain: 'pay.google.com' },
  { name: 'Apple', tokens: ['apple', 'icloud', 'appleid'], domain: 'apple.com' },
  { name: 'Amazon', tokens: ['amazon', 'amzn'], domain: 'amazon.in' },
  { name: 'Flipkart', tokens: ['flipkart'], domain: 'flipkart.com' },
  { name: 'Netflix', tokens: ['netflix'], domain: 'netflix.com' },
  { name: 'India Post', tokens: ['indiapost', 'dak-sewa', 'speedpost'], domain: 'indiapost.gov.in' },
  { name: 'Income Tax Dept', tokens: ['incometax', 'incometaxindia', 'it-refund'], domain: 'incometax.gov.in' },
  { name: 'UIDAI Aadhaar', tokens: ['uidai', 'eaadhaar', 'aadhaar'], domain: 'uidai.gov.in' },
  { name: 'Mahavitaran / Electricity Board', tokens: ['mahadiscom', 'electricity', 'powerbill', 'bses'], domain: 'mahadiscom.in' }
];

const SUSPICIOUS_TLDS = new Set([
  'xyz', 'top', 'tk', 'ml', 'ga', 'cf', 'gq', 'site', 'online', 'club',
  'work', 'vip', 'buzz', 'rest', 'click', 'live', 'shop', 'icu', 'cam',
  'kim', 'monster', 'cc', 'ru', 'su', 'pw', 'space', 'fun', 'date', 'bid'
]);

const SHORTENERS = new Set([
  'bit.ly', 'tinyurl.com', 'is.gd', 't.co', 'ow.ly', 'rb.gy', 'cutt.ly',
  'shorturl.at', 'buff.ly', 'adf.ly', 'rebrand.ly', 'shorte.st'
]);

// Helper: Calculate Levenshtein distance for typosquatting detection
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}

// ==========================================
// 1. MESSAGE SCANNING HEURISTIC ENGINE
// ==========================================
function analyzeMessageHeuristics(message) {
  const text = message.trim();
  const lower = text.toLowerCase();

  const warningSigns = [];
  const suspiciousPhrases = [];
  let score = 5; // Base baseline
  let category = 'General Communication';

  // 1. Financial / Banking Scams & KYC Expiry (Flexible word-order patterns)
  const kycPatterns = [
    {
      regex: /(kyc|pan|aadhaar).{0,25}(update|expired|suspended|pending|blocked|verification|mandatory|link)/i,
      label: 'KYC / Document Suspension Coercion',
      weight: 40
    },
    {
      regex: /(update|expired|suspended|pending|blocked|verification|mandatory).{0,25}(kyc|pan|aadhaar)/i,
      label: 'Pending KYC / Authentication Alert',
      weight: 40
    },
    {
      regex: /(account|netbanking|sim|card).{0,25}(blocked|suspended|deactivated|frozen|terminated|locked|disabled)/i,
      label: 'Urgent Account Freeze Threat',
      weight: 40
    },
    {
      regex: /(blocked|suspended|deactivated|frozen|terminated|locked|disabled).{0,25}(account|netbanking|sim|card)/i,
      label: 'Account Deactivation Warning',
      weight: 40
    },
    {
      regex: /debit\s*card\s*(expired|blocked|points|reward)/i,
      label: 'Debit/Credit Card Threat or Reward',
      weight: 30
    }
  ];

  for (const p of kycPatterns) {
    if (p.regex.test(text)) {
      const match = text.match(p.regex);
      suspiciousPhrases.push(match[0]);
      warningSigns.push(p.label);
      score += p.weight;
      category = 'Banking & KYC Fraud';
      break; // Avoid double stacking same category
    }
  }

  // 2. OTP and Credential Harvesters
  const otpPatterns = [
    { regex: /(share|send|forward|enter|submit|provide)\s*(your)?\s*(otp|one\s*time\s*password|pin|upi\s*pin|cvv|password)/i, label: 'Explicit OTP or PIN Request', weight: 45 },
    { regex: /otp\s*is\s*required\s*to\s*(verify|claim|cancel|refund|credit)/i, label: 'Conditional OTP Harvesting', weight: 45 },
    { regex: /do\s*not\s*share\s*this\s*otp.*except/i, label: 'Manipulated OTP Security Advisory', weight: 35 }
  ];

  for (const p of otpPatterns) {
    if (p.regex.test(text)) {
      const match = text.match(p.regex);
      suspiciousPhrases.push(match[0]);
      warningSigns.push(p.label);
      score += p.weight;
      category = 'OTP / Credential Harvesting';
      break;
    }
  }

  // 3. Electricity Bill / Utility Cutoff Scam (Extremely common in India)
  const utilityPatterns = [
    { regex: /electricity.*(disconnect|disconnected|cut|cutoff|terminated).*(tonight|today|by|at)/i, label: 'Imminent Utility Disconnection Threat', weight: 45 },
    { regex: /electricity\s*officer|helpline\s*number\s*:\s*\+?[0-9]{10}/i, label: 'Fake Utility Officer Contact', weight: 35 },
    { regex: /previous\s*month\s*bill\s*(not\s*updated|unpaid)/i, label: 'False Unpaid Bill Claim', weight: 30 }
  ];

  for (const p of utilityPatterns) {
    if (p.regex.test(text)) {
      const match = text.match(p.regex);
      suspiciousPhrases.push(match[0]);
      warningSigns.push(p.label);
      score += p.weight;
      category = 'Utility Bill / Disconnection Scam';
      break;
    }
  }

  // 4. Digital Arrest / Law Enforcement Impersonation (High Priority in India)
  const digitalArrestPatterns = [
    { regex: /(cbi|ed|enforcement\s*directorate|cyber\s*crime\s*cell|mumbai\s*police|delhi\s*police|trai).*(arrest|warrant|interrogation|custody|investigation)/i, label: 'Law Enforcement / Arrest Threat', weight: 50 },
    { regex: /(narcotics|drugs|illegal\s*parcel|passport\s*seized|customs\s*officer|fedex.*seized)/i, label: 'Illegal Courier / Narcotics Coercion', weight: 45 },
    { regex: /(skype|video\s*call|digital\s*arrest)/i, label: 'Digital Arrest / Isolation Coercion', weight: 50 }
  ];

  for (const p of digitalArrestPatterns) {
    if (p.regex.test(text)) {
      const match = text.match(p.regex);
      suspiciousPhrases.push(match[0]);
      warningSigns.push(p.label);
      score += p.weight;
      category = 'Digital Arrest / Police Extortion Scam';
      break;
    }
  }

  // 5. Lottery, Prize, Work From Home, Part-Time Jobs
  const lotteryJobPatterns = [
    { regex: /(congratulations|congrats).*won.*(lakh|crore|prize|lottery|kbc|iphone|car)/i, label: 'Unsolicited Lottery / Prize Claim', weight: 45 },
    { regex: /(part\s*time|work\s*from\s*home|daily\s*income|earn\s*daily\s*rs|telegram\s*task|like\s*youtube\s*videos)/i, label: 'Part-Time Task / Telegram Job Scam', weight: 40 },
    { regex: /(earn\s*[0-9]{3,5}\s*to\s*[0-9]{3,5}\s*(daily|per\s*day))/i, label: 'Unrealistic Income Promise', weight: 35 }
  ];

  for (const p of lotteryJobPatterns) {
    if (p.regex.test(text)) {
      const match = text.match(p.regex);
      suspiciousPhrases.push(match[0]);
      warningSigns.push(p.label);
      score += p.weight;
      category = 'Lottery & Task / Job Scam';
      break;
    }
  }

  // 6. Suspicious Software / APK / Remote Access
  const apkRemotePatterns = [
    { regex: /\.apk\b|install\s*app|download\s*application/i, label: 'Untrusted APK Download Link', weight: 40 },
    { regex: /anydesk|teamviewer|rustdesk|quicksupport|screen\s*share/i, label: 'Remote Access Tool Installation Request', weight: 50 }
  ];

  for (const p of apkRemotePatterns) {
    if (p.regex.test(text)) {
      const match = text.match(p.regex);
      suspiciousPhrases.push(match[0]);
      warningSigns.push(p.label);
      score += p.weight;
      category = 'Malicious APK / Remote Desktop Scam';
      break;
    }
  }

  // 7. Urgency and Coercion Keywords (Word boundary matching to avoid duplicates)
  const urgencyKeywords = [
    { word: 'immediately', weight: 15 },
    { word: 'immediate', weight: 15 },
    { word: 'within 24 hours', weight: 15 },
    { word: 'within 10 minutes', weight: 20 },
    { word: 'at once', weight: 12 },
    { word: 'today only', weight: 12 },
    { word: 'final notice', weight: 20 },
    { word: 'action required', weight: 12 },
    { word: 'avoid legal action', weight: 25 },
    { word: 'fir registered', weight: 30 }
  ];

  let addedUrgency = false;
  for (const item of urgencyKeywords) {
    const rx = new RegExp('\\b' + item.word.replace(/\s+/g, '\\s+') + '\\b', 'i');
    if (rx.test(text) && !addedUrgency) {
      suspiciousPhrases.push(item.word);
      warningSigns.push(`High urgency trigger: "${item.word}" creates psychological pressure`);
      score += item.weight;
      addedUrgency = true;
    }
  }

  // 8. Presence of hyperlinks + cross-inspection
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(?:xyz|top|online|site|club|tk|ml)[^\s]*)/ig;
  const foundUrls = text.match(urlRegex) || [];
  if (foundUrls.length > 0) {
    const detectedLink = foundUrls[0];
    suspiciousPhrases.push(detectedLink);
    score += 25;

    // Cross-inspect URL using our URL engine
    try {
      const urlAnalysis = analyzeUrlHeuristics(detectedLink);
      if (urlAnalysis && urlAnalysis.riskLevel === 'HIGH') {
        score += 30;
        warningSigns.push(`High-Risk Destination Link: "${detectedLink}" exhibits strong phishing / domain impersonation attributes (${urlAnalysis.threatCategory})`);
      } else {
        warningSigns.push(`Contains unverified hyperlink (${detectedLink}), commonly used in credential-harvesting attacks`);
      }
    } catch (e) {
      warningSigns.push(`Contains unverified hyperlink (${detectedLink})`);
    }
  }

  // Cap score between 0 and 100
  score = Math.min(Math.max(score, 5), 98);

  // If no negative signals were found at all
  if (warningSigns.length === 0) {
    score = 8;
    category = 'Low Risk Communication';
  }

  // Determine Risk Level
  let riskLevel = 'LOW';
  if (score >= 65) {
    riskLevel = 'HIGH';
  } else if (score >= 35) {
    riskLevel = 'MEDIUM';
  }

  // Construct recommendations
  const recommendations = [];
  if (riskLevel === 'HIGH') {
    recommendations.push('Do NOT click any links, open attachments, or download suggested APK files.');
    recommendations.push('NEVER share OTPs, UPI PINs, NetBanking credentials, or Aadhaar numbers.');
    recommendations.push('If this claims to be from a bank, police, or power department, contact them directly using their verified official website or branch.');
    recommendations.push('If you already shared financial credentials or lost money, call 1930 immediately or lodge a complaint on cybercrime.gov.in within the golden hour.');
  } else if (riskLevel === 'MEDIUM') {
    recommendations.push('Treat with caution. Verify the sender identity through independent official channels.');
    recommendations.push('Do not share personal or confidential information in response to urgent requests.');
    recommendations.push('Check the true URL destination before clicking any link.');
  } else {
    recommendations.push('No obvious phishing or scam vectors were identified in this message.');
    recommendations.push('Maintain standard cyber vigilance: banks and government agencies never ask for passwords or OTPs over text.');
  }

  // Detailed explanation
  let explanation = '';
  if (riskLevel === 'HIGH') {
    explanation = `This message displays high-confidence indicators of ${category}. Scammers routinely employ social engineering tactics — such as simulated institutional authority, urgent time-limits, and fake service disruption threats — to coerce victims into sharing confidential authentication keys (such as OTPs, UPI PINs, or NetBanking credentials) or installing malicious remote-desktop software.`;
  } else if (riskLevel === 'MEDIUM') {
    explanation = `This message contains certain linguistic patterns (e.g., promotional claims, urgency triggers, or embedded links) that warrant careful examination. While it may be marketing or automated notification, it shares characteristics commonly observed in intermediate social engineering campaigns.`;
  } else {
    explanation = `The analyzed content does not exhibit characteristic signatures of financial fraud, credential harvesting, or coercion techniques. However, always exercise caution with unexpected messages from unknown contacts.`;
  }

  return {
    riskLevel,
    threatCategory: category,
    riskScore: score,
    suspiciousPhrases: Array.from(new Set(suspiciousPhrases)),
    identifiedWarningSigns: Array.from(new Set(warningSigns)),
    detailedExplanation: explanation,
    recommendedSafetyActions: recommendations,
    disclaimer: 'AI risk scores are automated probabilistic estimates and educational guidelines, not definitive legal proof of safety or fraud.'
  };
}

// ==========================================
// 2. URL SCANNING HEURISTIC ENGINE
// ==========================================
function analyzeUrlHeuristics(inputUrl) {
  let raw = inputUrl.trim();
  if (!/^https?:\/\//i.test(raw)) {
    raw = 'https://' + raw;
  }

  let parsed;
  try {
    parsed = new URL(raw);
  } catch (err) {
    return {
      error: 'Invalid URL format. Please provide a well-formed web address (e.g., https://example.com).'
    };
  }

  const hostname = parsed.hostname.toLowerCase();
  const pathname = parsed.pathname;
  const protocol = parsed.protocol;
  const warningSigns = [];
  let score = 5;
  let category = 'Legitimate Web Resource';

  // 1. Protocol check
  const isHttps = protocol === 'https:';
  if (!isHttps) {
    warningSigns.push('Unencrypted HTTP protocol: Connection is susceptible to interception and eavesdropping.');
    score += 20;
  }

  // 2. IP Address as Hostname
  const isIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
  if (isIp) {
    warningSigns.push(`IP address used as hostname (${hostname}): Legitimate consumer websites use registered domain names. Common in credential harvesters.`);
    score += 45;
    category = 'Direct IP Phishing Gateway';
  }

  // 3. TLD Analysis
  const domainParts = hostname.split('.');
  const tld = domainParts[domainParts.length - 1];
  if (SUSPICIOUS_TLDS.has(tld)) {
    warningSigns.push(`High-risk Top-Level Domain (.${tld}): Frequently abused in low-cost automated phishing campaigns.`);
    score += 25;
    if (category === 'Legitimate Web Resource') category = 'Suspicious Domain Infrastructure';
  }

  // 4. URL Shortener detection
  if (SHORTENERS.has(hostname)) {
    warningSigns.push(`URL Shortening Service (${hostname}): The true destination is concealed. Scammers use shorteners to bypass domain reputation filters.`);
    score += 25;
    category = 'Obfuscated Shortened Link';
  }

  // 5. Brand Impersonation & Typosquatting
  let brandImpersonated = null;
  for (const b of MONITORED_BRANDS) {
    for (const tok of b.tokens) {
      if (hostname.includes(tok)) {
        // Check if it's the official domain
        if (!hostname.endsWith(b.domain)) {
          brandImpersonated = b.name;
          warningSigns.push(`Brand Impersonation: Domain contains "${tok}" but does not belong to the authentic organization (${b.domain}).`);
          score += 50;
          category = `Phishing: Fake ${b.name} Portal`;
        }
      }
    }
  }

  // Levenshtein typosquatting check on major brands
  if (!brandImpersonated && domainParts.length >= 2) {
    const mainLabel = domainParts[domainParts.length - 2];
    for (const b of MONITORED_BRANDS) {
      for (const tok of b.tokens) {
        if (tok.length >= 4) {
          const dist = levenshtein(mainLabel, tok);
          if (dist === 1) {
            warningSigns.push(`Typosquatting Detected: Domain "${mainLabel}" is an intentional 1-character typo variation of "${tok}" (${b.name}).`);
            score += 45;
            category = `Typosquatting Phishing (${b.name})`;
          }
        }
      }
    }
  }

  // 6. Excessive Subdomains & Hyphens
  const hyphenCount = (hostname.match(/-/g) || []).length;
  if (hyphenCount >= 3) {
    warningSigns.push(`Excessive hyphens in hostname (${hyphenCount} hyphens): Often used to manufacture convincing fake hostnames.`);
    score += 20;
  }

  if (domainParts.length >= 4 && !isIp) {
    warningSigns.push(`Excessive subdomain nesting (${domainParts.length} levels): Often masks the true registrar domain.`);
    score += 15;
  }

  // 7. Suspicious Path Keywords
  const pathLower = (pathname + parsed.search).toLowerCase();
  const dangerousPathTokens = [
    'login', 'signin', 'verify', 'update-kyc', 'pan-link', 'claim',
    'bank', 'secure', 'ebanking', 'reward', 'otp', 'download.apk', '.apk'
  ];

  for (const token of dangerousPathTokens) {
    if (pathLower.includes(token)) {
      warningSigns.push(`Suspicious path keyword identified: "${token}"`);
      score += 12;
      break;
    }
  }

  // Known trusted domains (whitelist check)
  const trustedDomains = ['apple.com', 'google.com', 'microsoft.com', 'onlinesbi.sbi', 'hdfcbank.com', 'gov.in', 'jspm.edu.in', 'jspmuni.ac.in', 'github.com', 'wikipedia.org'];
  const isTrusted = trustedDomains.some(td => hostname === td || hostname.endsWith('.' + td));
  if (isTrusted && warningSigns.length <= 1) {
    score = 5;
    category = 'Verified Authentic Domain';
    warningSigns.length = 0;
  }

  score = Math.min(Math.max(score, 5), 98);

  let riskLevel = 'LOW';
  if (score >= 65) riskLevel = 'HIGH';
  else if (score >= 35) riskLevel = 'MEDIUM';

  const recommendations = [];
  if (riskLevel === 'HIGH') {
    recommendations.push('DO NOT navigate to this website or enter any personal, banking, or login credentials.');
    recommendations.push('Do NOT download any APK or executable files prompted by this site.');
    recommendations.push('If you received this link via SMS or WhatsApp, block and report the sender.');
  } else if (riskLevel === 'MEDIUM') {
    recommendations.push('Proceed with vigilance. Double-check the address bar for the exact spelling of the domain.');
    recommendations.push('Never input passwords or financial information on shortened or unverified URLs.');
  } else {
    recommendations.push('Domain structure appears standard and legitimate.');
    recommendations.push('Remember: HTTPS only encrypts the transport channel; it does not vouch for the ethics or legitimacy of unknown website owners.');
  }

  return {
    url: raw,
    hostname,
    protocol,
    isHttps,
    tld,
    riskLevel,
    threatCategory: category,
    riskScore: score,
    identifiedWarningSigns: warningSigns,
    recommendedSafetyActions: recommendations,
    disclaimer: 'HTTPS verifies data encryption in transit, NOT the moral legitimacy of the website owner. Threat assessments are educational estimates.'
  };
}

// ==========================================
// 3. EMAIL SCAM DETECTION ENGINE
// ==========================================
function analyzeEmailHeuristics({ sender = '', subject = '', body = '' }) {
  const fullText = `${sender} ${subject} ${body}`;
  const lower = fullText.toLowerCase();

  const warningSigns = [];
  const redFlags = [];
  let score = 8;
  let category = 'Standard Email';

  // 1. Sender Spoofing / Domain mismatch
  if (sender) {
    const senderMatch = sender.match(/<([^>]+)>/) || [null, sender];
    const actualEmail = (senderMatch[1] || sender).toLowerCase();
    const displayName = sender.replace(/<[^>]+>/, '').trim();

    // Check if display name claims to be a bank/organization but uses free webmail
    for (const b of MONITORED_BRANDS) {
      if (displayName.toLowerCase().includes(b.name.toLowerCase())) {
        if (!actualEmail.endsWith(b.domain) && (actualEmail.includes('gmail.com') || actualEmail.includes('yahoo.com') || actualEmail.includes('hotmail.com') || !actualEmail.endsWith(b.domain))) {
          warningSigns.push(`Sender Impersonation: Display Name claims to be "${b.name}" but true email address is "${actualEmail}".`);
          redFlags.push('Mismatched sender identity');
          score += 45;
          category = `Executive / Brand Impersonation (${b.name})`;
        }
      }
    }
  }

  // 2. Urgent / Threatening Subject Lines
  const urgentSubjectPatterns = [
    { regex: /urgent|action\s*required|immediate\s*attention|account\s*suspended|legal\s*notice|security\s*alert|final\s*warning/i, label: 'High Urgency Subject Line', weight: 25 },
    { regex: /tax\s*refund|lottery|beneficiary|inheritance|wire\s*transfer/i, label: 'Financial Bait in Subject', weight: 30 }
  ];

  for (const p of urgentSubjectPatterns) {
    if (p.regex.test(subject)) {
      warningSigns.push(p.label);
      score += p.weight;
    }
  }

  // 3. Body Harvesters & Phishing Links
  if (/password|pin|otp|cvv|aadhaar|pan\s*card/i.test(body)) {
    warningSigns.push('Requests sensitive credentials (Password, PIN, OTP, or PAN/Aadhaar) via email.');
    redFlags.push('Credential harvesting request');
    score += 35;
    category = 'Credential Harvesting Phishing';
  }

  if (/dear\s*(customer|client|user|member|beneficiary|taxpayer|account\s*holder)/i.test(body)) {
    warningSigns.push('Generic salutation ("Dear Customer"): Legitimate institutions address existing customers by their registered full name.');
    score += 15;
  }

  if (/click\s*here|verify\s*now|update\s*immediately|confirm\s*identity|log\s*in\s*to\s*protect/i.test(body)) {
    warningSigns.push('Contains coercive call-to-action hyperlinks designed to divert users to external portals.');
    score += 20;
  }

  if (/(wire\s*transfer|bitcoin|gift\s*card|crypto|remittance|western\s*union)/i.test(body)) {
    warningSigns.push('Mentions untraceable payment methods (Wire transfer, Crypto, Gift cards).');
    redFlags.push('Irreversible payment demand');
    score += 35;
    category = 'Financial Wire Scam';
  }

  // 4. CEO Fraud / BEC (Business Email Compromise)
  if (/(kindly\s*execute|confidential\s*transaction|keep\s*this\s*between\s*us|are\s*you\s*at\s*your\s*desk)/i.test(body) && /ceo|director|managing/i.test(sender + subject)) {
    warningSigns.push('Business Email Compromise (BEC) pattern: Simulated executive urgency requesting discreet action.');
    score += 40;
    category = 'Business Email Compromise (BEC)';
  }

  score = Math.min(Math.max(score, 5), 98);

  let riskLevel = 'LOW';
  if (score >= 65) riskLevel = 'HIGH';
  else if (score >= 35) riskLevel = 'MEDIUM';

  const recommendations = [];
  if (riskLevel === 'HIGH') {
    recommendations.push('Do NOT reply to this email, click any embedded links, or download attachments.');
    recommendations.push('Check the true email header to confirm the SPF, DKIM, and sender envelope.');
    recommendations.push('Forward the email as an attachment to your organization security team or national cyber reporting channel.');
  } else if (riskLevel === 'MEDIUM') {
    recommendations.push('Verify sender authenticity by contacting the purported organization via a known, independent phone number.');
    recommendations.push('Hover over hyperlinks (without clicking) to inspect the true destination URL.');
  } else {
    recommendations.push('Email does not show overt phishing or spoofing markers.');
    recommendations.push('Continue practicing standard cyber hygiene regarding unexpected requests.');
  }

  return {
    riskLevel,
    threatCategory: category,
    riskScore: score,
    redFlags: Array.from(new Set(redFlags)),
    identifiedWarningSigns: Array.from(new Set(warningSigns)),
    detailedExplanation: `Analyzed ${subject ? 'subject "' + subject + '" and ' : ''}content across ${body.length} characters. Identified ${warningSigns.length} diagnostic risk vectors.`,
    recommendedSafetyActions: recommendations,
    disclaimer: 'Email analysis results are AI heuristic approximations. Never rely on automated scans as a sole defense against spear-phishing.'
  };
}

// ==========================================
// OPTIONAL GOOGLE GEMINI ENHANCEMENT PROXY
// ==========================================
async function callGeminiIfAvailable(apiKey, promptText) {
  if (!apiKey) return null;
  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) {
      console.warn('Gemini API call failed with status:', response.status);
      return null;
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (candidateText) {
      return JSON.parse(candidateText);
    }
  } catch (err) {
    console.warn('Error during Gemini API call:', err.message);
  }
  return null;
}

// ==========================================
// STATIC FILE SERVING
// ==========================================
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2'
};

function serveStatic(req, res, pathname) {
  let safePath = pathname === '/' ? '/index.html' : pathname;
  // Prevent directory traversal
  const normalized = path.normalize(safePath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(PUBLIC_DIR, normalized);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<h1>404 Not Found</h1><p>The requested path ${pathname} does not exist on CyberGuard AI.</p>`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
}

// ==========================================
// HTTP REQUEST ROUTER
// ==========================================
const server = http.createServer(async (req, res) => {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Gemini-Key');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // JSON Body Parser helper
  const readJsonBody = () => new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) { // 1MB limit
        req.destroy();
        reject(new Error('Payload Too Large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
  });

  // REST API Endpoints
  if (pathname.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // GET /api/health
    if (pathname === '/api/health' && req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({
        status: 'UP',
        engine: 'CyberGuard AI Heuristic & NLP Engine v2.4',
        geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
        institution: 'JSPM University Pune',
        timestamp: new Date().toISOString()
      }));
      return;
    }

    // GET /api/stats
    if (pathname === '/api/stats' && req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        stats: sessionStats
      }));
      return;
    }

    // POST /api/scan-message
    if (pathname === '/api/scan-message' && req.method === 'POST') {
      try {
        const body = await readJsonBody();
        const message = body.message;
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, error: 'Please enter a message to analyze.' }));
          return;
        }

        const apiKey = req.headers['x-gemini-key'] || process.env.GEMINI_API_KEY;
        const heuristicResult = analyzeMessageHeuristics(message);

        // Attempt Gemini enhancement if key provided
        let geminiResult = null;
        if (apiKey) {
          const geminiPrompt = `You are a cybersecurity expert analyzing an SMS/WhatsApp message for fraud, phishing, OTP theft, and social engineering.
Return valid JSON with:
{
  "riskLevel": "LOW" | "MEDIUM" | "HIGH",
  "threatCategory": "string",
  "riskScore": number (0-100),
  "suspiciousPhrases": ["string"],
  "identifiedWarningSigns": ["string"],
  "detailedExplanation": "string",
  "recommendedSafetyActions": ["string"]
}
Message to analyze:
"""${message}"""`;
          geminiResult = await callGeminiIfAvailable(apiKey, geminiPrompt);
        }

        const finalResult = geminiResult ? { ...geminiResult, source: 'Google Gemini AI + CyberGuard Heuristics' } : { ...heuristicResult, source: 'CyberGuard Deep Heuristic & NLP Threat Engine' };

        // Update stats
        sessionStats.totalScans++;
        sessionStats.messagesScanned++;
        if (finalResult.riskLevel === 'HIGH') sessionStats.highRisk++;
        else if (finalResult.riskLevel === 'MEDIUM') sessionStats.mediumRisk++;
        else sessionStats.lowRisk++;

        res.writeHead(200);
        res.end(JSON.stringify({ success: true, result: finalResult }));
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
      return;
    }

    // POST /api/scan-url
    if (pathname === '/api/scan-url' && req.method === 'POST') {
      try {
        const body = await readJsonBody();
        const inputUrl = body.url;
        if (!inputUrl || typeof inputUrl !== 'string' || inputUrl.trim().length === 0) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, error: 'Please enter a URL to analyze.' }));
          return;
        }

        const result = analyzeUrlHeuristics(inputUrl);
        if (result.error) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, error: result.error }));
          return;
        }

        sessionStats.totalScans++;
        sessionStats.urlsScanned++;
        if (result.riskLevel === 'HIGH') sessionStats.highRisk++;
        else if (result.riskLevel === 'MEDIUM') sessionStats.mediumRisk++;
        else sessionStats.lowRisk++;

        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          result: { ...result, source: 'CyberGuard Domain Intelligence & Typosquat Analyzer' }
        }));
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
      return;
    }

    // POST /api/scan-email
    if (pathname === '/api/scan-email' && req.method === 'POST') {
      try {
        const body = await readJsonBody();
        const { sender, subject, body: emailBody } = body;
        if (!emailBody || typeof emailBody !== 'string' || emailBody.trim().length === 0) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, error: 'Please provide email body text to analyze.' }));
          return;
        }

        const result = analyzeEmailHeuristics({ sender, subject, body: emailBody });

        sessionStats.totalScans++;
        sessionStats.emailsScanned++;
        if (result.riskLevel === 'HIGH') sessionStats.highRisk++;
        else if (result.riskLevel === 'MEDIUM') sessionStats.mediumRisk++;
        else sessionStats.lowRisk++;

        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          result: { ...result, source: 'CyberGuard Email Phishing & BEC Analyzer' }
        }));
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
      return;
    }

    // Fallback for unmatched API routes
    res.writeHead(404);
    res.end(JSON.stringify({ success: false, error: 'API route not found' }));
    return;
  }

  // Serve static files
  serveStatic(req, res, pathname);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=================================================`);
  console.log(`🛡️  CYBERGUARD AI - SERVER RUNNING`);
  console.log(`🌐  Local URL: http://localhost:${PORT}`);
  console.log(`🎓  Institution: JSPM University Pune`);
  console.log(`📂  Department: Electronics and Telecommunication`);
  console.log(`=================================================`);
});
