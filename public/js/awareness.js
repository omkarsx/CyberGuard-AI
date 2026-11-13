/**
 * Cyber Awareness Centre - Multi-Language Content Engine
 * Languages Supported: English, हिन्दी (Hindi), मराठी (Marathi)
 * Topics: UPI Fraud, OTP Fraud, Phishing Attacks, Fake Job Scams, Digital Arrest,
 * Identity Theft, Online Shopping Fraud, Social Media Hacking, QR Code Scams, Investment Scams
 */

const AWARENESS_TOPICS = [
  {
    id: 'upi-fraud',
    title: {
      en: '1. UPI Fraud & Unauthorized Requests',
      hi: '१. यूपीआई (UPI) धोखाधड़ी और अनाधिकृत अनुरोध',
      mr: '१. यूपीआय (UPI) फसवणूक आणि अनधिकृत विनंत्या'
    },
    whatIsIt: {
      en: 'Fraud where scammers trick victims into entering their UPI PIN on collect requests, fraudulent payment gateway links, or spoofed merchant QR codes.',
      hi: 'ऐसी धोखाधड़ी जिसमें धोखेबाज़ पीड़ितों को मनी कलेक्ट रिक्वेस्ट, फर्जी पेमेंट लिंक या फर्जी मर्चेंट क्यूआर कोड पर अपना यूपीआई पिन दर्ज करने का झांसा देते हैं।',
      mr: 'अशी फसवणूक ज्यामध्ये भामटे नागरिकांना पैसे मिळण्याचे आमिष दाखवून कलेक्ट रिक्वेस्ट किंवा बनावट क्यूआर कोडवर यूपीआय पिन प्रविष्ट करण्यास भाग पाडतात.'
    },
    howItHappens: {
      en: 'The scammer poses as a buyer (e.g. on OLX, Facebook Marketplace) or customer support. They send a "Collect Request" and convince you that entering your UPI PIN is required to "receive" or "refund" money into your account.',
      hi: 'धोखेबाज़ ओएलएक्स या सोशल मीडिया पर खरीदार या बैंक प्रतिनिधि बनकर संपर्क करता है। वह "कलेक्ट रिक्वेस्ट" भेजता है और दावा करता है कि पैसे प्राप्त करने के लिए आपको अपना यूपीआई पिन डालना होगा।',
      mr: 'भामटा ओएलएक्स किंवा सोशल मीडियावर खरेदीदार बनून संपर्क साधतो. तो "कलेक्ट रिक्वेस्ट" पाठवतो आणि पैसे मिळवण्यासाठी तुम्हाला यूपीआय पिन टाकण्यास सांगतो.'
    },
    realisticExample: {
      en: 'Ramesh posted a sofa on OLX for ₹12,000. An interested "army officer" agreed to pay immediately via UPI. He sent a request saying: "Click pay to receive ₹12,000 advance". Ramesh entered his UPI PIN and ₹12,000 was debited from his account instead of credited.',
      hi: 'रमेश ने ओएलएक्स पर ₹12,000 में सोफा बेचने का विज्ञापन डाला। एक "सेना अधिकारी" ने तुरंत खरीदने की बात कही और एक यूपीआई लिंक भेजा। रमेश ने जैसे ही यूपीआई पिन दर्ज किया, उसके खाते से ₹12,000 कट गए।',
      mr: 'रमेशने ओएलएक्सवर ₹१२,००० मध्ये सोफा विक्रीसाठी टाकला. एका तोतया "लष्करी अधिकाऱ्याने" तात्काळ पैसे देण्याचे कबूल केले आणि लिंक पाठवली. रमेशने यूपीआय पिन टाकताच त्याच्या खात्यातून पैसे वजा झाले.'
    },
    warningSigns: {
      en: [
        'Being told you must enter your UPI PIN to "receive", "claim", or "credit" money.',
        'Buyer is overly eager and refuses to inspect goods in person.',
        'Payment requests appearing as "AutoPay Mandates" or "Collect Requests".',
        'Scammer asks you to test with ₹1 first, which succeeds, followed by a large debit request.'
      ],
      hi: [
        'यह कहा जाना कि पैसे "प्राप्त करने" या "क्रेडिट" करने के लिए यूपीआई पिन डालना आवश्यक है।',
        'सामान देखे बिना तुरंत पूरा भुगतान करने की अत्यधिक उत्सुकता दिखाना।',
        '"ऑटोपे मैंडेट" या "कलेक्ट रिक्वेस्ट" के रूप में भुगतान सूचनाएं आना।',
        'विश्वास जीतने के लिए पहले ₹१ भेजने और फिर बड़ी राशि काटने का अनुरोध करना।'
      ],
      mr: [
        'पैसे "जमा होण्यासाठी" किंवा "स्वीकारण्यासाठी" यूपीआय पिन टाकण्यास सांगणे.',
        'वस्तू न पाहताच लगेच संपूर्ण पैसे देण्याची अतिघाई दाखवणे.',
        '"ऑटोपे मँडेट" किंवा "कलेक्ट रिक्वेस्ट" पाठवून मंजुरी मागणे.',
        'विश्वास संपादन करण्यासाठी प्रथम ₹१ पाठवून नंतर मोठी रक्कम मागणे.'
      ]
    },
    prevention: {
      en: [
        'GOLDEN RULE: UPI PIN is ONLY used to SEND (debit) money from your account, NEVER to receive money.',
        'Never approve unknown "Collect Requests" or "AutoPay Mandates" in PhonePe, Google Pay, or Paytm.',
        'Decline transactions from unknown buyers demanding upfront digital transfers before physical handover.',
        'If defrauded, immediately block your UPI ID and call 1930 within the golden hour.'
      ],
      hi: [
        'स्वर्ण नियम: यूपीआई पिन केवल पैसे भेजने (कटौती) के लिए होता है, पैसे प्राप्त करने के लिए कभी नहीं।',
        'फोनपे, गूगल पे या पेटीएम में अज्ञात कलेक्ट रिक्वेस्ट को तुरंत अस्वीकार (Decline) करें।',
        'शारीरिक रूप से सामान सौंपने से पहले अनजान खरीदारों के डिजिटल भुगतानों पर सतर्क रहें।',
        'धोखाधड़ी होने पर तुरंत अपनी यूपीआई आईडी ब्लॉक करें और 1930 पर कॉल करें।'
      ],
      mr: [
        'सुवर्ण नियम: यूपीआय पिन फक्त पैसे पाठवण्यासाठी (खात्यातून कपात) लागतो, पैसे मिळवण्यासाठी कधीही नाही.',
        'फोनपे, गुगल पे किंवा पेटीएमवरील अज्ञात कलेक्ट रिक्वेस्ट त्वरित नाकारा (Decline).',
        'वस्तू प्रत्यक्ष हातात देण्यापूर्वी अनोळखी व्यक्तींच्या डिजिटल व्यवहारांवर विश्वास ठेवू नका.',
        'फसवणूक झाल्यास त्वरित १९३० या राष्ट्रीय सायबर हेल्पलाइनवर तक्रार करा.'
      ]
    }
  },
  {
    id: 'otp-fraud',
    title: {
      en: '2. OTP & SIM Swap Fraud',
      hi: '२. ओटीपी (OTP) और सिम स्वैप धोखाधड़ी',
      mr: '२. ओटीपी (OTP) आणि सिम स्वॅप फसवणूक'
    },
    whatIsIt: {
      en: 'Attacks where criminals steal your One-Time Password via vishing calls, remote control apps, or by fraudulently issuing a duplicate SIM card in your name.',
      hi: 'ऐसा अपराध जिसमें जालसाज कॉल, रिमोट एक्सेस ऐप या आपके नाम पर फर्जी डुप्लिकेट सिम जारी करवाकर आपका ओटीपी चुरा लेते हैं।',
      mr: 'असा गुन्हा ज्यामध्ये भामटे फोन कॉल, स्क्रीन शेअरिंग ॲप किंवा बनावट डुप्लिकेट सिम कार्ड काढून तुमचा ओटीपी चोरतात.'
    },
    howItHappens: {
      en: 'Scammers call claiming to be your bank manager or telecom operator. They claim your SIM card requires a "5G upgrade" or your bank account will be blocked unless you confirm a code sent to your phone.',
      hi: 'धोखेबाज़ बैंक या टेलीकॉम ऑपरेटर बनकर कॉल करते हैं। वे दावा करते हैं कि 5G अपग्रेड के लिए या बैंक खाता चालू रखने के लिए आपके फोन पर आया कोड बताना जरूरी है।',
      mr: 'भामटे बँक किंवा टेलिकॉम अधिकारी बनून फोन करतात आणि ५जी अपग्रेड किंवा खाते सुरू ठेवण्यासाठी आलेला ओटीपी मागतात.'
    },
    realisticExample: {
      en: 'Priya received a call: "Madam, I am calling from Airtel headquarters. Your SIM will deactivate in 2 hours unless upgraded to eSIM. Please share the 6-digit verification code sent to your SMS." She shared it; within 10 minutes her network died and ₹85,000 was drained via NetBanking.',
      hi: 'प्रिया को कॉल आया: "मैडम, मैं एयरटेल मुख्यालय से बोल रहा हूं। ई-सिम अपग्रेड न होने पर आपकी सिम 2 घंटे में बंद हो जाएगी। कोड बताएं।" कोड बताते ही नेटवर्क गायब हो गया और खाते से ₹85,000 निकल गए।',
      mr: 'प्रियाला कॉल आला: "तुमचे सिमकार्ड २ तासांत बंद होईल, ५जी अपग्रेडसाठी आलेला ६ अंकी कोड सांगा." तिने कोड सांगितल्यावर नेटवर्क गेले आणि बँक खात्यातून ₹८५,००० परस्पर काढले गेले.'
    },
    warningSigns: {
      en: [
        'Any caller asking you to read out or forward an SMS containing an OTP.',
        'Sudden loss of cellular network reception without reason (SIM Swap indicator).',
        'Caller requesting installation of AnyDesk, TeamViewer, or QuickSupport.',
        'SMS explicitly stating "Do not share with anyone", yet the caller insists they are an exception.'
      ],
      hi: [
        'कोई भी कॉलर जो एसएमएस में आए ओटीपी को पढ़ने या फॉरवर्ड करने के लिए कहे।',
        'बिना किसी कारण के अचानक फोन नेटवर्क का पूरी तरह गायब हो जाना।',
        'कॉलर द्वारा AnyDesk, TeamViewer या QuickSupport डाउनलोड करने का दबाव डालना।',
        'एसएमएस में स्पष्ट रूप से "किसी से साझा न करें" लिखा होने के बावजूद कॉलर द्वारा उसे मांगना।'
      ],
      mr: [
        'कोणतीही व्यक्ती फोनवर आलेला ओटीपी विचारत असेल किंवा फॉरवर्ड करण्यास सांगत असेल.',
        'मोबाईलचे नेटवर्क अचानक विनाकारण पूर्णपणे बंद होणे (सिम स्वॅपचा संशय).',
        'AnyDesk किंवा TeamViewer सारखे स्क्रीन शेअरिंग ॲप इन्स्टॉल करण्यास सांगणे.',
        'मेसेजमध्ये "ओटीपी कोणालाही सांगू नका" असे असूनही कॉलर तो हक्काने मागणे.'
      ]
    },
    prevention: {
      en: [
        'Never disclose OTPs to anyone, including bank staff, police, or telecom executives.',
        'If mobile network unexpectedly ceases for more than 15 minutes, immediately contact your carrier from another phone.',
        'Never install screen-sharing software at the request of an incoming caller.',
        'Activate biometric SIM locks and multi-factor authentication using authenticator apps.'
      ],
      hi: [
        'बैंक कर्मचारी, पुलिस या कंपनी अधिकारी सहित किसी को भी अपना ओटीपी कभी न बताएं।',
        'यदि 15 मिनट से अधिक समय तक नेटवर्क अचानक गायब रहे, तो तुरंत दूसरे फोन से ऑपरेटर से संपर्क करें।',
        'अज्ञात कॉलर के कहने पर कभी भी स्क्रीन-शेयरिंग ऐप डाउनलोड न करें।',
        'एसएमएस के बजाय ऑथेंटिकेटर ऐप्स (जैसे Google Authenticator) का उपयोग करें।'
      ],
      mr: [
        'बँकेचे कर्मचारी किंवा पोलीस असले तरीही कोणालाही आपला ओटीपी कधीही सांगू नका.',
        'मोबाईलचे नेटवर्क १५ मिनिटांपेक्षा जास्त वेळ अचानक बंद पडल्यास तात्काळ कंपनीशी संपर्क साधा.',
        'अनोळखी व्यक्तीच्या सांगण्यावरून कधीही स्क्रीन-शेअरिंग ॲप इन्स्टॉल करू नका.',
        'सुरक्षिततेसाठी गुगल ऑथेंटिकेटर सारख्या ॲप्सचा वापर करा.'
      ]
    }
  },
  {
    id: 'phishing-attacks',
    title: {
      en: '3. Phishing Attacks & Clone Websites',
      hi: '३. फ़िशिंग हमले और नकली वेबसाइटें',
      mr: '३. फिशिंग हल्ले आणि बनावट संकेतस्थळे'
    },
    whatIsIt: {
      en: 'Deceptive emails, SMS, or ads directing victims to exact counterfeit replicas of legitimate banking, income tax, or courier portals to harvest login credentials and debit card details.',
      hi: 'धोखेबाज़ ईमेल, एसएमएस या विज्ञापन जो पीड़ितों को बैंक, आयकर या कूरियर पोर्टलों की हुबहू नकल वेबसाइटों पर भेजकर उनके पासवर्ड और कार्ड विवरण चुराते हैं।',
      mr: 'बँक, इन्कम टॅक्स किंवा कुरिअर कंपन्यांच्या अधिकृत संकेतस्थळांसारखी हुबेहूब बनावट संकेतस्थळे तयार करून लॉगिन आयडी व पासवर्ड चोरणे.'
    },
    howItHappens: {
      en: 'Victims receive messages like "SBI NetBanking blocked. Click here to submit PAN card". The link leads to `sbi-pan-verification.online`, an exact copy of the login page. When entered, credentials are saved by criminals.',
      hi: 'पीड़ितों को संदेश मिलता है कि "एसबीआई नेटबैंकिंग बंद कर दी गई है। पैन लिंक करने के लिए यहां क्लिक करें"। लिंक एक हूबहू नकली पोर्टल पर ले जाता है जहां पासवर्ड चुरा लिया जाता है।',
      mr: 'नागरिकांना "एसबीआय नेटबँकिंग बंद झाले आहे, पॅन कार्ड लिंक करण्यासाठी येथे क्लिक करा" असा संदेश येतो. लिंकवर क्लिक करताच बनावट पेजवर पासवर्ड चोरला जातो.'
    },
    realisticExample: {
      en: 'Sunil received an SMS: "Income Tax Department: Refund of ₹18,450 approved. Update bank details at it-refundgov.in". The site looked 100% genuine with government logos. Sunil entered his NetBanking username, password, and OTP. His savings of ₹2.4 Lakhs were wiped out.',
      hi: 'सुनील को एसएमएस मिला: "आयकर विभाग: ₹18,450 का रिफंड स्वीकृत। खाता विवरण अपडेट करें"। वेबसाइट सरकारी वेबसाइट जैसी ही थी। सुनील ने पासवर्ड डाला और उसके खाते से ₹2.4 लाख गायब हो गए।',
      mr: 'सुनीलला मेसेज आला: "इन्कम टॅक्स रिफंड ₹१८,४५० मंजूर झाला आहे, लिंकवर जाऊन बँक माहिती भरा." सुनीलने बनावट सरकारी पेजवर पासवर्ड व ओटीपी टाकताच त्याचे ₹२.४ लाख चोरीला गेले.'
    },
    warningSigns: {
      en: [
        'Domain names with hyphens or unusual extensions (.xyz, .online, .site, .top).',
        'Official branding copied onto an unofficial address (e.g. `onlinesbi.sbi` vs `sbi-portal.online`).',
        'Urgent threats of account suspension within 12 to 24 hours.',
        'Spelling mistakes or subtle character substitutions (e.g., `amaz0n.com`, `paytmm.com`).'
      ],
      hi: [
        'हाइफ़न या असामान्य एक्सटेंशन (.xyz, .online, .site) वाले डोमेन नाम।',
        'असली लोगो का उपयोग लेकिन गलत वेबसाइट पता (जैसे onlinesbi.sbi की जगह sbi-update.online)।',
        '12 से 24 घंटों के भीतर खाता ब्लॉक करने की तत्काल धमकी।',
        'वेब पते में मामूली हेरफेर (जैसे paytm की जगह paytmm या amzn की जगह amaz0n)।'
      ],
      mr: [
        'संशयास्पद डोमेन नावे किंवा अनपेक्षित एक्स्टेन्शन (.xyz, .site, .online).',
        'अधिकृत लोगो असलेली पण चुकीच्या पत्त्यावर चालणारी वेबसाइट.',
        '२४ तासांत खाते बंद करण्याची धमकी देणारे संदेश.',
        'संकेतस्थळाच्या नावात केलेली अक्षरांची फेरफार (उदा. paytm ऐवजी paytmm).'
      ]
    },
    prevention: {
      en: [
        'Always check the address bar: Ensure official domain ends in `.sbi`, `.bank.in`, or verified corporate roots.',
        'Never click links in unexpected SMS or emails claiming urgent compliance.',
        'Bookmark official banking portals and access them directly from bookmarks, never search-engine ads.',
        'Remember that HTTPS (padlock icon) ONLY proves encryption; criminal sites also use free SSL certificates!'
      ],
      hi: [
        'हमेशा एड्रेस बार चेक करें: सुनिश्चित करें कि बैंक का डोमेन आधिकारिक है।',
        'संदिग्ध एसएमएस या ईमेल में दिए गए लिंक पर कभी क्लिक न करें।',
        'बैंक की वेबसाइट हमेशा बुकमार्क से या सीधे टाइप करके खोलें, सर्च इंजन विज्ञापनों से नहीं।',
        'याद रखें कि ताले का निशान (HTTPS) केवल एन्क्रिप्शन दिखाता है, वेबसाइट की प्रमाणिकता नहीं!'
      ],
      mr: [
        'नेहमी ब्राऊझरमधील अचूक पत्ता तपासा; अधिकृत बँक डोमेन असल्याची खात्री करा.',
        'धमकी किंवा तात्काळ कारवाईचे सांगणाऱ्या लिंक्सवर कधीही क्लिक करू नका.',
        'बँकेची वेबसाईट सर्च रिझल्ट्सवरील जाहिरातींवरून न उघडता थेट टाईप करा.',
        'लक्षात ठेवा: हिरवा कुलूप (HTTPS) केवळ कनेक्शन सुरक्षित असल्याचे दाखवतो, मालक प्रामाणिक असल्याचे नाही!'
      ]
    }
  },
  {
    id: 'fake-jobs',
    title: {
      en: '4. Fake Job & Telegram Task Scams',
      hi: '४. फर्जी नौकरी और टेलीग्राम टास्क घोटाला',
      mr: '४. बनावट नोकरी आणि टेलिग्राम टास्क घोटाळा'
    },
    whatIsIt: {
      en: 'Scams offering lucrative "Work From Home" opportunities (liking YouTube videos, reviewing hotels) that lure victims into depositing large sums for VIP tiers before disappearing.',
      hi: 'यूट्यूब वीडियो लाइक करने या होटल रिव्यू करने के बदले आकर्षक घर बैठे कमाई का झांसा देकर लोगों से लाखों रुपये जमा करवाने वाला घोटाला।',
      mr: 'घरी बसून यूट्यूब व्हिडिओ लाईक करणे किंवा हॉटेल रिव्ह्यू करून दररोज ₹५००० कमवण्याचे आमिष दाखवून मोठी रक्कम उकळणारा घोटाळा.'
    },
    howItHappens: {
      en: 'Victims are contacted on WhatsApp/Telegram with an offer: "Earn ₹2,000–₹5,000 daily". Initial simple tasks pay ₹150–₹500 to build trust. Then, the victim is added to a VIP group and asked to invest ₹10,000–₹5,00,000 in "prepaid crypto/merchant tasks" to withdraw their earnings, which are then frozen.',
      hi: 'व्हाट्सएप पर संदेश आता है: "घर बैठे कमाएं 5000 रुपये रोज"। पहले 2-3 वीडियो लाइक करने पर सचमुच ₹300 खाते में भेजते हैं। विश्वास होने पर टेलीग्राम वीआईपी ग्रुप में जोड़ते हैं और "प्रीपेड टास्क" के नाम पर लाखों रुपये निवेश कराकर ठग लेते हैं।',
      mr: 'व्हाट्सॲपवर मेसेज येतो: "रोज घरी बसून ३००० रुपये कमवा". सुरुवातीला छोट्या कामांचे ₹३०० खात्यात पाठवून विश्वास संपादन केला जातो. त्यानंतर व्हीआयपी टास्कच्या नावाखाली लाखो रुपये भरून घेऊन फसवणूक केली जाते.'
    },
    realisticExample: {
      en: 'Ankita, an engineering graduate, accepted a part-time hotel rating job. She earned ₹800 on day one. Next, she was told to complete a "₹50,000 prepaid merchant task" for a 30% bonus. She transferred ₹50,000, then another ₹1.5 Lakhs when told the transaction had an error. Scammers vanished.',
      hi: 'अंकिता को होटल रेटिंग का काम मिला। पहले दिन ₹800 की वास्तविक कमाई हुई। अगले दिन उसे ₹50,000 का "मर्चेंट टास्क" करने को कहा गया। पैसे भेजने के बाद सर्वर एरर बताकर ₹1.5 लाख और मांगे गए, जिसके बाद धोखेबाज गायब हो गए।',
      mr: 'अंकिताला हॉटेल रेटिंगचे काम मिळाले. पहिल्या दिवशी ₹८०० मिळाले. दुसऱ्या दिवशी ३०% फायद्यासाठी ₹५०,००० भरण्यास सांगितले. पैसे भरल्यावर त्रुटी आल्याचे सांगून आणखी ₹१.५ लाख घेतले आणि संपर्क तोडला.'
    },
    warningSigns: {
      en: [
        'Unsolicited job offers via WhatsApp or Telegram from foreign numbers (+62, +84, +234).',
        'High guaranteed returns for simple, low-effort tasks like liking videos or giving Google reviews.',
        'Requirement to PAY or "recharge" an account to unlock withdrawal of earned money.',
        'Pressure from "mentors" inside aggressive Telegram groups celebrating fake success screenshots.'
      ],
      hi: [
        'विदेशी नंबरों (+62, +84 आदि) से व्हाट्सएप या टेलीग्राम पर अनपेक्षित नौकरी के प्रस्ताव।',
        'वीडियो लाइक करने जैसे मामूली कामों के लिए अवास्तविक रूप से भारी भुगतान का वादा।',
        'अपनी ही कमाई निकालने के लिए पहले पैसे जमा ("रिचार्ज") करने की शर्त रखना।',
        'टेलीग्राम ग्रुप में फर्जी स्क्रीनशॉट दिखाकर अन्य लोगों द्वारा पैसे कमाने का नाटक करना।'
      ],
      mr: [
        'अनोळखी विदेशी नंबरवरून (+62, +84) व्हॉट्सॲपवर नोकरीच्या आकर्षक ऑफर्स येणे.',
        'फक्त व्हिडिओ लाईक करण्यासाठी दररोज हजारो रुपये मिळण्याचे अवास्तव आमिष.',
        'स्वतः कमावलेले पैसे काढण्यासाठी स्वतःचे पैसे "रिचार्ज" करण्याची अट घालणे.',
        'टेलिग्राम ग्रुपमध्ये बनावट नफ्याचे स्क्रीनशॉट्स दाखवून दबाव आणणे.'
      ]
    },
    prevention: {
      en: [
        'LEGITIMATE COMPANIES NEVER ASK EMPLOYEES TO DEPOSIT MONEY TO WORK OR RECEIVE SALARY.',
        'Never join anonymous Telegram investment or task channels.',
        'Report and block recruitment numbers reaching out unexpectedly on WhatsApp.',
        'If you fell into the initial stages, STOP immediately. Do NOT pay more to "recover" lost money.'
      ],
      hi: [
        'कोई भी वैध कंपनी काम करने या वेतन प्राप्त करने के लिए आपसे पैसे जमा करने को कभी नहीं कहती।',
        'अज्ञात टेलीग्राम निवेश या टास्क चैनलों से तुरंत बाहर निकलें।',
        'व्हाट्सएप पर आने वाले ऐसे अज्ञात नंबरों को रिपोर्ट और ब्लॉक करें।',
        'यदि कुछ पैसे फंस गए हैं, तो उन्हें निकालने के लिए और पैसे कभी न भेजें।'
      ],
      mr: [
        'कोणतीही खरी कंपनी काम देण्यासाठी किंवा पगार देण्यासाठी तुमच्याकडून पैसे मागत नाही.',
        'टेलिग्रामवरील अनोळखी टास्क किंवा इन्व्हेस्टमेंट ग्रुप्समध्ये कधीही सामील होऊ नका.',
        'अनोळखी व्हॉट्सॲप मेसेज त्वरित ब्लॉक आणि रिपोर्ट करा.',
        'गेलेले पैसे परत मिळवण्यासाठी भामट्यांना आणखी पैसे पाठवण्याची चूक करू नका.'
      ]
    }
  },
  {
    id: 'digital-arrest',
    title: {
      en: '5. Digital Arrest & Police Impersonation Scams',
      hi: '५. डिजिटल अरेस्ट और पुलिस/सीबीआई धमकी घोटाला',
      mr: '५. डिजिटल अरेस्ट आणि तोतया पोलीस/सीबीआय फसवणूक'
    },
    whatIsIt: {
      en: 'A psychological extortion racket where fraudsters impersonate CBI, ED, Police, or Customs officers over video calls, placing victims under fake "Digital Arrest" and extorting life savings under the pretext of an official money-laundering probe.',
      hi: 'एक गंभीर मनोवैज्ञानिक जबरन वसूली अपराध जिसमें अपराधी वीडियो कॉल पर सीबीआई, ईडी, पुलिस या कस्टम अधिकारी बनकर पीड़ितों को "डिजिटल अरेस्ट" की धमकी देते हैं और उनके जीवन भर की बचत लूट लेते हैं।',
      mr: 'गुन्हेगार व्हिडिओ कॉलवर स्वतःला सीबीआय, ईडी, सायबर क्राईम किंवा कस्टम्स अधिकारी भासवतात आणि "डिजिटल अरेस्ट" चे खोटे वॉरंट दाखवून कोट्यवधी रुपये उकळतात.'
    },
    howItHappens: {
      en: 'Scammer calls claiming an illegal courier package containing drugs, fake passports, and bank cards was intercepted in your name. They transfer the call to a "CBI/Police Station" on Skype/WhatsApp with police uniforms, official emblems, and fake arrest warrants, ordering the victim to stay on camera and transfer funds to "RBI verification accounts".',
      hi: 'कॉल आता है कि आपके नाम से एक पार्सल पकड़ा गया है जिसमें नशीले पदार्थ और जाली पासपोर्ट हैं। फिर कॉल को स्काइप पर एक "पुलिस स्टेशन" में ट्रांसफर किया जाता है जहां पुलिस की वर्दी में लोग फर्जी वारंट दिखाकर पैसे मांगते हैं।',
      mr: 'कॉल येतो की तुमच्या नावाचे पार्सल जप्त झाले असून त्यात ड्रग्ज व बनावट पासपोर्ट सापडले आहेत. त्यानंतर व्हिडिओ कॉलवर खाकी वर्दीतील तोतया अधिकारी "डिजिटल अरेस्ट" ची धमकी देऊन पडताळणीच्या नावाखाली खात्यातील सर्व रक्कम ट्रान्सफर करायला लावतात.'
    },
    realisticExample: {
      en: 'Dr. Mehra (62, retired) received a call from "FedEx" stating a parcel with 140g MDMA was sent to Taiwan in his name. A "CBI Officer" joined on video call showing official seals and a Supreme Court warrant. Terrified of arrest, Dr. Mehra stayed on video for 36 hours and transferred ₹72 Lakhs to "government escrow accounts for financial clearance". The scammers vanished.',
      hi: 'डॉ. मेहरा को कॉल आया कि उनके नाम से ताइवान भेजे जा रहे पार्सल में ड्रग्स मिले हैं। वीडियो कॉल पर सीबीआई अधिकारी बनकर आए व्यक्ति ने सुप्रीम कोर्ट का फर्जी अरेस्ट वारंट दिखाया। डर के मारे डॉ. मेहरा ने अपनी 72 लाख रुपये की बचत "सरकारी खाते" में ट्रांसफर कर दी।',
      mr: 'निवृत्त डॉक्टर मेहरा यांना कुरिअरमधून अमली पदार्थ पाठवल्याचा खोटा कॉल आला. व्हिडिओ कॉलवर बनावट सीबीआय अधिकारी आला आणि त्याने अटकेचे वॉरंट दाखवले. घाबरून त्यांनी ७२ लाख रुपये तपासणी खात्यात ट्रान्सफर केले.'
    },
    warningSigns: {
      en: [
        'Calls claiming your Aadhaar or mobile number is involved in a money laundering or narcotics crime.',
        'Demand to join a Skype, WhatsApp, or Zoom video call with uniformed personnel.',
        'Insistence on absolute secrecy: "Do not inform family or bank staff; this is a classified national security matter".',
        'Request to transfer money into an "RBI verification account" or "Supreme Court clearance account".'
      ],
      hi: [
        'कॉल पर यह दावा करना कि आपका आधार कार्ड या मोबाइल नंबर मनी लॉन्ड्रिंग या ड्रग्स केस में शामिल है।',
        'वर्दी पहने अधिकारियों के साथ स्काइप या व्हाट्सएप वीडियो कॉल पर रहने का दबाव।',
        'पूरी गोपनीयता बरतने का आदेश: "किसी को न बताएं, यह राष्ट्रीय सुरक्षा का गोपनीय मामला है"।',
        '"आरबीआई वेरिफिकेशन अकाउंट" या "सरकारी सुरक्षा खाते" में पैसे ट्रांसफर करने की मांग।'
      ],
      mr: [
        'तुमचा आधार क्रमांक किंवा मोबाईल नंबर मनी लाँड्रिंग किंवा अमली पदार्थ तस्करीशी जोडला असल्याचा दावा करणे.',
        'व्हॉट्सॲप किंवा स्काईपवर व्हिडिओ कॉल करून खाकी वर्दीतील अधिकाऱ्यांनी धमकावणे.',
        'कोणालाही न सांगण्याची सक्त ताकीद देणे आणि २४ तास कॅमेऱ्यासमोर बसवून ठेवणे.',
        '"आरबीआय पडताळणी खात्यात" किंवा सुरक्षित खात्यात त्वरित पैसे ट्रान्सफर करण्यास सांगणे.'
      ]
    },
    prevention: {
      en: [
        'CRITICAL FACT: THERE IS NO SUCH THING AS "DIGITAL ARREST" UNDER INDIAN LAW. POLICE OR CBI NEVER ARREST OR INTERROGATE VIA VIDEO CALL.',
        'NO law enforcement agency ever asks citizens to transfer money to "clear their name" or for "RBI verification".',
        'If you receive such a call, DISCONNECT IMMEDIATELY and walk into your local police station.',
        'Call the National Cybercrime Helpline 1930 without delay.'
      ],
      hi: [
        'महत्वपूर्ण तथ्य: भारतीय कानून में "डिजिटल अरेस्ट" जैसा कोई प्रावधान नहीं है। पुलिस या सीबीआई कभी भी वीडियो कॉल पर गिरफ्तारी नहीं करती।',
        'कोई भी सरकारी एजेंसी बेकसूर साबित करने के लिए किसी खाते में पैसे ट्रांसफर करने को नहीं कहती।',
        'ऐसा कॉल आने पर तुरंत फोन काटें और नजदीकी पुलिस स्टेशन जाकर शिकायत दर्ज करें।',
        'बिना डरे तुरंत 1930 हेल्पलाइन पर कॉल करें।'
      ],
      mr: [
        'अत्यंत महत्त्वाचे: भारतीय कायद्यात "डिजिटल अरेस्ट" नावाची कोणतीही तरतूद नाही. पोलीस कधीही व्हिडिओ कॉलवर अटक किंवा चौकशी करत नाहीत.',
        'कोणतीही सरकारी तपास यंत्रणा निर्दोष सिद्ध करण्यासाठी बँक खात्यातून पैसे ट्रान्सफर करायला सांगत नाही.',
        'असा संशयास्पद कॉल आल्यास त्वरित फोन कट करा आणि जवळच्या पोलीस ठाण्यात संपर्क साधा.',
        'तात्काळ १९३० सायबर हेल्पलाइनवर तक्रार नोंदवा.'
      ]
    }
  },
  {
    id: 'identity-theft',
    title: {
      en: '6. Identity Theft & Loan App Exploits',
      hi: '६. पहचान की चोरी और फर्जी लोन ऐप',
      mr: '६. ओळख चोरी आणि बनावट कर्ज ॲप्स'
    },
    whatIsIt: {
      en: 'Misuse of your PAN, Aadhaar, or personal documents to obtain illegal loans, open mule bank accounts, or register SIM cards in your name.',
      hi: 'आपके पैन कार्ड, आधार कार्ड या निजी दस्तावेजों का दुरुपयोग करके आपके नाम पर अवैध ऋण लेना या फर्जी बैंक खाते और सिम कार्ड चालू करना।',
      mr: 'तुमचे पॅन कार्ड किंवा आधार कार्ड चोरून तुमच्या नावावर बेकायदेशीर कर्ज घेणे, बनावट बँक खाती उघडणे किंवा सिम कार्ड घेणे.'
    },
    howItHappens: {
      en: 'Predatory instant-loan apps require full access to contacts, photos, and Aadhaar/PAN. Scammers disburse tiny amounts, then blackmail victims with morphed photos and harass their entire contact list for extortion.',
      hi: 'फर्जी इंस्टेंट लोन ऐप फोन के संपर्कों और फोटो गैलरी की अनुमति लेते हैं। फिर ₹2,000 देकर ₹10,000 की मांग करते हैं और तस्वीरें मॉर्फ करके परिजनों को भेजकर ब्लैकमेल करते हैं।',
      mr: 'बनावट इन्स्टंट लोन ॲप्स फोनमधील कॉन्टॅक्ट्स आणि फोटोंचा ॲक्सेस घेतात. नंतर थोडे पैसे देऊन अव्वाच्या सव्वा व्याज मागतात आणि फोटो मॉर्फ करून ब्लॅकमेल करतात.'
    },
    realisticExample: {
      en: 'Rohan installed a "QuickCash 5-minute Loan" app. He borrowed ₹3,000. Within 6 days, the lenders demanded ₹18,000. When he refused, they created obscene morphed images of him and messaged them to his parents and office colleagues.',
      hi: 'रोहन ने "क्विककैश 5-मिनट लोन" ऐप डाउनलोड किया और ₹3,000 लिए। 6 दिन में कंपनी ने ₹18,000 मांगे। मना करने पर रोहन की मॉर्फ की गई अश्लील तस्वीरें उसके ऑफिस सहयोगियों को भेज दी गईं।',
      mr: 'रोहनने एका झटपट कर्ज ॲपवरून ₹३,००० उसने घेतले. ६ दिवसांत त्यांनी ₹१८,००० ची मागणी केली आणि न दिल्यास त्याचे मॉर्फ केलेले घाणेरडे फोटो नातेवाईकांना पाठवले.'
    },
    warningSigns: {
      en: [
        'Apps outside the Google Play Store (direct APK download links) promising no-cibil-check loans.',
        'App demanding unnecessary permissions: Contact List, Photo Gallery, Call Logs.',
        'Exorbitant interest rates (e.g. 50% in 7 days).',
        'Frequent CIBIL alerts for loan inquiries you never initiated.'
      ],
      hi: [
        'प्ले स्टोर के बाहर (एपीके फाइल) बिना सिबिल स्कोर के तुरंत लोन देने वाले ऐप।',
        'ऐप द्वारा कॉन्टैक्ट लिस्ट, कैमरा और फोटो गैलरी की गैर-जरूरी परमिशन मांगना।',
        'अत्यधिक ब्याज दरें और 7 दिनों की मनमानी पुनर्भुगतान अवधि।',
        'सिबिल रिपोर्ट में ऐसे लोन की पूछताछ दिखना जो आपने कभी नहीं की।'
      ],
      mr: [
        'प्ले स्टोअरच्या बाहेरील (APK लिंक) सिबिल स्कोअरशिवाय कर्ज देणारे ॲप्स.',
        'फोनमधील कॉन्टॅक्ट्स, फोटो गॅलरी आणि कॅमेराचा अनावश्यक ॲक्सेस मागणारे ॲप्स.',
        '७ दिवसांत दुप्पट वसुलीचे जाचक नियम.',
        'तुमच्या सिबिल अहवालात अनोळखी कर्जाची नोंद दिसणे.'
      ]
    },
    prevention: {
      en: [
        'Only borrow from RBI-registered Banks and NBFCs (verify on the official RBI website).',
        'Mask your Aadhaar number (use Masked Aadhaar from uidai.gov.in showing only last 4 digits).',
        'Lock your Aadhaar biometrics using the mAadhaar app or UIDAI portal.',
        'Never grant Photo Gallery or Contact access to any utility or financial application.'
      ],
      hi: [
        'केवल आरबीआई (RBI) द्वारा पंजीकृत बैंकों और एनबीएफसी से ही ऋण लें।',
        'हमेशा मास्क आधार (जिसमें केवल अंतिम 4 अंक दिखते हैं) का ही उपयोग करें।',
        'mAadhaar ऐप से अपना बायोमेट्रिक्स हमेशा लॉक रखें।',
        'किसी भी लोन ऐप को अपनी फोटो गैलरी या कॉन्टैक्ट्स का एक्सेस न दें।'
      ],
      mr: [
        'फक्त आरबीआय (RBI) मान्यताप्राप्त बँका किंवा एनबीएफसीकडूनच कर्ज घ्या.',
        'नेहमी मास्क आधारचा (फक्त शेवटचे ४ आकडे दिसणारे) वापर करा.',
        'mAadhaar ॲपद्वारे बायोमेट्रिक्स नेहमी लॉक ठेवा.',
        'कोणत्याही आर्थिक ॲपला आपल्या फोनमधील फोटो आणि संपर्कांची परवानगी देऊ नका.'
      ]
    }
  },
  {
    id: 'shopping-fraud',
    title: {
      en: '7. Online Shopping & Social Media Store Scams',
      hi: '७. ऑनलाइन शॉपिंग और फर्जी सोशल मीडिया स्टोर',
      mr: '७. ऑनलाईन खरेदी आणि बनावट सोशल मीडिया दुकाने'
    },
    whatIsIt: {
      en: 'Fraudulent storefronts advertised on Instagram and Facebook offering luxury clothing, electronics, or festive goods at 90% discount that take payment and never deliver goods.',
      hi: 'इंस्टाग्राम और फेसबुक पर 90% छूट का लालच देकर कपड़े या इलेक्ट्रॉनिक्स बेचने वाले फर्जी पेज जो अग्रिम भुगतान लेकर कभी सामान नहीं भेजते।',
      mr: 'इन्स्टाग्राम व फेसबुकवर ९०% डिस्काउंटचे खोटे आमिष दाखवून कपडे किंवा गॅजेट्स विकणारी बनावट दुकाने जी आगाऊ पैसे घेऊन वस्तू पाठवतच नाहीत.'
    },
    howItHappens: {
      en: 'Scammers create polished Instagram pages with stolen images of designer products. They disable comments, demand upfront UPI payment, provide fake tracking numbers, and block the victim once the funds transfer.',
      hi: 'धोखेबाज़ अन्य कंपनियों के फोटो चुराकर आकर्षक इंस्टाग्राम पेज बनाते हैं। कमेंट्स बंद रखते हैं, केवल ऑनलाइन भुगतान लेते हैं और पैसे मिलने के बाद ब्लॉक कर देते हैं।',
      mr: 'भामटे दुसऱ्यांचे ब्रँडेड फोटो वापरून आकर्षक इन्स्टाग्राम पेज तयार करतात. कॅश ऑन डिलिव्हरी न देता आगाऊ ऑनलाईन पैसे घेतात आणि नंतर ब्लॉक करतात.'
    },
    realisticExample: {
      en: 'Sneha saw an Instagram ad for an branded ethnic lehenga worth ₹14,000 on sale for ₹1,899. The site offered "Prepaid UPI only for special discount". She paid ₹1,899. After 2 weeks, no parcel arrived, the website was deleted, and the Instagram handle disappeared.',
      hi: 'स्नेहा ने इंस्टाग्राम पर ₹14,000 का लहंगा ₹1,899 में देखा। उसने यूपीआई से भुगतान कर दिया। दो हफ्ते बाद भी कोई पार्सल नहीं आया और वेबसाइट बंद हो गई।',
      mr: 'स्नेहाने इन्स्टाग्रामवर ₹१४,००० चा लेहंगा फक्त ₹१,८९९ मध्ये पाहिला आणि यूपीआयने पैसे भरले. दोन आठवड्यांत पार्सल आलेच नाही आणि ते पेजही बंद झाले.'
    },
    warningSigns: {
      en: [
        'Unbelievable prices (e.g. iPhone 15 for ₹15,000 or 90% off branded goods).',
        'No Cash on Delivery (COD) option available.',
        'Comments turned off or only containing generic fake positive bots.',
        'No physical address, GSTIN registration, or customer care landline number.'
      ],
      hi: [
        'अविश्वसनीय रूप से कम कीमतें (जैसे ₹15,000 में ब्रांडेड फोन या 90% छूट)।',
        'कैश ऑन डिलीवरी (COD) का विकल्प न होना।',
        'पोस्ट पर कमेंट्स बंद होना या सिर्फ बॉट्स के फर्जी कमेंट होना।',
        'वेबसाइट पर कोई वैध जीएसटी नंबर, वास्तविक पता या ग्राहक सेवा नंबर न होना।'
      ],
      mr: [
        'अवास्तविक स्वस्त किमती (उदा. ९०% सवलत किंवा ₹५०,००० ची वस्तू ₹३,००० मध्ये).',
        'कॅश ऑन डिलिव्हरी (COD) पर्याय उपलब्ध नसणे.',
        'सोशल मीडियावरील कमेंट्स बंद असणे.',
        'कंपनीचा वैध पत्ता, जीएसटी नंबर किंवा कस्टमर केअर नंबर नसणे.'
      ]
    },
    prevention: {
      en: [
        'Prefer Cash on Delivery (COD) when ordering from unfamiliar platforms.',
        'Verify GST number and physical address on the Ministry of Corporate Affairs portal.',
        'Search for reviews on independent consumer complaint forums, not their own website.',
        'Pay using credit cards if possible, as they offer chargeback mechanisms against fraud.'
      ],
      hi: [
        'अपरिचित वेबसाइटों से खरीदारी करते समय केवल कैश ऑन डिलीवरी (COD) चुनें।',
        'कंपनी का जीएसटी नंबर सरकारी पोर्टल पर सत्यापित करें।',
        'वेबसाइट पर लिखे रिव्यू के बजाय निष्पक्ष उपभोक्ता मंचों पर समीक्षाएं पढ़ें।',
        'क्रेडिट कार्ड का उपयोग करें क्योंकि धोखाधड़ी होने पर चार्जबैक की सुविधा मिलती है।'
      ],
      mr: [
        'नवीन संकेतस्थळांवरून खरेदी करताना नेहमी कॅश ऑन डिलिव्हरी (COD) निवडा.',
        'कंपनीचा अधिकृत जीएसटी नंबर आणि नोंदणीकृत पत्ता तपासा.',
        'इतर ग्राहकांचे गुगलवरील खरे रिव्ह्यू तपासा.',
        'शक्य असल्यास क्रेडिट कार्ड वापरा, ज्यामुळे फसवणूक झाल्यास व्यवहार रद्द करण्याची सोय असते.'
      ]
    }
  },
  {
    id: 'social-media-hack',
    title: {
      en: '8. Social Media Account Takeover & Emergency Impersonation',
      hi: '८. सोशल मीडिया अकाउंट हैकिंग और आपातकालीन मदद घोटाला',
      mr: '८. सोशल मीडिया हॅकिंग आणि मदतीचे खोटे मेसेज'
    },
    whatIsIt: {
      en: 'Compromising WhatsApp, Instagram, or Facebook accounts, then messaging all contacts claiming a medical emergency or accident and begging for urgent financial transfers.',
      hi: 'व्हाट्सएप या इंस्टाग्राम अकाउंट हैक करके दोस्तों और परिजनों को मेडिकल इमरजेंसी का बहाना बनाकर तत्काल पैसे मांगने वाला अपराध।',
      mr: 'नागरिकांचे व्हॉट्सॲप किंवा इन्स्टाग्राम हॅक करून त्यांच्या नातेवाईकांना अपघाताचे खोटे सांगून तात्काळ पैसे ट्रान्सफर करण्यास सांगणे.'
    },
    howItHappens: {
      en: 'Criminals trick the victim into sharing a 6-digit WhatsApp registration code or Instagram login link. Once inside, they message all contacts: "Brother, I am at the hospital, my UPI is not working, please send ₹15,000 to this doctor UPI ID right now".',
      hi: 'धोखेबाज़ कोड चुराकर व्हाट्सएप अकाउंट पर कब्जा कर लेते हैं। फिर सभी संपर्कों को संदेश भेजते हैं: "भाई, मैं अस्पताल में हूं, मेरा यूपीआई काम नहीं कर रहा, तुरंत इस नंबर पर ₹15,000 भेज दो"।',
      mr: 'भामटे व्हॉट्सॲपचा कोड चोरून अकाउंट ताब्यात घेतात. मग मित्रांना मेसेज करतात: "मी इमर्जन्सीमध्ये अडकलो आहे, कृपया या नंबरवर ₹१०,००० पाठवा, संध्याकाळी देतो."'
    },
    realisticExample: {
      en: 'Deepak received a WhatsApp message from his college friend Amit: "Bhai, mother is in ICU, need ₹25,000 urgently, sending doctor UPI ID". Deepak immediately sent the money. An hour later, Amit announced on Facebook that his WhatsApp had been hacked and he had never sent any messages.',
      hi: 'दीपक को अपने दोस्त अमित का व्हाट्सएप मैसेज आया कि उसकी मां आईसीयू में हैं और ₹25,000 की तत्काल जरूरत है। दीपक ने पैसे भेज दिए। बाद में पता चला कि अमित का व्हाट्सएप हैक हो चुका था।',
      mr: 'दीपकला त्याच्या वर्गमित्राचा व्हॉट्सॲपवर मेसेज आला की आई रुग्णालयात असून त्वरित ₹२५,००० हवे आहेत. दीपकने लगेच पैसे पाठवले. नंतर मित्राने सांगितले की त्याचे अकाउंट हॅक झाले होते.'
    },
    warningSigns: {
      en: [
        'Friend or family member messaging out of the blue demanding immediate financial help via UPI.',
        'Refusal to answer direct voice calls or video calls claiming "I am in the ICU / meeting".',
        'Receiving unprompted OTPs for WhatsApp or Instagram verification.',
        'Urgent pleas from friends asking you to vote for them in an online contest via a link.'
      ],
      hi: [
        'किसी परिचित का अचानक मैसेज आना जिसमें गंभीर बीमारी या परेशानी का हवाला देकर पैसे मांगे जाएं।',
        'सीधे फोन या वीडियो कॉल उठाने से बचना और बहाना बनाना कि "मैं डॉक्टर के साथ हूं"।',
        'बिना मांगे आपके फोन पर व्हाट्सएप या इंस्टाग्राम का वेरिफिकेशन कोड आना।',
        'किसी ऑनलाइन प्रतियोगिता में वोट करने के लिए लिंक पर क्लिक करने का अनुरोध।'
      ],
      mr: [
        'कोणत्याही मित्राकडून अचानक वैद्यकीय आणीबाणीचे कारण देऊन पैशांची निकड असल्याचे मेसेज येणे.',
        'थेट फोन कॉल न उचलणे आणि "मी डॉक्टरांसोबत आहे" असे सांगणे.',
        'विनाकारण व्हॉट्सॲप किंवा सोशल मीडियाचा व्हेरिफिकेशन कोड मोबाईलवर येणे.',
        'ऑनलाइन स्पर्धेत मत देण्यासाठी अनोळखी लिंकवर क्लिक करण्यास सांगणे.'
      ]
    },
    prevention: {
      en: [
        'ALWAYS make a direct voice call on their cellular number before transferring money to ANY friend or relative.',
        'Enable Two-Step Verification (PIN) in WhatsApp and Instagram settings.',
        'NEVER share the 6-digit WhatsApp registration code with anyone, even your best friend.',
        'Log out of unused devices under "Linked Devices" in WhatsApp settings.'
      ],
      hi: [
        'किसी भी दोस्त या रिश्तेदार को पैसे भेजने से पहले हमेशा उनके सामान्य फोन नंबर पर कॉल करके बात करें।',
        'व्हाट्सएप और इंस्टाग्राम में "टू-स्टेप वेरिफिकेशन पिन" अनिवार्य रूप से चालू रखें।',
        'व्हाट्सएप का 6 अंकों वाला रजिस्ट्रेशन कोड किसी से भी साझा न करें।',
        'व्हाट्सएप में "लिंक्ड डिवाइसेज" चेक करके अज्ञात कंप्यूटरों से तुरंत लॉग आउट करें।'
      ],
      mr: [
        'कोणालाही पैसे पाठवण्यापूर्वी त्यांच्या नेहमीच्या फोन नंबरवर थेट कॉल करून खात्री करा.',
        'व्हॉट्सॲप आणि सोशल मीडियावर टू-स्टेप व्हेरिफिकेशन (PIN) सुरू ठेवा.',
        'व्हॉट्सॲपचा ६ अंकी नोंदणी कोड कोणाशीही शेअर करू नका.',
        'व्हॉट्सॲपमधील "Linked Devices" तपासून अनावश्यक लॉगइन काढून टाका.'
      ]
    }
  },
  {
    id: 'qr-code-scams',
    title: {
      en: '9. Malicious QR Code & Payment Traps',
      hi: '९. नकली क्यूआर (QR) कोड और पेमेंट ट्रैप',
      mr: '९. बनावट क्यूआर (QR) कोड फसवणूक'
    },
    whatIsIt: {
      en: 'Tampered or counterfeit QR codes placed in public places or sent digitally that redirect users to credential-theft phishing pages or trigger unexpected merchant debits.',
      hi: 'दुकानों, पार्किंग या ऑनलाइन भेजे गए ऐसे फर्जी क्यूआर कोड जो स्कैन करते ही पैसे देने के बजाय आपके खाते से पैसे काट लेते हैं।',
      mr: 'दुकाने, पार्किंग किंवा ऑनलाईन पाठवलेले बनावट क्यूआर कोड जे स्कॅन केल्यावर पैसे मिळण्याऐवजी तुमच्याच खात्यातून पैसे वजा होतात.'
    },
    howItHappens: {
      en: 'Scammers stick their own printed QR code stickers over authentic merchant QR codes at petrol pumps or restaurants. Alternatively, online scammers send a QR code image claiming "Scan this code to receive your refund".',
      hi: 'धोखेबाज़ पेट्रोल पंप या दुकानों पर असली क्यूआर कोड के ऊपर अपना स्टीकर चिपका देते हैं। या फिर ऑनलाइन "रिफंड पाने के लिए यह क्यूआर कोड स्कैन करें" का झांसा देते हैं।',
      mr: 'भामटे पेट्रोल पंप किंवा दुकानांवरील खऱ्या क्यूआर कोडवर स्वतःचे स्टिकर्स चिकटवतात. किंवा रिफंड मिळवण्यासाठी व्हॉट्सॲपवर क्यूआर कोड पाठवतात.'
    },
    realisticExample: {
      en: 'Manish wanted to collect a ₹500 cashback from an online ticket portal. The "support agent" sent a QR code on WhatsApp: "Scan this in GPay to claim cashback". Manish scanned it; the app prompted: "Paying ₹5,000 to XYZ Traders". In confusion, he entered his PIN, losing ₹5,000.',
      hi: 'मनीष को ₹500 कैशबैक पाना था। कस्टमर केयर वाले ने व्हाट्सएप पर क्यूआर कोड भेजा कि "इसे स्कैन करके कैशबैक ले लो"। मनीष ने स्कैन किया तो ₹5,000 भुगतान करने का विकल्प आया। भ्रम में पिन डालने से ₹5,000 कट गए।',
      mr: 'मनीषला ₹५०० कॅशबॅक मिळवायचा होता. भामट्याने व्हॉट्सॲपवर क्यूआर कोड पाठवला. मनीषने स्कॅन करून अनावधानाने पिन टाकला आणि त्याचे ₹५,००० कट झाले.'
    },
    warningSigns: {
      en: [
        'Being asked to SCAN a QR code to RECEIVE money.',
        'Physical merchant QR codes that look like loose stickers placed over existing signage.',
        'Scanning a QR code opens a website prompting you to enter personal or banking details.',
        'The amount field is pre-filled with a debit amount when you were expecting a credit.'
      ],
      hi: [
        'पैसे प्राप्त करने के लिए क्यूआर कोड स्कैन करने को कहा जाना।',
        'दुकानों पर असली बोर्ड के ऊपर ढीले-ढाले चिपकाए गए संदिग्ध स्टीकर।',
        'क्यूआर कोड स्कैन करने पर ऐसी वेबसाइट खुलना जो आपका पासवर्ड या कार्ड डिटेल मांगे।',
        'ऐप स्क्रीन पर "Pay" बटन और बड़ी रकम कटना दिखाई देना।'
      ],
      mr: [
        'पैसे मिळवण्यासाठी क्यूआर कोड स्कॅन करण्यास सांगणे.',
        'दुकानातील मूळ क्यूआर कोडवर वेगळे स्टिकर चिकटवलेले दिसणे.',
        'स्कॅन केल्यावर थेट संशयास्पद वेबसाईट उघडणे किंवा माहिती विचारणे.',
        'पैसे खात्यात येण्याऐवजी स्क्रीनवर "Pay" चा पर्याय दिसणे.'
      ]
    },
    prevention: {
      en: [
        'REMEMBER: YOU SCAN A QR CODE ONLY TO PAY SOMEONE, NEVER TO RECEIVE MONEY.',
        'Before confirming payment at physical stores, verify that the payee name on screen matches the shop name.',
        'Never scan QR code images sent over WhatsApp or email by strangers.',
        'Use the built-in scanner inside your official banking/UPI app, not generic camera apps that auto-open links.'
      ],
      hi: [
        'याद रखें: क्यूआर कोड केवल पैसे भुगतान (देने) के लिए स्कैन किया जाता है, पैसे प्राप्त करने के लिए कभी नहीं।',
        'दुकान पर भुगतान से पहले स्क्रीन पर दिखने वाले दुकानदार के नाम की पुष्टि करें।',
        'व्हाट्सएप पर किसी अनजान द्वारा भेजे गए क्यूआर कोड को कभी स्कैन न करें।',
        'हमेशा आधिकारिक यूपीआई ऐप के अंदर वाले स्कैनर का ही उपयोग करें।'
      ],
      mr: [
        'नेहमी ध्यानात ठेवा: क्यूआर कोड फक्त पैसे देण्यासाठी स्कॅन केला जातो, पैसे मिळवण्यासाठी कधीही नाही.',
        'दुकानदाराला पैसे देण्यापूर्वी स्क्रीनवर येणारे नाव बरोबर असल्याची खात्री करा.',
        'अनोळखी व्यक्तीने व्हॉट्सॲपवर पाठवलेला क्यूआर कोड कधीही स्कॅन करू नका.',
        'नेहमी फोनपे, गुगल पे किंवा पेटीएममधील अधिकृत स्कॅनर वापरा.'
      ]
    }
  },
  {
    id: 'investment-scams',
    title: {
      en: '10. Stock Market & Fake Crypto Investment Scams',
      hi: '१०. शेयर बाजार और फर्जी क्रिप्टो निवेश घोटाला',
      mr: '१०. शेअर मार्केट आणि बनावट क्रिप्टो गुंतवणूक घोटाळा'
    },
    whatIsIt: {
      en: 'Fraudulent investment schemes operating through WhatsApp and Telegram groups, promising guaranteed 20%–100% monthly returns on institutional stock trading, IPO allocations, or crypto bots.',
      hi: 'व्हाट्सएप और टेलीग्राम ग्रुपों के माध्यम से चलने वाला निवेश घोटाला, जो शेयर बाजार, आईपीओ या क्रिप्टो में गारंटीशुदा 20% से 100% मासिक लाभ का झांसा देकर पूंजी हड़प लेता है।',
      mr: 'शेअर बाजार, आयपीओ वाटप किंवा क्रिप्टोकरन्सीमध्ये दरमहा २०% ते ५०% निश्चित परताव्याचे खोटे आमिष दाखवून नागरिकांचे कोट्यवधी रुपये हडपणारा घोटाळा.'
    },
    howItHappens: {
      en: 'Victims are added to WhatsApp groups with "Foreign Institutional Investors" and "SEBI Analysts". Scammers direct them to deposit funds into private mule accounts via a customized fake trading app showing inflated bogus profits. When the victim requests a withdrawal, they demand 30% "income tax fee" before cutting contact.',
      hi: 'पीड़ितों को बड़े-बड़े निवेशकों के फर्जी व्हाट्सएप ग्रुप में जोड़ा जाता है। एक नकली ट्रेडिंग ऐप डाउनलोड करवाकर उसमें फर्जी मुनाफा दिखाते हैं। जब पीड़ित पैसे निकालना चाहता है तो टैक्स के नाम पर और पैसे मांगते हैं और फिर गायब हो जाते हैं।',
      mr: 'नागरिकांना सेबी नोंदणीकृत असल्याचे भासवणाऱ्या व्हॉट्सॲप ग्रुपमध्ये जोडले जाते. बनावट ॲपवर मोठा नफा दाखवून लाखो रुपये भरायला लावतात आणि पैसे काढताना कर भरण्याच्या नावाखाली आणखी लुटतात.'
    },
    realisticExample: {
      en: 'Vikram, a software engineer, invested ₹2 Lakhs on a recommended "Goldman Sachs Institutional Trading App". Within 3 weeks, the dashboard showed his portfolio had grown to ₹14.5 Lakhs! Overjoyed, he invested another ₹18 Lakhs. When he clicked "Withdraw", customer care demanded ₹4.5 Lakhs for "GST clearance". He lost his entire ₹20 Lakh savings.',
      hi: 'विक्रम ने एक ऐप पर ₹2 लाख लगाए। 3 सप्ताह में ऐप में उसका बैलेंस ₹14.5 लाख दिखने लगा। खुश होकर विक्रम ने ₹18 लाख और डाल दिए। पैसे निकालने पर ₹4.5 लाख टैक्स मांगा गया। विक्रम की 20 लाख की जीवन भर की कमाई लुट गई।',
      mr: 'विक्रमने एका ॲपवर २ लाख रुपये गुंतवले. काही दिवसांत ॲपवर त्याचा नफा १४ लाख दाखवला गेला. हुरळून त्याने आणखी १८ लाख गुंतवले. पैसे काढताना कर भरण्यास सांगून सर्व पैसे हडपले.'
    },
    warningSigns: {
      en: [
        'Guaranteed high returns with zero market risk (e.g. 5% weekly, 50% monthly).',
        'Instructions to download trading apps directly via link (.apk) rather than official app stores.',
        'Deposits directed to personal savings accounts or generic individual names rather than SEBI-registered broker accounts.',
        'Being added to investment WhatsApp groups without your permission.'
      ],
      hi: [
        'बिना किसी जोखिम के भारी मुनाफे की गारंटी (जैसे 20% से 50% मासिक रिटर्न)।',
        'प्ले स्टोर के बाहर किसी लिंक से ट्रेडिंग ऐप डाउनलोड करने को कहना।',
        'पैसे किसी कंपनी के खाते के बजाय व्यक्तियों के निजी बचत खातों में ट्रांसफर कराना।',
        'आपकी अनुमति के बिना आपको शेयर बाजार के व्हाट्सएप ग्रुप में जोड़ना।'
      ],
      mr: [
        'कोणत्याही जोखमीशिवाय अवास्तव परताव्याची हमी देणे (उदा. दरमहा ३०% नफा).',
        'प्ले स्टोअरऐवजी थेट लिंकवरून (APK) ट्रेडिंग ॲप डाऊनलोड करायला लावणे.',
        'गुंतवणुकीचे पैसे सेबी-नोंदणीकृत खात्याऐवजी वैयक्तिक व्यक्तींच्या बँक खात्यात मागणे.',
        'परवानगीशिवाय व्हॉट्सॲपवरील संशयास्पद शेअर मार्केट ग्रुपमध्ये ॲड करणे.'
      ]
    },
    prevention: {
      en: [
        'VERIFY: Trade only through SEBI-registered stockbrokers (check list on sebi.gov.in).',
        'Remember that NO genuine market investment guarantees fixed high returns.',
        'Never transfer investment funds into personal individual bank accounts or unknown current accounts.',
        'Change WhatsApp privacy settings to allow only your contacts to add you to groups.'
      ],
      hi: [
        'हमेशा सेबी (SEBI) पंजीकृत ब्रोकरों के माध्यम से ही निवेश करें (sebi.gov.in पर जांचें)।',
        'याद रखें कि शेयर बाजार में कोई भी निश्चित मुनाफे की गारंटी नहीं दे सकता।',
        'किसी व्यक्ति के निजी बैंक खाते में कभी भी निवेश के पैसे न भेजें।',
        'व्हाट्सएप सेटिंग में बदलाव करें ताकि कोई भी अनजान व्यक्ति आपको ग्रुप में न जोड़ सके।'
      ],
      mr: [
        'फक्त सेबी (SEBI) अधिकृत ब्रोकर्समार्फतच शेअर बाजारात व्यवहार करा.',
        'लक्षात ठेवा: शेअर मार्केटमध्ये कधीही निश्चित परताव्याची हमी नसते.',
        'कोणत्याही अनोळखी व्यक्तीच्या बँक खात्यात गुंतवणुकीचे पैसे ट्रान्सफर करू नका.',
        'व्हॉट्सॲप प्रायव्हसी सेटिंगमध्ये जाऊन अनोळखी व्यक्तींना ग्रुपमध्ये ॲड करण्यापासून रोखा.'
      ]
    }
  }
];

let currentLang = 'en';

export function initAwarenessCentre() {
  const langBtns = document.querySelectorAll('.lang-btn');
  const container = document.getElementById('awareness-accordion-container');

  if (!container) return;

  renderAwarenessTopics(container, currentLang);

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLang = btn.dataset.lang || 'en';
      renderAwarenessTopics(container, currentLang);
    });
  });
}

function renderAwarenessTopics(container, lang) {
  container.innerHTML = AWARENESS_TOPICS.map((topic, index) => {
    const title = topic.title[lang] || topic.title.en;
    const what = topic.whatIsIt[lang] || topic.whatIsIt.en;
    const how = topic.howItHappens[lang] || topic.howItHappens.en;
    const example = topic.realisticExample[lang] || topic.realisticExample.en;
    const signs = topic.warningSigns[lang] || topic.warningSigns.en;
    const prevention = topic.prevention[lang] || topic.prevention.en;

    const labels = {
      en: { what: 'What is this cybercrime?', how: 'How does it happen?', eg: 'Realistic Example Case', signs: 'Red Flag Warning Signs', prev: 'Prevention & Safety Methods' },
      hi: { what: 'यह साइबर अपराध क्या है?', how: 'यह कैसे घटित होता है?', eg: 'वास्तविक उदाहरण', signs: 'चेतावनी के मुख्य संकेत', prev: 'बचाव और सुरक्षा के उपाय' },
      mr: { what: 'हा सायबर गुन्हा काय आहे?', how: 'हा कसा घडतो?', eg: 'वास्तविक उदाहरण', signs: 'धोक्याचे इशारे', prev: 'प्रतिबंध आणि सुरक्षेचे उपाय' }
    }[lang] || { what: 'What is this cybercrime?', how: 'How does it happen?', eg: 'Realistic Example Case', signs: 'Red Flag Warning Signs', prev: 'Prevention & Safety Methods' };

    return `
      <div class="awareness-item" data-id="${topic.id}">
        <button type="button" class="awareness-header" aria-expanded="false" aria-controls="awareness-content-${index}">
          <div class="awareness-header-left">
            <span class="topic-index">${index + 1}</span>
            <h3>${escapeHtml(title)}</h3>
          </div>
          <svg class="awareness-toggle-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        <div class="awareness-content" id="awareness-content-${index}" aria-hidden="true">
          <div class="awareness-subbox" style="margin-bottom: 16px;">
            <h4>📌 ${labels.what}</h4>
            <p>${escapeHtml(what)}</p>
          </div>
          <div class="awareness-subbox" style="margin-bottom: 16px;">
            <h4>⚙️ ${labels.how}</h4>
            <p>${escapeHtml(how)}</p>
          </div>
          <div class="awareness-subbox" style="margin-bottom: 16px; background-color: #FEF9C3; border-color: #FDE047;">
            <h4 style="color: #854D0E;">📖 ${labels.eg}</h4>
            <p style="color: #713F12;">${escapeHtml(example)}</p>
          </div>
          <div class="awareness-grid-2">
            <div class="awareness-subbox" style="background-color: #FEF2F2; border-color: #FCA5A5;">
              <h4 style="color: #B91C1C;">⚠️ ${labels.signs}</h4>
              <ul style="color: #7F1D1D;">
                ${signs.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
              </ul>
            </div>
            <div class="awareness-subbox" style="background-color: #F0FDF4; border-color: #86EFAC;">
              <h4 style="color: #15803D;">🛡️ ${labels.prev}</h4>
              <ul style="color: #14532D;">
                ${prevention.map(p => `<li>${escapeHtml(p)}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Attach accordion click listeners
  const items = container.querySelectorAll('.awareness-item');
  items.forEach(item => {
    const header = item.querySelector('.awareness-header');
    const content = item.querySelector('.awareness-content');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.awareness-header').setAttribute('aria-expanded', 'false');
        i.querySelector('.awareness-content').setAttribute('aria-hidden', 'true');
      });
      if (!isOpen) {
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
        content.setAttribute('aria-hidden', 'false');
      }
    });
  });

  // Open first by default
  if (items.length > 0) {
    items[0].classList.add('open');
    items[0].querySelector('.awareness-header').setAttribute('aria-expanded', 'true');
    items[0].querySelector('.awareness-content').setAttribute('aria-hidden', 'false');
  }
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
