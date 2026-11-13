/**
 * Cybersecurity Quiz Engine
 * 15 Scenario-Based Practical Multiple Choice Questions
 * Tracks progress, instantaneous feedback, score breakdown, and final security tier badge.
 */

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "You listed an old bicycle on an online marketplace. A buyer sends you a QR code on WhatsApp stating: 'Scan this QR code in Google Pay to receive ₹4,500 advance payment.' What should you do?",
    options: [
      "Scan the QR code immediately to verify the payment receipt.",
      "Never scan a QR code to receive money. Decline and report the buyer as a scammer.",
      "Scan the code, but only enter a wrong UPI PIN to test if it is valid.",
      "Forward the QR code to your friend to see if they can receive the money instead."
    ],
    correctIndex: 1,
    explanation: "You scan a QR code ONLY to make a payment (debit money). Receiving money into your UPI account never requires scanning a QR code or entering your UPI PIN."
  },
  {
    id: 2,
    question: "You receive an SMS: 'Dear Customer, your electricity power supply will be disconnected tonight at 9:30 PM due to unpaid previous month bill. Contact Officer Sharma at 9876543210 immediately.' What is the safest response?",
    options: [
      "Call the mobile number provided immediately to prevent disconnection.",
      "Reply to the SMS with your electricity consumer number and transaction receipt.",
      "Ignore the SMS number and check your bill status exclusively on the official state electricity board app or website.",
      "Forward the message to your neighbors to warn them about power outage."
    ],
    correctIndex: 2,
    explanation: "This is a widespread utility scam. Official power distribution companies do not use personal mobile numbers for disconnection notices and will never ask you to pay via private numbers."
  },
  {
    id: 3,
    question: "You receive a video call on WhatsApp from a person in a police uniform who shows a 'Supreme Court Arrest Warrant' and claims you are under 'Digital Arrest' for a drug courier sent in your name. What should you do?",
    options: [
      "Stay on camera, follow all instructions, and transfer money to the 'RBI clearance account'.",
      "Ask them to show their police identity card over the camera and negotiate a settlement.",
      "Hang up immediately, recognize that 'Digital Arrest' does not exist under Indian law, and dial 1930.",
      "Keep quiet and do not inform anyone because the officer told you it is a secret national security issue."
    ],
    correctIndex: 2,
    explanation: "Under Indian law, there is NO legal provision for 'Digital Arrest'. Law enforcement agencies NEVER interrogate, arrest, or demand fund transfers over WhatsApp or Skype video calls."
  },
  {
    id: 4,
    question: "A website URL in an SMS claiming to be your bank begins with 'https://' and shows a secure padlock icon in the browser address bar. Does this guarantee that the website is safe and legitimate?",
    options: [
      "Yes, the padlock proves the website has been thoroughly verified by cybersecurity authorities.",
      "No. HTTPS only proves encryption in transit; scammers routinely purchase free SSL certificates for fake phishing domains.",
      "Yes, as long as the page displays the official logo of the bank.",
      "Only if the website also has a .com extension."
    ],
    correctIndex: 1,
    explanation: "HTTPS encrypts the communication channel between your browser and the web server to prevent snooping, but it provides zero guarantee about who owns the server or whether the site is fraudulent."
  },
  {
    id: 5,
    question: "An unknown caller claiming to be from your bank's fraud control department asks you to download 'AnyDesk' or 'QuickSupport' so they can help reverse a suspicious ₹25,000 transaction. What should you do?",
    options: [
      "Install the app quickly so they can stop the money transfer before it clears.",
      "Refuse and disconnect immediately. These are remote access tools that grant full control over your smartphone.",
      "Install the app, but turn off Wi-Fi after downloading it.",
      "Ask the caller to send an email authorization before you install the application."
    ],
    correctIndex: 1,
    explanation: "AnyDesk, TeamViewer, and QuickSupport allow scammers to view your screen in real time, observe your OTPs, and control your device to transfer your money."
  },
  {
    id: 6,
    question: "You receive an SMS: 'SBI Alert: Your NetBanking account will be blocked today due to pending PAN KYC. Update now at http://sbi-pan-kyc.online'. What is the critical red flag?",
    options: [
      "The message was sent in capital letters.",
      "The domain 'sbi-pan-kyc.online' is a fake lookalike; official SBI internet banking operates strictly on 'onlinesbi.sbi'.",
      "The message did not include a telephone number.",
      "Banks always give 30 days notice before asking for PAN card details."
    ],
    correctIndex: 1,
    explanation: "Scammers register fake domains with deceptive names like 'sbi-pan-kyc.online'. Official State Bank of India domains end strictly with '.sbi'."
  },
  {
    id: 7,
    question: "A friend's Instagram account suddenly messages you: 'Hey, I am stranded at an airport after an accident. My UPI app is stuck. Please send ₹10,000 to this hospital doctor's UPI ID. I will pay you back tonight.' What should you do first?",
    options: [
      "Send ₹10,000 immediately because emergencies require fast help.",
      "Send ₹5,000 as a safer partial amount just in case.",
      "Call your friend directly on their normal cellular phone number to verify their voice and identity before sending any money.",
      "Ask them to send a selfie from the hospital on Instagram."
    ],
    correctIndex: 2,
    explanation: "Social media account takeover is common. Scammers impersonate friends in simulated medical crises. Always confirm the situation via a direct voice phone call."
  },
  {
    id: 8,
    question: "What is the primary difference between a UPI PIN and an ATM PIN?",
    options: [
      "UPI PIN has 6 digits, while ATM PIN only has 2 digits.",
      "Both are confidential authentication credentials, but neither should ever be shared with anyone or entered on unverified links.",
      "UPI PIN can be shared with trusted online customer care agents, but ATM PIN cannot.",
      "ATM PIN is encrypted, but UPI PIN is transmitted in plain text."
    ],
    correctIndex: 1,
    explanation: "Both UPI PIN and ATM PIN are strictly confidential authentication secrets. No legitimate bank representative or tech support agent will ever ask for them."
  },
  {
    id: 9,
    question: "You receive an unsolicited WhatsApp message offering a part-time job: 'Earn ₹3,000 daily by simply subscribing to YouTube channels and giving Google map reviews. No prior experience required.' What type of cyber fraud is this?",
    options: [
      "Affiliate marketing promotion.",
      "Task-based Telegram investment scam that builds initial trust before demanding large prepaid deposits.",
      "Legitimate crowdsourced SEO evaluation work.",
      "Official Google creator rewards programme."
    ],
    correctIndex: 1,
    explanation: "This is the classic Task Scam. Victims receive small payouts (₹200–₹500) for initial likes to build trust, followed by demands for massive prepaid 'VIP merchant deposits' that cannot be withdrawn."
  },
  {
    id: 10,
    question: "Which of the following is the most secure method for Two-Factor Authentication (2FA)?",
    options: [
      "SMS-based OTP sent to your cellular mobile number.",
      "Hardware security key (FIDO2 / YubiKey) or Time-based One-Time Password (TOTP) app like Google Authenticator.",
      "Security questions like 'What is your mother's maiden name?'.",
      "A shared email account verification link."
    ],
    correctIndex: 1,
    explanation: "SMS OTPs are vulnerable to SIM-swap attacks, interception, and social engineering. Hardware keys and TOTP authenticator apps are immune to SIM swaps and network interception."
  },
  {
    id: 11,
    question: "If you realize you have accidentally transferred money to a cyber fraudster, what is the government's dedicated 24x7 National Cybercrime Reporting helpline number in India?",
    options: [
      "100",
      "1930",
      "1098",
      "112"
    ],
    correctIndex: 1,
    explanation: "1930 is India's dedicated national cyber financial fraud helpline. Calling within the 'Golden Hour' (first 2-3 hours) allows authorities to freeze stolen funds in recipient bank accounts."
  },
  {
    id: 12,
    question: "An unknown file named 'Wedding_Invitation_Card.apk' is sent to you on WhatsApp by a contact with the message: 'Please install and join my family wedding!'. What happens if you install it?",
    options: [
      "It opens an animated greeting card in your photo gallery.",
      "It installs malicious Android software (malware) capable of reading your SMS, stealing OTPs, and forwarding credentials to hackers.",
      "Android automatically removes any virus before installation so it is completely safe.",
      "It will simply ask for your email address and display wedding photos."
    ],
    correctIndex: 1,
    explanation: "Scammers disguise malicious Android applications (.apk) as wedding cards, challans, or electricity updates. Once sideloaded, they intercept incoming OTPs and compromise your bank accounts."
  },
  {
    id: 13,
    question: "You find a public USB charging kiosk at an airport. You plug your smartphone directly into the USB port with a standard data cable. What cyber threat are you risking?",
    options: [
      "Phishing",
      "Juice Jacking (malicious data transfer or malware installation via the physical data pins of the USB cable)",
      "SIM Swap",
      "DDoS attack"
    ],
    correctIndex: 1,
    explanation: "'Juice Jacking' occurs when compromised public USB charging stations abuse the cable's data transfer pins to harvest data or load spyware onto connected devices. Always use a power-only USB adapter or wall AC plug."
  },
  {
    id: 14,
    question: "What is 'Masked Aadhaar' and why is it recommended for identity verification?",
    options: [
      "A photo of your Aadhaar card covered by a black sticker.",
      "A legally valid version of Aadhaar downloaded from UIDAI that displays only the last 4 digits of your Aadhaar number, protecting your full 12-digit number from identity theft.",
      "An expired Aadhaar card used for temporary hotel check-ins.",
      "A physical card issued only to government employees."
    ],
    correctIndex: 1,
    explanation: "Masked Aadhaar conceals the first 8 digits and displays only the last 4 digits. It is fully valid for KYC and protects your full identity from unauthorized loan creation."
  },
  {
    id: 15,
    question: "Which of the following passwords is considered the strongest according to modern cybersecurity standards?",
    options: [
      "P@ssw0rd2026",
      "JspmTelecom#1",
      "Coffee#Velvet$9Elephant!Orbit",
      "1234567890abcdef"
    ],
    correctIndex: 2,
    explanation: "Long passphrases consisting of 4 or more unrelated words with varied casing, spaces or symbols (e.g. 'Coffee#Velvet$9Elephant!Orbit') possess vastly higher entropy, making them virtually impossible for automated cracking dictionaries to guess."
  }
];

export function initQuizEngine() {
  let currentIndex = 0;
  let userScore = 0;
  const userAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);

  const quizCard = document.getElementById('quiz-active-card');
  const resultCard = document.getElementById('quiz-result-view');

  if (!quizCard || !resultCard) return;

  function loadQuestion(index) {
    const q = QUIZ_QUESTIONS[index];
    document.getElementById('quiz-question-number').textContent = `Question ${index + 1} of ${QUIZ_QUESTIONS.length}`;
    document.getElementById('quiz-progress-fill').style.width = `${((index + 1) / QUIZ_QUESTIONS.length) * 100}%`;
    document.getElementById('quiz-question-text').textContent = q.question;

    const explanationBox = document.getElementById('quiz-explanation-box');
    explanationBox.style.display = 'none';

    const nextBtn = document.getElementById('quiz-next-btn');
    nextBtn.disabled = userAnswers[index] === null;
    nextBtn.textContent = index === QUIZ_QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question →';

    const optionsList = document.getElementById('quiz-options-list');
    optionsList.innerHTML = q.options.map((opt, i) => {
      const letter = ['A', 'B', 'C', 'D'][i];
      let btnClass = 'quiz-option-btn';

      if (userAnswers[index] !== null) {
        if (i === q.correctIndex) btnClass += ' correct';
        else if (i === userAnswers[index]) btnClass += ' incorrect';
      }

      return `
        <button class="${btnClass}" data-index="${i}" ${userAnswers[index] !== null ? 'disabled' : ''}>
          <span class="option-letter">${letter}</span>
          <span>${escapeHtml(opt)}</span>
        </button>
      `;
    }).join('');

    // Attach click listeners to options
    const optionBtns = optionsList.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = parseInt(btn.dataset.index, 10);
        userAnswers[index] = selected;

        if (selected === q.correctIndex) {
          userScore++;
        }

        // Show feedback
        optionBtns.forEach((b, idx) => {
          b.disabled = true;
          if (idx === q.correctIndex) b.classList.add('correct');
          else if (idx === selected) b.classList.add('incorrect');
        });

        explanationBox.innerHTML = `<strong>💡 Explanation:</strong> ${escapeHtml(q.explanation)}`;
        explanationBox.style.display = 'block';

        nextBtn.disabled = false;
      });
    });

    // If already answered previously
    if (userAnswers[index] !== null) {
      explanationBox.innerHTML = `<strong>💡 Explanation:</strong> ${escapeHtml(q.explanation)}`;
      explanationBox.style.display = 'block';
    }
  }

  const prevBtn = document.getElementById('quiz-prev-btn');
  const nextBtn = document.getElementById('quiz-next-btn');

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      loadQuestion(currentIndex);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      currentIndex++;
      loadQuestion(currentIndex);
    } else {
      showFinalResults();
    }
  });

  function showFinalResults() {
    quizCard.style.display = 'none';
    resultCard.classList.add('active');

    const total = QUIZ_QUESTIONS.length;
    const percentage = Math.round((userScore / total) * 100);

    document.getElementById('final-score-display').textContent = `${userScore} / ${total}`;
    document.getElementById('final-percentage-display').textContent = `${percentage}% Cyber Vigilance Score`;

    let badgeTitle = '';
    let badgeDesc = '';
    let badgeIcon = '🛡️';

    if (percentage >= 85) {
      badgeTitle = 'Cyber Defense Commander (Elite Guardian)';
      badgeDesc = 'Outstanding! You demonstrate exceptional awareness of modern financial fraud, engineering social tactics, and secure cyber practices.';
      badgeIcon = '🏆';
    } else if (percentage >= 65) {
      badgeTitle = 'Cyber Aware Specialist (High Vigilance)';
      badgeDesc = 'Great work! You have strong security fundamentals and can identify the majority of social engineering attacks.';
      badgeIcon = '🛡️';
    } else if (percentage >= 45) {
      badgeTitle = 'Cyber Novice (Moderate Risk)';
      badgeDesc = 'Fair knowledge, but you are still vulnerable to sophisticated impersonation and digital arrest scams. Review the Cyber Awareness Centre.';
      badgeIcon = '⚠️';
    } else {
      badgeTitle = 'High Risk Target (Immediate Attention Required)';
      badgeDesc = 'Caution! Your responses indicate high vulnerability to common UPI, OTP, and phishing scams. Study our Safety Tips thoroughly.';
      badgeIcon = '🚨';
    }

    document.getElementById('badge-title').textContent = badgeTitle;
    document.getElementById('badge-desc').textContent = badgeDesc;
    document.getElementById('badge-icon').textContent = badgeIcon;

    // Render Answer Review List
    const reviewList = document.getElementById('quiz-review-list');
    reviewList.innerHTML = QUIZ_QUESTIONS.map((q, i) => {
      const userChoice = userAnswers[i];
      const isCorrect = userChoice === q.correctIndex;

      return `
        <div class="quiz-review-item" style="border-left: 4px solid ${isCorrect ? 'var(--color-success)' : 'var(--color-danger)'};">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-weight: 700; font-size: 0.875rem;">Question ${i + 1}</span>
            <span style="font-weight: 700; font-size: 0.8125rem; color: ${isCorrect ? 'var(--color-success)' : 'var(--color-danger)'};">
              ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
            </span>
          </div>
          <p style="font-size: 0.9375rem; font-weight: 600; margin-bottom: 8px;">${escapeHtml(q.question)}</p>
          <p style="font-size: 0.8125rem; color: #4B5563; margin-bottom: 4px;">
            <strong>Your answer:</strong> ${userChoice !== null ? escapeHtml(q.options[userChoice]) : 'Not answered'}
          </p>
          ${!isCorrect ? `<p style="font-size: 0.8125rem; color: var(--color-success); font-weight: 600; margin-bottom: 4px;"><strong>Correct answer:</strong> ${escapeHtml(q.options[q.correctIndex])}</p>` : ''}
          <p style="font-size: 0.8125rem; color: #64748B; font-style: italic;">
            💡 ${escapeHtml(q.explanation)}
          </p>
        </div>
      `;
    }).join('');
  }

  // Retake quiz button
  document.getElementById('retake-quiz-btn').addEventListener('click', () => {
    currentIndex = 0;
    userScore = 0;
    userAnswers.fill(null);
    resultCard.classList.remove('active');
    quizCard.style.display = 'block';
    loadQuestion(0);
  });

  // Start with first question
  loadQuestion(0);
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
